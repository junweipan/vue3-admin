const contractRoutes = {
  path: '/contract-module',
  component: () => import('@/layout/index'),
  redirect: '/contract-module/dashboard',
  name: 'Contract-Module',
  meta: {
    title: '合同管理',
    icon: 'nested',
    module: 'contract'
  },
  children: [
    {
      path: 'dashboard',
      name: 'Dashboard-Contract',
      component: () => import('@/views/moduleContract/dashboard/index'),
      meta: {
        title: '合同管理-主页',
        icon: 'dashboard',
        affix: false,
        module: 'contract'
      }
    },
    {
      path: 'sysLog',
      name: 'SysLog',
      component: () => import('@/views/moduleContract/sysLog/index'),
      meta: {
        title: '合同管理-系统日志',
        icon: 'el-icon-s-order',
        module: 'contract'
      }
    },
    {
      path: 'funmanager',
      name: 'FunManager',
      component: () => import('@/views/moduleContract/funManager/index'),
      meta: {
        title: '合同管理-功能管理',
        icon: 'el-icon-collection-tag',
        module: 'contract'
      }
    },
    {
      path: 'tabledata',
      name: 'Tabledata',
      component: () => import('@/views/moduleContract/tableData/index'),
      meta: {
        title: '合同管理-数据测试',
        icon: 'el-icon-s-grid',
        module: 'contract'
      }
    },
    {
      path: 'tabledata-edit',
      name: 'TabledataEdit',
      component: () => import('@/views/moduleContract/tableData/edit'),
      meta: {
        title: '合同管理-数据测试-修改',
        icon: 'el-icon-s-grid',
        module:'contract'
      }
    }
  ]
}

export default contractRoutes
