import React from "react";
import ProductCard from "../components/ProductCard";
import watch from "../assets/download.jpg";

const Favorites = () => {
  return (
    <>
      <div className="pl-15 pt-5 pr-15 w-full flex flex-col justify-center gap-8">
        <div className="text-2xl font-bold">
          <h1>Favorites</h1>
        </div>
        <div className="flex w-full justify-around gap-5  flex-wrap">
          <ProductCard
            image={watch}
            title={"Mens Watch"}
            price={"120"}
            id={"1"}
            originalPrice={"150"}
            rating={"5"}
            reviews={"100"}
            discount={"20"}
          />
          <ProductCard
            image={watch}
            title={"Mens Watch"}
            price={"120"}
            id={"1"}
            originalPrice={"150"}
            rating={"5"}
            reviews={"100"}
            discount={"20"}
          />
          <ProductCard
            image={watch}
            title={"Mens Watch"}
            price={"120"}
            id={"1"}
            originalPrice={"150"}
            rating={"5"}
            reviews={"100"}
            discount={"20"}
          />
          <ProductCard
            image={watch}
            title={"Mens Watch"}
            price={"120"}
            id={"1"}
            originalPrice={"150"}
            rating={"5"}
            reviews={"100"}
            discount={"20"}
          />
          <ProductCard
            image={watch}
            title={"Mens Watch"}
            price={"120"}
            id={"1"}
            originalPrice={"150"}
            rating={"5"}
            reviews={"100"}
            discount={"20"}
          />
          <ProductCard
            image={watch}
            title={"Mens Watch"}
            price={"120"}
            id={"1"}
            originalPrice={"150"}
            rating={"5"}
            reviews={"100"}
            discount={"20"}
          />
          <ProductCard
            image={watch}
            title={"Mens Watch"}
            price={"120"}
            id={"1"}
            originalPrice={"150"}
            rating={"5"}
            reviews={"100"}
            discount={"20"}
          />
          <ProductCard
            image={watch}
            title={"Mens Watch"}
            price={"120"}
            id={"1"}
            originalPrice={"150"}
            rating={"5"}
            reviews={"100"}
            discount={"20"}
          />
        </div>
      </div>
    </>
  );
};

export default Favorites;
