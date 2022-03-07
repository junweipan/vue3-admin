import { login, logout, getInfo } from '@/api/user'
import {
  getToken,
  setToken,
  removeToken,
  getOperator,
  removeOperator,
  setOperator,
  getRoleID,
  removeRoleID,
  setRoleID
} from '@/utils/auth'
import router, { resetRouter } from '@/router'

//后端返回data:
// oprName: 操作员名称
// roleInfoList: 操作员所有的roles
// roleName: 当前的role
// roleType: 当前role的type, 本级02或汇总01
// brhName: 操作员所属机构
const loginStatus = 'flag for is or not logged'

const state = {
  token: getToken(),
  name: '',
  avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
  roles: ['admin'],
  operator: {},
  currentRoleID: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_OPERATOR: (state, operator) => {
    state.operator = operator
  },
  SET_CURRENT_ROLE_ID: (state, roleId) => {
    state.currentRoleID = roleId
  }
}

const actions = {
  changeRole({ commit }, roleId) {
    //刷新cookie和store中的current role ID
    commit('SET_CURRENT_ROLE_ID', roleId)
    setRoleID(roleId)
  },
  // user login
  login({ commit }, userCredential) {
    return new Promise((resolve, reject) => {
      login(userCredential)
        .then(response => {
          //套了多层data, 后续需要优化
          const { data } = response.data
          const operator = data
          //operator中的成员
          const {
            oprId,
            roleId,
            oprName,
            roleInfoList,
            roleName,
            roleType,
            brhName
          } = operator
          //存入store
          commit('SET_TOKEN', loginStatus)
          commit('SET_OPERATOR', operator)
          commit('SET_CURRENT_ROLE_ID', operator.roleId)

          // 存入cookie
          setToken(loginStatus)
          setOperator(operator)
          setRoleID(roleId)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.operator.oprId)
        .then(response => {
          // json data层级有点混乱, 需要优化
          const { data } = response.data
          const operator = data
          if (response.data.code !== 200) {
            return reject('Verification failed, please Login again.')
          }
          const {
            oprId,
            roleId,
            oprName,
            roleInfoList,
            roleName,
            roleType,
            brhName
          } = operator

          // 刷新 store
          commit('SET_TOKEN', loginStatus)
          commit('SET_OPERATOR', operator)
          commit('SET_CURRENT_ROLE_ID', operator.roleId)

          // 刷新 cookie
          setToken(loginStatus)
          setOperator(operator)
          setRoleID(roleId)

          resolve(state.operator.roleInfoList)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          //清空store
          commit('SET_TOKEN', '')
          commit('SET_CURRENT_ROLE_ID', '')
          commit('SET_OPERATOR', {})

          // 清空cookie
          removeToken()
          removeOperator()
          removeRoleID()

          //清空标签路由
          dispatch('tagsView/delAllViews', null, { root: true })
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // remove login status, currentRoleId, operator
  resetStatus({ commit }) {
    return new Promise(resolve => {
      //清空store
      commit('SET_TOKEN', '')
      commit('SET_CURRENT_ROLE_ID', '')
      commit('SET_OPERATOR', {})

      // 清空cookie
      removeToken()
      removeOperator()
      removeRoleID()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
