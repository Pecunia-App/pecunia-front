# Composant `IconComponent` – Documentation d’usage

## Objectif

Le composant `IconComponent` est un composant Angular **standalone**, conçu pour afficher des icônes SVG issues de la librairie **Lucide** (stockées en local dans `assets/icons/lucide/`).  
Il est utilisé dans le **design system Pecunia**, pour gérer toutes les icônes d’interface : boutons, menus, statuts, badges, etc.

---

## Définition

```ts
export class IconComponent {
  private readonly http = inject(HttpClient);

  //déclaration des signaux => mini varialbles observables
  readonly _name = signal<string>('');
  readonly _size = signal<IconSize>('md');
  readonly _ariaLabel = signal<string>('');
  readonly _isDecorative = signal<boolean>(false);

  //setter pour mettre à jour les inputs avec des signaux
  @Input({ required: true }) set name(value: string) {
    this._name.set(value);
  }
  @Input() set size(value: IconSize) {
    this._size.set(value);
  }
  @Input() set ariaLabel(value: string) {
    this._ariaLabel.set(value);
  }
  @Input() set isDecorative(value: boolean) {
    this._isDecorative.set(value);
  }
```

Ce composant est totalement **réactif** (via `signal()` et `computed()`), encapsulé, accessible et personnalisable.

---

## Propriétés disponibles (`@Input()`)

| Prop         | Type                                    | Obligatoire | Description                                                                                   |
|--------------|-----------------------------------------|-------------|-----------------------------------------------------------------------------------------------|
| `name`       | `string`                                | ✅ Oui      | Nom du fichier SVG (ex: `"plus"`, `"arrow-left"`)                                             |
| `size`       | `'xs' \| 'sm' \| 'md' \| 'lg'`          | ❌ Non      | Taille logique, applique une classe CSS (`icon-size-md` par défaut)                           |
| `ariaLabel`        | `string`                                | ❌ Non      | Texte alternatif (accessibilité), utilisé si `isDecorative = false`                             |
| `isDecorative` | `boolean`                               | ❌ Non      | Si `true`, l’icône est masquée des lecteurs d’écran                                           |

---

## Cas d’usages typiques

- Icône seule dans un bouton d’action (delete, edit…)
- Icône dans une puce, un badge ou une ligne de tableau
- Icône décorative dans une UI (à cacher aux lecteurs d’écran)

---

## Icônes décoratives vs informatives

### Une icône est **décorative** si :
- Elle n'ajoute aucune information essentielle
- Elle accompagne un texte déjà explicite
- Elle est utilisée uniquement pour améliorer l'esthétique

**Exemples décoratifs :**
- Un 🔒 à côté du mot « Connexion »
- Une icône 🛒 dans un bouton « Ajouter au panier »
- Un pictogramme 🎯 dans une carte qui a déjà un titre

➡️ **Accessibilité** :
- Utiliser `[isDecorative]="true"` dans Pecunia (ce qui appliquera `aria-hidden="true"`)
- **Pas besoin** de `ariaLabel` pour les icônes décoratives

---

### Une icône est **informative** si :
- Elle remplace un texte
- Elle transmet une information visuelle (état, action)
- Elle est la seule information visible

**Exemples informatifs :**
- Une 🗑️ seule dans un bouton ➜ signifie "Supprimer"
- Une icône ❗ dans un message ➜ signifie "Erreur"
- Une 👁️ dans un champ ➜ signifie "Afficher le mot de passe"

➡️ **Accessibilité** :
- **Option 1** : Fournir un `ariaLabel="Description"` directement sur l'icône
- **Option 2** : Mettre `aria-label` sur l'élément parent (si l'icône est dans un élément interactif)

---

### 📝 **Règle simple à retenir**
> Si l'icône peut être retirée **sans perte d'information**, elle est décorative.  
> Sinon, elle est informative et doit être accessible aux lecteurs d'écran.


---

## Exemples concrets

- ✅ **Icône significative – Option 1** (label sur l’icône)

```html
<app-ui-icon name="trash" ariaLabel="Supprimer la transaction"></app-ui-icon>
```

- ✅ **Icône significative – Option 2** (label sur le parent)

```html
<button aria-label="Supprimer la transaction">
  <app-ui-icon name="trash" [isDecorative]="true"></app-ui-icon>
</button>
```
- ✅ **Icône décorative**

```html
<button>
  <app-ui-icon name="trash" [isDecorative]="true"></app-ui-icon>
  Supprimer la transaction
</button>
```

---

### Cas d’usage dans le `IconComponent`

| Situation                         | `aria label`  | `decorative` |
| --------------------------------- | ------------- | ------------ |
| Icône seule dans un bouton        | `"Supprimer"` | `false`      |
| Icône accompagnée d’un texte      | `""`          | `true`       |
| Icône de statut (succès, erreur…) | `"Succès"`    | `false`      |
| Icône purement esthétique         | `""`          | `true`       |


---

## Comment ça marche ?

Le composant :

- Résout le chemin SVG via un `computed()` :  
  `assets/icons/lucide/${name}.svg`
- Applique une classe de taille (`icon-size-md`, `icon-size-lg`, etc.)
- Réagit à une erreur de chargement avec un fallback (`alert-circle.svg`)

---

## Bonnes pratiques d'intégration

- Toujours utiliser ce composant plutôt que des balises `<img>` ou `<svg>` brutes
- Ne pas hardcoder le chemin de l’icône dans les composants parents
- Préférer les tailles logiques (`sm`, `md`, etc.) au lieu de fixer les pixels
- Respecter la séparation : le style (`.scss`) gère la taille réelle

---

## Gestion couleur de l'icon

L’icône est affichée via un `<span>` contenant une `mask-image` SVG.  
La couleur est appliquée via `background-color: currentColor` en CSS.

### Pourquoi utiliser mask-image au lieu de <img>?

> L'utilisation de mask-image offre plusieurs avantages importants :
>
> - Héritage de couleur : Une icône avec mask-image peut hériter de la couleur du texte parent via currentColor, ce qui est difficile avec des images SVG classiques.
> - Performance : Les masks CSS sont plus performants que les SVG injectés dans le DOM pour de nombreuses icônes.
> - Flexibilité : On peut changer la couleur dynamiquement sans modifier le fichier SVG source

#### Important : coloration pour les icônes sans texte

Pour les boutons ou éléments ne contenant que des icônes, il est impératif de définir la propriété CSS color dans le parent :

```html
<!-- Composant bouton icône sans texte -->
<button class="icon-only-button">
  <app-icon name="trash" ariaLabel="Supprimer" />
</button>
```

```scss
// SCSS du composant parent
.icon-only-button {
  // IMPORTANT : définir la couleur même sans texte !
  @include theme.themed-block(
    (
      color: 'text-neutral-default',
      // Couleur pour l'icône
    )
  );
}
```

## Pour le dossier CDA

> Le composant `IconComponent` respecte les principes du design system :
>
> - réutilisable, autonome, testable
> - conforme aux bonnes pratiques d’accessibilité
> - basé sur la nouvelle API Angular `signal()` / `computed()` pour plus de lisibilité
>
> Il est centralisé dans `shared/` et documenté pour permettre son adoption par l’ensemble de l’équipe.
