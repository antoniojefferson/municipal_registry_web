import Vue from 'vue'
import VueI18n from 'vue-i18n'
import pt_BR from '~/locales/pt_BR'

Vue.use(VueI18n)

export default ({ app }) => {
  app.i18n = new VueI18n({
    locale: 'pt_BR',
    fallbackLocale: 'en',
    messages: {
      pt_BR
    }
  })
}
