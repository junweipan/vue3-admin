// 角色ID  角色名称
// 1	   开发人员
// 11	   超级管理员
// 19	   公司领导
// 21	   工程主持人
// 22	   产值分配经办人
// 62	   中层领导（财务主管所室负责人）
// 64	   普通员工
// 65	   产值工作人员
const valueRoutes = {
  path: '/value-module',
  component: () => import('@/layout/index'),
  redirect: '/value-module/dashboard',
  alwaysShow: true, // will always show the root menu
  name: 'Value-Module',
  meta: {
    title: '产值分配',
    icon: 'lock',
    roles: ['admin', 'editor'], // you can set roles in root nav
    module: '/value-module'
  },
  children: [
    {
      path: 'dashboard',
      component: () => import('@/views/moduleValue/dashboard/index'),
      name: 'Dashboard-Value',
      meta: {
        title: '产值分配 主页',
        roles: ['admin'], // or you can only set roles in sub nav
        affix: false,
        icon: 'el-icon-s-order',
        module: '/value-module'
      }
    },
    {
      path: 'article',
      name: 'Article',
      component: () => import('@/views/moduleValue/article/index'),
      meta: {
        title: '产值分配-菜单功能1',
        icon: 'el-icon-notebook-1',
        module: '/value-module'
      }
    },
    {
      path: 'category',
      name: 'Category',
      component: () => import('@/views/moduleValue/category/index'),
      meta: {
        title: '产值分配-菜单功能2',
        icon: 'el-icon-s-order',
        module: '/value-module'
      }
    }
  ]
}

export default valueRoutes
