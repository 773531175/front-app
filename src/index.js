import Vue from 'vue'
import app from './App.vue'
import './assets/css/app.css'
import Router from 'vue-router'
import { asyncStore,  router } from './route'
Vue.use(Router);
const instance = new Vue({
    el: "#app",
    store: asyncStore,
    router: router,
    render: h => h(app)
})