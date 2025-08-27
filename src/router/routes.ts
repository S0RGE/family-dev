import type { RouteRecordRaw } from 'vue-router';

const withMainLayout = (children: RouteRecordRaw[]): RouteRecordRaw => ({
  path: '/',
  component: () => import('layouts/MainLayout.vue'),
  children,
});

const withAuthLayout = (children: RouteRecordRaw[]): RouteRecordRaw => ({
  path: '/',
  component: () => import('layouts/AuthLayout.vue'),
  children,
});

const routes: RouteRecordRaw[] = [
  withMainLayout([
    { path: '', name: 'home', component: () => import('pages/IndexPage.vue') },
    {
      path: 'treasure',
      name: 'treasure',
      component: () => import('pages/treasures/TreasurePage.vue'),
    },
    { path: 'quests', name: 'quests', component: () => import('pages/quests/QuestsPage.vue') },
  ]),
  withAuthLayout([
    { path: 'login', name: 'login', component: () => import('pages/login/LoginPage.vue') },
    { path: 'registration', name: 'registration', component: () => import('pages/registration/RegistrationPage.vue') },
  ]),

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
