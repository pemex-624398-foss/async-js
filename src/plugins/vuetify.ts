import Vue from "vue";
import Vuetify from "vuetify";
import colors from "vuetify/es5/util/colors";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: "#6A1B31",
        secondary: "#12322A",
        accent: "#BC955C",
        info: colors.lightBlue.base,
        success: colors.lightGreen.base,
        warning: colors.amber.base,
        error: colors.red.base
      }
    }
  }
});
