import { useState } from 'react'

//[]เก็บข้อมูลหลายตัว เก็บodject ของสินค้า
const CategoryItems = [
 {
  id: 1,
  title: "Clothing",
  number: 86,
  Image: "/images/home/category/img1.jpg",
 },
 {
  id: 2,
  title: "Accessories",
  number: 86,
  Image: "/images/home/category/img2.jpg",
 },
 {
  id: 3,
  title: "Gadgets",
  number: 86,
  Image: "/images/home/category/img3.jpg",
 },
 {
  id: 4,
  title: "Swag",
  number: 86,
  Image: "/images/home/category/img4.jpg",
 },
];

const Categories = () => {
 const [category, setCategory] = useState(CategoryItems);
 return (
  <div className="section-container py-16">
   <div className="text-center">
    <p className="subtitle">Customer favorites</p>
    <h2 className="title">popular categories</h2>
   </div>
   <div className="flex flex-col sm:flex-row flex-warp gap-6 justify-around items-center mt-12">
    {category.length > 0 &&
     category.map((item) => {
      return (
       <div
        key={item.id}
        className="shadow-lg round-md bg-white py-6 px-5 w-72 mx-auto text-center cursor-pointer hover:-translate-y-4 transition-all duration-300"
       >
        <div className="w-full mx-auto flex items-center justify-center">
         <img
          src={item.Image}
          alt=""
          className="bg-red p-2 rounded-full w-28 h-28"
         />
        </div>
        <div className="mt-5 space-y-1">
         <h5 className="text-[#1E1E1E] font-semibold">{item.title}</h5>
         <p className="test-secondary text-sm">
          ({item.number} items)
         </p>
        </div>
       </div>
      );
     })}
   </div>
  </div>
 );
};


export default Categories