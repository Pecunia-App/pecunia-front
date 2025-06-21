# 📘 SCSS Fondations – Design System Pecunia

## 🌟 Objectif

Mettre en place une base SCSS pour avoir des styles cohérents et faciles à maintenir dans Angular 19. On utilise des "Design Tokens" (variables globales) pour que tout soit centralisé.

---

## 📁 Arborescence SCSS

```
src/
└── styles/
    ├── styles.scss                # Entrée globale Angular
    ├── abstracts/
    │   └── _breakpoints.scss       # Mixin mq()
    ├── base/
    │   └── _reset.scss             # Reset CSS de base
    ├── tokens/
    │   ├── _variables-light.scss   # Thème clair
    │   ├── _variables-dark.scss    # Thème sombre (non utilisé pour l'instant)
    │   ├── _variables-desktop.scss # Tailles desktop
    │   └── _variables-mobile.scss  # Tailles mobile (non utilisé pour l'instant)
    └── themes/
        ├── _tokens.scss            # Fonctions `themed()` / `themed-block()`
        └── _tokens.map.scss        # Généré automatiquement (voir ci-dessous)
```

---

## 🔧 Fichier global `styles.scss`

```scss
@use './tokens/variables-light' as *;
@use './tokens/variables-desktop' as *;
@use './abstracts/breakpoints' as *;
@use './base/reset';
@use './themes/tokens' as theme;
```

Le fichier `styles.scss` est chargé globalement via `angular.json`.

Il contient :

- les variables light et desktop
- le reset CSS
- les mixins de breakpoints

⚠️ Les fonctions `themed()` et `themed-block()` ne sont pas chargées globalement.
Elles doivent être importées localement dans chaque composant qui utilise les thèmes :

```scss
@use '../../../styles/themes/tokens' as theme;
```

---

## 📊 Mixins et outils SCSS

### `abstracts/_breakpoints.scss`

```scss
@use 'sass:map';

$breakpoints: (
  mobile: 390px,
  tablet: 768px,
  desktop: 1024px,
);

@mixin mq($breakpoint) {
  $value: map.get($breakpoints, $breakpoint);
  @if $value {
    @media screen and (min-width: $value) {
      @content;
    }
  } @else {
    @warn "Breakpoint #{$breakpoint} non défini.";
  }
}
```

### 🔄 Exemple d’utilisation du mixin

```scss
h1 {
  font-size: 18px;

  @include mq(tablet) {
    font-size: 24px;
  }

  @include mq(desktop) {
    font-size: 32px;
  }
}
```

**Explication simplifiée**

Le mixin `mq` sert à écrire facilement des media-queries (pour adapter le style selon la taille d'écran).  
Au lieu de répéter les tailles partout, on utilise des noms comme `mobile`, `tablet`, `desktop`.  
Si on veut changer une taille, il suffit de modifier la map en haut du fichier.

Cela évite de recopier les mêmes valeurs partout (DRY) et chaque fichier a un rôle précis (S de SOLID).

---

## 🎭 Gestion des thèmes dynamiques (light/dark)

Le thème actif est appliqué via l’attribut `data-theme` sur la balise `<html>` :

```html
<html data-theme="light">
  ou
  <html data-theme="dark"></html>
</html>
```

Un système centralisé permet de faire correspondre un token logique à la bonne valeur du thème :

```scss
// styles/themes/tokens.scss
@use 'sass:map';
@use 'tokens.map' as tokens-map;

@function themed($key, $theme-name) {
  $entry: map.get(tokens-map.$tokens, $key);
  @if $entry == null {
    @return null;
  }
  $value: map.get($entry, $theme-name);
  @if $value == null {
    @return null;
  }
  @return $value;
}

@mixin themed-block($props-map) {
  @each $theme-name in $theme-names {
    :host-context([data-theme='#{$theme-name}']) & {
      @each $prop, $token in $props-map {
        #{$prop}: themed($token, $theme-name);
      }
    }
  }
}
```

**Explication simplifiée**

- `themed($key, $theme-name)` :  
  Cette fonction va chercher la bonne valeur d'une variable (token) selon le thème (clair ou sombre).  
  Exemple : si tu demandes la couleur de fond pour le thème "dark", elle te donne la bonne couleur.

- `themed-block($props-map)` :  
  Ce mixin applique plusieurs propriétés CSS selon le thème actif.  
  Tu lui donnes une liste de propriétés et il les applique automatiquement pour chaque thème.

- On utilise `:host-context([data-theme='#{$theme-name}'])` pour que le style change tout seul quand le thème change, sans toucher au code du composant.

- Ça évite de recopier la logique de thème partout (DRY) et chaque fonction/mixin a un but précis (S de SOLID).

---

### ✅ Exemple avec un bouton

```scss
@use '../../../styles/themes/tokens' as theme;
@use '../../../styles/tokens/variables-mobile' as *;

.btn-switch {
  //style classique
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;

  // application des variables issues des tokens sur les 2 thèmes
  // mixin themed-block à utiliser
  @include theme.themed-block(
    (
      background-color: 'background-primary-default',
      color: 'text-neutral-default-inverse',
    )
  );

  &:hover {
    @include theme.themed-block(
      (
        background-color: 'background-primary-hover',
      )
    );

    // 🎯 Application uniquement pour le light
    // utiliser fonction themed avec :host-context([data-theme='light'])
    :host-context([data-theme='light']) & {
      color: theme.themed('text-neutral-default', 'light');
    }
  }
}
```

---

## 🎯 Pourquoi cette organisation ?

- **Chaque fichier ou fonction a un rôle précis** (S de SOLID)
- **Tout est centralisé** : on ne répète pas les valeurs (DRY)
- **Facile à faire évoluer** : ajouter un thème ou changer une couleur est simple
- **Lisible** : tout le monde comprend où et comment utiliser les outils du design system

---
## 🔤 Gestion des polices – Open Sans

Nous utilisons **Open Sans** dans différentes variantes pour couvrir tous les styles du projet (Display, Heading, Text).

### 📦 Organisation des fichiers

les fichiers de polices sont placées dans le dossier [`src/assets/fonts`](/src/assets/fonts/)

les déclarations sont définies dans le dossier [`src/styles/fonts/_font-face.scss`](/src/styles/fonts/_font-face.scss)

Les variables typographiques (tailles, poids, interlignes) et la mixin utilitaire sont dans [`src/styles/abstracts/_typography.scss`](/src/styles/abstracts/_typography.scss)

### 🧱 Mixin typographique

```scss
@mixin text-style($size-key, $weight-key: regular, $mode: desktop) {
  $sizes: if($mode == desktop, $sizes-desktop, $sizes-mobile);

  font-family: $font-family-base;
  font-size: map.get($sizes, $size-key);
  line-height: map.get($sizes, $size-key);
  font-weight: map.get($font-weights, $weight-key);
}
```

Cette mixin permet d’appliquer une règle typographique complète (police, taille, interligne, poids) à partir de clés logiques comme `heading-h2`, `text-sm`, etc.

Le paramètre `$mode` permet de basculer dynamiquement entre mobile et desktop.  


les clés sont dans `typography.scss`


### ✅ Exemple d'utilisation d'une font
```scss

@use '../../../styles/abstracts/typography' as typo;

h2 {
  @include typo.text-style(heading-h2, extrabold, mobile);
}

``` 
Cet exemple applique :

- la police "Open Sans"
- une taille adaptée à un titre de niveau 2
- un poids fort (extrabold)
- un interligne cohérent avec la maquette


🔧 📋 Tâches SCSS & Design System à intégrer
🧩 1. Intégration des icônes Lucide (en local)
 Sélectionner ~50 icônes sur https://lucide.dev/icons

 Télécharger les SVG et les placer dans src/assets/icons/lucide/

 Vérifier que le dossier est bien référencé dans angular.json (section assets)

 Créer un composant Angular IconComponent réutilisable (input name, size, alt)

 Documenter l’usage dans la doc SCSS avec quelques exemples (trash, eye, arrow-right, etc.)

📐 2. Taille sans tokens + conversion px → rem
 Créer une fonction SCSS px-to-rem($px, $base: 10px)

 Appliquer dans typographies, paddings, margins (si besoin)

 Documenter dans la doc SCSS comment l’utiliser

🌫 3. Box-shadows
 Définir une échelle de shadows (sm, md, lg, xl) dans abstracts/_shadows.scss

 Créer un mixin apply-shadow($key)

 Ajouter un exemple visuel dans la doc

📦 4. Mixins utilitaires layout
 Ajouter un mixin flex-center (justify-content + align-items)

 Ajouter des mixins m/p-x/y/t/b($space) pour margin/padding par côté

 Ajouter un mixin container($max-width) pour wrapper

 Documenter avec usage dans la doc SCSS