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
