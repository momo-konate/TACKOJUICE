import React, { createContext, useContext, useState } from 'react';

// Création du contexte du panier
const ContextePanier = createContext();

/**
 * Hook personnalisé pour utiliser le panier facilement dans les composants
 */
export const useCart = () => useContext(ContextePanier);

/**
 * Fournisseur du contexte qui enveloppe l'application
 */
export const CartProvider = ({ children }) => {
  const [panier, setPanier] = useState([]);
  const [estPanierOuvert, setEstPanierOuvert] = useState(false);

  /**
   * Ajouter un produit au panier
   */
  const ajouterAuPanier = (produit) => {
    setPanier(prevPanier => {
      const articleExistant = prevPanier.find(item => item.id === produit.id);
      if (articleExistant) {
        return prevPanier.map(item =>
          item.id === produit.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevPanier, { ...produit, quantity: 1 }];
    });
  };

  /**
   * Mettre à jour la quantité d'un article
   */
  const mettreAJourQuantite = (id, delta) => {
    setPanier(prevPanier => {
      return prevPanier.map(item => {
        if (item.id === id) {
          const nouvelleQtite = item.quantity + delta;
          return { ...item, quantity: nouvelleQtite > 0 ? nouvelleQtite : 1 };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  /**
   * Retirer complètement un article du panier
   */
  const retirerDuPanier = (id) => {
    setPanier(prevPanier => prevPanier.filter(item => item.id !== id));
  };

  // Calculs automatiques
  const totalCommande = panier.reduce((somme, item) => somme + (item.price * item.quantity), 0);
  const nombreArticles = panier.reduce((somme, item) => somme + item.quantity, 0);

  return (
    <ContextePanier.Provider value={{ 
      cart: panier, 
      addToCart: ajouterAuPanier, 
      updateQuantity: mettreAJourQuantite, 
      removeFromCart: retirerDuPanier, 
      total: totalCommande, 
      itemCount: nombreArticles,
      isCartOpen: estPanierOuvert,
      setIsCartOpen: setEstPanierOuvert
    }}>
      {children}
    </ContextePanier.Provider>
  );
};
