import React from 'react'
import ProductItem from '../../components/ProductItem';

const Banner = () => {
 return (
  <div className="section-container bg-gradient-to-r from-[#FAFAFA] to-[#FCFCFC]">
   <div className="py-24 flex flex-col md:flex-row-reverse justify-between items-center">
    <div className="md:w-1/2">
     <img src="/images/home/banner.png" alt="Banner" />
     <div className="flex flex-col md:flex-row item-center justify-around -mt-16 gap-4">
      <ProductItem image="/images/home/gamepad.png" name="gamp pad" rateing="2" price="499" />
      <ProductItem image="/images/home/headphone.png" name="headphone" rateing="5" price="1000" />
     </div>
    </div>
    <div className="md:w-1/2 space-y-7 px-4">
     <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
      Discover Uniq {""}
      <span className='text-red'>Software Engineering Swag</span> for Every Coding Enthusiat
     </h2>
     <p className='text-xl text-[#4a4a4a]'>
      Our Mission: To merge fashion with functionality in the world of software Engineering
     </p>
     <a className="btn bg-red px-8 py3 front-semibold text-white rounded-full" href="/shop"> Order Now </a>
    </div>
   </div>
  </div>
 );
};

export default Banner