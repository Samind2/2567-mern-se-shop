import React from "react";

const Banner = () => {
  return (
    <div className="section-container bg-gradient-to-r from-[#cfcfcf] from-0% to-[#FCFCFC]">
      <div className="py-12 flex flex-col justify-center items-center">
        <div className="text-center space-y-7 px-4">
          <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
            Unleash Your Inner Geek: Shop Our Exclusive Tech-themed Merchandise!
          </h2>
          <p className="text-xl text-[#4A4A4A]">
            We offer a curated selection of high-quality products ranging from
            clothing and accessories to home decor and office essentials. Each
            item is carefully chosen to meet our standards of quality.
            functionality, and style
          </p>
          <a
            className="btn bg-red px-8 py3 front-semibold text-white rounded-full"
            href="/shop"
          >
            Order Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
