// src/hooks/useCartAutoSync.js
import { useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useSelector } from "react-redux";
import * as cartApi from "../services/cartApi";
import debounce from "lodash.debounce";

export const useCartAutoSync = () => {
  const { user } = useAuth();
  const cart = useSelector((state) => state.cart);
  const prevCartRef = useRef(cart.items);
  const isSyncing = useRef(false);

  // Debounced sync function
  const debouncedSync = useRef(
    debounce(async (items) => {
      if (!user) return;

      try {
        isSyncing.current = true;

        // Optional: Clear backend cart first to avoid duplicate pushes
        await cartApi.clearCart();

        for (const item of items) {
          const payload = {
            productId: item.id,
            selectedVariant: item.selectedVariant,
            quantity: item.quantity,
          };
          await cartApi.addToCart(payload);
        }

        console.log("🛒 Cart auto-synced to backend.");
      } catch (err) {
        console.error("Auto-sync cart failed:", err);
      } finally {
        isSyncing.current = false;
      }
    }, 800) // Adjust debounce delay here (ms)
  ).current;

  useEffect(() => {
    if (!user) return;

    const cartChanged =
      JSON.stringify(prevCartRef.current) !== JSON.stringify(cart.items);

    if (cartChanged && !isSyncing.current) {
      debouncedSync(cart.items);
      prevCartRef.current = cart.items;
    }
  }, [cart.items, user, debouncedSync]);
};
