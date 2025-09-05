import React, { useState } from "react";
import type { Product } from "../types";
import ProductCard from "../compenents/ProductCard";
import Cart from "../compenents/Cart";

const ClientPage: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);

  const products: Product[] = [
    {
      id: 1,
      name: "Pain Baguette",
      description: "Délicieux pain croustillant",
      price: 250,
      imageUrl: "/images/baguette.jpg",
    },
    {
      id: 2,
      name: "Croissant",
      description: "Croissant au beurre, doré au four",
      price: 500,
      imageUrl: "/images/croissant.jpg",
    },
    {
      id: 3,
      name: "Gâteau Chocolat",
      description: "Gâteau fondant au chocolat noir",
      price: 3500,
      imageUrl: "/images/gateau.jpg",
    },
  ];

  const handleAddToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const handleRemoveFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Produits */}
      <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onAddToCart={handleAddToCart} />
        ))}
      </div>

      {/* Panier */}
      <div>
        <Cart cart={cart} onRemove={handleRemoveFromCart} />
      </div>
    </div>
  );
};

export default ClientPage;
