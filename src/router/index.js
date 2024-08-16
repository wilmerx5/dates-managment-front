import AuthApi from '@/services/AuthApi'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/admin',
      name: 'admin',
      component: ()=>import('@/views/admin/AdminViewLayout.vue'),
      meta: { requiresAdmin: true },

      children:[{
        path: '',
        name: 'admin-view',
        component: ()=>import('@/views/admin/AdminAppointmentsView.vue'),
      }]

    }
    ,
    {
      path: '/reservations',
      name: 'appointments',
      component: () => import('@/views/appointments/AppointmentsLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'my-appointments',
          component: () => import('@/views/appointments/MyAppointmentsView.vue'),
        }
        ,
        {
          path: 'create',
          name: 'create',
          component: () => import('@/views/appointments/NewAppointmentsLayout.vue'),
          children: [
            {
              path: '',
              name: 'create-appointments',
              component: () => import('@/views/appointments/ServicesView.vue'),
            },
            {
              path: 'details',
              name: 'details-appointments',
              component: () => import('@/views/appointments/AppointmentView.vue'),
            }
          ]
        }, {
          path: ':id/edit',
          component: () => import('@/views/appointments/EditAppointmentsLayout.vue'),
          children: [
            {
              path: '',
              name: 'edit-appointments',
              component: () => import('@/views/appointments/ServicesView.vue'),
            },
            {
              path: 'editDetails',
              name: 'editDetails-appointments',
              component: () => import('@/views/appointments/AppointmentView.vue'),
            }
          ]
        }

      ]

    }, {
      path: '/auth',
      name: 'auth',
      component: () => import('@/views/auth/AuthLayout.vue'),
      children: [
        {
          path: 'SignIn',
          name: 'Sign-in',
          component: () => import('@/views/auth/SignInView.vue'),
        },
        {
          path: 'verify-account/:token',
          name: 'verify-account',
          component: () => import('@/views/auth/VerifyAccountView.vue'),
        },

        {
          path: 'login',
          name: 'log-in',
          component: () => import('@/views/auth/LogInView.vue'),
        },
        {
          path: 'resetpassword',
          name: 'reset-password',
          component: () => import('@/views/auth/ResetPasswordView.vue'),
        },
        {
          path: 'resetpassword/:token',
          name: 'new-password',
          component: () => import('@/views/auth/NewPasswordView.vue'),
        },
      ]
    }
  ]
})


router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(url => url.meta.requiresAuth)

  if (requiresAuth) {
    try {
      const { data } = await AuthApi.auth()

      if (data.admin) {
        next('/admin')
      }else{

        next()
      }
    }
    catch (e) {
      next({ name: 'log-in' })
    }

  }
  else {
    next()
  }
})


router.beforeEach(async (to, from, next) => {
  const requiresAdmin = to.matched.some(url => url.meta.requiresAdmin)

  if (requiresAdmin) {
    try {
      await AuthApi.admin()
      next()
    }

    catch (e) {
      next({ name: 'my-appointments' })
    }

  }
  else {
    next()
  }
})
export default router
