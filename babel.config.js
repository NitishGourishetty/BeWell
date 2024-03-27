module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        "module:react-native-dotenv", {
          "moduleName": "@env",
          "path": ".env",
          "safe": false,
          "allowUndefined": true,        
          "blocklist": null,
          "allowlist": null,
          "verbose": false
        }
      ],
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: [
            '.ios.ts',
            '.android.ts',
            '.ts',
            '.js',
            '.jsx',
            '.ios.tsx',
            '.android.tsx',
            '.tsx',
            '.jsx',
            '.js',
            '.json',
          ],
          alias: {
            '@app': './src',
          },
        },
      ],
    ],
  };