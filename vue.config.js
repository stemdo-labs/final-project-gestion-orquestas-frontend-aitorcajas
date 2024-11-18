module.exports = {
  configureWebpack: {
    devServer: {
      proxy: {
        '/api': {
          "target": 'http://backend:8080',
          // "target": 'https://gestionorquestas.herokuapp.com',
          // target: 'http://0290-190-2-106-33.ngrok.io',
          // Correr ngrok: ngrok http 8080 -host-header="localhost:8080"
          // target: 'http://localhost:8080',
          '^/api': '/api',
          changeOrigin: true,
          security: false,
        },
      },
    },
  },

  transpileDependencies: [
    'vuetify',
  ],

  lintOnSave: false
};
