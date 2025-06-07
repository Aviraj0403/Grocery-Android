import { getUserCart, addToCart } from '../../services/cartApi';
import { setCart } from './cartSlice';

// 🔁 Merge guest cart with backend after login
export const syncCartOnLogin = () => async (dispatch, getState) => {
  const { cart } = getState();
  try {
    // 1️⃣ Fetch backend cart
    const backendRes = await getUserCart();
    const backendItems = backendRes.data.cartItems || [];

    // 2️⃣ Prepare items to be synced (not already in backend)
    const guestItems = cart.items;
    const itemsToSync = [];

    for (const item of guestItems) {
      const variant = item.selectedVariant || {};
      const productId = item.productId || item.id || item._id;
      const variantId = variant.id || variant.unit;

      if (!productId || !variantId || variant.unit?.trim() === '') {
        console.warn('⚠️ Skipping invalid cart item:', { item });
        continue;
      }

      const existsInBackend = backendItems.find(
        (i) =>
          (i.productId || i.product?._id || i.id) === productId &&
          ((i.selectedVariant?.id || i.selectedVariant?.unit) === variantId)
      );

      if (!existsInBackend) {
        itemsToSync.push({
          productId,
          selectedVariant: variant,
          quantity: item.quantity,
        });
      }
    }

    // 3️⃣ Add missing guest items to backend
    await Promise.all(itemsToSync.map((item) => addToCart(item)));

    // 4️⃣ Fetch updated backend cart and set in Redux
    const finalRes = await getUserCart();
    dispatch(setCart({ items: finalRes.data.cartItems }));
  } catch (err) {
    console.error('🛠️ Cart sync error:', err);
  }
};
