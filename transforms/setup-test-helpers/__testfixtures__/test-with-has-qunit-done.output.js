import { forceModulesToBeLoaded, sendCoverage } from 'ember-cli-code-coverage/test-support';
import QUnit from 'qunit';

setup(QUnit.assert);

QUnit.done(async function onDone() {
  console.log(
    'Total: ' + details.total + ' Failed: ' + details.failed +
    ' Passed: ' + details.passed + ' Runtime: ' + details.runtime
  );
  forceModulesToBeLoaded();
  await sendCoverage();
});
