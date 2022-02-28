import request from '@/utils/request'


export function getCaptcha() {
  console.log("getCaptcha")
  // console.log('process.env.VUE_APP_BASE_API',process.env.VUE_APP_BASE_API);
  return request({
    url: 'system/validateCode',
    method: 'get',
    responseType: 'blob'
  })
}

export function login({username,password,validateCode}) {
  var formData = new FormData(); // Currently empty
  formData.append('oprid', username);
  formData.append('password', password);
  formData.append('validateCode', validateCode);
  return request({ // Promise
    url: 'system2/login2',
    method: 'post',
    data: formData
  })
}

export function getInfo(oprid) {
  var formData = new FormData(); // Currently empty
  formData.append('oprid', oprid);
  return request({
    url: 'system/getopr',
    method: 'post',
    data: formData
  })
}

// export function logout() {
//   return request({
//     url: '/vue-element-admin/user/logout',
//     method: 'post'
//   })
// }
