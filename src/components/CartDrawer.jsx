import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, MessageCircle } from 'lucide-react';
import { useCart as utiliserPanier } from '../context/CartContext';

/**
 * Composant de Panier (Tiroir coulissant depuis le bas)
 */
const PanierCoulissant = () => {
  const { 
    cart: panier, 
    updateQuantity: mettreAJourQuantite, 
    removeFromCart: retirerDuPanier, 
    total: totalCommande, 
    isCartOpen: estOuvert, 
    setIsCartOpen: setEstOuvert 
  } = utiliserPanier();

  // État pour les informations client
  const [client, setClient] = useState({ nom: '', telephone: '', adresse: '' });

  /**
   * Fonction pour envoyer la commande vers WhatsApp
   */
  const envoyerCommande = (e) => {
    e.preventDefault();
    if (panier.length === 0) return;

    const numeroProprietaire = "221785475695"; 
    let message = `*☕ COMMANDE TACKOJUICE PRO*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `👤 *Client:* ${client.nom}\n`;
    message += `📞 *Tél:* ${client.telephone}\n`;
    message += `📍 *Adresse:* ${client.adresse}\n\n`;
    message += `🛒 *DÉTAILS:* \n`;
    
    panier.forEach(article => {
      message += `• ${article.name} (x${article.quantity}) : ${article.price * article.quantity} FCFA\n`;
    });
    
    message += `\n💰 *MONTANT TOTAL: ${totalCommande.toLocaleString()} FCFA*`;
    
    // Ouvrir WhatsApp avec le message formaté
    window.open(`https://wa.me/${numeroProprietaire}?text=${encodeURIComponent(message)}`, '_blank');
  };

  // Calcul du nombre total de bouteilles pour la promotion
  const totalBouteilles = panier.reduce((acc, article) => acc + article.quantity, 0);

  return (
    <AnimatePresence>
      {estOuvert && (
        <>
          {/* Fond sombre cliquable pour fermer */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="overlay" 
            onClick={() => setEstOuvert(false)} 
          />
          
          {/* Conteneur principal du Panier */}
          <motion.div 
            initial={{ y: '100%' }} 
            animate={{ y: 0 }} 
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="pro-sheet-container"
          >
            <div className="pro-handle" />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', alignItems: 'center' }}>
                <h2 className="cart-title-premium">Votre Panier</h2>
                <X onClick={() => setEstOuvert(false)} style={{ opacity: 0.5, cursor: 'pointer' }} />
            </div>

            {/* Liste des articles dans le panier */}
            <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '24px' }}>
              {panier.length === 0 ? (
                <div className="empty-panier-msg">
                  <div style={{ fontSize: '3rem' }}>🛒</div>
                  <p>Votre panier est vide</p>
                </div>
              ) : (
                panier.map(article => (
                  <div key={article.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', padding: '12px', background: 'var(--border-subtle)', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ flex: 1 }}>
                      <h4 className="cart-item-name">{article.name}</h4>
                      <span className="cart-item-price">{article.price.toLocaleString()} FCFA</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(0,0,0,0.05)', padding: '6px 12px', borderRadius: '12px' }}>
                        <button style={{ background: 'none', border: 'none', color: 'var(--text-primary)', fontWeight: 700 }} onClick={() => mettreAJourQuantite(article.id, -1)}>-</button>
                        <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)' }}>{article.quantity}</span>
                        <button style={{ background: 'none', border: 'none', color: 'var(--text-primary)', fontWeight: 700 }} onClick={() => mettreAJourQuantite(article.id, 1)}>+</button>
                      </div>
                      <Trash2 size={18} color="var(--text-secondary)" onClick={() => retirerDuPanier(article.id)} style={{ cursor: 'pointer' }} />
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Message Promotion Livraison */}
            {panier.length > 0 && (
              <div style={{ 
                padding: '20px', 
                background: 'rgba(212, 175, 55, 0.08)', 
                borderRadius: '20px', 
                marginBottom: '24px',
                border: '1px solid rgba(212, 175, 55, 0.15)',
                textAlign: 'center'
              }}>
                {totalBouteilles >= 5 ? (
                  <p className="delivery-promo-text" style={{ color: 'var(--brand-gold)' }}>
                    ✨ <strong>Livraison GRATUITE</strong> <br/> activée pour votre Ndogou !
                  </p>
                ) : (
                  <p className="delivery-promo-text" style={{ color: 'var(--text-secondary)' }}>
                    Encore <strong>{5 - totalBouteilles}</strong> bouteilles pour la <br/><strong>livraison offerte</strong> !
                  </p>
                )}
              </div>
            )}

            {/* Formulaire de coordonnées client */}
            <form onSubmit={envoyerCommande}>
              <input 
                className="pro-input" 
                type="text" 
                placeholder="Prénom et Nom" 
                required 
                value={client.nom} 
                onChange={(e) => setClient({...client, nom: e.target.value})} 
              />
              <input 
                className="pro-input" 
                type="tel" 
                placeholder="Numéro WhatsApp" 
                required 
                value={client.telephone} 
                onChange={(e) => setClient({...client, telephone: e.target.value})} 
              />
              <input 
                className="pro-input" 
                type="text" 
                placeholder="Adresse de livraison" 
                required 
                value={client.adresse} 
                onChange={(e) => setClient({...client, adresse: e.target.value})} 
              />
              <button type="submit" className="pro-confirm-btn">
                <MessageCircle size={22} fill="white" />
                <span>Commander sur WhatsApp 📲</span>
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PanierCoulissant;
