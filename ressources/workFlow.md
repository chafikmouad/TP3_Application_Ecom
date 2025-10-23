
# TP Vue.js — E-commerce de pièces automobiles
## 🎯 Objectif :
Construire une application Vue.js qui affiche des pièces auto depuis un fichier JSON, avec recherche en temps réel, filtres (catégorie, disponibilité), tri par prix, et ajout au panier. Ces exigences proviennent de l’énoncé du TP.

```bash
ecom-cars/
├── index.html
├── script.js
├── pieces-autos.json
└── images/
    ├── img1.png
    ├── img2.png
    └── ... img25.png
```

##  Workflow de notre siteweb
1. A la création (dans `data()`) : il y a automatiquement création de:
    - items[{...}, {...}, ...] : contient nos éléments
    (autres fichiers qu'on pourrait ajouter avec le temps)
2. Parcourir et afficher les blocs:
    - les `items` sous forme de cards contenant les options (ajout/retrait au panier, le nombre d'items restants (ou en rupture de stock) et la catégorie affichée en haut) 
    - La barre de recherche + le filtre catégorie
    - Le logo du panier qui s'active lorsqu'il y a un ajout, en affichant les nombre d'éléments
    - Le boutton pour passer au payement (une nouvelle page, un nouveau composant)
3. Affichage de la nouvelle page contenant :
    - Le reçu du paiement (format `élément panier (prix unitaire MAD * nombre).... Prix total)
    - Le boutton pour `Valider le paiement` 
    - Le boutton pour `Retourner à la Homepage` 

⚠️ Deadline : __Jeudi 1.00 pm__