import router from './router'
import store from './store'
import { ElMessage } from 'element-plus'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)
  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    await store.dispatch('user/setOperator')
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      // const hasRoles = store.getters.roles && store.getters.roles.length > 0
      // 若store中没有currentRoleID的值, 会进入else, 在await store.dispatch('user/getInfo')中给currentRoleID赋值
      const hasRoles = store.getters.currentRoleID !== null
      console.log('hasRoles', hasRoles)
      if (hasRoles) {
        // 这里accessRoutes直接获取整个asyncRoutes,初始化router
        const accessRoutes = await store.dispatch(
          'permission/generateAsyncRoutes'
        )
        console.log('hasrole accessRoutes ', accessRoutes)
        // dynamically add accessible routes
        for (const item of accessRoutes) {
          router.addRoute(item)
        }
        next()
      } else {
        try {
          // get user info
          // 功能: call 后端, 把operator, roleId放入store 和 cookie
          await store.dispatch('user/getInfo')

          // 这里accessRoutes直接获取整个asyncRoutes,初始化router
          const accessRoutes = await store.dispatch(
            'permission/generateAsyncRoutes'
          )
          console.log('no hasrole accessRoutes', accessRoutes)
          // dynamically add accessible routes
          for (const item of accessRoutes) {
            router.addRoute(item)
          }
          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          ElMessage.error(error || 'Has Error')
          // next(`/login?redirect=${to.path}`)
          //刷新页面后一律回到主页面
          next(`/login?redirect=/`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      // next(`/login?redirect=${to.path}`)
      //刷新页面后一律回到主页面
      next(`/login?redirect=/`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
