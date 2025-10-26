// panier.js

const { createApp } = Vue;

createApp({
  data() {
    return {
      panier: [] 
    };
  },

  computed: {
    totalPanier() {
      return this.panier.reduce((sum, item) => {
        const quantite = item.quantite || 0; 
        const prix = item.prix || 0;
        return sum + (prix * quantite);
      }, 0).toFixed(2); // .toFixed(2) pour formater en devise
    }
  },

  methods: {
    loadPanier() {
      const raw = localStorage.getItem('panier'); 
      this.panier = raw ? JSON.parse(raw) : [];
    },

    validerCommande() {
      localStorage.removeItem('panier');
      this.panier = [];
      alert('Payement effectué avec succès !');
      window.location.href = 'index.html';
    },

    retournerAccueil() {
      window.location.href = 'index.html';
    }
  },

  mounted() {
    this.loadPanier();
  }

}).mount('#cartApp');
