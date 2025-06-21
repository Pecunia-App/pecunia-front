
#  Paradigmes de gestion d'état en Angular : Signals vs Classes

##  1. Gestion d’état classique dans Angular (avant Signals)

En Angular traditionnel (pré-Signals), les composants sont **des classes** avec :

- Des **attributs d’état** (class fields).
- Du **templating** via interpolation et bindings (`{{ value }}`, `[prop]="value"`, `(event)`...).
- Et parfois des **observables RxJS** pour les flux de données.

### Exemple :

```ts
@Component({ ... })
export class MyComponent {
  count = 0;

  increment() {
    this.count++;
  }
}
```

####  Problème :
- L’Angular change detection (basée sur **Zone.js**) doit **scruter** les changements potentiels **partout** dans le template et la hiérarchie.
- Pour détecter un changement de `count`, Angular déclenche une **boucle de vérification** (digestion), typiquement à chaque `click`, `HTTP`, ou `setTimeout`.

> 👉 C’est une approche **pull-based** : Angular *vérifie* l’état pour savoir s’il a changé.

---

##  2. Les Signaux Angular (Angular v16+)

Les Signaux (`signal()`) sont une **abstraction réactive** qui permet de **déclarer l’état comme une source de données auto-réactive**.

### Exemple équivalent :

```ts
import { signal } from '@angular/core';

@Component({ ... })
export class MyComponent {
  count = signal(0);

  increment() {
    this.count.update(c => c + 1);
  }
}
```

### En template :
```html
<p>Count: {{ count() }}</p>
```

Remarque : `count()` lit la valeur du signal. Toute dépendance à `count()` est **automatiquement suivie**.

#### ✅ Ce qui change :
- **Aucune vérification globale** nécessaire.
- Seul le DOM ou le composant qui dépend de `count` est mis à jour.
- Angular **sait exactement quoi mettre à jour**, sans scruter toute l’arborescence.

>  C’est une approche **push-based** : le signal *pousse* la mise à jour aux endroits concernés.

---

## Push-based vs Pull-based — Résumé conceptuel

| Paradigme         | Pull-based                              | Push-based                                |
|-------------------|------------------------------------------|--------------------------------------------|
| **Déclenchement** | On **vérifie** si quelque chose a changé | Le changement **déclenche** une mise à jour |
| **Exemples**      | Zone.js, `@Input()` bindings, `ngOnChanges`, `ChangeDetectorRef.detectChanges()` | Signals, RxJS (partiellement), Observables |
| **Performance**   | Moins prévisible, dépend d’une boucle    | Haute performance, ciblé et réactif        |
| **Réactivité**    | Implicite, globale                       | Explicite, fine-grainée                    |
| **Modèle mental** | "Quelque chose a peut-être changé"       | "Je sais que *ça* a changé"                |

---

## Bonus : Signaux vs RxJS

Même si RxJS est aussi push-based, la principale différence est :

- RxJS = **asynchrone**, orienté **streams d'événements**
- Signals = **synchrone**, orienté **état actuel** (comparable à un `BehaviorSubject` readonly)

> En Angular moderne : **RxJS pour les flux** (ex: HTTP, websocket) + **Signals pour l’état local réactif** = combo idéal.

---

## En résumé

- Les **signaux Angular** changent fondamentalement la façon de penser l’état.
- On passe d’un modèle "passif" (je déclare un champ) à un modèle **réactif et auto-propagé**.
- Le passage du **pull au push** améliore :
  - ✅ les perfs (moins de vérifications inutiles),
  - ✅ la clarté du code (moins d’effets de bord),
  - ✅ la maintenabilité (les dépendances sont explicites).
