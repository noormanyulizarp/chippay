# Chipay Front End (React)

## Pipeline Status
[![pipeline status](https://gitlab.com/chip-internal/the-force/chip-pay-web/badges/master/pipeline.svg)](https://gitlab.com/chip-internal/the-force/chip-pay-web/commits/develop)

## Coverage Report
[![coverage report](https://gitlab.com/chip-internal/the-force/chip-pay-web/badges/master/coverage.svg)](https://gitlab.com/chip-internal/the-force/chip-pay-web/commits/develop)

## Project Setup

Take a deep breath, this will take a lifetime

`.gitlab-ci.yml`

```
stages:
  - test
  - lint

before_script:
  - yarn install

test:
  image: node:9-alpine
  stage: test
  script:
    - CI=true yarn test -- --coverage
  artifacts:
    paths:
      - coverage/

lint:
  image: chetankothari/js-pronto
  stage: lint
  script:
    - pronto run --exit-code -f gitlab -c origin/master
```

`.pronto_eslint_npm.yml`
```
eslint_executable: 'node_modules/.bin/eslint'
files_to_lint: '\.jsx?$'
```

`.pronto.yml`
```
gitlab:
  slug: <project-id>
  api_endpoint: https://gitlab.com/api/v4
```

You can find your `<project-id>` at `Settings > General > General project setttings`

Make the following changes to `package.json`
add

```
...
"jest": {
    "coverageReporters": ["text", "text-summary"],
    "collectCoverageFrom": [
      "src/js/**/*.{js,jsx}",
      "!src/setupTest.js"
    ]
}
...
```

Add the following regx to `Setting > CI/CD > General pipilines settings > Test coverage parsing`

`^Statements\s*:\s*([^%]+)`

Library:
```$xslt
- bootstrap: 4.0.0
- font-awesome": 4.7.0
- glyphicons-halflings": 1.9.1
- axios: 0.18.0,
- simple-global-store : 1.4.0-beta
- sweetalert2: 7.15.1
- validate.js: 0.12.0

```
Framework:
```
- react: 16.2.0
```