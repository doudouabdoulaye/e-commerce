// src/components/ProductCard.tsx
import React from "react";
import type { Product } from "../types";

type ProductCardProps = {
  product: Product;
  onAddToCart: (product: Product) => void;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-40 object-cover rounded-md"
      />
      <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
      <p className="text-gray-600 text-sm mb-2">{product.description}</p>
      <p className="text-red-600 font-bold">
        {product.price.toLocaleString()} FCFA
      </p>
      <button
        onClick={() => onAddToCart(product)}
        className="mt-3 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
      >
        Ajouter au panier
      </button>
    </div>
  );
};

export default ProductCard;
