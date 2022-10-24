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
