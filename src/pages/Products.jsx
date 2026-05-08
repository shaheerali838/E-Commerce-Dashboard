import React from "react";
import Banner from "../components/Banner";
import ProductCard from "../components/ProductCard";
import watch from "../assets/download.jpg";

const Products = () => {
  const handleEditProduct = (productId) => {
    console.log("Edit product:", productId);
    // Add navigation to edit page or open modal
  };

  const handleDeleteProduct = (productId) => {
    console.log("Delete product:", productId);
    // Add delete logic or confirmation modal
  };
  return (
    <>
      <div className="pl-15 pt-5 pr-15 w-full flex flex-col justify-center gap-8">
        <div className="text-2xl font-bold">
          <h1>Products</h1>
        </div>
        {/* Banner */}
        <Banner />

        {/* Product Cards */}
        <div className="flex flex-wrap justify-center gap-4">
          <ProductCard
            image={watch}
            title={"Mens Watch"}
            price={"120"}
            id={"1"}
            originalPrice={"150"}
            rating={"5"}
            reviews={"100"}
            discount={"20"}
            onFavorite={() => {}}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
          <ProductCard
            image={watch}
            title={"Mens Watch"}
            price={"120"}
            id={"2"}
            originalPrice={"150"}
            rating={"5"}
            reviews={"100"}
            discount={"20"}
            onFavorite={() => {}}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
          <ProductCard
            image={watch}
            title={"Mens Watch"}
            price={"120"}
            id={"3"}
            originalPrice={"150"}
            rating={"5"}
            reviews={"100"}
            discount={"20"}
            onFavorite={() => {}}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
          <ProductCard
            image={watch}
            title={"Mens Watch"}
            price={"120"}
            id={"4"}
            originalPrice={"150"}
            rating={"5"}
            reviews={"100"}
            discount={"20"}
            onFavorite={() => {}}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
          <ProductCard
            image={watch}
            title={"Mens Watch"}
            price={"120"}
            id={"5"}
            originalPrice={"150"}
            rating={"5"}
            reviews={"100"}
            discount={"20"}
            onFavorite={() => {}}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
          <ProductCard
            image={watch}
            title={"Mens Watch"}
            price={"120"}
            id={"6"}
            originalPrice={"150"}
            rating={"5"}
            reviews={"100"}
            discount={"20"}
            onFavorite={() => {}}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        </div>
      </div>
    </>
  );
};

export default Products;
