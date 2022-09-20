import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartContainer from "./components/CartContainer";
import Modal from "./components/Modal";
import NavBar from "./components/NavBar";
import { calculateTotal } from "./features/cart/cartSlice";

function App() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((store) => store.cart);
  const { isOpen } = useSelector((store) => store.modal)

  useEffect(() => {
    dispatch(calculateTotal())
  }, [cartItems]);

  return (
    <main>
      { isOpen && <Modal /> }
      <NavBar />
      <CartContainer />
    </main>
  );
}
export default App;
