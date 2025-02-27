import stripeService from "../services/stripe.service";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const PaymentButton = ({ cartItem }) => {
  const { user } = useContext(AuthContext);
  const handleCheckOut = async () => {
    stripeService
      .createCheckOutSession({
        cart: cartItem,
        email: user.email,
      })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <button
      onClick={handleCheckOut}
      className="btn btn-md bg-red text-white py-2 px-4"
    >
      Proceed Check Out
    </button>
  );
};

export default PaymentButton;
