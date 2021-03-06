/**
 * “用户管理”相关接口
 */
import request from '@/utils/request'

export function queryUser(queryParam,pageParam) {
  return request({
    url: '/user/query',
    method: 'post',
    data: {
      ...queryParam,
      current: pageParam.current,
      size: pageParam.size
    }
  })
}

export function updateUser(data) {
  return request({
    url: '/user/info',
    method: 'patch',
    data
  })
}

export function addUser(data) {
  return request({
    url: '/user',
    method: 'post',
    data
  })
}

export function deleteUser(data) {
  return request({
    url: '/user',
    method: 'delete',
    data
  })
}

export function findUserRoleIds(uid) {
  return request({
    url: '/user/'+uid+'/roles',
    method: 'get'
  })
}

/**
 * 更新用户的角色
 * @param perm
 */
export function updateUserRoles(data) {
  return request({
    url: '/user/role',
    method: 'patch',
    data
  })
}
