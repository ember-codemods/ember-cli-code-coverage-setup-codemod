'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');


module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    babel: {
      plugins: [
        [
          require.resolve('babel-plugin-ember-test-metadata'),
          {
            enabled: !!process.env.BABEL_TEST_METADATA,
            packageName: defaults.project.pkg.name,
          },
        ],
      ],
    },
  });

  // additional configuration

  return app.toTree();
};
