'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');


module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    babel: {
      plugins: [[
        require.resolve('babel-plugin-ember-test-metadata'),
        {
          enabled: !!process.env.BABEL_TEST_METADATA,
          packageName: defaults.project.pkg.name,
        },
      ], ...require('ember-cli-code-coverage').buildBabelPlugin({
        embroider: !!process.env.EMBROIDER,
      })],
    },
  });

  // additional configuration

  return app.toTree();
};
