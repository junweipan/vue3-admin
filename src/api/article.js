import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/vue-element-admin/article/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/vue-element-admin/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-element-admin/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/vue-element-admin/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/vue-element-admin/article/update',
    method: 'post',
    data
  })
}
// 文章审核通过
export function auditSuccess(id) {
  return request({
    url: `/article/article/audit/success/${id}`,
    method: 'get'
  })
}

// 文章审核未通过
export function auditFail(id) {
  return request({
    url: `/article/article/audit/fail/${id}`,
    method: 'get'
  })
}

// 查询文章详情
export function getById(id) {
  return request({
    url: `/article/article/${id}`,
    method: 'get'
  })
}
