# setup-test-helpers


## Usage

```
npx ember-cli-code-coverage-setup-codemod setup-test-helpers path/of/files/ or/some**/*glob.js

# or

yarn global add ember-cli-code-coverage-setup-codemod
ember-cli-code-coverage-setup-codemod setup-test-helpers path/of/files/ or/some**/*glob.js
```

## Local Usage
```
node ./bin/cli.js setup-test-helpers path/of/files/ or/some**/*glob.js
```

## Input / Output

<!--FIXTURES_TOC_START-->
* [test-already-setup](#test-already-setup)
* [test-with-has-qunit-done](#test-with-has-qunit-done)
* [test-with-no-qunit-done](#test-with-no-qunit-done)
<!--FIXTURES_TOC_END-->

<!--FIXTURES_CONTENT_START-->
---
<a id="test-already-setup">**test-already-setup**</a>

**Input** (<small>[test-already-setup.input.js](transforms/setup-test-helpers/__testfixtures__/test-already-setup.input.js)</small>):
```js
import { forceModulesToBeLoaded, sendCoverage } from 'ember-cli-code-coverage/test-support';
import QUnit from 'qunit';

setup(QUnit.assert);

QUnit.done(async function() {
  forceModulesToBeLoaded();
  await sendCoverage();
});

```

**Output** (<small>[test-already-setup.output.js](transforms/setup-test-helpers/__testfixtures__/test-already-setup.output.js)</small>):
```js
import { forceModulesToBeLoaded, sendCoverage } from 'ember-cli-code-coverage/test-support';
import QUnit from 'qunit';

setup(QUnit.assert);

QUnit.done(async function() {
  forceModulesToBeLoaded();
  await sendCoverage();
});

```
---
<a id="test-with-has-qunit-done">**test-with-has-qunit-done**</a>

**Input** (<small>[test-with-has-qunit-done.input.js](transforms/setup-test-helpers/__testfixtures__/test-with-has-qunit-done.input.js)</small>):
```js
import QUnit from 'qunit';

setup(QUnit.assert);

QUnit.done(async function onDone() {
  console.log(
    'Total: ' + details.total + ' Failed: ' + details.failed +
    ' Passed: ' + details.passed + ' Runtime: ' + details.runtime
  );
});

```

**Output** (<small>[test-with-has-qunit-done.output.js](transforms/setup-test-helpers/__testfixtures__/test-with-has-qunit-done.output.js)</small>):
```js
import { forceModulesToBeLoaded, sendCoverage } from 'ember-cli-code-coverage/test-support';
import QUnit from 'qunit';

setup(QUnit.assert);

QUnit.done(async function onDone() {
  console.log(
    'Total: ' + details.total + ' Failed: ' + details.failed +
    ' Passed: ' + details.passed + ' Runtime: ' + details.runtime
  );
  forceModulesToBeLoaded();
  await sendCoverage();
});

```
---
<a id="test-with-no-qunit-done">**test-with-no-qunit-done**</a>

**Input** (<small>[test-with-no-qunit-done.input.js](transforms/setup-test-helpers/__testfixtures__/test-with-no-qunit-done.input.js)</small>):
```js
import QUnit from 'qunit';

setup(QUnit.assert);


```

**Output** (<small>[test-with-no-qunit-done.output.js](transforms/setup-test-helpers/__testfixtures__/test-with-no-qunit-done.output.js)</small>):
```js
import { forceModulesToBeLoaded, sendCoverage } from 'ember-cli-code-coverage/test-support';
import QUnit from 'qunit';

setup(QUnit.assert);

QUnit.done(async function onDone() {
  forceModulesToBeLoaded();
  await sendCoverage();
});

```
<!--FIXTURES_CONTENT_END-->