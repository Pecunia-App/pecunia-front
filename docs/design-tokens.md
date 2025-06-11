# 🎨 Design Tokens – Intégration Figma → Angular

## 📌 Objectif

Ce document décrit le pipeline mis en place pour exploiter les **Design Tokens** définis dans Figma (couleurs, espacements, typographies, radius…) et les intégrer dans l'application Angular `pecunia-front` de manière automatisée, fiable et maintenable.

---

## 🔧 Outil de design utilisé

- **Figma** + plugin **[Variables Import/Export](https://www.figma.com/community/plugin/1254848311152928301/variables-import-export)**  
Ce plugin permet d'exporter toutes les variables Figma sous forme de fichiers JSON normalisés.

---

## 🧩 Architecture du système

- 🔁 **Source** : Figma (Variables Import/Export)
- 📄 **Format** : JSON (`primitives`, `colors.light`, `colors.dark`, `size.desktop`, `size.mobile`)
- ⚙️ **Transformation** : automatisée avec **Style Dictionary**
- 🎯 **Cible** : fichiers SCSS utilisables dans l’application Angular

---

## 📁 Dossier des tokens

Les fichiers exportés sont stockés dans :

```tree
tokens/
└── import/
    ├── primitives.json
    ├── colors.light.json
    ├── colors.dark.json
    ├── size.desktop.json
    └── size.mobile.json
```
## 🏗️ Pipeline de génération SCSS

Les fichiers SCSS sont générés automatiquement via Style Dictionary à l’aide du script suivant :

```tree
tokens/
└── build-tokens.js
```

### ▶️ Commande

```bash
npm run build-tokens
```

### 🎯 résultat attendu

```tree
 src/styles/tokens/
├── _variables-light.scss
├── _variables-dark.scss
├── _variables-desktop.scss
└── _variables-mobile.scss
```

### 🔍 Règle de filtrage
Les primitives (définies dans primitives.json) sont utilisées comme références ({color.gray.950}) mais ne sont pas exportées dans les SCSS.

Le filtre appliqué ignore les catégories suivantes :

color
spacing
border radius
typo
