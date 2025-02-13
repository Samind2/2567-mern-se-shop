import React, { useState } from 'react'
import CartService from '../services/cart.service';
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'
import useCart from '../hooks/useCart';
import Swal from 'sweetalert2';


const Card = ({ item }) => {
 const { _id, name, description, category, price, image } = item; // เพิ่ม image ในการ destructure
 const { user } = useContext(AuthContext)
 const [cart, refetch] = useCart()
 const [isHeartFilled, setIsHeartFilled] = useState(false)
 const handleHeartClick = () => {
  setIsHeartFilled(!isHeartFilled)
 }
 const handleAddToCart = async () => {
  if (!user || !user.email) {
   Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Please login to add to cart"
   })
   return;
  }
  try {
   const cartItem = {
    productId: _id,
    email: user.email,
    quantity: 1,
    name,
    price,
    image,
   }
   const response = await CartService.createCart(cartItem)
   if (response.status === 200) {
    Swal.fire({
     icon: "success",
     title: "Success",
     text: "Item added to cart",
     timer: 2000,
     showConfirmButton: false,
    })
    refetch();
   }

  } catch (error) {
   Swal.fire({
    icon: "error",
    title: "Oops...",
    text: error.message,
   })
  }
 }


 return (
  <div className="card shadow-xl relative mr-5 md:my-5 h:120">
   <div className={`rating gap-1 absolute right-2 top-2 p-4 z-10 heartStar`} onClick={handleHeartClick}>
    {/* <svg width="24"
     height="24"
     xmlns="http://www.w3.org/2000/svg" viewBox='0 0 24 24' fill='currentColor' className='w-5 h-5 cursor-pointer'>
     <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181" />
    </svg> */}
    <input
     type='radio'
     name='heart'
     className={`mask mask-heart ${isHeartFilled ? "bg-green-400" : ""}`}
    />
   </div>
   <figure>
    <img
     src={image}
     alt={name}
     className="hover:scale-105 transition-all duration-300 md:h-60"
    />
   </figure>
   <div className="card-body">
    <h2 className="card-title">{name}</h2>
    <p>{description}</p>
    <div className="card-action justify-between items-center mt-2">
     <h5 className="font-bold">
      {price}
      <span className="text-sm text-red">฿</span>
     </h5>
     <button className="btn bg-red text-white" onClick={handleAddToCart}>Add to cart</button>
    </div>
   </div>
  </div >
 );
};

export default Card