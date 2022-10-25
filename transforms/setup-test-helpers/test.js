'use strict';

const { runTransformTest } = require('codemod-cli');

runTransformTest({ 
  name: 'setup-test-helpers',
  path: require.resolve('./index.js'),
  fixtureDir: `${__dirname}/__testfixtures__/`,
});
