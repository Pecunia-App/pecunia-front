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
```

---

## 🔧 Fichier global `styles.scss`

```scss
@use './tokens/variables-light' as *;
@use './tokens/variables-desktop' as *;
@use './abstracts/breakpoints' as *;
@use './base/reset';
```

- Le `styles.scss` est déclaré dans `angular.json` pour être chargé globalement.
- Seuls les fichiers `light` et `desktop` sont inclus pour l'instant.

---

## 🎨 Exemple de tokens en usage

```scss
html,
body {
  margin: 0;
  padding: 0;
  background-color: $background-neutral-primary;
  color: $text-neutral-default;
  font-size: $typo-text-medium-font-size + px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
```

---

## 📊 Mixins et outils SCSS

### `abstracts/_breakpoints.scss`

```scss
$breakpoints: (
  mobile: 390px,
  tablet: 768px,
  desktop: 1024px,
);

@mixin mq($breakpoint) {
  $value: map-get($breakpoints, $breakpoint);
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

---

## 📅 Limitation temporaire (light/dark & desktop/mobile)

> ❌ Il n’est **pas encore possible** d’importer `light` & `dark` ou `desktop` & `mobile` en même temps :

### Pourquoi ?

- Tous les fichiers SCSS utilisent **les mêmes noms de variables** (ex: `$background-neutral-primary`) ➔ collision ✖
- Le scss `@use` n’autorise pas d’écrasement dynamique de variable sans surcharge explicite.

### 🔄 Solution prévue

- Utilisation de `[data-theme]` et `@media` pour charger dynamiquement `dark` ou `mobile`
- Factorisation avec des mixins ou une stratégie de theming CSS future

---

## 🚀 Prochaines étapes

- Intégrer le mode sombre (fichier `variables-dark.scss`)
- Utiliser les tokens `mobile` avec une stratégie responsive plus avancée
- Ajouter des fonctions SCSS utilitaires (ex: `toRem()`, `spacing()`, etc.)

---

📚 Ce fichier est maintenu dans `src/docs/scss-fondation.md` pour guider tous les devs front de l’équipe.

