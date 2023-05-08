## Install

```js
 npm install vue2-router-generator
```

## 生成代码

```js
const path = require('path')
const glob = require('glob')
const generate = require('vue2-router-generator')
// index.js 或者 index.vue
const files = glob.sync('./pages/**/index.js')
generate({
  list: files,
  // 没有子路由的全部打包的一个指定的路由文件中
  singleRouteName: 'common',
  // 不处理的路由目录，这里只处理一级目录。只能是pages下的一级目录
  ignored: [],
  // 要处理的页面目录
  dir: 'pages',
  // 输出代码文件路径
  output: (name) => {
    const result = path.resolve(__dirname, 'router/router-' + name + '.js')
    return result
  },
})
```

## 输出代码

```js
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
```
