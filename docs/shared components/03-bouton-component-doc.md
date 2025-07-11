# Composant `<app-ui-button>`

## Description

Le composant `<app-ui-button>` centralise tous les usages de bouton de l’application :  
- Actions principales ou secondaires  
- Boutons de formulaire  
- Boutons “icon only” (accessibles)
- Variantes, tailles, arrondis, largeur

Il applique automatiquement les styles du Design System (tokens, radius, typographie, responsive…) et garantit l’accessibilité.

---

## Propriétés (props)

| Prop        | Type                         | Valeurs possibles                                                                                      | Default      | Description                                               |
|-------------|-----------------------------|-------------------------------------------------------------------------------------------------------|--------------|-----------------------------------------------------------|
| `variant`   | `string` (`VariantType`)     | `primary`, `secondary`, `alert`, `success`, `ghost`                                    | `primary`    | Style visuel du bouton (couleur, usage)                   |
| `type`      | `string` (`ButtonType`)      | `button`, `submit`, `reset`                                                                           | `button`     | Type natif HTML du bouton                                 |
| `size`      | `string` (`ButtonSize`)      | `medium`, `large`                                                                                     | `medium`     | Taille du bouton (padding et font-size adaptés)           |
| `radius`    | `string` (`ButtonRadius`)    | `medium`, `pill`                                                                                      | `medium`     | Rayon de bordure (arrondi standard ou pill = très arrondi)|
| `width`     | `string` (`ButtonWidth`)     | `auto`, `full`                                                                                       | `auto`       | Largeur auto (adaptée au contenu) ou block (100%)         | 
|`minWidth`  | `number \| string \| null`      | ex : `160`, `'10rem'`, `'60%'`, `null`                                       | `null`       | Largeur minimale du bouton (en px si number, ou unité CSS)        |
| `maxWidth`  | `number \| string \| null`      | ex : `320`, `'20rem'`, `'100%'`, `null`                                      | `null`       | Largeur maximale du bouton (en px si number, ou unité CSS)        |
| `disabled`  | `boolean`                   | `true`, `false`                                                                                       | `false`      | Désactive le bouton                                       |
| `ariaLabel` | `string`                    | – (libre, recommandé pour bouton icône seule)                                                         | –            | Label accessibilité, obligatoire pour “icon only”         |
| `buttonClick`| `EventEmitter<Event>` (output)| –                                                                                                | –            | Événement émis lors du clic                               |

---

### Détail des types :

#### `variant`
- `primary` : Bouton principal (bleu/DS)
- `secondary` : Bouton secondaire (neutre)
- `alert` : Bouton d’alerte (rouge/orange)
- `success` : Bouton de validation (vert)
- `ghost` : Fond transparent, contour coloré (pour actions secondaires)

#### `type`
- `button` : Bouton simple (défaut)
- `submit` : Pour validation de formulaire
- `reset` : Réinitialisation de formulaire

#### `size`
- `medium` : Par défaut (hauteur et padding standard)
- `large` : Plus grand, texte plus gros

#### `radius`
- `medium` : Arrondi standard (4px, 8px selon tokens)
- `pill` : Arrondi “capsule” (max, pour bouton très arrondi)

#### `width`
- `auto` : Largeur s’adapte au contenu (défaut)
- `full` : Largeur 100% du parent (responsive)

#### `min-width`
- `minWidth` : valeur numérique (ex: `160` pour `160px`) ou string avec unité CSS (`'10rem'`, `'60%'`).  
  Si non renseigné (`null`), aucune min-width n’est appliquée.

#### `max-width`
- `maxWidth` : valeur numérique (ex: `320` pour `320px`) ou string avec unité CSS (`'100%'`, `'20rem'`).  
  Si non renseigné (`null`), aucune max-width n’est appliquée.

---

## Exemples d’utilisation

### Bouton primaire (par défaut)
```html
<app-ui-button (buttonClick)="onValider()">
  Valider
</app-ui-button>
```

### Bouton secondaire, large, arrondi “pill”
```html
<app-ui-button
  variant="secondary"
  size="large"
  radius="pill"
  (buttonClick)="onRetour()"
>
  Retour
</app-ui-button>
```

### Bouton “alert” désactivé
```html
<app-ui-button
  variant="alert"
  [disabled]="true"
>
  Supprimer
</app-ui-button>
```

### Bouton “icon only” (accessibilité obligatoire)
```html
<app-ui-button
  variant="custom-icon"
  ariaLabel="Fermer la fenêtre"
  (buttonClick)="onClose()"
>
  <app-ui-icon name="x" size="md" [isDecorative]="false" />
</app-ui-button>
```

### Bouton ghost, block (100% largeur)
```html
<app-ui-button
  variant="ghost"
  width="block"
  (buttonClick)="onAction()"
>
  Action secondaire
</app-ui-button>
```

### Bouton avec min/max en pixels

```html
<app-ui-button [minWidth]="160" [maxWidth]="320">
  Confirmer
</app-ui-button>
```

### Bouton avec min/max responsive (en rem et %)

```html
<app-ui-button minWidth="10rem" maxWidth="80%">
  S'inscrire
</app-ui-button>
```

### Bouton full width dans un parent, avec min/max personnalisés

```html
<div style="width:400px;">
  <app-ui-button width="full" minWidth="200" maxWidth="360">
    Continuer
  </app-ui-button>
</div>
```
---

## Accessibilité : bonnes pratiques

- **Pas besoin d’`ariaLabel`** si le bouton a un texte visible.
- **Obligatoire de fournir `ariaLabel`** si bouton “icon only” (ou texte ambigu)
- Utilise le slot `<ng-content>` pour injecter texte, icônes, loader, etc.
- Ne jamais mettre de `<button>` à l’intérieur d’un `<app-ui-button>`.
