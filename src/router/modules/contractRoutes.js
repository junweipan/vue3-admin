// 角色ID  角色名称
// 1	   开发人员
// 11	   超级管理员
// 19	   公司领导
// 21	   工程主持人
// 22	   产值分配经办人
// 62	   中层领导（财务主管所室负责人）
// 64	   普通员工
// 65	   产值工作人员
const contractRoutes = {
  path: '/contract-module',
  component: () => import('@/layout/index'),
  redirect: '/contract-module/dashboard',
  name: 'Contract-Module',
  meta: {
    title: '合同管理',
    icon: 'nested',
    module: '/contract-module'
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
        module: '/contract-module'
      }
    },
    {
      path: 'sysLog',
      name: 'SysLog',
      component: () => import('@/views/moduleContract/sysLog/index'),
      meta: {
        title: '合同管理-系统日志',
        icon: 'el-icon-s-order',
        module: '/contract-module'
      }
    },
    {
      path: 'funmanager',
      name: 'FunManager',
      component: () => import('@/views/moduleContract/funManager/index'),
      meta: {
        title: '合同管理-功能管理',
        icon: 'el-icon-collection-tag',
        module: '/contract-module'
      }
    },
    {
      path: 'tabledata',
      name: 'Tabledata',
      component: () => import('@/views/moduleContract/tableData/index'),
      meta: {
        title: '合同管理-数据测试',
        icon: 'el-icon-s-grid',
        module: '/contract-module'
      }
    },
    {
      path: 'tabledata-edit',
      name: 'TabledataEdit',
      component: () => import('@/views/moduleContract/tableData/edit'),
      meta: {
        title: '合同管理-数据测试-修改',
        icon: 'el-icon-s-grid',
        module: '/contract-module'
      }
    }
  ]
}

export default contractRoutes
