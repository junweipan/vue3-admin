import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken,getOperator,removeOperator,setOperator, getRoleID,removeRoleID,setRoleID } from '@/utils/auth'
import router, { resetRouter } from '@/router'

//后端返回data:
// oprName: 操作员名称
// roleInfoList: 操作员所有的roles
// roleName: 当前的role
// roleType: 当前role的type, 本级02或汇总01
// brhName: 操作员所属机构
const fakeToken = "vue_admin_template_token"

const state = {
  token: getToken(),
  name: '',
  avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
  introduction: '',
  roles: ['admin'],
  operator:{},
  currentRoleID:null,
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
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
  },
}

const actions = {
  changeRole({ commit,state }, roleId){
    //刷新cookie和store中的current role ID
    commit('SET_CURRENT_ROLE_ID', roleId)
    setRoleID(roleId)
  },
  // user login
  login({ commit }, userCredential) {
    return new Promise((resolve, reject) => {
      login(userCredential).then(response => {
        //套了多层data, 后续需要优化
        const {data}  = response.data
        const operator = data
        //operator中的成员
        const { oprId, roleId, oprName, roleInfoList, roleName, roleType, brhName } = operator
        //存入operator -> store
        commit('SET_OPERATOR', operator)
        // commit('SET_CURRENT_ROLE_ID', operator.roleId)
        // 存入cookie
        setToken(fakeToken)
        setOperator(operator)
        // setRoleID(roleId)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  setOperator({ commit, state }){
    commit('SET_OPERATOR', JSON.parse(getOperator()))
  },
  // get user info
  getInfo({ commit, state }) {
    commit('SET_OPERATOR', JSON.parse(getOperator()))
    // commit('SET_CURRENT_ROLE_ID', JSON.parse(getRoleID()))
    return new Promise((resolve, reject) => {
      getInfo(state.operator.oprId).then(response => {
        // json data层级有点混乱, 需要优化
        const { data } = response.data
        const operator = data
        if (response.data.code !== 200) {
          return reject('Verification failed, please Login again.')
        }
        const { oprId, roleId, oprName, roleInfoList, roleName, roleType, brhName } = operator
        // 把operator信息存入store
        commit('SET_OPERATOR', operator)
        commit('SET_CURRENT_ROLE_ID', roleId)
        
        setRoleID(roleId)
        resolve(state.operator.roleInfoList)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    for (const item of accessRoutes) {
      router.addRoute(item)
    }

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
