import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import ElementUI from "element-ui";
import ElementLocale from "element-ui/lib/locale";
import "element-ui/lib/theme-chalk/index.css";
import VueI18n from "vue-i18n";
import { messages } from "./components/common/i18n";
import "./assets/css/icon.css";
import "babel-polyfill";
import DialogDraggable from "@/components/common/el-dialog-drag";
import { accountService } from "@/_services";


// Event Bus
Vue.prototype.$bus = new Vue();
Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(ElementUI, {
    size:"small",
});
Vue.use(DialogDraggable, {
    containment:true,
});

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

const i18n = new VueI18n({
    locale: localStorage.getItem("user_lang")==undefined?"zh_tw":localStorage.getItem("user_lang"),
    fallbackLocale:"zh_tw",
    formatFallbackMessages:true,
    silentFallbackWarn:true,
    messages,
});
ElementLocale.i18n((key, value) => i18n.t(key, value));

router.beforeEach(async (to, from, next) => {
    var path_id = to.path.replace("/", "");
    var path_id_arrray = path_id.split("/");
    var first_path_id = path_id_arrray[0];
    var title = "VARBOX Tutorial";
    document.title = to.meta.title?`${title} - ${i18n.t(to.meta.title)}`:title;
    var user_home = localStorage.getItem("user_home");
    if(( path_id != "login" && user_home == undefined ) || path_id == ""){ 
        await accountService.clean_login_info();
    } 
    await next();
});

new Vue({
    i18n,
    router,
    render: (h) => h(App),
}).$mount("#app");
