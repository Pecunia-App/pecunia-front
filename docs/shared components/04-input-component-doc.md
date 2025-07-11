# Composant `<app-ui-input>`

## Description

Le composant `<app-ui-input>` centralise tous les usages de champ texte du Design System :  
- Champ texte, email, mot de passe, number, tel, url  
- Prise en charge des labels, placeholders, état error/success, helper  
- Largeurs personnalisables (`full` ou `auto`, min/max)
- Slots pour icônes à gauche/droite  
- Compatible accessibilité (label, id, name, etc.)

---

## Typages

```typescript
export type inputType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'url';

export type inputStatus = 'error' | 'success' | null;

export type inputWidth = 'full' | 'auto';

export type inputMinWidth = number | string | null;

export type inputMaxWidth = number | string | null;
```

---

## Propriétés (`@Input`)

| Prop         | Type                            | Valeurs possibles                                  | Default     | Description                                         |
|--------------|---------------------------------|----------------------------------------------------|-------------|-----------------------------------------------------|
| `type`       | `inputType`                     | `'text'`, `'email'`, `'password'`, `'number'`, `'tel'`, `'url'` | `'text'`   | Type natif HTML de l’input                          |
| `label`      | `string`                        | –                                                  | `''`        | Label affiché au-dessus de l’input                  |
| `placeholder`| `string`                        | –                                                  | `''`        | Placeholder natif                                   |
| `value`      | `string`                        | –                                                  | `''`        | Valeur contrôlée du champ                           |
| `helper`     | `string`                        | –                                                  | `''`        | Message d’aide ou d’erreur sous le champ            |
| `status`     | `inputStatus`                   | `'error'`, `'success'`, `null`                     | `null`      | État visuel du champ                                |
| `width`      | `inputWidth`                    | `'auto'`, `'full'`                                 | `'auto'`    | Largeur du champ                                    |
| `minWidth`   | `inputMinWidth`                 | `number`, `string`, `null`                         | `null`      | Largeur minimale (ex: `200`, `'10rem'`)             |
| `maxWidth`   | `inputMaxWidth`                 | `number`, `string`, `null`                         | `null`      | Largeur maximale (ex: `392`, `'100%'`)              |
| `required`   | `boolean`                       | `true`, `false`                                    | `false`     | Champ obligatoire                                   |
| `disabled`   | `boolean`                       | `true`, `false`                                    | `false`     | Désactive le champ                                  |
| `name`       | `string`                        | –                                                  | `null`      | Attribut `name` natif                               |
| `id`         | `string`                        | –                                                  | `null`      | Attribut `id` natif                                 |
| `ariaLabel`  | `string \| null`                | –                                                  | `null`      | Label accessibilité alternatif (si pas de label)    |
| `ariaDescribedBy` | `string \| null`           | –                                                  | `null`      | Id de description pour l’accessibilité              |
| `overideClass`| `string`                       | –                                                  | `''`        | Classe(s) additionnelles                            |

---

## Événements (`@Output`)

| Event               | Type                   | Description                                         |
|---------------------|------------------------|-----------------------------------------------------|
| `InputValueChange`  | `EventEmitter<string>` | Émis à chaque modification de valeur                |
| `inputBlur`         | `EventEmitter<Event>`  | Émis à la perte de focus                            |
| `inputFocus`        | `EventEmitter<Event>`  | Émis à la prise de focus                            |

---

## Slots (ng-content)

- **Icône à gauche** : `<ng-content select="[icon-left]"></ng-content>`
- **Icône à droite** : `<ng-content select="[icon-right]"></ng-content>`

---

## Exemples d’utilisation

### Champ email avec icône

```html
<app-ui-input
  label="Email"
  placeholder="ex: xxx@xxx.com"
  width="full"
  [minWidth]="200"
  [maxWidth]="392"
  [required]="true"
  type="email"
  id="email-input"
  name="email"
>
  <app-ui-icon name="mail" icon-left />
</app-ui-input>
```

### Champ mot de passe avec icône à gauche

```html
<app-ui-input
  label="Mot de passe"
  placeholder="password"
  width="full"
  [minWidth]="200"
  [maxWidth]="392"
  [required]="true"
  type="password"
  id="password-input"
  name="password"
>
  <app-ui-icon name="lock" icon-left />
</app-ui-input>
```

### Champ en erreur (avec helper)

```html
<app-ui-input
  label="Prénom"
  placeholder="Prénom"
  width="full"
  [minWidth]="200"
  [maxWidth]="392"
  [required]="true"
  type="text"
  id="firstname-input"
  name="firstname"
  status="error"
  helper="3 caractères minimum, 1 majuscule, 1 minuscule, pas de chiffres ni de caractères spéciaux"
>
  <app-ui-icon name="user" icon-left />
</app-ui-input>
```

### Champ success + icône à droite

```html
<app-ui-input
  label="Nom de famille"
  placeholder="Nom de famille"
  width="full"
  [minWidth]="200"
  [maxWidth]="392"
  [required]="true"
  type="text"
  id="lastname-input"
  name="lastname"
  [status]="statusLastName"
>
  <app-ui-icon name="user" icon-left />
  @if (statusLastName === 'success') {
    <app-ui-icon name="check" icon-right />
  }
</app-ui-input>
```

---

## Bonnes pratiques

- **Toujours renseigner `label` OU `ariaLabel`** (jamais de champ sans label accessible)
- **Le parent gère l’état du champ (`status`)** selon la validation métier
- **Le composant est réactif et flexible** (émets les events, slots pour icônes)
- **Pour l’accessibilité** : tu pourras enrichir avec des props ARIA à mesure des besoins

---

## Compatibilité Angular Forms : pourquoi et comment ControlValueAccessor

### Pourquoi ?

Pour que `<app-ui-input>` soit **utilisable avec Angular Reactive Forms** (`formControlName`, etc.)  
— comme un `<input>` natif — il doit **implémenter l’interface `ControlValueAccessor`**.

Cela permet :
- de lier le composant à un `FormControl` ou `FormGroup`
- de synchroniser automatiquement la value, l’état disabled, les changements (input), etc.
- de faire en sorte qu’Angular puisse contrôler la value, l’état touched, etc.

---

### Comment ?

1. **on déclare que le composant implémente `ControlValueAccessor`**  
   et on ajoute le provider `NG_VALUE_ACCESSOR` dans le décorateur :

```typescript
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { forwardRef } from '@angular/core';

@Component({
  // ...
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputComponent),
    multi: true,
  }]
})
export class InputComponent implements ControlValueAccessor {
  // ...
}
```
- **`forwardRef`** permet à Angular d'utiliser la référence du composant même avant sa déclaration complète.
- **`multi: true`** permet à plusieurs valeurs d’être ajoutées à la même injection.

---

2. **Implémenter les méthodes de l’interface** dans le composant :

```typescript
// Pour transmettre les changements à Angular Forms
private onChange: (value: string | number) => void = () => { /* intentionally empty */ };

// Pour signaler à Angular que le champ a été “touché”
private onTouched: () => void = () => { /* intentionally empty */ };

// Synchronise la value externe (FormControl → composant)
writeValue(value: string | number): void {
  this._value.set(value ?? '');
}

// Enregistre le callback à appeler quand la value change (composant → FormControl)
registerOnChange(fn: (value: string | number) => void): void {
  this.onChange = fn;
}

// Enregistre le callback à appeler quand le champ est touché (blur, etc.)
registerOnTouched(fn: () => void): void {
  this.onTouched = fn;
}

// Gère l’état disabled transmis par Angular
setDisabledState(isDisabled: boolean): void {
  this._disabled.set(isDisabled);
}
```

- **`writeValue`** : appelée quand la value du FormControl change (ex : reset, patchValue…)
- **`registerOnChange`** : Angular injecte ici la fonction à appeler sur changement (input)
- **`registerOnTouched`** : Angular injecte ici la fonction à appeler quand l’input est “touché” (focus perdu)
- **`setDisabledState`** : Angular te notifie si le champ doit être désactivé

---

**Grâce à cette interface, le composant est 100% compatible Reactive Forms,  
et se comporte comme un `<input>` natif dans les formulaires.**
