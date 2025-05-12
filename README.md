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

📂 reading-tracker
├── index.html
├── README.md
├── 📂 public
│ └── book.ico
├── 📂 src
│ ├── App.vue
│ ├── main.ts
│ ├── 📂 assets
│ │ └── main.scss
│ ├── 📂 components
│ │ └── 📂 admin
│ │ ├── FictionForm.vue
│ │ └── FictionList.vue
│ ├── 📂 router
│ │ └── index.ts
│ ├── 📂 views
│ ├── AdminView.vue
│ └── ReadingsView.vue

## 🚀 Lancer le projet

### Prérequis

- [Node.js](https://nodejs.org/) ≥ v16 recommandé

### Installation

```bash
git clone https://github.com/ton-pseudo/lecture-tracker.git
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

🔲 Page Lectures (consultation + notation/commentaire)

🔲 Export / import des données en JSON

🔲 Synchronisation multi-appareils (backend optionnel)

🔲 Déploiement (Netlify ou Vercel)

## 🧑‍💻 Auteur

Ton prénom (ou pseudo)  
Projet inspiré par l’envie de mieux suivre mes lectures de fictions interactives.
