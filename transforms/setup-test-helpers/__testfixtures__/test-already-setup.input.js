import { forceModulesToBeLoaded, sendCoverage } from 'ember-cli-code-coverage/test-support';
import QUnit from 'qunit';

setup(QUnit.assert);

QUnit.done(async function() {
  forceModulesToBeLoaded();
  await sendCoverage();
});
