/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import { mdi } from 'vuetify/iconsets/mdi'
import { customSVGs } from '@/assets/iconsets/custom'

const eCattleTheme = {
  light: {
    colors: {
      primary: '#296A47',
      'surface-tint': '#296A47',
      'on-primary': '#FFFFFF',
      'primary-container': '#AEF2C6',
      'on-primary-container': '#002111',
      secondary: '#4E6355',
      'on-secondary': '#FFFFFF',
      'secondary-container': '#D1E8D6',
      'on-secondary-container': '#0C1F14',
      tertiary: '#3B6471',
      'on-tertiary': '#FFFFFF',
      'tertiary-container': '#BFE9F8',
      'on-tertiary-container': '#001F27',
      error: '#BA1A1A',
      'on-error': '#FFFFFF',
      'error-container': '#FFDAD6',
      'on-error-container': '#410002',
      background: '#F6FBF4',
      'on-background': '#171D19',
      surface: '#F6FBF4',
      'on-surface': '#171D19',
      'surface-variant': '#DCE5DC',
      'on-surface-variant': '#404942',
      outline: '#717972',
      'outline-variant': '#C0C9C0',
      shadow: '#000000',
      scrim: '#000000',
      'inverse-surface': '#2C322D',
      'inverse-on-surface': '#EDF2EB',
      'inverse-primary': '#92D5AB',
      'primary-fixed': '#AEF2C6',
      'on-primary-fixed': '#002111',
      'primary-fixed-dim': '#92D5AB',
      'on-primary-fixed-variant': '#085231',
      'secondary-fixed': '#D1E8D6',
      'on-secondary-fixed': '#0C1F14',
      'secondary-fixed-dim': '#B5CCBA',
      'on-secondary-fixed-variant': '#374B3E',
      'tertiary-fixed': '#BFE9F8',
      'on-tertiary-fixed': '#001F27',
      'tertiary-fixed-dim': '#A3CDDC',
      'on-tertiary-fixed-variant': '#224C58',
      'surface-dim': '#D6DBD5',
      'surface-bright': '#F6FBF4',
      'surface-container-lowest': '#FFFFFF',
      'surface-container-low': '#F0F5EE',
      'surface-container': '#EAEFE8',
      'surface-container-high': '#E4EAE3',
      'surface-container-highest': '#DFE4DD'
    }
  },
  dark: {
    colors: {
      primary: '#76DAA1',
      'surface-tint': '#76DAA1',
      'on-primary': '#003920',
      'primary-container': '#005231',
      'on-primary-container': '#92F7BC',
      secondary: '#B5CCBA',
      'on-secondary': '#213528',
      'secondary-container': '#374B3E',
      'on-secondary-container': '#D1E8D6',
      tertiary: '#A3CDDC',
      'on-tertiary': '#043541',
      'tertiary-container': '#224C58',
      'on-tertiary-container': '#BFE9F8',
      error: '#FFB4AB',
      'on-error': '#690005',
      'error-container': '#93000A',
      'on-error-container': '#FFDAD6',
      background: '#191C1A',
      'on-background': '#E1E3DE',
      surface: '#111412',
      'on-surface': '#C5C7C3',
      'surface-variant': '#404942',
      'on-surface-variant': '#C0C9C0',
      outline: '#8A938B',
      'outline-variant': '#404942',
      shadow: '#000000',
      scrim: '#000000',
      'inverse-surface': '#E1E3DE',
      'inverse-on-surface': '#191C1A',
      'inverse-primary': '#006D42',
      'primary-fixed': '#92F7BC',
      'on-primary-fixed': '#002111',
      'primary-fixed-dim': '#76DAA1',
      'on-primary-fixed-variant': '#005231',
      'secondary-fixed': '#D1E8D6',
      'on-secondary-fixed': '#0C1F14',
      'secondary-fixed-dim': '#B5CCBA',
      'on-secondary-fixed-variant': '#374B3E',
      'tertiary-fixed': '#BFE9F8',
      'on-tertiary-fixed': '#001F27',
      'tertiary-fixed-dim': '#A3CDDC',
      'on-tertiary-fixed-variant': '#224C58',
      'surface-dim': '#111412',
      'surface-bright': '#373A37',
      'surface-container-lowest': '#0C0F0D',
      'surface-container-low': '#191C1A',
      'surface-container': '#1D201E',
      'surface-container-high': '#282B28',
      'surface-container-highest': '#323633'
    }
  }
}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  ssr: true,
  theme: {
    defaultTheme: localStorage.getItem('theme') || 'dark',
    themes: {
      light: eCattleTheme.light,
      dark: eCattleTheme.dark
    }
  },
  icons: {
    defaultSet: 'mdi',
    sets: {
      mdi,
      custom: customSVGs
    }
  }
})
