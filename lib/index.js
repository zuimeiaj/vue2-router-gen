const glob = require('glob')
const fs = require('fs')
const routeModule = {}
const singleRoutes = {}
function generageRoutesCode(options) {
  options.list.forEach((item) => {
    item = item.replace(/\\/g, '/')
    let names = item.split(options.dir + '/')[1].split('/')
    if (options.ignored && options.ignored.includes(names[0])) return

    if (!routeModule[names[0]]) {
      routeModule[names[0]] = []
    }

    let route = {
      path: '',
      component: '@/' + options.dir,
    }

    names.forEach((item, index) => {
      if (index < names.length - 1) {
        route.path += '/' + item.slice(0, 1).toLowerCase() + item.slice(1)
      }
      route.component += '/' + item
    })

    let isSingleRoute = names.length == 2
    let routeCode = generateCode(route, isSingleRoute ? 2 : 6)
    if (isSingleRoute) {
      singleRoutes[route.path] = routeCode
    }
    routeModule[names[0]].push(routeCode)
  })

  Object.keys(routeModule).forEach((item) => {
    let routeName = item.slice(0, 1).toLowerCase() + item.slice(1)
    let route = '/' + routeName

    if (singleRoutes[route]) return
    let codes = []

    codes.push(`import DashboardLayout from '@/layouts/DashboardLayout'`)
    codes.push(`// Auto generate by router.gen.js`)
    codes.push(`export default [`)
    codes.push('  {')
    codes.push(`    path: '${route}',`)
    codes.push(`    component: DashboardLayout,`)
    codes.push(`    children: [`)
    codes.push(`${routeModule[item].join('\n')}`)
    codes.push(`    ]`)
    codes.push(`  }]`)

    fs.writeFileSync(options.output(routeName), codes.join('\n'), {
      encoding: 'utf-8',
    })
  })

  let values = Object.values(singleRoutes)
  if (values.length > 0) {
    let codes = []
    codes.push(`// Auto generate by router.gen.js`)
    codes.push(`export default [`)
    codes.push(values.join('\n'))
    codes.push(`]`)
    fs.writeFileSync(options.output(options.singleRouteName), codes.join('\n'), {
      encoding: 'utf-8',
    })
  }
}

function getSpace(len) {
  return new Array(len).fill(' ').join('')
}

function generateCode(item, spaces = 6) {
  const first = getSpace(spaces)
  const sencond = getSpace(spaces + 2)
  const codes = []
  codes.push(first + `{`)
  codes.push(sencond + `path: '${item.path}',`)
  codes.push(sencond + `component: () => import('${item.component}'),`)
  codes.push(first + `},`)

  return codes.join('\n')
}

// 生成代码

module.exports = generageRoutesCode
