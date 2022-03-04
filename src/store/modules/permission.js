import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

/**
 * Use meta.module 来判断sidebar显示的路由内容
 * @param module
 * @param route
 */
function checkModule(module, route) {
  if (route.meta && route.meta.module) {
    return route.meta.module.includes(module)
  } else {
    return true
  }
}

/**
 * 根据meta.module过滤路由
 * @param routes asyncRoutes
 * @param module
 */
export function filterAsyncRoutesByModule(routes, module) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (checkModule(module, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutesByModule(tmp.children, module)
      }
      res.push(tmp)
    }
  })

  return res
}

/**
 * 根据meta.module, meta.roles过滤路由
 * @param routes asyncRoutes
 * @param module
 * @param roles 当前操作者的角色
 */
export function filterAsyncRoutesByModuleRoles(routes, module, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (checkModule(module, tmp) && hasPermission(roles, route)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutesByModuleRoles(
          tmp.children,
          module,
          roles
        )
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: [],
  constantRoutes: constantRoutes
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    // state.routes = constantRoutes.concat(routes)
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  filterRoutes({ commit }, module) {
    return new Promise(resolve => {
      const filteredRoutes = filterAsyncRoutesByModule(asyncRoutes, module)
      commit('SET_ROUTES', filteredRoutes)
      resolve(filteredRoutes)
    })
  },

  filterRoutesByModuleRoles({ commit }, payload) {
    return new Promise(resolve => {
      const filteredRoutes = filterAsyncRoutesByModuleRoles(
        asyncRoutes,
        payload.module,
        payload.roles
      )
      console.log('filteredRoutes', filteredRoutes)
      commit('SET_ROUTES', filteredRoutes)
      resolve(filteredRoutes)
    })
  },
  generateAsyncRoutes({ commit }) {
    return new Promise(resolve => {
      commit('SET_ROUTES', asyncRoutes)
      resolve(asyncRoutes)
    })
  },
  // generateRoutes({ commit }, roles) {
  //   return new Promise(resolve => {
  //     let accessedRoutes
  //     if (roles.includes('admin')) {
  //       accessedRoutes = asyncRoutes || []
  //     } else {
  //       accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
  //     }
  //     commit('SET_ROUTES', accessedRoutes)
  //     resolve(accessedRoutes)
  //   })
  // }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
