import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import { routes } from './routes';

import store from './store/store';
import '@/assets/styles/app.scss';
import auth from '@/store/modules/auth';
import { User } from '@/store/model';
Vue.use(VueRouter);
Vue.config.productionTip = false;

const router = new VueRouter({
  mode: 'history',
  routes,
  base: process.env.BASE_URL,
});
let authUser: User;

router.beforeEach((to, from, next) => {
  authUser = auth.getUser;
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (authUser.login === '') {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath,
        },
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresGuest)) {
    if (authUser.login !== '') {
      next({
        path: '/editor',
      });
    } else {
      next();
    }
  } else {
    next();
  }
});
let app;

if (!app) {
  app = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app');
}
