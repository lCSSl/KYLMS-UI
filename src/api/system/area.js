import request from '@/utils/request'

// 查询行政区列表
export function listArea(query) {
  return request({
    url: '/system/area/list',
    method: 'get',
    params: query
  })
}

// 查询行政区详细
export function getArea(id) {
  return request({
    url: '/system/area/' + id,
    method: 'get'
  })
}

// 查询行政区详细
export function findTree(code) {
  return request({
    url: '/system/area/findTree/' + code,
    method: 'get'
  })
}

// 新增行政区
export function addArea(data) {
  return request({
    url: '/system/area',
    method: 'post',
    data: data
  })
}

// 修改行政区
export function updateArea(data) {
  return request({
    url: '/system/area',
    method: 'put',
    data: data
  })
}

// 删除行政区
export function delArea(id) {
  return request({
    url: '/system/area/' + id,
    method: 'delete'
  })
}
