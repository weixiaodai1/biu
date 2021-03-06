import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import avatorImg from '@/assets/avator.jpg'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: avatorImg,
    introduction: '',
    roles: [],
    perms: new Set(),
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
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
    SET_PERMS: (state, perms) => {
      state.perms = new Set(perms)
    },
    ADD_PERM: (state, perm) => {
      state.perms = new Set([...state.perms,perm])
    },
    DEL_PERM: (state, perm) => {
      state.perms.delete(perm)
      state.perms = new Set([...state.perms])
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(res => {
          commit('SET_TOKEN', res.data.token)
          setToken(res.data.token)
          resolve()
        }).catch(error => {
          console.log('loginByUsername fail: %o',error)
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(res => {
          if (!res) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('error')
          }
          commit('SET_ROLES', res.data.roles)
          commit('SET_PERMS', res.data.perms)
          commit('SET_NAME', res.data.name)
          // commit('SET_AVATAR', data.avatar)
          //commit('SET_INTRODUCTION', res.data.introduction)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(res => {
          commit('SET_ROLES', res.data.roles)
          commit('SET_NAME', res.data.name)
          //commit('SET_AVATAR', res.data.avatar)
          commit('SET_INTRODUCTION', res.data.introduction)
          resolve()
        })
      })
    },

    // 动态修改权限
    addPerm({ commit }, perm) {
      return new Promise(resolve => {
        commit('ADD_PERM', perm)
        resolve()
      })
    },
    deletePerm({ commit }, perm) {
      return new Promise(resolve => {
        commit('DEL_PERM', perm)
        resolve()
      })
    },

  }
}

export default user
