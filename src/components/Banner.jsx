import React from "react";

const Banner = () => {
  return (
    <>
      <div className="w-full h-90 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 py-4 px-6 rounded-lg shadow-lg overflow-hidden relative flex flex-col justify-center">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white opacity-5 rounded-full -ml-40 -mb-40"></div>

        <div className="relative z-10 flex flex-col justify-center items-center text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full mb-2">
            <span className="text-white text-xs font-semibold">
              🎉 Limited Time Offer
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
            Summer Collection
          </h1>

          {/* Subtitle */}
          <p className="text-sm md:text-base text-white/90 mb-3 max-w-2xl">
            Discover the trendiest products at unbeatable prices. Limited stocks
            available!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 justify-center mb-3">
            <button className="bg-white text-purple-600 font-bold py-2 px-6 rounded-lg hover:bg-opacity-90 transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-xs">
              Shop Now
            </button>
            <button className="border-2 border-white text-white font-bold py-2 px-6 rounded-lg hover:bg-white/10 transition duration-300 backdrop-blur-sm text-xs">
              View Collection
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-4 pt-2 border-t border-white/20">
            <div>
              <p className="text-lg font-bold text-white">50%</p>
              <p className="text-white/80 text-xs">Off Selected Items</p>
            </div>
            <div>
              <p className="text-lg font-bold text-white">Free</p>
              <p className="text-white/80 text-xs">Shipping on Orders</p>
            </div>
            <div>
              <p className="text-lg font-bold text-white">24/7</p>
              <p className="text-white/80 text-xs">Customer Support</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
