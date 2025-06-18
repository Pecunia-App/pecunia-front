# Bonnes pratiques : Quand utiliser `signal()` dans Angular 19

## Contexte

Angular a introduit depuis la version 16 une nouvelle API réactive avec `signal()`, `computed()` et `effect()`.


Cette API repose sur un modèle réactif **plus simple et plus prédictible que RxJS**, et s’inspire fortement des approches modernes de frameworks comme **SolidJS** ou **Vue Composition API**.

- `signal()` crée une **valeur réactive** locale, qui peut être lue et modifiée de manière déclarative.
- `computed()` permet de créer des **valeurs dérivées automatiquement**, recalculées dès qu'un `signal` utilisé change.
- `effect()` permet de **réagir aux changements d'un ou plusieurs signals**, un peu comme `subscribe()` avec RxJS, mais sans gestion de mémoire.

Contrairement à `@Input()` ou `@Output()`, cette API permet une **réactivité locale, fine et optimisée**, sans avoir recours à des observables ou des hooks de cycle de vie (`ngOnChanges`, `ngOnInit`, etc.).

Elle permet donc :
- d’écrire des composants **plus clairs, plus concis**
- de mieux **isoler l’état local**
- et de **réduire les effets de bord** dans le DOM ou dans le code

### Choix pour le projet

Nous avons choisi de l’utiliser **de manière ciblée dans Pecunia** :
- ✅ Pour les composants UI atomiques et réutilisables (`shared/`)
- ❌ En gardant les pratiques classiques (`@Input`, `FormGroup`, `Observable`) pour les pages, les services, les formulaires complexes

#### Pourquoi ce choix? 

- nous sommes sur Angular 19,
- nous utilisons exclusivement des `standalone components`,
- et cela rend notre code plus déclaratif, plus lisible et plus performant.

Cependant, **cette syntaxe est différente de celle vue en formation**. Ce document explique les différences et sert de **guide de transition** pour l’équipe.

---

## Approche classique vs signal

| Élément à gérer        | Syntaxe classique Angular (v14-)        | Avec `signal()` Angular 16+       |
|------------------------|-----------------------------------------|------------------------------------|
| Propriété d’entrée     | `@Input() name!: string;`               | `@Input() set name(val) { signal.set(val) }` |
| Lecture                | `this.name`                             | `this.name()`                      |
| Calcul dérivé          | Méthode ou `getter`                     | `computed(() => ...)`             |
| Réaction au changement | `ngOnChanges` ou `ngOnInit`             | `effect(() => ...)` (si besoin)   |

---

---

## Règle à retenir

> 🔒 On **réserve le pattern `signal` + setter `@Input()` + `computed()`** aux **composants UI atomiques dans `shared/`**.  
> ❌ On continue d’utiliser le modèle enseigné (`@Input`, `FormGroup`, `Observable`) pour tout le reste : composants métier, services, pages.

---

## Grille de décision

| Type de composant / fichier         | Utiliser `signal()` ? | Pourquoi ? |
|------------------------------------|------------------------|------------|
| ✅ `IconComponent`, `BadgeComponent`, `ButtonComponent` | **Oui** | UI réutilisables, avec des propriétés dynamiques (`name`, `size`, etc.) |
| ⚠️ `TransactionFormComponent`, `FilterPanelComponent`   | **Partiellement** | `FormGroup` pour les données, mais `signal()` pour du feedback local |
| ❌ `TransactionPageComponent`, `OverviewComponent`       | **Non** | Utilisation d’observables, router, services |
| ❌ Services Angular (`CategoryService`, `TagService`)    | **Non** | On reste sur `Observable`, `Subject`, etc. |
| ✅ `ThemeStore`, `UIStore` (si état local uniquement)    | **Oui** | Bon usage d’un `signal store` si pas besoin de RxJS |

---

## Exemples dans Pecunia

### Composant `IconComponent`

```ts
readonly name = signal<string>('');
@Input() set setName(value: string) { this.name.set(value); }

readonly iconPath = computed(() => `assets/icons/${this.name()}.svg`);
```

## À retenir

- `signal()` = parfait pour composants réactifs **sans logique métier**
- `computed()` = mieux que des `getter` pour des données dérivées
- Pour les formulaires, les pages et les services : **on reste sur les bases vues en cours**

---


##  Pour le dossier CDA

> Le projet Pecunia exploite les signaux Angular 16+ uniquement là où ils apportent une vraie valeur : composants UI réutilisables.  
> Cela permet une structure plus claire, un meilleur découplage et une scalabilité renforcée.  
> En revanche, les pages, services et formulaires restent sur des pratiques enseignées (RxJS, FormGroup, Observable), pour garantir la lisibilité et l’intégration en équipe.

---

