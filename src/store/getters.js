const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  //临时变量, 会被优化掉
  roles: state => state.user.roles,
  operator: state => state.user.operator,
  //控制sidebar显示 和 v-permission button级别显示
  currentRoleID: state => state.user.currentRoleID,
  permission_routes: state => state.permission.routes,
  constantRoutes: state => state.permission.constantRoutes,
  errorLogs: state => state.errorLog.logs
}
export default getters
