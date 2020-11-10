import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import globalConstant from "./util/global";
import axios from 'axios'
import i18n from './i18n/i18n'
import windowpage from './util/window'
Vue.use(i18n);

axios.defaults.withCredentials = true;

import echarts from 'echarts'
import URL from './util/url'
import platformUrl from "./util/platformUrl";
import 'echarts/dist/echarts.min.js'
import 'font-awesome/css/font-awesome.min.css'



import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import Vuelidate from 'vuelidate'
import vueGridLayout from 'vue-grid-layout';

import App from './App'

import util from './util/util'
import resource from './resource'

import {routers} from './router'

import Bus from './util/bus'
import './util/directives'
import {simpleGet, get, patch, post, put, remove, postAdvanced} from './util/axios'
import {time2FormatStr, formatStr2Time} from './util/date'
import mapBoxGl from 'mapbox-gl'


import md5 from 'js-md5'




Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(Vuetify);
Vue.prototype.$vuetify = Vuetify;
Vue.use(Vuelidate);
Vue.use(echarts);
Vue.use(vueGridLayout);
Vue.prototype.$md5 = md5;//加密
Vue.prototype.$echarts = echarts;
Vue.prototype.$globalConstant = globalConstant;
Vue.prototype.Mapbox = mapBoxGl;
Vue.prototype.$Bus = Bus;
Vue.prototype.$URL = URL;
Vue.prototype.$platfromUrl=platformUrl;
Vue.prototype.$window=windowpage;
//定义axios标签
Vue.prototype.$axios = {
    get,
    post,
    patch,
    put,
    remove,
    postAdvanced
};
Vue.prototype.$date = {
    time2FormatStr,
    formatStr2Time,
};

Vue.config.productionTip = false;

// 路由配置
const RouterConfig = {
    mode: 'hash',
    routes: routers
};
const router = new VueRouter(RouterConfig);

const store = new Vuex.Store({
    state:{
        username:"游客",
        role:"visitor",
        height:-1
    },
    mutations:{
      setUsername(state,username){
          this.state.username=username
      },
        setRole(state,role){
            this.state.role=role
        },
        setHeight(state,height)
        {
            this.state.height=height;
        }
    },
    getters:{
        username:state => state.username,
        role:state => state.role
    }

})

router.beforeEach((to, from, next) => {
    let currentPageTitle = to.meta.title;
    let currentPageTitle2 = to.meta.title2;
    if (to.matched.some(m => m.meta.requireAuth)) {
    } else {
        next();
    }
    if (to.fullPath == '/platform') {
        globalConstant.page = 'platform'
    } else {
       globalConstant.page = '';
    }
    util.title(currentPageTitle, currentPageTitle2)//设置网页标题
});

router.afterEach((to, from, next) => {
    window.scrollTo(0, 0)
});
function getWH()
{
    let pagewidth=window.innerWidth;
    let pageheight=window.innerHeight;
    if(typeof pagewidth!='number')
    {
        if(document.compatMode===''){
            pageheight=document.documentElement.clientHeight;
        }else{
            pageheight=document.body.clientHeight;
        }
    }
    store.commit('setHeight',pageheight);
}
getWH();
window.addEventListener('resize',getWH);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    i18n,
    router,
    store,
    resource,
    template: '<App/>',
    components: {App}
});
