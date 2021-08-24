import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

//import light from "./vuetify/themes/light_theme";
//import dark from "./vuetify/themes/dark_theme";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    //themes: { dark },
  },
});
