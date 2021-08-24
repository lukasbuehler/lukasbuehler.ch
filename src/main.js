import { createApp } from "vue";
import App from "./App.vue";

// TODO remove
new Vue({
  render: (h) => h(App),
}).$mount("#app");

createApp(App).mount("#app");
