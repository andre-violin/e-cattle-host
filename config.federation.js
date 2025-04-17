export default {
  name: 'app',
  remotes: {
    // remote_app1: 'https://localhost:5005/assets/remoteEntry.js'
  },
  shared: [
    'vue',
    'vuetify',
    '@apollo/client',
    '@vue/apollo-composable',
    'axios',
    'core-js',
    'graphql',
    'graphql-tag',
    'pinia',
    'vue-router',
    'qrcode-vue3'
  ]
}
