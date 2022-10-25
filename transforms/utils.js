const CONFIGURATION_TYPE = {
  INLINE: 'inline',
  USE_OPTIONS: 'use options',
};

function determineConfigType(j, root) {
  let configurationType;
  let optionsName = undefined;

  root
    .find(j.NewExpression, {
      callee: {
        name: 'EmberApp',
      },
      arguments: [
        {
          type: 'Identifier',
          name: 'defaults',
        },
        {
          type: 'Identifier',
        },
      ],
    })
    .forEach((path) => {
      optionsName = path.node.arguments[1].name;
    });

  configurationType = CONFIGURATION_TYPE[optionsName === undefined ? 'INLINE' : 'USE_OPTIONS'];

  return {
    configurationType,
    optionsName,
  };
}

function addBabelProperty(j, root, babelObject, { configurationType, optionsName }) {
  if (configurationType === CONFIGURATION_TYPE.INLINE) {
    root.find(j.ObjectExpression).forEach((path) => {
      if (path.parent.node.callee && path.parent.node.callee.name === 'EmberApp') {
        path.node.properties.push(babelObject);
      }
    });
  } else {
    root.find(j.VariableDeclarator).forEach((path) => {
      let node = path.node;

      if (node.id.name === optionsName && node.init.type === 'ObjectExpression') {
        node.init.properties.push(babelObject);
      }
    });
  }
}

function addPluginsProperty(j, root, pluginsObject) {
  root.find(j.ObjectExpression).forEach((path) => {
    if (path.parent.node.key && path.parent.node.key.name === 'babel') {
      path.node.properties.push(pluginsObject);
    }
  });
}

function addBabelPluginConfig(j, root, spreadElement) {
  root.find(j.ObjectExpression).forEach((path) => {
    let properties = path.node.properties;
    properties.forEach((property) => {
      if (property.key.name === 'plugins' && property.value.type === 'ArrayExpression') {
        property.value.elements.push(spreadElement);
      }
    });
  });
}

module.exports = {
  determineConfigType,
  addBabelProperty,
  addPluginsProperty,
  addBabelPluginConfig,
};
