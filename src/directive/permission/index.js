import store from '@/store'

export const Permission = app => {
  app.directive('permission', {
    mounted(el, binding) {
      const RoleID = store.getters.currentRoleID
      console.log('el',el);
      console.log('RoleID', RoleID)
      console.log('binding.value', binding.value)
      if (binding.value && RoleID !== binding.value) {
        if (binding.value.length > 0) {
          const permissionRoles = binding.value
          if (!permissionRoles.includes(RoleID)) {
            console.log("delete");
            console.log(el.parentNode);
            el.parentNode.removeChild(el)
          }
        }
      } else {
        throw new Error(`need roles! Like v-permission="['admin','editor']"`)
      }
    }
  })
}
