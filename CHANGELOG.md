## 0.14.1 (2025-10-31)

### Fix

- **register-form**: change error handling fro first and lastnam ; add regexp matchin with api

## 0.14.0 (2025-10-29)

### Feat

- **e2e-login**: add e2e test on login
- **transactions**: implement delete methods for mock and api service
- **transactions**: implement delete transaction  modal (html, css, ts)
- **transactions**: implement update api call

## 0.13.0 (2025-10-24)

### Feat

- **wallet-form-component**: make the wallet form works
- **radio-group-component-test**: add five tests on the radio group component
- **add-radiogroup-component**: add radio component and it style
- **first-login**: add first login page. add the wallet form inside this page

### Fix

- **transaction-store**: when no transactions add an empty array

## 0.12.1 (2025-10-24)

### Fix

- **profile-form-files,-add-icon,-theme-switch**: change style page profil and add tests
- **user.service,-profile-form**: add possibility to change profil picture

### Refactor

- **form-utils**: replace native js alert with message component from ng-zorro

## 0.12.0 (2025-10-23)

### Feat

- **categories-parameters**: crud category

### Refactor

- **parameters**: decouple monolithic tab components

## 0.11.0 (2025-10-22)

### Feat

- **transactions**: add form in update page and implement data transaction loading
- **tag-provider-update**: updating working with modal
- **tag-provider-delete**: delete crud working
- **tag-provider-create**: create in parameters page are working
- **settings-page**: create settings page component
- **transactions**: test api create transactions
- **transactions**: update mock data and service to create transaction
- **transactions**: create-form implement error handling before submit
- **transactions**: create input to select tags for creation

## 0.10.0 (2025-10-18)

### Feat

- **transactions**: create input and modal to select a provider
- **transactions**: create imput and modal to select categories

## 0.9.0 (2025-10-15)

### Feat

- **providers**: implement source, services, store and resolver for get methods
- **tags**: implement source, services, store and resolver for get methods
- **categories**: implement resolver
- **transactions**: implement resolver and refactor components using one transaction
- **transactions**: refacto store to handle cache to reduce http request for transactions
- **transactions**: implement transactions-list resolver and clean list component
- **user-wallet**: implement resolver and provideAppInitializer

## 0.8.0 (2025-10-14)

### Feat

- **user**: create user store, integrate wallet and update transactions
- **category**: implement dto, mock, services and store for get methods
- **transaction**: create transaction detail page and handle routing

## 0.7.0 (2025-10-10)

### Feat

- **transactions**: setup mock data, api factory,store, ui to display all transactions

### Fix

- **transactions,layout**: correct pagination handling, mock data, and layout padding

## 0.6.0 (2025-09-26)

### Feat

- **menu-footer**: create mobile navigation
- **change-forms-model,-user.service-and-profile-form-component**: possibility to modify password
- **user.service.ts,-profile-form,-input.component,-auth.service**: show user informations+modify
- **profile-form-component-and-profile-page-component**: add profile-form and profile components
- **menu-header**: add focus-visible css
- **menu-header**: create dropdown user without BDD connection
- **menu-header**: create menu header without dropdown

### Fix

- **profile-and-profile-form.spec.ts-+profile-form.ts**: add providerHttpClient in spec.ts
- **icon**: remove httpclient to handle icon path

### Perf

- add dep to manage env variables ; lazy load route ; add env for testing

## 0.5.0 (2025-08-29)

### Feat

- **navigation**: create common layout and simutale menu position
- **angular-core-and-cli**: upgarde angular and angular cli from 19 to 20

## 0.4.0 (2025-08-29)

### Feat

- bind the front registration to the backend. Add a ng zorro sucess flash message
- **autService**: implement interceptor and guards
- **authService**: handle form error from api
- **authService**: create authService and login test
- add modal component with ng zorro
- **angular-core-and-cli**: upgarde angular and angular cli from 19 to 20

### Fix

- **authService**: fix review comments
- **authService**: delete test with api call and clean warning messages
- **angular.json**: increase the budget size application

## 0.3.0 (2025-07-18)

### Feat

- **register-page**: task 190 - create register form and tests
- **register-page**: task 190 - create forms util service + tests
- **login-apge**: task 179 - create link ui component with tests and doc
- **login-page**: task 170 - create tests for login form
- **login-page**: task 170 - create login form and link input value to form
- **Login-page**: task 169 - create component input with doc and test

### Fix

- **cd**: create script for deployment ; typo in docker login action

## 0.2.3 (2025-07-11)

### Fix

- **cd**: fix

## 0.2.2 (2025-07-11)

### Fix

- **cd**: fix dir change

## 0.2.1 (2025-07-11)

### Fix

- **cd**: change directory ; typo in docker login action

## 0.2.0 (2025-07-11)

### Feat

- **cd**: create env file for prod ; add GA for automatic deployment
- **fondation-scss**: task 164: homepage creation
- **fondation-scss**: task 163: add button documentation
- **fondation-css**: task 163: create button UI component
- **fondation-scss**: task 154 - implement utility mixins and update documentation
- **fondation-scss**: task 153 - implement icon ui (component, test, accessibility, doc)
- **fondation-scss**: task 152 - implement fonts and mixin - add documentation
- **fondation-scss**: task 151 structure to handle dark and light theming
- **fondation-scss**: task 150 - implement basic scss fondation + doc
- **tokens**: add style-dictionary, implement script to create scss variables and add documentation
- **tokens**: in json file change type to number to avoid manual task during token import
- **fondation-scss**: task 150 - implement basic scss fondation and start documentation
- **fondation-scss**: task 150 - create theme service and btn switch example

### Fix

- **ci**: fix indentation
- **fondation-scss**: task 153 : fix icon UI (naming props and update documentation)
- **fondation-scss**: task 152: fix scss variables and typo mixin including mobile mode
- **ci**: typo in bumpversion on action

### Refactor

- **deploy**: delete useless code
- **resetcss**: add some modern reset element ; modify others like margin/padding

## 0.1.0 (2025-06-13)

### Feat

- **docker**: create a Dockerfile with nginx as http-server to reduce image size
- **bumpversion**: add GithubAction to bump version when commits are push to main
- **tokens**: in json file change type to number to avoid manual task during token import
- **tokens**: add style-dictionary, implement script to create scss variables and add documentation
- **tokens**: import design token from figma and start readme documentation
- **linstaged**: add lint-staged package to lint only stages files
- **config**: add husky, commitlint, commitizen, angular-eslint and prettier

### Fix

- **ci**: add commitizen config to bump version with CI
- **bumpversion**: fix typo ci for bump version
