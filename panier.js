// panier.js (VERSION FINALE CORRIGÉE ET FORMATÉE)

// Importation de la fonction createApp depuis Vue
const { createApp } = Vue;

createApp({
  data() {
    return {
      panier: [] // Contiendra les articles du panier (chargés depuis localStorage)
    };
  },

  computed: {
    // Calcul du total du panier
    totalPanier() {
      return this.panier
        .reduce((sum, item) => {
          const quantite = item.quantite || 0; // Sécurité
          const prix = item.prix || 0;
          return sum + (prix * quantite);
        }, 0)
        .toFixed(2); // Format avec 2 décimales
    }
  },

  methods: {
    // Charger le panier depuis le localStorage
    loadPanier() {
      const raw = localStorage.getItem('panier');
      this.panier = raw ? JSON.parse(raw) : [];
    },

    // Supprimer un article ou diminuer sa quantité
    supprimerDuPanier(index) {
      // Empêche la quantité de devenir négative
      if (this.panier[index].quantite > 1) {
        this.panier[index].quantite--;
      } else {
        // Si la quantité est 1 → supprime complètement l’article
        this.panier.splice(index, 1);
      }

      // Mise à jour du localStorage
      if (this.panier.length === 0) {
        localStorage.removeItem('panier');
      } else {
        localStorage.setItem('panier', JSON.stringify(this.panier));
      }
    },

    // Validation du paiement : vide le panier et retourne à l'accueil
    validerCommande() {
      localStorage.removeItem('panier');
      this.panier = [];
      alert('Paiement effectué avec succès !');
      window.location.href = 'index.html';
    },

    // Retour à l'accueil sans vider le panier
    retournerAccueil() {
      window.location.href = 'index.html';
    }
  },

  mounted() {
    // Chargement du panier dès le montage de l'application
    this.loadPanier();
  }

}).mount('#cartApp');
