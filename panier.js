// panier.js (VERSION CORRIGÉE)

// Utilisation de la destructuration sur l'objet global Vue
const { createApp } = Vue;

createApp({
  data() {
    return {
      panier: [] // Sera chargé depuis localStorage
    };
  },

  computed: {
    // CORRECTION : Le total doit multiplier le prix par la quantité
    totalPanier() {
      return this.panier.reduce((sum, item) => {
        // || 0 est une sécurité si item.quantite est undefined (ce qui ne devrait plus arriver)
        const quantite = item.quantite || 0; 
        const prix = item.prix || 0;
        return sum + (prix * quantite);
      }, 0).toFixed(2); // .toFixed(2) pour formater en devise
    }
  },

  methods: {
    loadPanier() {
      // S'assurer que la clé 'panier' correspond à celle de pieces.js
      const raw = localStorage.getItem('panier'); 
      this.panier = raw ? JSON.parse(raw) : [];
    },

    // Valider : vider le panier et retourner à l'accueil
    validerCommande() {
      localStorage.removeItem('panier');
      this.panier = [];
      alert('Payement effectué avec succès !');
      window.location.href = 'index.html';
    },

    // Retourner à l'accueil sans vider le panier
    retournerAccueil() {
      window.location.href = 'index.html';
    }
  },

  mounted() {
    // Charger le panier dès que le composant est prêt
    this.loadPanier();
  }

}).mount('#cartApp');
