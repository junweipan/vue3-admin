// 角色ID  角色名称
// 1	   开发人员
// 11	   超级管理员
// 19	   公司领导
// 21	   工程主持人
// 22	   产值分配经办人
// 62	   中层领导（财务主管所室负责人）
// 64	   普通员工
// 65	   产值工作人员
const analysisRoutes = {
  path: '/analysis-module',
  component: () => import('@/layout/index'),
  redirect: '/analysis-module/dashboard',
  name: 'Analysis-Module',
  meta: {
    title: '统计分析',
    icon: 'nested',
    module: '/analysis-module'
  },
  children: [
    {
      path: 'dashboard',
      name: 'Dashboard-Analysis',
      component: () => import('@/views/moduleAnalysis/dashboard/index'),
      meta: {
        title: '统计分析-主页',
        icon: 'userInfo',
        affix: false,
        module: '/analysis-module'
      }
    },
    {
      path: 'charts-demo',
      name: 'ChartsDemo',
      component: () => import('@/views/moduleAnalysis/charts/index'),
      meta: {
        title: '统计分析-图形展示',
        icon: 'userInfo',
        affix: false,
        module: '/analysis-module'
      }
    }
  ]
}

export default analysisRoutes
