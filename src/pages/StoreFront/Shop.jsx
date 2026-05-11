import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config"; // Ensure this path matches your config location
import PublicProductCard from "../../components/PublicProductCard";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-bold text-slate-900">All Products</h1>
        <p className="text-slate-500 mt-2">Browse our latest collection.</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-lg">
          <p className="text-slate-500 text-lg">
            No products available at the moment.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <PublicProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;
