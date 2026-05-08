import React, { useState } from "react";
import { Heart, Star, Edit, Trash2 } from "lucide-react";

const ProductCard = ({
  id,
  image,
  title,
  price,
  originalPrice,
  rating,
  reviews,
  discount,
  onFavorite,
  onEdit,
  onDelete,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    onFavorite?.();
  };

  const handleEdit = () => {
    onEdit?.(id);
  };

  const handleDelete = () => {
    onDelete?.(id);
  };

  return (
    <div className="bg-white w-64 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      {/* Image Container */}
      <div className="relative h-64 bg-gray-200 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />

        {/* Discount Badge */}
        {discount && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            -{discount}%
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={handleFavorite}
          className="absolute top-3 left-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
        >
          <Heart
            size={20}
            className={
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
            }
          />
        </button>

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center gap-3">
          <button
            onClick={handleEdit}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-blue-700 flex items-center gap-2"
          >
            <Edit size={18} />
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-700 flex items-center gap-2"
          >
            <Trash2 size={18} />
            Delete
          </button>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2 h-10">
          {title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={
                  i < Math.floor(rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({reviews})</span>
        </div>

        {/* Price Container */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-bold text-gray-900">${price}</span>
          {originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ${originalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
