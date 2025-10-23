// pieces.js (VERSION CORRIGÉE)

const app = Vue.createApp({
  data() {
    return {
      pieces: [],
      recherche: "",
      categorieSelectionnee: "",
      disponibleSeulement: false, // Recommandé: mettre 'true' pour le filtre initial du TP
      tri: "",
      panier: [],
    };
  },
  created() {
    fetch('./pieces-autos.json')
      .then(response => {
        if (!response.ok) {
          console.error('Erreur HTTP:', response.statusText);
          throw new Error(`Erreur de chargement: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        this.pieces = data;
        console.log('Pièces chargées:', this.pieces.length);
      })
      .catch(error => {
        console.error('Erreur lors du chargement des pièces:', error);
      });
  },
  computed: {
    // catégories uniques pour le select
    categories() {
      return [...new Set(this.pieces.map(p => p.categorie))].sort();
    },
    piecesFiltreesTriees() {
      let resultat = this.pieces.slice();

      if (this.recherche) {
        const q = this.recherche.toLowerCase();
        resultat = resultat.filter(p => p.nom.toLowerCase().includes(q));
      }

      if (this.categorieSelectionnee) {
        resultat = resultat.filter(p => p.categorie === this.categorieSelectionnee);
      }

      if (this.disponibleSeulement) {
        resultat = resultat.filter(piece => piece.disponible === true);
      }

      if (this.tri === 'asc') {
        resultat.sort((a, b) => a.prix - b.prix);
      } else if (this.tri === 'desc') {
        resultat.sort((a, b) => b.prix - a.prix);
      }

      return resultat;
    },

    // CORRECTION : Déplacé à l'intérieur du bloc 'computed'
    quantiteTotalePanier() {
      // Calcule le nombre total d'articles (somme des quantités)
      return this.panier.reduce((sum, item) => sum + item.quantite, 0);
    }
  },

  methods: {
    // ajoute au panier et sauvegarde dans localStorage
    ajouterAuPanier(piece) {
      const itemExistant = this.panier.find(item => item.id === piece.id);

      if (itemExistant) {
        // Si elle existe, incrémenter la quantité
        itemExistant.quantite++;
      } else {
        // Si elle n'existe pas, l'ajouter avec quantité = 1
        this.panier.push({
          id: piece.id,
          nom: piece.nom,
          prix: piece.prix,
          quantite: 1
        });
      }
      this.savePanier();
    },

    // (Cette méthode n'est pas utilisée dans le panier.html, mais la logique est ici)
    retirerDuPanier(index) {
      this.panier.splice(index, 1);
      this.savePanier();
    },

    // sauvegarde dans localStorage
    savePanier() {
      localStorage.setItem('panier', JSON.stringify(this.panier));
    },

    loadPanier() {
      try {
        const raw = localStorage.getItem('panier');
        if (raw) {
          this.panier = JSON.parse(raw);
        } else this.panier = [];
      } catch (e) {
        console.error('Erreur lecture panier:', e);
        this.panier = [];
      }
    },

    openCart() {
      if (this.panier.length > 0) {
        window.location.href = 'panier.html';
      } else {
        // AMÉLIORATION : Informer l'utilisateur
        alert("Votre panier est vide. Veuillez ajouter des pièces.");
      }
    }
  },

  mounted() {
    this.loadPanier();
  }

}).mount('#app');