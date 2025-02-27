import React from "react";
import "./style.css";

const Index = () => {
  //clear cart logic
  return (
    <div className="checkout-success">
      <h2>Check out Successful</h2>
      <p>Your order might take sometime to process </p>
      <p>Check your order status at your profile after about 10 mins. </p>
      <p>
        In case of any inquiries contact the support at
        <strong>support@se-shop.com</strong>{" "}
      </p>
    </div>
  );
};

export default Index;
