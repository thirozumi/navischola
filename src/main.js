import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Home from './templates/Home.vue'
import Question from './templates/Question.vue'
import Result from './templates/Result.vue'
import Network from './templates/Network.vue'
import NotFound from './templates/NotFound.vue'

Vue.use(VueRouter);
Vue.prototype.$host = 'http://navischola.thirozumi.org';

const routes = [
  {
    name: 'Home',
    path: '/',
    component: Home
  },{
    name: 'Question',
    path: '/question',
    component: Question
  }, {
    name: 'Result',
    path: '/result/:id/:s',
    component: Result
  },{
    name: 'Network',
    path: '/network',
    component: Network
  },{
    name: 'Networks',
    path: '/network/:id/:s',
    component: Network
  },{
    name: 'NotFound',
    path: '*',
    component: NotFound
  }
];

const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
