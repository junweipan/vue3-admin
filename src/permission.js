import router from './router'
import store from './store'
import { ElMessage } from 'element-plus'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken, getRoleID, getOperator } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // 这个token跟jwt无关, 只是作为是否登录的flag
  const hasToken = getToken()
  const hasRoleID = getRoleID()
  const hasOperator = getOperator()
  // 如果cookie中token存在hasToken,hasRoleID,hasOperator 才能放行, 以防显示信息不全bug
  if (hasToken && hasRoleID && hasOperator) {
    
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      // const hasRoles = store.getters.roles && store.getters.roles.length > 0
      // 若store中没有currentRoleID的值, 会进入else, 
      // 在await store.dispatch('user/getInfo')中给currentRoleID, operator, loginstatus 刷新/赋值
      const hasRoles = store.getters.currentRoleID !== null
      
      if (hasRoles) {
        // 初始化router, accessRoutes为asyncRoutes,
        const accessRoutes = await store.dispatch(
          'permission/generateAsyncRoutes'
        )
        
        // dynamically add accessible routes
        for (const item of accessRoutes) {
          router.addRoute(item)
        }
        next()
      } else { //如果currentRoleID不存在
        try {
          // get user info
          // 功能: call 后端, 把currentRoleID, operator, roleId 刷新后放入store 和 cookie
          await store.dispatch('user/getInfo')

          // 初始化router, accessRoutes为asyncRoutes,
          const accessRoutes = await store.dispatch(
            'permission/generateAsyncRoutes'
          )
          
          // dynamically add accessible routes
          for (const item of accessRoutes) {
            router.addRoute(item)
          }
          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {// 如果cookie过期,则清楚cookie,并返回login页面
         
          await store.dispatch('user/resetStatus')
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
