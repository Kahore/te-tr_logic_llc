export const routes = [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
      meta: {
        requiresGuest: true,
      },
    },
    {
      path: '/editor/:id?',
      name: 'editor',
      component: () => import('./views/Editor.vue'),
      meta: {
        requiresAuth: true,
      },
    },
  ];
