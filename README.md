# ember-cli-code-coverage-setup-codemod


A collection of codemods for ember-cli-code-coverage-setup-codemod.

## Usage

To run a specific codemod from this project, you would run the following:

```
npx ember-cli-code-coverage-setup-codemod <TRANSFORM NAME> path/of/files/ or/some**/*glob.js

# or

yarn global add ember-cli-code-coverage-setup-codemod
ember-cli-code-coverage-setup-codemod <TRANSFORM NAME> path/of/files/ or/some**/*glob.js
```

## Local Usage
```
node ./bin/cli.js <TRANSFORM NAME> path/of/files/ or/some**/*glob.js
```

## Transforms

<!--TRANSFORMS_START-->
* [setup-cli-build](transforms/setup-cli-build/README.md)
* [setup-test-helpers](transforms/setup-test-helpers/README.md)
<!--TRANSFORMS_END-->

## Contributing

### Installation

* clone the repo
* change into the repo directory
* `yarn`

### Running tests

* `yarn test`

### Update Documentation

* `yarn update-docs`