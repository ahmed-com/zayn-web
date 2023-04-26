// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import {createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'

import i18n from './i18n'
import { useI18n } from 'vue-i18n'
import themes from '../themes'

export default createVuetify({
  components,
  directives,
  locale: createVueI18nAdapter({ i18n, useI18n}),
  theme: {
    defaultTheme: import.meta.env.VITE_DEFAULT_THEME,
    variations: {
      colors: ['primary', 'secondary'],
      lighten: 4,
      darken: 2
    },
    themes
  }
})
