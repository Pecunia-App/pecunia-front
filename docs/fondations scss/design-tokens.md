# 🎨 Design Tokens – Intégration Figma → Angular

## 📌 Objectif

Ce document explique comment importer et synchroniser les **Design Tokens** Figma (couleurs, espacements, typographies, radius…) dans l’application Angular `pecunia-front`, jusqu’à la génération du mapping SCSS, en gardant un process automatisé, fiable et maintenable.

---

## 🔧 Outil de design utilisé

- **Figma** + plugin **[Variables Import/Export](https://www.figma.com/community/plugin/1254848311152928301/variables-import-export)**  
  Ce plugin permet d’exporter toutes les variables Figma sous forme de fichiers JSON normalisés.

---

## 🧩 Pipeline d’import et de mapping

### 1. **Export Figma**

- Le designer exporte les variables Figma via le plugin, ce qui génère les fichiers JSON dans [`tokens/import`](../tokens/import/).

### 2. **Génération des SCSS et du mapping avec Style Dictionary**

- La commande suivante automatise la création des fichiers SCSS (un par thème ou plateforme) **et** du mapping SCSS :
  ```bash
  npm run build-color-token
  ```
- Cette commande fait tout le travail pour toi :

  - Elle transforme les fichiers JSON de Figma en fichiers SCSS utilisables dans Angular.
  - Elle crée un fichier de mapping ([`src/styles/themes/_tokens.map.scss`](/src/styles/themes/_tokens.map.scss)) qui relie chaque nom de variable à sa valeur pour chaque thème (clair/sombre).

- **Pourquoi faire comme ça ?**
  - Pour être sûr que les couleurs et autres variables sont toujours à jour entre Figma et le code.
  - Pour éviter de devoir tout refaire à la main à chaque changement.
  - Pour ne pas se tromper ou oublier une variable.

---

## 📁 Arborescence des tokens

**Fichiers exportés depuis Figma :**

```tree
tokens/
└── import/
    ├── primitives.json
    ├── colors.light.json
    ├── colors.dark.json
    ├── size.desktop.json
    └── size.mobile.json
```

**Fichiers générés pour Angular :**

```tree
src/styles/tokens/
├── _variables-light.scss
├── _variables-dark.scss
├── _variables-desktop.scss
└── _variables-mobile.scss
src/styles/themes/
└── _tokens.map.scss
```

---

## 🔄 Mise à jour des tokens Figma → Angular

**Étapes à suivre à chaque modification des tokens dans Figma :**

1. **Exporter les nouveaux JSON depuis Figma** dans [`tokens/import`](../tokens/import).
2. **Générer les SCSS et le mapping à jour** :
   ```bash
   npm run build-color-token
   ```
3. **Vérifier que les fichiers dans [`src/styles/tokens`](/src/styles/tokens) et [`src/styles/themes`](/src/styles/themes) sont bien à jour.**
4. **Relancer l’application Angular** si besoin.

---

### Exemple de token map générée

```scss
@use '../tokens/variables-light' as light;
@use '../tokens/variables-dark' as dark;

$tokens: (
  'background-neutral-primary': (
    light: light.$background-neutral-primary,
    dark: dark.$background-neutral-primary,
  ),
  'text-neutral-default': (
    light: light.$text-neutral-default,
    dark: dark.$text-neutral-default,
  ),
  // ...autres tokens
);
```

**Explication**

Ce mapping permet de retrouver la bonne valeur d'une variable (token) selon le thème (clair ou sombre).  
Exemple : si tu veux la couleur de fond pour le thème "dark", tu demandes `'background-neutral-primary'` et tu obtiens la bonne couleur pour "dark".

---

### Configuration dans `package.json`

```json
"scripts": {
  "build-tokens": "node scripts/build-tokens.mjs",
  "generate-token-map": "node scripts/generate-token-map.mjs",
  "build-color-tokens": "npm run build-tokens && npm run generate-token-map"
}
```

---

## 🎯 Pourquoi ce pipeline ?

- **Automatisation** : Moins d’erreurs humaines, process reproductible.
- **Cohérence** : Les tokens Figma sont la source de vérité, le code Angular reflète toujours le design.
- **Scalabilité** : Facile d’ajouter de nouveaux thèmes ou plateformes (ex : mobile/desktop).
- **DRY/SOLID** : Centralisation, factorisation, séparation des responsabilités.

---

## 📚 Résumé pédagogique

- **Chaque étape du pipeline a une responsabilité claire** (S de SOLID).
- **Le mapping évite la duplication** et permet de changer de thème dynamiquement sans toucher à tous les styles (DRY).
- **Les scripts automatisent la synchronisation** entre Figma et Angular, pour un design system robuste et maintenable.

---

