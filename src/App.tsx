// Fichier : App.tsx

import { useState } from 'react';

// Taux de conversion pour passer du dollar au Franc CFA
const USD_TO_XAF_RATE = 615;

// Mes données de produits, c'est mon "catalogue" de base.
const productData = [
  { id: 1, name: 'Ordinateur Portable', price: 1200, imageUrl: 'https://placehold.co/400x300/F0F9FF/222B44?text=Ordinateur+Portable', description: 'Un ordinateur puissant et élégant pour le travail et le jeu.' },
  { id: 2, name: 'Téléphone Intelligent', price: 800, imageUrl: 'https://placehold.co/400x300/ECFDF5/0A3D24?text=Telephone+Intelligent', description: 'Le dernier modèle avec une caméra de pointe et une batterie longue durée.' },
  { id: 3, name: 'Casque Audio Sans Fil', price: 150, imageUrl: 'https://placehold.co/400x300/FFF7ED/3C3529?text=Casque+Audio', description: 'Profitez d\'une qualité sonore exceptionnelle avec une connectivité sans fil.' },
  { id: 4, name: 'Montre Connectée', price: 250, imageUrl: 'https://placehold.co/400x300/F0F9FF/222B44?text=Montre+Connectee', description: 'Gardez une trace de votre santé et de vos notifications en un coup d\'œil.' },
];

// Types pour la structure des produits et des articles du panier.
type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
};

type CartItem = Product & { quantity: number };

// Le composant principal de l'application.
const App = () => {
  // Gestion de l'état : produits, panier, et vue actuelle (client ou admin).
  const [products, setProducts] = useState<Product[]>(productData);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [view, setView] = useState<'client' | 'admin'>('client');

  // Fonction pour ajouter un produit au panier.
  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      // Si le produit existe déjà, j'augmente la quantité.
      setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      // Sinon, je l'ajoute avec une quantité de 1.
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Fonction pour retirer un produit du panier.
  const removeFromCart = (productId: number) => {
    // Je retire l'article en filtrant le tableau.
    setCart(cart.filter(item => item.id !== productId));
  };

  // Logique pour les actions d'administrateur (ajouter/supprimer un produit).
  const handleAdminAction = (
    action: string,
    product: { name?: FormDataEntryValue | null; price?: number; imageUrl?: FormDataEntryValue | null; description?: FormDataEntryValue | null; id?: any; }
  ) => {
    if (action === 'add') {
      // Je crée un nouvel ID et j'ajoute le produit au catalogue.
      const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
      setProducts([
        ...products,
        {
          id: newId,
          name: (product.name ?? '').toString(),
          price: typeof product.price === 'number' ? product.price : 0,
          imageUrl: (product.imageUrl ?? '').toString(),
          description: (product.description ?? '').toString(),
        },
      ]);
    } else if (action === 'delete') {
      // Je supprime un produit du catalogue en le filtrant.
      setProducts(products.filter(p => p.id !== product.id));
    }
  };

  // Le rendu de la vue client, qui affiche le catalogue et le panier.
  const renderClientView = () => (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Catalogue de Produits</h1>
      {/* J'utilise une grille pour afficher chaque produit. */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105">
            <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover"/>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 text-sm mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                {/* J'affiche le prix en Francs CFA. */}
                <span className="text-2xl font-bold text-indigo-600">
                  {(product.price * USD_TO_XAF_RATE).toLocaleString('fr-FR')} FCFA
                </span>
                <button onClick={() => addToCart(product)} className="bg-indigo-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-indigo-700 transition-colors">
                  Ajouter au panier
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* La section du panier. */}
      <div className="mt-12 bg-gray-50 p-6 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Votre Panier</h2>
        {cart.length === 0 ? (
          <p className="text-center text-gray-500">Votre panier est vide.</p>
        ) : (
          <div>
            {/* Je parcours les articles du panier pour les afficher. */}
            {cart.map(item => (
              <div key={item.id} className="flex items-center justify-between bg-white rounded-lg p-4 mb-3 shadow-md">
                <div className="flex items-center space-x-4">
                  <img src={item.imageUrl} alt={item.name} className="w-12 h-12 rounded-lg object-cover"/>
                  <div>
                    <span className="font-semibold">{item.name}</span>
                    <span className="block text-sm text-gray-500">x {item.quantity}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="font-bold text-lg">
                    {((item.price * item.quantity) * USD_TO_XAF_RATE).toLocaleString('fr-FR')} FCFA
                  </span>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 transition-colors">
                    Retirer
                  </button>
                </div>
              </div>
            ))}
            <div className="text-right mt-6">
              {/* Le total du panier est calculé et affiché en FCFA. */}
              <span className="text-xl font-bold text-gray-800">
                Total: {(cart.reduce((total, item) => total + item.price * item.quantity, 0) * USD_TO_XAF_RATE).toLocaleString('fr-FR')} FCFA
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Le rendu de la vue administrateur.
  const renderAdminView = () => (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Tableau de bord Administrateur</h1>
      
      {/* Le formulaire pour ajouter un nouveau produit. */}
      <div className="bg-white p-6 rounded-2xl shadow-xl mb-8">
        <h2 className="text-xl font-bold mb-4">Ajouter un nouveau produit</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const newProduct = {
            name: formData.get('name'),
            price: parseFloat((formData.get('price') ?? '').toString()),
            imageUrl: formData.get('imageUrl'),
            description: formData.get('description'),
          };
          handleAdminAction('add', newProduct);
          (e.target as HTMLFormElement).reset();
        }} className="space-y-4">
          <input type="text" name="name" placeholder="Nom du produit" className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
          <input type="number" name="price" placeholder="Prix (en USD)" step="0.01" className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
          <input type="text" name="imageUrl" placeholder="URL de l'image" className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
          <textarea name="description" placeholder="Description du produit" rows={3} className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
          <button type="submit" className="bg-green-500 text-white w-full py-3 rounded-full font-bold shadow-lg hover:bg-green-600 transition-colors">Ajouter le produit</button>
        </form>
      </div>

      {/* La liste des produits existants avec un bouton pour les supprimer. */}
      <div className="bg-white p-6 rounded-2xl shadow-xl">
        <h2 className="text-xl font-bold mb-4">Liste des produits</h2>
        <div className="space-y-4">
          {products.map(product => (
            <div key={product.id} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm">
              <div className="flex items-center space-x-4">
                <img src={product.imageUrl} alt={product.name} className="w-16 h-16 rounded-lg object-cover" />
                <div>
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-gray-600">{(product.price * USD_TO_XAF_RATE).toLocaleString('fr-FR')} FCFA</p>
                </div>
              </div>
              <button onClick={() => handleAdminAction('delete', product)} className="bg-red-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-red-600 transition-colors">
                Supprimer
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Le rendu final de mon composant.
  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800">
      {/* Barre de navigation pour basculer entre les vues client et admin. */}
      <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-indigo-600">AL-MOHANDIS E-COMMERCE</h1>
        <div className="space-x-4">
          <button
            onClick={() => setView('client')}
            className={`px-4 py-2 rounded-full font-bold transition-colors ${view === 'client' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
          >
            Vue Client
          </button>
          <button
            onClick={() => setView('admin')}
            className={`px-4 py-2 rounded-full font-bold transition-colors ${view === 'admin' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
          >
            Vue Admin
          </button>
        </div>
      </nav>

      {/* Affichage conditionnel de la vue appropriée. */}
      {view === 'client' ? renderClientView() : renderAdminView()}
    </div>
  );
};

export default App;