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
