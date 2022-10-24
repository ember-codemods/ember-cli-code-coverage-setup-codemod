const { getParser } = require('codemod-cli').jscodeshift;
const {
  determineConfigType,
  addBabelProperty,
  addPluginsProperty,
  addBabelPluginConfig,
} = require('../utils');

module.exports = function transformer(file, api) {
  const j = getParser(api);
  const root = j(file.source);

  function transform() {
    let hasBabelProperty = false;
    let hasPluginsProperty = false;
    let { configurationType, optionsName } = determineConfigType(j, root);

    let correctInlineConfig = root.find(j.SpreadElement, {
      argument: {
        type: 'CallExpression',
        callee: {
          type: 'MemberExpression',
          object: {
            type: 'CallExpression',
            callee: {
              name: 'require',
            },
            arguments: [
              {
                value: 'ember-cli-code-coverage',
              },
            ],
          },
          property: {
            name: 'buildBabelPlugin',
          },
        },
      },
    });

    let correctConfig = root.find(j.SpreadElement, {
      argument: {
        type: 'CallExpression',
        callee: {
          type: 'MemberExpression',
          object: {
            type: 'Identifier',
            name: 'codeCoverage',
          },
          property: {
            name: 'buildBabelPlugin',
          },
        },
      },
    });

    let spreadElement = j.spreadElement(
      j.callExpression(
        j.memberExpression(
          j.callExpression(j.identifier('require'), [j.literal('ember-cli-code-coverage')]),
          j.identifier('buildBabelPlugin')
        ),
        [
          j.objectExpression([
            j.property(
              'init',
              j.identifier('embroider'),
              j.unaryExpression(
                '!',
                j.unaryExpression(
                  '!',
                  j.memberExpression(
                    j.memberExpression(j.identifier('process'), j.identifier('env')),
                    j.identifier('EMBROIDER')
                  )
                )
              )
            ),
          ]),
        ]
      )
    );

    let pluginsObject = j.property(
      'init',
      j.identifier('plugins'),
      j.arrayExpression([spreadElement])
    );

    let babelObject = j.property(
      'init',
      j.identifier('babel'),
      j.objectExpression([pluginsObject])
    );

    root.find(j.ObjectExpression).forEach((path) => {
      let properties = path.node.properties;

      properties.forEach((property) => {
        if (property.key.name === 'babel') {
          hasBabelProperty = true;
        }
        if (property.key.name === 'plugins') {
          hasPluginsProperty = true;
        }
      });
    });

    if (correctConfig.length === 0 && correctInlineConfig.length === 0) {
      if (!hasBabelProperty) {
        addBabelProperty(j, root, babelObject, { configurationType, optionsName });
      } else if (hasBabelProperty && !hasPluginsProperty) {
        addPluginsProperty(j, root, pluginsObject);
      } else if (hasBabelProperty && hasPluginsProperty) {
        addBabelPluginConfig(j, root, spreadElement);
      }
    }
  }

  transform();

  return root.toSource({
    quote: 'single',
    trailingComma: true,
  });
};

module.exports.type = 'js';
