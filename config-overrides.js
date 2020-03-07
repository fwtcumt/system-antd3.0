const path = require('path');
const { override, fixBabelImports, addLessLoader, addWebpackAlias } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    // modifyVars: { '@primary-color': '#1DA57A' }
  }),
  addWebpackAlias({
    "assets": path.resolve(__dirname, 'src/assets'),
    "components": path.resolve(__dirname, 'src/components'),
    "config": path.resolve(__dirname, 'src/config'),
    "utils": path.resolve(__dirname, 'src/utils')
  })
);