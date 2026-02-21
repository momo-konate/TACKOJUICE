import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Bell, ArrowRight, Sun, Moon, Star } from 'lucide-react';
import { juiceData as donneesJus } from './data/juices';
import { useCart as utiliserPanier, CartProvider as FournisseurPanier } from './context/CartContext';
import PanierCoulissant from './components/CartDrawer';

/**
 * Composant pour afficher une carte de produit (Jus)
 */
const CarteJus = ({ jus }) => {
  const { addToCart: ajouterAuPanier } = utiliserPanier();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="pro-card"
    >
      {jus.id === 1 && <div className="bestseller-badge">Meilleure vente 🔥</div>}
      <div className="pro-card-img">
        <img src={jus.image} alt={jus.name} />
      </div>
      <div className="pro-card-info">
        <h3>{jus.name}</h3>
        <p>{jus.description}</p>
        <div className="pro-card-meta">
          <span className="pro-price">{jus.price.toLocaleString()} FCFA</span>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            className="pro-add-btn"
            onClick={() => ajouterAuPanier(jus)}
          >
            <Plus size={20} strokeWidth={2.5} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Contenu principal de l'application
 */
const ContenuApplication = () => {
  const { itemCount: nombreArticles, total: totalCommande, setIsCartOpen: ouvrirPanier } = utiliserPanier();
  const [estEnModeSombre, setEstEnModeSombre] = useState(true);
  const [affichePublicite, setAffichePublicite] = useState(true);
  
  return (
    <div className={`app-viewport ${estEnModeSombre ? 'dark-mode' : 'light-mode'}`}>
      {/* Fenêtre surgissante de bienvenue */}
      <AnimatePresence>
        {affichePublicite && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="popup-overlay"
          >
            <motion.div 
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              className="marketing-popup"
            >
              <button className="close-popup" onClick={() => setAffichePublicite(false)}>
                <X size={20} />
              </button>
              <div className="popup-icon">🧊🌙</div>
              <h2>Le Rafraîchissement Sacré</h2>
              <p>
                Après une longue journée de dévotion, offrez à votre corps la pureté d'un jus 100% naturel. 
                <strong> Bouye, Bissap ou Gingembre...</strong> Quel sera le compagnon de votre Ndogou ce soir ?
              </p>
              <button className="popup-cta" onClick={() => setAffichePublicite(false)}>
                VOIR NOTRE SÉLECTION
              </button>
              <p className="popup-footer">Livraison Express avant la rupture 🚀</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* En-tête de l'application */}
      <header className="pro-header">
        <div className="brand-id">
          <h2>Ramadan Mubarak</h2>
          <h1>TackoJuice</h1>
        </div>
        <motion.div 
          whileTap={{ scale: 0.9, rotate: 15 }}
          onClick={() => setEstEnModeSombre(!estEnModeSombre)}
          className="theme-toggle"
        >
          {estEnModeSombre ? <Sun size={20} color="#FFD700" /> : <Moon size={20} color="#D4AF37" />}
        </motion.div>
      </header>

      {/* Bandeau d'information (Ticker) */}
      <div className="pro-ticker">
        <Bell size={16} />
        <span>Livraison GRATUITE à partir de 5 bouteilles commandées ! 🚚</span>
      </div>

      {/* Barre de réassurance */}
      <div className="trust-bar">
        <div className="trust-item"><span>🌿</span> 100% Naturel</div>
        <div className="trust-item"><span>🚀</span> Livraison Express</div>
        <div className="trust-item"><span>⭐</span> Qualité Premium</div>
      </div>

      {/* Flux de produits */}
      <div className="product-feed">
        <div style={{ padding: '8px 0 16px' }}>
          <h3 className="section-title">
            {estEnModeSombre ? "L'Essentiel du Ndogou 🌙" : "Fraîcheur du Jour ☀️"}
          </h3>
          <p className="section-subtitle">
            {estEnModeSombre 
              ? "Préparez votre rupture avec le meilleur de la nature." 
              : "Le boost naturel pour votre journée."}
          </p>
        </div>

        {donneesJus.map(jus => (
          <CarteJus key={jus.id} jus={jus} />
        ))}
      </div>

      {/* Section Services & Entreprise */}
      <section className="pro-services-section">
        <div className="section-header-mini">
          <Star size={14} color="var(--brand-gold)" fill="var(--brand-gold)" />
          <span>Services Professionnels</span>
        </div>
        <h2 className="services-title">Au-delà de la Bouteille</h2>
        <p className="services-intro">
          TackoJuice accompagne vos moments les plus précieux avec le même engagement d'excellence et de naturel.
        </p>

        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">🎉</div>
            <h3>Événements</h3>
            <p>Mariages, Ndogous Corporate et réceptions privées. Nous créons des bars à jus sur mesure.</p>
          </div>
          <div className="service-card">
            <div className="service-icon">💼</div>
            <h3>Sur Mesure</h3>
            <p>Services personnalisés pour entreprises et abonnements hebdomadaires pour une cure de santé.</p>
          </div>
        </div>

        <motion.button 
          whileTap={{ scale: 0.95 }}
          className="service-cta"
          onClick={() => window.open('https://wa.me/221785475695?text=Bonjour, je souhaite un devis pour un événement.', '_blank')}
        >
          DEMANDER UN DEVIS ÉVÉNEMENT
        </motion.button>
      </section>

      {/* Barre de commande flottante */}
      <AnimatePresence>
        {nombreArticles > 0 && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            className="pro-floating-tab"
            onClick={() => ouvrirPanier(true)}
          >
            <div className="pro-tab-left">
              <span className="count-pill">{nombreArticles}</span>
              <span>Voir la commande</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="pro-total">{totalCommande.toLocaleString()} F</span>
              <ArrowRight size={20} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pied de page */}
      <footer className="pro-footer">
        <div className="footer-line" />
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <p className="footer-thanks">Djeureudieuf pour votre confiance.</p>
          <h2 className="footer-logo">TackoJuice</h2>
          <p className="footer-credo">La tradition préservée, la fraîcheur livrée.</p>
          <div className="footer-bottom">
            <span>&copy; {new Date().getFullYear()} TackoJuice. Édition Spéciale Ramadan.</span>
          </div>
        </div>
      </footer>

      <PanierCoulissant />
    </div>
  );
};

function App() {
  return (
    <FournisseurPanier>
      <ContenuApplication />
    </FournisseurPanier>
  );
}

export default App;
