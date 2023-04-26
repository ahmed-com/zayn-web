import { createApp } from "vue";
import pinia from "./plugins/pinia";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import router from "./router";
import i18n from "./plugins/i18n";

import "./styles/utils.css";
import "./styles/reset.css";

loadFonts();

createApp(App)
  .use(i18n)
  .use(vuetify)
  .use(router)
  .use(pinia)
  .mount("#app");
