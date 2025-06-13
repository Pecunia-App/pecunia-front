# 📘 SCSS Fondations – Design System Pecunia

## 🌟 Objectif

Mise en place du socle SCSS global pour exploiter les Design Tokens dans Angular 19. Ce socle garantit une cohérence de style, une facilité de maintenance et une base pour les composants standalone.

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

les variables light et desktop

le reset CSS

les mixins de breakpoints

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

**Explication**

Le mixin `mq` permet d’écrire des media-queries de façon centralisée et lisible, en utilisant des noms de breakpoints définis dans une map.
Cela évite la répétition des valeurs dans tout le code (DRY) et facilite la maintenance : il suffit de modifier la map pour changer tous les breakpoints du projet.
On respecte ainsi le principe S de SOLID (une seule responsabilité : gérer les media-queries) et on améliore la lisibilité et la robustesse des styles.

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
**Explication**

- `themed($key, $theme-name)` permet de récupérer dynamiquement la valeur d’un token pour un thème donné, ce qui évite la duplication de styles et centralise la logique de theming.
- `themed-block($props-map)` applique un ensemble de propriétés CSS selon le thème actif, ce qui rend le code SCSS plus DRY et maintenable.
- Respecte SOLID (S : chaque fonction/mixin a une responsabilité unique) et DRY (pas de duplication de logique dans chaque composant).
- L’utilisation de `:host-context([data-theme='#{$theme-name}'])` permet d’appliquer dynamiquement les styles à un composant Angular en fonction de l’attribut data-theme présent sur un parent (souvent html ou body).
Cela rend le composant réactif au changement de thème sans modifier son code, tout en gardant l’isolation des styles Angular.

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

- **Séparation des responsabilités** : chaque fichier/fonction/mixin a un rôle précis (S de SOLID).
- **Centralisation** : le mapping et les fonctions utilitaires évitent la duplication (DRY).
- **Scalabilité** : facile d’ajouter de nouveaux thèmes, tokens ou breakpoints.
- **Lisibilité** : chaque développeur comprend où et comment utiliser les outils du design system.

---

