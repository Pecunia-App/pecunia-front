# Composant `IconComponent` – Documentation d’usage

## Objectif

Le composant `IconComponent` est un composant Angular **standalone**, conçu pour afficher des icônes SVG issues de la librairie **Lucide** (stockées en local dans `assets/icons/lucide/`).  
Il est utilisé dans le **design system Pecunia**, pour gérer toutes les icônes d’interface : boutons, menus, statuts, badges, etc.

---

## Définition

```ts
@Component({
  selector: 'app-icon',
  standalone: true,
  ...
})
export class IconComponent {
  @Input() set setName(value: string) { ... }
  @Input() set setSize(value: 'xs' | 'sm' | 'md' | 'lg') { ... }
  @Input() set setAlt(value: string) { ... }
  @Input() set setDecorative(value: boolean) { ... }
  @Input() set setColorClass(value: string) { ... } 
}
```

Ce composant est totalement **réactif** (via `signal()` et `computed()`), encapsulé, accessible et personnalisable.

---

## Propriétés disponibles (`@Input()`)

| Prop             | Type                         | Obligatoire | Description |
|------------------|------------------------------|-------------|-------------|
| `name`           | `string`                     | ✅ Oui      | Nom du fichier SVG (ex: `"plus"`, `"arrow-left"`) |
| `size`           | `'xs' | 'sm' | 'md' | 'lg'`  | ❌ Non      | Taille logique, applique une classe CSS (`icon-size-md` par défaut) |
| `alt`            | `string`                     | ❌ Non      | Texte alternatif (accessibilité), utilisé si `decorative = false` |
| `decorative`     | `boolean`                    | ❌ Non      | Si `true`, l’icône est masquée des lecteurs d’écran |

---

## Exemple simple

```html
<app-icon setName="plus" />
```

Affiche : l’icône `plus.svg` en taille `md`.

---

## Exemple complet avec accessibilité

```html
<app-icon setName="arrow-left" setSize="lg" setAlt="Retour à l'écran précédent" />
```

---

## Exemple dans un bouton

```html
<button class="btn">
  <app-icon setName="trash" setSize="sm" [setDecorative]="true" />
  Supprimer
</button>
```

---

## Cas d’usages typiques

- Icône seule dans un bouton d’action (delete, edit…)
- Icône dans une puce, un badge ou une ligne de tableau
- Icône décorative dans une UI (à cacher aux lecteurs d’écran)

---

## ♿ Bonnes pratiques accessibilité

- Si l’icône est **décorative** : `decorative="true"` ➜ appliquera `aria-hidden="true"` et un `alt` vide
- Si l’icône est **significative** : fournir un `alt` ou mettre l’`aria-label` sur le parent (`button`, `a`, etc.)
- Ne jamais laisser un `alt` automatique non contrôlé ➜ toujours documenter le sens ou masquer

###  Comment savoir si une icône est décorative ou informative ?

L’accessibilité impose de distinguer les **icônes décoratives** des **icônes informatives**, pour que les technologies d’assistance (lecteurs d’écran) puissent interpréter correctement l’interface.

---

#### Une icône est **décorative** si :

- Elle **n’ajoute aucune information** essentielle
- Elle accompagne un texte **déjà explicite**
- Elle est utilisée **uniquement pour améliorer l’esthétique**

#### Exemples :
- Un 🔒 à côté du mot « Connexion »
- Une icône 🛒 dans un bouton « Ajouter au panier »
- Un pictogramme 🎯 dans une carte qui a déjà un titre

➡️ **Accessibilité** :  
- `alt=""`
- `aria-hidden="true"`  
- ou dans Pecunia : `decorative="true"`

---

#### Une icône est **informative** si :

- Elle **remplace un texte**
- Elle **transmet une information** visuelle (état, action)
- Elle est **la seule information visible**

##### Exemples :
- Une 🗑 seule dans un bouton ➜ signifie "Supprimer"
- Une icône ❗ dans un message ➜ signifie "Erreur"
- Une 👁 dans un champ ➜ signifie "Afficher le mot de passe"

➡️ **Accessibilité** :  
- Fournir un `alt="Supprimer"`  
- ou mettre `aria-label="Supprimer"` sur le parent `<button>`

---

### Règle simple à retenir

> Si **l’icône peut être retirée sans perte d'information**, elle est **décorative**.  
> Sinon, elle est **informative** et doit être **accessible aux lecteurs d’écran**.

---

### Cas d’usage dans le `IconComponent`

| Situation                            | `alt`            | `decorative` |
|-------------------------------------|------------------|--------------|
| Icône seule dans un bouton          | `"Supprimer"`    | `false`      |
| Icône accompagnée d’un texte        | `""`             | `true`       |
| Icône de statut (succès, erreur…)   | `"Succès"`       | `false`      |
| Icône purement esthétique           | `""`             | `true`       |

---

#### ✅ Exemple correct

```html
<button aria-label="Supprimer la transaction">
  <app-icon setName="trash" [setDecorative]="false" />
</button>
```

#### ❌ Exemple incorrect

```html
<button>
  <app-icon setName="trash" />
</button>
<!-- L’icône est informative, mais pas d’accessibilité fournie -->
```

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
> - Héritage de couleur : Une icône avec mask-image peut hériter de la couleur du texte parent via currentColor, ce qui est  difficile avec des images SVG classiques.
> - Performance : Les masks CSS sont plus performants que les SVG injectés dans le DOM pour de nombreuses icônes.
> - Flexibilité : On peut changer la couleur dynamiquement sans modifier le fichier SVG source

#### Important : coloration pour les icônes sans texte
Pour les boutons ou éléments ne contenant que des icônes, il est impératif de définir la propriété CSS color dans le parent :

```html
<!-- Composant bouton icône sans texte -->
<button class="icon-only-button">
  <app-icon setName="trash" setAlt="Supprimer" />
</button>
```

```scss
// SCSS du composant parent
.icon-only-button {
  // IMPORTANT : définir la couleur même sans texte !
  @include theme.themed-block((
    color: 'text-neutral-default', // Couleur pour l'icône
  ));
}
```


## Pour le dossier CDA

> Le composant `IconComponent` respecte les principes du design system :
> - réutilisable, autonome, testable
> - conforme aux bonnes pratiques d’accessibilité
> - basé sur la nouvelle API Angular `signal()` / `computed()` pour plus de lisibilité
>
> Il est centralisé dans `shared/` et documenté pour permettre son adoption par l’ensemble de l’équipe.

