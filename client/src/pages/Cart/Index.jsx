import React, { useContext } from "react";
import useCart from "../../hooks/useCart";
import { FaTrash } from "react-icons/fa";
import CartService from "../../services/cart.service";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";

import PaymentButton from "../../components/PaymentButton";

const Index = () => {
  const [cart, refetch] = useCart();
  const { user } = useContext(AuthContext);
  const formatPrice = (price) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    }).format(price);
  };
  const totalPrice = (cart) => {
    let total = 0;
    cart.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total;
  };
  // let totalPrice = 0;
  // for (let i = 0; i < cart.length; i++) {
  //   totalPrice += cart[i].quantity * cart[i].price;
  // }

  const handleClearCart = async () => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure to clear your shopping cart?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonColor: "#3085d6",
      showConfirmButton: true,
      confirmButtonText: "Yes, clear it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await CartService.clearAllItem(user?.email);
          if (response.status === 200) {
            refetch();
            Swal.fire({
              icon: "success",
              title: "Shopping Cart Cleared!",
              text: response.message,
              timer: 1500,
              showConfirmButton: false,
            }).then(() => {
              window.location.reload();
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.message,
          });
        }
      }
    });
  };
  const handleDeleteItem = async (cartItem) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonColor: "#3085d6",
      showConfirmButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await CartService.deleteCartItem(cartItem._id);
          if (response.status === 200) {
            refetch();
            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: response.message,
              timer: 1500,
              showConfirmButton: false,
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.message,
          });
        }
      }
    });
  };
  //cartItem สินค้าแต่ละชิ้นในตะกร้าสินค้า
  const handleIncrease = async (cartItem) => {
    if (cartItem.quantity + 1 < 10) {
      try {
        //const increase = { quantity: cartItem.quantity + 1 }; //กรณีนี้ใช้ในกรณีที่มีAttibute หลายตัว
        //เรียกดูจากServiceโดยดูว่าส่งอะไรมาบ้าง
        const response = await CartService.updateCart(cartItem._id, {
          quantity: cartItem.quantity + 1,
        });
        if (response.status === 200) {
          refetch();
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
        });
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "You reach maximum buy  limit",
        showCancelButton: true,
      });
    }
  };

  const handleDecrease = async (cartItem) => {
    if (cartItem.quantity > 1) {
      try {
        //const decrease = { quantity: cartItem.quantity - 1 }; //กรณีนี้ใช้ในกรณีที่มีAttibute หลายตัว
        //เรียกใชิจากService โดยดูว่าส่งอะไรมาบ้าง
        const response = await CartService.updateCart(cartItem._id, {
          quantity: cartItem.quantity - 1,
        });
        if (response.status === 200) {
          refetch();
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
        });
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonColor: "#3085d6",
        showConfirmButton: true,
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await CartService.deleteCartItem(cartItem._id);
            if (response.status === 200) {
              refetch();
              Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: response.message,
                timer: 1500,
                showConfirmButton: false,
              });
            }
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: error.message,
            });
          }
        }
      });
    }
  };

  return (
    <div>
      <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
        <div className="bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
          <div className="py-28 flex flex-col items-center justify-center">
            <div className="text-center px-4 space-y-7">
              <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
                Items Added to The <span className="text-red">Cart</span>
              </h2>
            </div>
          </div>
        </div>
        {cart.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead className="bg-red text-white rounded-sm text-center">
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Price Per Unit</th>
                  <th>Price</th>
                  <th>
                    <button
                      className="btn btn-md bg-red text-white py-2 px-4 btn-error"
                      onClick={handleClearCart}
                    >
                      Clear Cart
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {cart.length > 0 &&
                  cart.map((cartItem, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            {" "}
                            <img
                              src={cartItem.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="font-bold">{cartItem.name}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="space-x-6 text-center">
                          <button
                            className="btn btn-xs mr-6"
                            onClick={() => handleDecrease(cartItem)}
                          >
                            -
                          </button>
                          {cartItem.quantity}
                          <button
                            className="btn btn-xs mr-2"
                            onClick={() => handleIncrease(cartItem)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="text-center">{cartItem.price}</td>
                      <td className="text-center">
                        {formatPrice(cartItem.quantity * cartItem.price)}
                      </td>
                      <td className="text-center">
                        <button onClick={() => handleDeleteItem(cartItem)}>
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
              {/* foot */}
              <tfoot>
                <tr className="bg-red text-white rounded-sm text-center">
                  <th>#</th>
                  <th>Product</th>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Price Per Unit</th>
                  <th>Price</th>
                  <th>
                    <button className="btn btn-md bg-red text-white py-2 px-4 btn-error">
                      Clear Cart
                    </button>
                  </th>
                </tr>
              </tfoot>
            </table>
            <hr />
            <div className="flex flec-col md:flex-row justify-between items-start my-12 gap-8">
              <div className="md:w-1/2 space-y-3">
                <h3 className="text-lg font-semibold ">Customer Detail</h3>
                <p>Name: {user?.displayName}</p>
                <p>Email: {user?.email}</p>
                <p>User Id: {user?.uid}</p>
              </div>
              <div className="md:w-1/2 space-y-3">
                <h3 className="text-lg font-semibold ">Shopping Detail</h3>
                <p>Total Product: {cart.length}</p>
                <p>Total Price: {formatPrice(totalPrice(cart))}</p>
                <PaymentButton cartItem={cart}></PaymentButton>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col item">
            <div className="text-xl font-bold text-center text-red">
              Shopping cart is Empty!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
