import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/Login.vue';
import ChatView from '../views/Chat.vue';
import HelloWorld from '../components/HelloWorld.vue';

const routes = [
  { path: '/', component: LoginView },
  { path: '/hello', component: HelloWorld },
  { path: '/chat', component: ChatView, meta: { requiresAuth: true } }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('user');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

export default router;
