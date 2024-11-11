import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import { useAuthStore } from '../store/auth';

const routes = [
  { 
    path: '/', 
    name: 'Home', 
    component: Home , 
    meta: { requiresAuth: true } 
  },
  { 
    path: '/login', 
    name: 'Login', 
    component: Login,
    meta: { requiresAuth: false } 
  },
  {
    path: '/verify-otp',
    name: 'VerifyOtp',
    component: () => import('../views/VerifyOTP.vue'),
    meta: { requiresAuth: false } 
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  // using outside will throw error, so call inside function
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
