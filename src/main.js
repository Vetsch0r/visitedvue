// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'onsenui/css/onsenui.css'
import 'onsenui/css/dark-onsen-css-components.css'
import 'ammap3/ammap/ammap.css'

import Vue from 'vue'
import VueOnsen from 'vue-onsenui'
import VueI18n from 'vue-i18n'
import store from './store'
import App from './App'
import AmMap from 'ammap3'
import WorldLow from 'ammap3/ammap/maps/js/worldHigh'
import texts from './texts/texts';

Vue.config.productionTip = false

Vue.use(VueI18n)
Vue.use(VueOnsen)

const i18n = new VueI18n({
  locale: 'en',
  messages: texts
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  store,
  template: '<App/>',
  components: { App }
})
