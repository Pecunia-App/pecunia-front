# Composant `<app-button>`

## Description

Le composant `<app-button>` centralise tous les usages de bouton de l’application :  
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

---

## Exemples d’utilisation

### Bouton primaire (par défaut)
```html
<app-button (buttonClick)="onValider()">
  Valider
</app-button>
```

### Bouton secondaire, large, arrondi “pill”
```html
<app-button
  variant="secondary"
  size="large"
  radius="pill"
  (buttonClick)="onRetour()"
>
  Retour
</app-button>
```

### Bouton “alert” désactivé
```html
<app-button
  variant="alert"
  [disabled]="true"
>
  Supprimer
</app-button>
```

### Bouton “icon only” (accessibilité obligatoire)
```html
<app-button
  variant="custom-icon"
  ariaLabel="Fermer la fenêtre"
  (buttonClick)="onClose()"
>
  <app-ui-icon name="x" size="md" [isDecorative]="false" />
</app-button>
```

### Bouton ghost, block (100% largeur)
```html
<app-button
  variant="ghost"
  width="block"
  (buttonClick)="onAction()"
>
  Action secondaire
</app-button>
```

---

## Accessibilité : bonnes pratiques

- **Pas besoin d’`ariaLabel`** si le bouton a un texte visible.
- **Obligatoire de fournir `ariaLabel`** si bouton “icon only” (ou texte ambigu)
- Utilise le slot `<ng-content>` pour injecter texte, icônes, loader, etc.
- Ne jamais mettre de `<button>` à l’intérieur d’un `<app-button>`.
