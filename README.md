# 📚 Lecture Tracker

> Application web personnelle pour suivre ses lectures.

## 🎯 Objectif

Lecture Tracker permet d’ajouter, noter et commenter les œuvres lues sur des plateformes ou en physique.  
Les données sont sauvegardées localement (LocalStorage) avec possibilité d’export/import pour ne pas les perdre.

## ✨ Fonctionnalités

- ➕ Ajouter une fiction (titre, auteur, description, plateforme, lien, lien cover)
- ✏️ Modifier une fiction
- 🗑️ Supprimer une fiction
- 📋 Consulter l’historique de lectures
- ⭐ Noter et commenter les lectures (à venir)
- 💾 Exporter / importer les données (à venir)

## 🛠️ Stack utilisée

- **Frontend** : Vue 3 + TypeScript + Vue Router
- **Styles** : SCSS
- **Persistence** : LocalStorage (backend optionnel prévu plus tard)

## 📂 Organisation

```
└── 📁reading-tracker
    └── 📁public
        └── book.ico
    └── 📁src
        └── App.vue
        └── 📁assets
            └── main.scss
        └── 📁components
            └── 📁admin
                └── FictionBackup.vue
                └── FictionForm.vue
                └── FictionList.vue
            └── 📁common
                └── NavButtons.vue
            └── 📁readings
                └── FictionCard.vue
        └── main.ts
        └── 📁router
            └── index.ts
        └── 📁types
            └── fiction.ts
        └── 📁utils
            └── storage.ts
        └── 📁views
            └── AdminView.vue
            └── ReadingsView.vue
    └── index.html
    └── README.md
```

## 🚀 Lancer le projet

### Prérequis

- [Node.js](https://nodejs.org/) ≥ v16 recommandé

### Installation

```bash
git clone https://github.com/AnthonySkr/reading-tracker.git
cd lecture-tracker
npm install
```

### Démarrage serveur de développement

```bash
npm run dev
```

L'application est accessible sur http://localhost:5173/

## 🗺️ Roadmap

### ✅ **MVP v0.1.0 (Terminé)**

✅ Ajouter des fictions via un formulaire.

✅ Lister les fictions dans l'interface admin.

✅ Modifier une fiction.

✅ Page de lecture : noter et commenter.

✅ Export des données en JSON.

✅ Déploiement sur Vercel.

---

### 🔵 **v1.0.0 - Améliorations visuelles**

🔲 Appliquer un style propre à l'interface admin.

🔲 Ajouter une modal pour noter et commenter.

🔲 Mettre en place une grille pour les cartes de fictions (aperçu rapide).

✅ Permettre l'ajout d'images de cover pour les fictions.

---

### 🟡 **v1.1.0 - Nouvelles fonctionnalités utilisateur**

🔲 Ajouter un statut de lecture : À lire, En cours, Terminé.

🔲 Ajouter un statut pour les fictions : Démo, WIP (Work In Progress), Terminé.

🔲 Filtrer les lectures par note, plateforme, auteur, etc.

🔲 Trier les lectures par note, date, etc.

---

### 🔵 **v1.2.0 - UI/UX et améliorations visuelles**

🔲 Ajouter un thème clair/sombre.

🔲 Rendre l'application responsive pour les mobiles.

🔲 Améliorer la typographie et les icônes.

🔲 Ajouter des animations légères pour les transitions.

---

### 🟡 **v1.3.0 - Fonctionnalités avancées utilisateur**

🔲 Catégoriser les fictions avec des étiquettes, tags, trilogies, suites, etc.

🔲 Permettre la création de listes personnalisées.

🔲 Ajouter une barre de recherche pour filtrer par titre ou auteur.

## 🧑‍💻 Auteur

AnthonySkr  
Projet inspiré par l’envie de mieux suivre mes lectures de fictions interactives.
