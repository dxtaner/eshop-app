import { createContext, useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./alertify.css"; // Import your custom CSS file

const CartContext = createContext();

const defaultCart = JSON.parse(localStorage.getItem("cart")) || [];

const CartProvider = ({ children }) => {
  const [items, setItems] = useState(defaultCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (product, findCartItem) => {
    if (!findCartItem) {
      setItems((prev) => [...prev, product]);
      showToastMessage(`✨ ${product.title} added to the cart`, "success");
    } else {
      const filtered = items.filter((item) => item._id !== findCartItem._id);
      setItems(filtered);
      showToastMessage(
        `❌ ${findCartItem.title} removed from the cart`,
        "error"
      );
    }
  };

  const removeFromCart = (id) => {
    const removedItem = items.find((item) => item._id === id);
    const filtered = items.filter((item) => item._id !== id);
    setItems(filtered);
    showToastMessage(`❌ ${removedItem.title} removed from the cart`, "error");
  };

  const emptyCart = () => {
    setItems([]);
    showToastMessage("🛒 Cart emptied", "warning");
  };

  const showToastMessage = (message, type) => {
    toast[type](message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const values = {
    items,
    addToCart,
    removeFromCart,
    emptyCart,
  };

  return (
    <>
      <CartContext.Provider value={values}>{children}</CartContext.Provider>
      <ToastContainer />
    </>
  );
};

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };
