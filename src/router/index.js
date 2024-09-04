import AdminLayoutView from '@/views/Admin/AdminLayoutView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    }, {
      path: '/admin',
      name: 'admin',
      component: () => AdminLayoutView,
      children: [
        {
          path: 'productos',
          name: 'admin-products',
          component: () => import('@/views/Admin/ProductsView.vue')
        },
        {
          path: 'productos/nuevo',
          name: 'admin-products-new',
          component: () => import('@/views/Admin/NewProductView.vue')
        },
        {
          path: 'productos/editar/:id',
          name: 'admin-products-edit',
          component: () => import('@/views/Admin/EditProductView.vue')
        },
        {
          path: 'productos/seeder',
          name: 'seeder',
          component: () => import('@/views/Admin/SeederView.vue')
        },
        
        {
          path: 'ventas',
          name: 'sales',

          component: () => import('@/views/Admin/SalesView.vue')
        }
      ]
    },

  ]
})

export default router
