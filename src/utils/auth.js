import Cookies from 'js-cookie'


const loginStatus = 'flag for is or not logged'
const Operator = "operator"
const RoleID = 'roleId'
export function getToken() {
  return Cookies.get(loginStatus)
}
export function setToken(status) {
  return Cookies.set(loginStatus, status)
}

export function removeToken() {
  return Cookies.remove(loginStatus)
}

export function removeOperator() {
  return Cookies.remove(Operator)
}
export function getOperator() {
  return Cookies.get(Operator)
}

export function setOperator(opr) {
  return Cookies.set(Operator, opr)
}


export function removeRoleID() {
  return Cookies.remove(RoleID)
}
export function getRoleID() {
  return Cookies.get(RoleID)
}

export function setRoleID(roleId) {
  return Cookies.set(RoleID, roleId)
}
