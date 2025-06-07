import { getUserCart, addToCart } from '../../services/cartApi';
import { mergeCart, setCart } from './cartSlice';

// 🔁 Used on manual login to merge guest cart with backend
export const syncCartOnLogin = () => async (dispatch, getState) => {
  const { cart } = getState();

  try {
    const response = await getUserCart();
    const backendItems = response.data.cartItems || [];

    const promises = [];

    for (const item of cart.items) {
      const variant = item.selectedVariant || {};
      const productId = item.productId || item.id || item._id || item.product?._id;
      const variantId = variant.id || variant.unit;

      if (!productId || !variantId || variant.unit?.trim() === '') {
        console.warn('❌ Skipping invalid cart item:', { item });
        continue;
      }

      const exists = backendItems.find(
        (i) =>
          (i.id || i.product?._id || i.productId) === productId &&
          ((i.selectedVariant?.id || i.selectedVariant?.unit) === variantId)
      );

      if (!exists) {
        promises.push(
          addToCart({
            productId,
            selectedVariant: variant,
            quantity: item.quantity,
          })
        );
      }
    }

    await Promise.all(promises);
    const finalRes = await getUserCart();
    dispatch(setCart({ items: finalRes.data.cartItems }));
  } catch (err) {
    console.error('🛠️ Cart sync error:', err);
  }
};

// 📥 Used on re-login (refresh + token still valid)
export const fetchBackendCart = () => async (dispatch) => {
  try {
    const response = await getUserCart();
    dispatch(setCart({ items: response.data.cartItems }));
  } catch (err) {
    console.error('🛒 Failed to fetch backend cart:', err);
  }
};

// ➕ Add to cart thunk
export const addToCartThunk = (payload) => async (dispatch) => {
  try {
    const response = await addToCart(payload);
    dispatch(mergeCart({ items: response.data.cartItems }));
    return response.data;
  } catch (err) {
    console.error('🛒 Add to cart error:', err);
    throw err;
  }
};
