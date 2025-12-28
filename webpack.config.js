const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  remotes: {
    "mfeProduct": "http://localhost:4201/remoteEntry.js",
    "mfeUser": "http://localhost:4202/remoteEntry.js",
    "mfeCart": "http://localhost:4203/remoteEntry.js",
    "mfeAnalytics": "http://localhost:4204/remoteEntry.js",    
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
