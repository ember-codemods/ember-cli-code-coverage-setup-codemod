const { getParser } = require('codemod-cli').jscodeshift;

module.exports = function transformer(file, api) {
  const j = getParser(api);
  const root = j(file.source);

  function transform() {
    let body = root.get().value.program.body;

    let correctImportDeclaration = root.find(j.ImportDeclaration, {
      source: { value: 'ember-cli-code-coverage/test-support' },
    });

    let hasForceModulesToBeLoadedCallExpression = root.find(j.CallExpression, {
      callee: {
        name: 'forceModulesToBeLoaded',
      },
    });

    let hasSendCoverageCallExpression = root.find(j.AwaitExpression, {
      argument: {
        type: 'CallExpression',
        callee: {
          name: 'sendCoverage',
        },
      },
    });

    let hasQunitDoneExpression = root.find(j.CallExpression, {
      callee: {
        type: 'MemberExpression',
        object: {
          name: 'QUnit',
        },
        property: {
          name: 'done',
        },
      },
    });

    let emberCliCodeCoverageImportDeclaration = j.importDeclaration(
      [
        j.importSpecifier(j.identifier('forceModulesToBeLoaded')),
        j.importSpecifier(j.identifier('sendCoverage')),
      ],
      j.literal('ember-cli-code-coverage/test-support')
    );

    let forceModulesToBeLoadedExpression = j.expressionStatement(
      j.callExpression(j.identifier('forceModulesToBeLoaded'), [])
    );

    let sendCoverageExpression = j.expressionStatement(
      j.awaitExpression(j.callExpression(j.identifier('sendCoverage'), []))
    );

    let onDoneFunctionExpression = j.functionExpression(
      j.identifier('onDone'),
      [],
      j.blockStatement([forceModulesToBeLoadedExpression, sendCoverageExpression]),
      false,
      false
    );

    onDoneFunctionExpression.async = true;

    let qunitDoneExpression = j.expressionStatement(
      j.callExpression(j.memberExpression(j.identifier('QUnit'), j.identifier('done')), [
        onDoneFunctionExpression,
      ])
    );

    if (correctImportDeclaration.length === 0) {
      body.unshift(emberCliCodeCoverageImportDeclaration);
    }

    if (hasQunitDoneExpression.length === 0) {
      body.push(qunitDoneExpression);
    } else {
      root
        .find(j.CallExpression, {
          callee: {
            type: 'MemberExpression',
            object: {
              name: 'QUnit',
            },
            property: {
              name: 'done',
            },
          },
          arguments: [
            {
              type: 'FunctionExpression',
              async: true,
            },
          ],
        })
        .forEach((path) => {
          let asyncFunctionExpression = path.node.arguments[0];

          if (hasForceModulesToBeLoadedCallExpression.length === 0) {
            asyncFunctionExpression.body.body.push(forceModulesToBeLoadedExpression);
          }

          if (hasSendCoverageCallExpression.length === 0) {
            asyncFunctionExpression.body.body.push(sendCoverageExpression);
          }
        });
    }
  }

  transform();

  return root.toSource({
    quote: 'single',
    trailingComma: true,
  });
};

module.exports.type = 'js';
