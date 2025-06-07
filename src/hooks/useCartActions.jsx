import { useDispatch, useSelector } from "react-redux";
import { updateCartItemThunk, removeFromCartThunk, addToCartThunk } from "../features/cart/cartThunks";

export const useCartActions = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  // Add or update item in cart with quantity check
  const addOrUpdateItem = (product, variant, quantity) => {
    const existingItem = cartItems.find(
      (item) =>
        item.id === product._id &&
        item.selectedVariant.unit === variant.unit
    );

    const newQuantity = existingItem ? existingItem.quantity + quantity : quantity;

    // Check stock
    if (newQuantity > variant.stockQty) {
      return { success: false, message: "Cannot add more than available stock." };
    }

    const cartItem = {
      id: product._id,
      name: product.name,
      image: product.images?.[0] || "/placeholder.jpg",
      selectedVariant: variant,
      quantity: newQuantity,
      brand: product.brand,
    };

    dispatch(addToCartThunk(cartItem));
    return { success: true, newQuantity };
  };

  const removeItem = (id, variantId) => {
    dispatch(removeFromCartThunk({ id, variantId }));
  };

  const updateQuantity = (id, variant, quantity) => {
    dispatch(updateCartItemThunk({ id, selectedVariant: variant, quantity }));
  };

  return {
    addOrUpdateItem,
    removeItem,
    updateQuantity,
  };
};
