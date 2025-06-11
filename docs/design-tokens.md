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

tokens/
└── import/
├── primitives.json
├── colors.light.json
├── colors.dark.json
├── size.desktop.json
└── size.mobile.json
