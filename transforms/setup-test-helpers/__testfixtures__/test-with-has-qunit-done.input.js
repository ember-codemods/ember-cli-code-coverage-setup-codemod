import QUnit from 'qunit';

setup(QUnit.assert);

QUnit.done(async function onDone() {
  console.log(
    'Total: ' + details.total + ' Failed: ' + details.failed +
    ' Passed: ' + details.passed + ' Runtime: ' + details.runtime
  );
});
