import { createI18n } from 'vue-i18n'
import  Vue  from 'vue'

declare module 'vue/types/vue' {
  interface VueConstructor  {
    $t: any
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    t?: any
  }
}

function loadLocaleMessages() {
  const locales = import.meta.globEager('../locales/*.json')
  const messages = {}
  Object.keys(locales).forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales[key].default
    }
  })
  return messages
}

export default createI18n({
  legacy: false,
  locale: import.meta.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: import.meta.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages()
})
