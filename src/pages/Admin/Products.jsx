import React from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../../components/Banner";
import ProductCard from "../../components/ProductCard";
import { useProductStock } from "../../hooks/useProductStock";
import { useFavorites } from "../../hooks/useFavorites";
import { Loader2, AlertTriangle, Package } from "lucide-react";

const Products = () => {
  const { products, loading, error, deleteProduct } = useProductStock();
  const { favorites, toggleFavorite } = useFavorites();
  const navigate = useNavigate();

  const handleEditProduct = (productId) => {
    // Navigate to Product Stock page where editing is fully featured
    navigate("/admin/product-stock");
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(productId);
    }
  };

  return (
    <div className="px-6 pt-5 pb-10 w-full flex flex-col justify-center gap-8 bg-gray-50 min-h-screen">
      <div className="text-2xl font-bold text-gray-900 flex justify-between items-center">
        <h1>Products Gallery</h1>
      </div>
      
      {/* Banner */}
      <Banner />

      {/* States */}
      {loading && (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
          <Loader2 size={36} className="animate-spin mb-3" />
          <p className="text-sm">Loading products…</p>
        </div>
      )}
      
      {error && (
        <div className="flex flex-col items-center justify-center h-64 text-red-400">
          <AlertTriangle size={36} className="mb-3" />
          <p className="text-sm font-medium">Failed to load products</p>
          <p className="text-xs mt-1 text-gray-400">{error}</p>
        </div>
      )}
      
      {!loading && !error && products.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
          <Package size={48} className="mb-4 opacity-50" />
          <p className="text-lg font-medium text-gray-600">No products found</p>
          <p className="text-sm mt-1">Add some products in the Product Stock page.</p>
          <button 
            onClick={() => navigate("/admin/product-stock")}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Manage Stock
          </button>
        </div>
      )}

      {/* Product Cards */}
      {!loading && !error && products.length > 0 && (
        <div className="flex flex-wrap gap-6 mt-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.imageUrl || `https://ui-avatars.com/api/?name=${product.emoji || 'P'}&background=random&size=200`}
              title={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              rating={product.rating || 4.5}
              reviews={product.reviews || Math.floor(Math.random() * 50) + 1}
              discount={product.discount}
              isFavorite={favorites.includes(product.id)}
              onFavorite={() => toggleFavorite(product.id)}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
