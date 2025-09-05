import React from "react";
import type { Product } from "../types";

type CartProps = {
  cart: Product[];
  onRemove: (id: number) => void;
};

const Cart: React.FC<CartProps> = ({ cart, onRemove }) => {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">🛒 Mon Panier</h2>
      {cart.length === 0 ? (
        <p className="text-gray-600">Votre panier est vide.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center mb-2"
              >
                <span>{item.name}</span>
                <span>{item.price.toLocaleString()} FCFA</span>
                <button
                  onClick={() => onRemove(item.id)}
                  className="text-red-500 hover:underline"
                >
                  Retirer
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4 font-bold text-lg">
            Total: {total.toLocaleString()} FCFA
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
