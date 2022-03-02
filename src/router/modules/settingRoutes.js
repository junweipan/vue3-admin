// 角色ID  角色名称
// 1	   开发人员
// 11	   超级管理员
// 19	   公司领导
// 21	   工程主持人
// 22	   产值分配经办人
// 62	   中层领导（财务主管所室负责人）
// 64	   普通员工
// 65	   产值工作人员

// 如果meta中没有roles属性, 则默认加入路由
// 最低权限: roles:[1,11,19,21,22,62,64,65]
// 最高权限: roles:[1]
const settingRoutes = {
  path: '/setting-module',
  component: () => import('@/layout/index'),
  redirect: '/setting-module/basic',
  name: 'Setting-Module',
  meta: {
    title: '系统设置',
    icon: 'nested',
    module: '/setting-module',
  },
  children: [
    {
      path: 'basic',
      component: () => import('@/views/moduleSetting/manageBasic/index'), // Parent router-view
      name: 'ManageBasic',
      meta: { title: '基础管理',module: '/setting-module', roles:[1,11,19,21,22] },
      redirect: '/setting-module/basic/branch-info',
      children: [
        {
          path: 'branch-info',
          component: () =>
            import('@/views/moduleSetting/manageBasic/branchInfo'),
          name: 'BranchInfo',
          meta: { title: '机构信息维护',module: '/setting-module' ,roles:[1,11,19,21,22]}
        },
        {
          path: 'branch-info-edit-add',
          component: () =>
            import(
              '@/views/moduleSetting/manageBasic/branchInfo/branchEditAdd'
            ),
          name: 'BranchInfoEditAdd',
          meta: { title: '机构增加/修改',module: '/setting-module' , roles:[1]}
        },
        {
          path: 'department-info',
          component: () =>
            import('@/views/moduleSetting/manageBasic/departmentInfo'),
          name: 'DepartmentInfo',
          meta: { title: '部门信息维护',module: '/setting-module',roles:[1,11,19,21,22] }
        },
        {
          path: 'occupation-info',
          component: () =>
            import('@/views/moduleSetting/manageBasic/occupationInfo'),
          name: 'OccupationInfo',
          meta: { title: '岗位信息维护' ,module: '/setting-module',roles:[1,11,19,21,22]}
        },
        {
          path: 'employee-info',
          component: () =>
            import('@/views/moduleSetting/manageBasic/employeeInfo'),
          name: 'EmployeeInfo',
          meta: { title: '员工信息维护',module: '/setting-module',roles:[1,11,19,21,22] }
        }
      ]
    },
    {
      path: 'system',
      component: () => import('@/views/moduleSetting/manageSystem/index'), // Parent router-view
      name: 'ManageSystem',
      meta: { title: '系统管理' ,module: '/setting-module',roles:[1,11,19,21,22]},
      redirect: '/setting-module/system/role-info',
      children: [
        {
          path: 'role-info',
          component: () =>
            import('@/views/moduleSetting/manageSystem/roleInfo'),
          name: 'RoleInfo',
          meta: { title: '角色信息维护' ,module: '/setting-module',roles:[1,11,19,21,22]}
        },
        {
          path: 'role-info-edit-add',
          component: () =>
            import('@/views/moduleSetting/manageSystem/roleInfo/roleEditAdd'),
          name: 'RoleInfoEditAdd',
          meta: { title: '角色增加/修改',module: '/setting-module', roles:[1] }
        },
        {
          path: 'audit',
          component: () => import('@/views/moduleSetting/manageSystem/audit'),
          name: 'Audit',
          meta: { title: '审核流程配置' ,module: '/setting-module',roles:[1,11,19,21,22]}
        },
        {
          path: 'operator',
          component: () =>
            import('@/views/moduleSetting/manageSystem/operator'),
          name: 'Operator',
          meta: { title: '操作员管理',module: '/setting-module',roles:[1,11,19,21,22] }
        },
        {
          path: 'operator-edit-add',
          component: () =>
            import(
              '@/views/moduleSetting/manageSystem/operator/operatorEditAdd'
            ),
          name: 'OperatorEditAdd',
          meta: { title: '操作员增加/修改',module: '/setting-module' ,roles:[1]}
        },
        {
          path: 'operation-log',
          component: () =>
            import('@/views/moduleSetting/manageSystem/operationLog'),
          name: 'OperationLog',
          meta: { title: '操作日志查询',module: '/setting-module' ,roles:[1,11,19,21,22]}
        },
        {
          path: 'system-config',
          component: () =>
            import('@/views/moduleSetting/manageSystem/systemConfig'),
          name: 'SystemConfig',
          meta: { title: '系统参数配置',module: '/setting-module',roles:[1,11,19,21,22] }
        }
      ]
    },
    {
      path: 'setting',
      component: () => import('@/views/moduleSetting/manageSetting/index'), // Parent router-view
      name: 'ManageSetting',
      meta: { title: '配置管理',module: '/setting-module',roles:[1,11,19,21,22] },
      redirect: '/setting-module/setting/busi-config',
      children: [
        {
          path: 'project-type',
          component: () =>
            import('@/views/moduleSetting/manageSetting/projectType'),
          name: 'ProjectType',
          meta: { title: '工程类型维护',module: '/setting-module',roles:[1,11,19,21,22] }
        },
        {
          path: 'occupation-ratio',
          component: () =>
            import('@/views/moduleSetting/manageSetting/occupationRatio'),
          name: 'OccupationRatio',
          meta: { title: '工种岗位比例配置' ,module: '/setting-module',roles:[1,11]}
        },
        {
          path: 'busi-config',
          component: () =>
            import('@/views/moduleSetting/manageSetting/busiConfig'),
          name: 'BusiConfig',
          meta: { title: '业务参数配置' ,module: '/setting-module',roles:[1,11]}
        }
      ]
    }
  ]
}

export default settingRoutes
