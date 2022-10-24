# setup-cli-build


## Usage

```
npx ember-cli-code-coverage-setup-codemod setup-cli-build path/of/files/ or/some**/*glob.js

# or

yarn global add ember-cli-code-coverage-setup-codemod
ember-cli-code-coverage-setup-codemod setup-cli-build path/of/files/ or/some**/*glob.js
```

## Local Usage
```
node ./bin/cli.js setup-cli-build path/of/files/ or/some**/*glob.js
```

## Input / Output

<!--FIXTURES_TOC_START-->
* [test-already-setup](#test-already-setup)
* [test-with-babel-property](#test-with-babel-property)
* [test-with-individual-options](#test-with-individual-options)
* [test-with-plugin-property](#test-with-plugin-property)
* [test-without-babel-property](#test-without-babel-property)
<!--FIXTURES_TOC_END-->

<!--FIXTURES_CONTENT_START-->
---
<a id="test-already-setup">**test-already-setup**</a>

**Input** (<small>[test-already-setup.input.js](transforms/setup-cli-build/__testfixtures__/test-already-setup.input.js)</small>):
```js
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const codeCoverage = require('ember-cli-code-coverage');


module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    babel: {
      plugins: [
        ...codeCoverage.buildBabelPlugin({ embroider: !!process.env.EMBROIDER })
      ],
    },
  });

  // additional configuration

  return app.toTree();
};

```

**Output** (<small>[test-already-setup.output.js](transforms/setup-cli-build/__testfixtures__/test-already-setup.output.js)</small>):
```js
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const codeCoverage = require('ember-cli-code-coverage');


module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    babel: {
      plugins: [
        ...codeCoverage.buildBabelPlugin({ embroider: !!process.env.EMBROIDER })
      ],
    },
  });

  // additional configuration

  return app.toTree();
};

```
---
<a id="test-with-babel-property">**test-with-babel-property**</a>

**Input** (<small>[test-with-babel-property.input.js](transforms/setup-cli-build/__testfixtures__/test-with-babel-property.input.js)</small>):
```js
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');


module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    babel: {},
  });

  // additional configuration

  return app.toTree();
};

```

**Output** (<small>[test-with-babel-property.output.js](transforms/setup-cli-build/__testfixtures__/test-with-babel-property.output.js)</small>):
```js
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');


module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    babel: {
      plugins: [...require('ember-cli-code-coverage').buildBabelPlugin({
        embroider: !!process.env.EMBROIDER,
      })],
    },
  });

  // additional configuration

  return app.toTree();
};

```
---
<a id="test-with-individual-options">**test-with-individual-options**</a>

**Input** (<small>[test-with-individual-options.input.js](transforms/setup-cli-build/__testfixtures__/test-with-individual-options.input.js)</small>):
```js
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');


module.exports = function (defaults) {
  const options = {
    emberHighCharts: {
      includeHighCharts: true,
      includeHighStock: false,
      includeHighChartsMore: true,
      includeHighCharts3D: true,
      includeModules: ['solid-gauge'],
    },
  }

  let app = new EmberApp(defaults, options);

  // additional configuration

  return app.toTree();
};

```

**Output** (<small>[test-with-individual-options.output.js](transforms/setup-cli-build/__testfixtures__/test-with-individual-options.output.js)</small>):
```js
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');


module.exports = function (defaults) {
  const options = {
    emberHighCharts: {
      includeHighCharts: true,
      includeHighStock: false,
      includeHighChartsMore: true,
      includeHighCharts3D: true,
      includeModules: ['solid-gauge'],
    },

    babel: {
      plugins: [...require('ember-cli-code-coverage').buildBabelPlugin({
        embroider: !!process.env.EMBROIDER,
      })],
    },
  }

  let app = new EmberApp(defaults, options);

  // additional configuration

  return app.toTree();
};

```
---
<a id="test-with-plugin-property">**test-with-plugin-property**</a>

**Input** (<small>[test-with-plugin-property.input.js](transforms/setup-cli-build/__testfixtures__/test-with-plugin-property.input.js)</small>):
```js
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');


module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    babel: {
      plugins: [],
    },
  });

  // additional configuration

  return app.toTree();
};

```

**Output** (<small>[test-with-plugin-property.output.js](transforms/setup-cli-build/__testfixtures__/test-with-plugin-property.output.js)</small>):
```js
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');


module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    babel: {
      plugins: [...require('ember-cli-code-coverage').buildBabelPlugin({
        embroider: !!process.env.EMBROIDER,
      })],
    },
  });

  // additional configuration

  return app.toTree();
};

```
---
<a id="test-without-babel-property">**test-without-babel-property**</a>

**Input** (<small>[test-without-babel-property.input.js](transforms/setup-cli-build/__testfixtures__/test-without-babel-property.input.js)</small>):
```js
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');


module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    emberHighCharts: {
      includeHighCharts: true,
      includeHighStock: false,
      includeHighChartsMore: true,
      includeHighCharts3D: true,
      includeModules: ['solid-gauge'],
    },
  });

  // additional configuration

  return app.toTree();
};

```

**Output** (<small>[test-without-babel-property.output.js](transforms/setup-cli-build/__testfixtures__/test-without-babel-property.output.js)</small>):
```js
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');


module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    emberHighCharts: {
      includeHighCharts: true,
      includeHighStock: false,
      includeHighChartsMore: true,
      includeHighCharts3D: true,
      includeModules: ['solid-gauge'],
    },

    babel: {
      plugins: [...require('ember-cli-code-coverage').buildBabelPlugin({
        embroider: !!process.env.EMBROIDER,
      })],
    },
  });

  // additional configuration

  return app.toTree();
};

```
<!--FIXTURES_CONTENT_END-->