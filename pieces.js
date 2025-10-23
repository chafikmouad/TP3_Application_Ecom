const app = Vue.createApp({
   data() {
      return {
        pieces: [
        {
            "id": 1,
            "nom": "Batterie 12V",
            "prix": 120,
            "categorie": "Électricité",
            "image": "images/img1.png",
            "disponible": true
        },
        {
            "id": 2,
            "nom": "Filtre à huile",
            "prix": 15,
            "categorie": "Filtration",
            "image": "images/img2.png",
            "disponible": false
        },
        {
            "id": 3,
            "nom": "Bougies d'allumage (x4)",
            "prix": 35,
            "categorie": "Moteur",
            "image": "images/img3.png",
            "disponible": true
        },
        {
            "id": 4,
            "nom": "Disques de frein (x2)",
            "prix": 80,
            "categorie": "Freinage",
            "image": "images/img4.png",
            "disponible": true
        },
        {
            "id": 5,
            "nom": "Courroie de distribution",
            "prix": 90,
            "categorie": "Moteur",
            "image": "images/img5.png",
            "disponible": true
        },
        {
            "id": 6,
            "nom": "Pompe à eau",
            "prix": 70,
            "categorie": "Refroidissement",
            "image": "images/img6.png",
            "disponible": true
        },
        {
            "id": 7,
            "nom": "Amortisseurs arrière (x2)",
            "prix": 150,
            "categorie": "Suspension",
            "image": "images/img7.png",
            "disponible": false
        },
        {
            "id": 8,
            "nom": "Filtre à air",
            "prix": 20,
            "categorie": "Filtration",
            "image": "images/img8.png",
            "disponible": false
        },
        {
            "id": 9,
            "nom": "Capteur ABS",
            "prix": 50,
            "categorie": "Sécurité",
            "image": "images/img9.png",
            "disponible": true
        },
        {
            "id": 10,
            "nom": "Radiateur de refroidissement",
            "prix": 130,
            "categorie": "Refroidissement",
            "image": "images/img10.png",
            "disponible": true
        },
        {
            "id": 11,
            "nom": "Alternateur",
            "prix": 200,
            "categorie": "Électricité",
            "image": "images/img11.png",
            "disponible": false
        },
        {
            "id": 12,
            "nom": "Démarreur",
            "prix": 180,
            "categorie": "Électricité",
            "image": "images/img12.png",
            "disponible": false
        },
        {
            "id": 13,
            "nom": "Kit d'embrayage",
            "prix": 220,
            "categorie": "Transmission",
            "image": "images/img13.png",
            "disponible": true
        },
        {
            "id": 14,
            "nom": "Injecteur de carburant",
            "prix": 110,
            "categorie": "Moteur",
            "image": "images/img14.png",
            "disponible": false
        },
        {
            "id": 15,
            "nom": "Pompe à carburant",
            "prix": 90,
            "categorie": "Carburant",
            "image": "images/img15.png",
            "disponible": true
        },
        {
            "id": 16,
            "nom": "Capteur de pression des pneus (TPMS)",
            "prix": 45,
            "categorie": "Sécurité",
            "image": "images/img16.png",
            "disponible": true
        },
        {
            "id": 17,
            "nom": "Rétroviseur extérieur",
            "prix": 60,
            "categorie": "Carrosserie",
            "image": "images/img17.png",
            "disponible": false
        },
        {
            "id": 18,
            "nom": "Échappement complet",
            "prix": 250,
            "categorie": "Échappement",
            "image": "images/img18.png",
            "disponible": true
        },
        {
            "id": 19,
            "nom": "Vanne EGR",
            "prix": 140,
            "categorie": "Moteur",
            "image": "images/img19.png",
            "disponible": false
        },
        {
            "id": 20,
            "nom": "Turbo",
            "prix": 400,
            "categorie": "Moteur",
            "image": "images/img20.png",
            "disponible": false
        },
        {
            "id": 21,
            "nom": "Joint de culasse",
            "prix": 75,
            "categorie": "Moteur",
            "image": "images/img21.png",
            "disponible": true
        },
        {
            "id": 22,
            "nom": "Boîtier de direction",
            "prix": 300,
            "categorie": "Direction",
            "image": "images/img22.png",
            "disponible": true
        },
        {
            "id": 23,
            "nom": "Silent bloc de suspension",
            "prix": 35,
            "categorie": "Suspension",
            "image": "images/img23.png",
            "disponible": true
        },
        {
            "id": 24,
            "nom": "Cardan de transmission",
            "prix": 160,
            "categorie": "Transmission",
            "image": "images/img24.png",
            "disponible": true
        },
        {
            "id": 25,
            "nom": "Capteur de position vilebrequin",
            "prix": 50,
            "categorie": "Moteur",
            "image": "images/img25.png",
            "disponible": true
        }
        ]
        ,

        recherche: "",
        categorieSelectionnee: "",
        disponibleSeulement: false,
        tri: "",
        panier: [],
      };
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
        resultat.sort((a,b) => a.prix - b.prix);
      } else if (this.tri === 'desc') {
        resultat.sort((a,b) => b.prix - a.prix);
      }

      return resultat;
    },

      totalPanier() {
      return this.panier.reduce((sum, item) => sum + (item.prix || 0), 0);
    }
  },


    methods: {
    // ajoute au panier et sauvegarde dans localStorage
      ajouterAuPanier(piece) {
        // on peut stocker l'objet tel quel (ou une copie si on veut)
        this.panier.push({
          id: piece.id,
          nom: piece.nom,
          prix: piece.prix
        });
        this.savePanier();
      },

      // retire un item du panier (par index)
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
        
      }
    }
  },

    mounted() {
    // charger panier existant
    this.loadPanier();
  }

}).mount('#app');



