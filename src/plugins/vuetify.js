import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import config from '@/config'
import es from 'vuetify/es5/locale/es'
import 'font-awesome/css/font-awesome.css'

Vue.use(Vuetify);
Vue.component('my-component', {
    methods: {
      changeLocale () {
        this.$vuetify.lang.current = 'es'
      },
    },
  })

export default new Vuetify({
    theme: {
        options: {
            customProperties: true,
          },
        themes: {
            light: config.light
        }
    },
      lang: {
        locales: { es },
        current: 'es',
      },
});
