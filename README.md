# 🛒 TP 7 Vue.js - E-commerce Les Bonnes Pièces

## 📝 Auteurs du Projet

Ce projet a été réalisé dans le cadre du cours de Travaux Pratiques sur les Bases de Données et JavaScript (DBJS).

* **TSETSE Komla Edem Wilfried**
* **Maelainine Chaibatta**
* **Chafik Mouad**

---

## 🎯 Objectif et Contexte Technique

L'objectif de ce TP était de développer une application e-commerce pour la vente de pièces auto, en utilisant le framework **Vue.js** (version 3) via l'approche **CDN (Content Delivery Network)**. Le projet se concentre sur la maîtrise des fondamentaux de l'**Options API** et de la manipulation des données dynamiques.

### Architecture des Fichiers

| Fichier | Rôle | Technologie Clé |
| :--- | :--- | :--- |
| **`index.html` / `pieces.js`** | Catalogue et gestion des filtres. | Options API (`data`, `computed`), `fetch`, `v-model`, `v-for`. |
| **`panier.html` / `panier.js`** | Facturation et validation de la commande. | Lecture `localStorage`, `computed` pour le total. |
| **`pieces-autos.json`** | Source de données brutes du catalogue. | JSON (avec attributs `image` et `disponible`). |

---

## ⚙️ Logique Métier et Fonctionnalités

### 1. Gestion du Catalogue (`index.html` / `pieces.js`)

La logique métier du catalogue est centralisée dans la propriété calculée `piecesFiltreesTriees`, garantissant une mise à jour optimale de l'affichage à chaque changement de filtre ou de recherche.

* **Recherche en Temps Réel** : Le champ de recherche utilise `v-model` pour filtrer les résultats par le nom de la pièce.
* **Filtrage Interactif** : Les résultats peuvent être filtrés simultanément par **Catégorie** (via un `select`) et par **Disponibilité en stock** (via une checkbox `v-model="disponibleSeulement"`).
* **Tri des Pièces** : Le catalogue permet un tri **croissant** ou **décroissant** des prix.

### 2. Gestion du Panier et Persistance des Données

La gestion du panier est conçue pour être robuste et persister entre les pages :

* **Ajout Intégré des Quantités** : La méthode `ajouterAuPanier(piece)` vérifie si l'article existe dans le tableau `panier`.
    * Si oui, elle incrémente la propriété **`quantite`**.
    * Si non, elle ajoute l'article avec `quantite: 1`.
* **Compteur Dynamique** : Le bandeau d'en-tête affiche la **somme des quantités** de tous les articles (`quantiteTotalePanier`), et non le nombre d'articles uniques (`panier.length`).
* **Persistence (`localStorage`)** : Le panier est sauvegardé et restauré via **`localStorage`** à chaque modification et chargement de page. Cela permet le transfert transparent du panier de `index.html` à `panier.html`.

### 3. Facturation et Validation (`panier.html` / `panier.js`)

La page de paiement affiche un récapitulatif détaillé :

* **Affichage Détaillé** : Le tableau de facture affiche le **Prix Unitaire**, la **Quantité** de chaque article, et le **Sous-Total** (calculé par `prix * quantite`).
* **Total de la Commande** : La propriété calculée `totalPanier` effectue la somme totale de tous les sous-totaux.
* **Validation** : La fonction `validerCommande` supprime la clé `panier` du `localStorage` pour vider définitivement le panier après l'achat simulé.

---

## 🚀 Instructions de Démarrage

L'application doit être exécutée via un serveur web local pour des raisons de sécurité liées au chargement de fichiers locaux (`fetch('./pieces-autos.json')`).

1.  **Démarrer un serveur local** (ex: Live Server dans VS Code, ou `http-server`).
2.  Accéder à `http://127.0.0.1:xxxx/index.html`.

### 🚨 Débogage : Erreurs de `NaN`

Si des erreurs **`NaN`** apparaissent dans le panier, cela est dû à des données périmées dans votre navigateur. Pour corriger :

1.  Ouvrez les Outils de Développement (F12).
2.  Allez dans l'onglet **Application** > **Local Storage**.
3.  **Supprimez** l'entrée associée à la clé `'panier'` pour l'URL du projet, puis rechargez la page.