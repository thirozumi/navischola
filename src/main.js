import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import App from './App.vue'
import Home from './templates/Home.vue'
import About from './templates/About.vue'
import Question from './templates/Question.vue'
import Result from './templates/Result.vue'
import NotFound from './templates/NotFound.vue'

Vue.use(VueRouter);

const routes = [
  { name: 'Home', path: '/', component: Home },
  { name: 'About', path: '/about', component: About },
  { name: 'Question', path: '/question', component: Question },
  { name: 'Result', path: '/result', component: Result },
  { name: 'NotFound', path: '*', component: NotFound}
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
