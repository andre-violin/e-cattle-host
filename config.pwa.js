const getCache = ({ name, pattern, handle }) => ({
  urlPattern: pattern,
  handler: handle || 'CacheFirst',
  options: {
    cacheName: name,
    expiration: {
      maxEntries: 500,
      maxAgeSeconds: 60 * 60 * 24 * 365 * 2 // <== 365 days
    },
    cacheableResponse: {
      statuses: [200]
    }
  }
})

export default {
  registerType: 'autoUpdate',
  injectRegister: 'auto',
  includeAssets: [
    'favicon.ico',
    'apple-touch-icon.png',
    'masked-icon.svg',
    './src/**.*',
    './src/assets/*.*',
    './dist/assets/*.*'
  ],
  injectManifest: {
    globPatterns: [
      '**/*.{js,css,html,ico,png,svg,json,vue,txt,woff2,woff,ttf,eot}'
    ]
  },
  workbox: {
    globPatterns: [
      '**/*.{js,css,html,ico,png,svg,json,vue,txt,woff2,woff,ttf,eot}'
    ],
    globIgnores: ['**/node_modules/**/*', 'sw.js', 'workbox-*.js'],
    runtimeCaching: [
      getCache({
        // pattern: /^https:\/\/localhost:4173\/.*/i,
        pattern: /^https:\/\/localhost:5173\/.*/i,
        name: 'localhost',
        handle: 'NetworkFirst'
      }),
      // getCache({
      //   pattern: /^https:\/\/192\.168\.31\.97:4173\/.*/i,
      //   name: 'localhost',
      //   handle: 'NetworkFirst'
      // }),
      getCache({
        pattern: /^https:\/\/localhost\/.*/i,
        name: 'https-localhost'
      }),
      getCache({
        pattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
        name: 'google-fonts-cache'
      }),
      getCache({
        pattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
        name: 'gstatic-fonts-cache'
      })
    ]
  },
  manifest: {
    name: 'Host para Plataforma e-Cattle',
    short_name: 'Plataforma e-Cattle',
    description:
      'Aplicação Host para o gerenciamento de propriedades rurais utilizando recursos da Plataforma e-Cattle',
    theme_color: '#006D42',
    background_color: '#F8FAF5',
    display: 'standalone',
    lang: 'pt-BR',
    id: 'com.e-cattle.host',
    scope: '/',
    start_url: '/',
    screenshots: [
      {
        src: '/pwa-320x320.png',
        sizes: '320x320',
        type: 'image/png',
        form_factor: 'wide',
        label: 'Application'
      },
      {
        src: '/pwa-320x320.png',
        sizes: '320x320',
        type: 'image/png',
        label: 'Application'
      }
    ],
    icons: [
      {
        src: '/pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/pwa-320x320.png',
        sizes: '320x320',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/pwa-maskable-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/pwa-maskable-320x320.png',
        sizes: '320x320',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/pwa-maskable-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ]
  },
  devOptions: {
    enabled: true
  }
}
