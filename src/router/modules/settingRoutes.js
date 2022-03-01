const settingRoutes = {
  path: '/setting-module',
  component: () => import('@/layout/index'),
  redirect: '/setting-module/basic',
  name: 'Setting-Module',
  meta: {
    title: '系统设置',
    icon: 'nested',
    module: 'setting'
  },
  children: [
    {
      path: 'basic',
      component: () => import('@/views/moduleSetting/manageBasic/index'), // Parent router-view
      name: 'ManageBasic',
      meta: { title: '基础管理',module: 'setting' },
      redirect: '/setting-module/basic/branch-info',
      children: [
        {
          path: 'branch-info',
          component: () =>
            import('@/views/moduleSetting/manageBasic/branchInfo'),
          name: 'BranchInfo',
          meta: { title: '机构信息维护',module: 'setting' }
        },
        {
          path: 'branch-info-edit-add',
          component: () =>
            import(
              '@/views/moduleSetting/manageBasic/branchInfo/branchEditAdd'
            ),
          name: 'BranchInfoEditAdd',
          meta: { title: '机构增加/修改',module: 'setting' }
        },
        {
          path: 'department-info',
          component: () =>
            import('@/views/moduleSetting/manageBasic/departmentInfo'),
          name: 'DepartmentInfo',
          meta: { title: '部门信息维护',module: 'setting' }
        },
        {
          path: 'occupation-info',
          component: () =>
            import('@/views/moduleSetting/manageBasic/occupationInfo'),
          name: 'OccupationInfo',
          meta: { title: '岗位信息维护' ,module: 'setting'}
        },
        {
          path: 'employee-info',
          component: () =>
            import('@/views/moduleSetting/manageBasic/employeeInfo'),
          name: 'EmployeeInfo',
          meta: { title: '员工信息维护',module: 'setting' }
        }
      ]
    },
    {
      path: 'system',
      component: () => import('@/views/moduleSetting/manageSystem/index'), // Parent router-view
      name: 'ManageSystem',
      meta: { title: '系统管理' ,module: 'setting'},
      redirect: '/setting-module/system/role-info',
      children: [
        {
          path: 'role-info',
          component: () =>
            import('@/views/moduleSetting/manageSystem/roleInfo'),
          name: 'RoleInfo',
          meta: { title: '角色信息维护' ,module: 'setting'}
        },
        {
          path: 'role-info-edit-add',
          component: () =>
            import('@/views/moduleSetting/manageSystem/roleInfo/roleEditAdd'),
          name: 'RoleInfoEditAdd',
          meta: { title: '角色增加/修改',module: 'setting' }
        },
        {
          path: 'audit',
          component: () => import('@/views/moduleSetting/manageSystem/audit'),
          name: 'Audit',
          meta: { title: '审核流程配置' ,module: 'setting'}
        },
        {
          path: 'operator',
          component: () =>
            import('@/views/moduleSetting/manageSystem/operator'),
          name: 'Operator',
          meta: { title: '操作员管理',module: 'setting' }
        },
        {
          path: 'operator-edit-add',
          component: () =>
            import(
              '@/views/moduleSetting/manageSystem/operator/operatorEditAdd'
            ),
          name: 'OperatorEditAdd',
          meta: { title: '操作员增加/修改',module: 'setting' }
        },
        {
          path: 'operation-log',
          component: () =>
            import('@/views/moduleSetting/manageSystem/operationLog'),
          name: 'OperationLog',
          meta: { title: '操作日志查询',module: 'setting' }
        },
        {
          path: 'system-config',
          component: () =>
            import('@/views/moduleSetting/manageSystem/systemConfig'),
          name: 'SystemConfig',
          meta: { title: '系统参数配置',module: 'setting' }
        }
      ]
    },
    {
      path: 'setting',
      component: () => import('@/views/moduleSetting/manageSetting/index'), // Parent router-view
      name: 'ManageSetting',
      meta: { title: '配置管理',module: 'setting' },
      redirect: '/setting-module/setting/busi-config',
      children: [
        {
          path: 'project-type',
          component: () =>
            import('@/views/moduleSetting/manageSetting/projectType'),
          name: 'ProjectType',
          meta: { title: '工程类型维护',module: 'setting' }
        },
        {
          path: 'occupation-ratio',
          component: () =>
            import('@/views/moduleSetting/manageSetting/occupationRatio'),
          name: 'OccupationRatio',
          meta: { title: '工种岗位比例配置' ,module: 'setting'}
        },
        {
          path: 'busi-config',
          component: () =>
            import('@/views/moduleSetting/manageSetting/busiConfig'),
          name: 'BusiConfig',
          meta: { title: '业务参数配置' ,module: 'setting'}
        }
      ]
    }
  ]
}

export default settingRoutes
