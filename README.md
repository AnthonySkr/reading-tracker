# 📚 Lecture Tracker

> Application web personnelle pour suivre ses lectures.

## 🎯 Objectif

Lecture Tracker permet d’ajouter, noter et commenter les œuvres lues sur des plateformes ou en physique.  
Les données sont sauvegardées localement (LocalStorage) avec possibilité d’export/import pour ne pas les perdre.

## ✨ Fonctionnalités

- ➕ Ajouter une fiction (titre, auteur, description, plateforme, lien)
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
                └── FictionForm.vue
                └── FictionList.vue
        └── main.ts
        └── 📁router
            └── index.ts
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

## 🗺️ Roadmap (à venir)

✅ Admin (ajout, modification, suppression)

✅ Page Lectures (consultation + notation/commentaire)

🔲 Export / import des données en JSON

🔲 Synchronisation multi-appareils (backend optionnel)

🔲 Déploiement (Netlify ou Vercel)

## 🧑‍💻 Auteur

AnthonySkr  
Projet inspiré par l’envie de mieux suivre mes lectures de fictions interactives.
