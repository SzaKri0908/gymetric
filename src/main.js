import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";
import InlineSvg from 'vue-inline-svg';
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

library.add(faEye, faEyeSlash);

const app = createApp(App)
  app.use(router)
  app.component('inline-svg', InlineSvg)
  app.component('font-awesome-icon', FontAwesomeIcon);
  app.config.globalProperties.$toast = createToast;
  app.mount("#app");
  