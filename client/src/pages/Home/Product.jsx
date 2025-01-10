import React, { useRef, useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import productList from './product.json';
import Card from '../../components/Card';

const SampleNextArrow = (props) => {
 const { className, style, onClick } = props;
 return
 <div className={className} style={{ ...style, display: "block", background: "red" }}>NEXT</div >
}
const SamplePrevArrow = (props) => {
 const { className, style, onClick } = props;
 return
 <div className={className} style={{ ...style, display: "block", background: "green" }}>BACK</div >
}

const Product = () => {
 const [products, setProduct] = useState(productList);
 const slider = useRef(null)
 const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  initialSlide: 1,
  nexArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
   {
    breakpoint: 1024,
    settings: {
     dot: true,
     infinite: true,
     slidesToShow: 3,
     slidesToScroll: 3,
    }
   },
   {
    breakpoint: 970,
    settings: {
     initialSlide: 2,
     slidesToShow: 2,
     slidesToScroll: 2,
    }
   },
   {
    breakpoint: 576,
    settings: {
     slidesToShow: 1,
     slidesToScroll: 1,
    }
   }
  ]
 };
 return (
  <div className="section-container my-20 relative">
   <div className="text-left">
    <p className="subtitle">Our Story & Services</p>
    <h2 className="title">Our Journey and Services</h2>
   </div>
   <div className="md:absolute right-3 top-8 mb-10 md:mr-24 space-x-2">
    <button className='btn bg-red p-2 rounded-full h-10 w-10 mt-5 text-white' onClick={() => slider?.current?.slickPrev()}>
     &lt;
    </button>
    <button className='btn bg-red p-2 rounded-full h-10 w-10 mt-5 text-white' onClick={() => slider?.current?.slickNext()} >
     &gt;
    </button>
   </div>
   <div className="slider-container">
    <Slider ref={slider} {...settings} className='overflow-hidden mt-10 space-x-5'>
     {products.length > 0 && products.map((item, index) => {
      return (
       <Card item={item} key={index} />
      )
     }
     )}
    </Slider>
   </div>

  </div>
 )
}

export default Product