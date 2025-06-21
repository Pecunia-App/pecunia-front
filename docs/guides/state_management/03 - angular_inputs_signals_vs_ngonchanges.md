
# Angular — Pattern Signal + Input + Computed vs `ngOnChanges`

## 1. Le pattern moderne : `signal + @Input + computed`

Ce pattern est idéal pour les composants réutilisables, simples et très réactifs, comme les **icônes, boutons, dropdowns**.

### 🔧 Exemple :

```ts
import { Component, Input, computed, signal } from '@angular/core';

@Component({
  selector: 'app-icon',
  template: `<i [class]="iconClass()"></i>`
})
export class IconComponent {
  private _name = signal('default');
  private _size = signal('md');

  @Input()
  set name(value: string) {
    this._name.set(value);
  }

  @Input()
  set size(value: string) {
    this._size.set(value);
  }

  readonly iconClass = computed(() => {
    return \`icon-\${this._name()} icon-size-\${this._size()}\`;
  });
}
```

### Avantages :
- Réactivité **automatique** sans `ngOnChanges`
- Code plus clair et déclaratif
- Pas de risque de fuite mémoire
- Pas de logique dans le template
- Très performant pour des composants UI

---

## 2. Le modèle classique : `@Input()` seul + `ngOnChanges`

Si tu utilises `@Input()` sans signal, alors **tu dois gérer manuellement les effets des changements**.

### Exemple :

```ts
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-greeting',
  template: `<p>{{ greeting }}</p>`
})
export class GreetingComponent implements OnChanges {
  @Input() name = '';
  greeting = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['name']) {
      this.greeting = \`Bonjour \${this.name}\`;
    }
  }
}
```

### Inconvénients :
- Plus verbeux
- Moins déclaratif
- Moins performant si utilisé massivement
- Besoin de `SimpleChanges` pour gérer les cas complexes

---

## Comparatif résumé

| Approche                          | Réactivité | Simplicité | Performance | Besoin de `ngOnChanges` |
|----------------------------------|------------|------------|-------------|---------------------------|
| `@Input()` seul                  | ❌ Manuelle| Moyenne    | Moyenne     | ✅ Oui                    |
| `signal()` + `@Input()` + `computed()` | ✅ Automatique | ✅ Haute     | ✅ Excellente | ❌ Non                   |

---

## Conclusion

Utiliser `signal()` avec `@Input()` et `computed()` te permet de créer des composants **plus déclaratifs, performants et faciles à maintenir**. La méthode `ngOnChanges` reste utile pour les cas où tu ne peux pas ou ne veux pas utiliser les `signals`.

