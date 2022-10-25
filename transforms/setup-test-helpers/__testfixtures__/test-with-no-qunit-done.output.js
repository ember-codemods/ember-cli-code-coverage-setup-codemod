import { forceModulesToBeLoaded, sendCoverage } from 'ember-cli-code-coverage/test-support';
import QUnit from 'qunit';

setup(QUnit.assert);

QUnit.done(async function onDone() {
  forceModulesToBeLoaded();
  await sendCoverage();
});
