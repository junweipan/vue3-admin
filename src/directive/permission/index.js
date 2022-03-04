import store from '@/store'

export const Permission = app => {
  app.directive('permission', {
    mounted(el, binding) {
      const RoleID = store.getters.currentRoleID
      if (binding.value && RoleID !== binding.value) {
        if (binding.value.length > 0) {
          const permissionRoles = binding.value
          if (!permissionRoles.includes(RoleID)) {
            el.parentNode.removeChild(el)
          }
        }
      } else {
        throw new Error(`need roles! Like v-permission="['admin','editor']"`)
      }
    }
  })
}
