module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['react-native-paper/babel', 'transform-remove-console'],
    },
  },
  plugins: [
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.json', '.tsx', '.ts'],
        alias: {
          '@components': ['./src/components'],
          '@configs': ['./src/configs'],
          '@navigations': ['./src/navigations'],
          '@screens': ['./src/screens'],
          '@services': ['./src/services'],
          '@storage': ['./src/storage'],
          '@stores': ['./src/stores'],
          '@utils': ['./src/utils'],
          '@apis': ['./src/apis'],
          '@models': ['./src/models'],
        },
      },
    ],
    [
      // this react-native-reanimated plugin need to be listed last.
      'react-native-reanimated/plugin',
      {
        globals: ['__scanCodes'],
      },
    ],
  ],
};
