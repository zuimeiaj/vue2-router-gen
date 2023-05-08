import DashboardLayout from '@/layouts/DashboardLayout'
// Auto generate by router.gen.js
export default [
  {
    path: '/home',
    component: DashboardLayout,
    children: [
      {
        path: '/home/user',
        component: () => import('@/pages/Home/User/index.js'),
      },
      {
        path: '/home/subject/classify',
        component: () => import('@/pages/Home/Subject/Classify/index.js'),
      },
      {
        path: '/home/subject/category',
        component: () => import('@/pages/Home/Subject/Category/index.js'),
      },
      {
        path: '/home/data',
        component: () => import('@/pages/Home/Data/index.js'),
      },
    ],
  },
]
