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
