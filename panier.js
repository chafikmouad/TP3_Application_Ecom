// cart.js
const { createApp } = Vue;

createApp({
  data() {
    return {
      panier: []
    };
  },

  computed: {
    totalPanier() {
      return this.panier.reduce((sum, item) => sum + (item.prix || 0), 0);
    }
  },

  methods: {
    loadPanier() {
        const raw = localStorage.getItem('panier');
        this.panier = raw ? JSON.parse(raw) : [];
    },

    // Valider : vider le panier et retourner à l'accueil
    validerCommande() {
      // ici on simule validation, on réinitialise le panier
      localStorage.removeItem('panier');
      this.panier = [];
      // redirection vers index.html
      alert('Payement effectué avec succès !')
      window.location.href = 'index.html';
    },

    // Retourner à l'accueil sans vider le panier
    retournerAccueil() {
      window.location.href = 'index.html';
    }
  },

  mounted() {
    this.loadPanier();
  }

}).mount('#cartApp');
