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
