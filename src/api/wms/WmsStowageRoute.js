import request from '@/utils/request'

// 查询运单配载线路列表
export function listWmsStowageRoute(query) {
  return request({
    url: '/wms/WmsStowageRoute/list',
    method: 'get',
    params: query
  })
}

// 查询运单配载线路详细
export function getWmsStowageRoute(routeId) {
  return request({
    url: '/wms/WmsStowageRoute/' + routeId,
    method: 'get'
  })
}

// 新增运单配载线路
export function addWmsStowageRoute(data) {
  return request({
    url: '/wms/WmsStowageRoute',
    method: 'post',
    data: data
  })
}

// 修改运单配载线路
export function updateWmsStowageRoute(data) {
  return request({
    url: '/wms/WmsStowageRoute',
    method: 'put',
    data: data
  })
}

// 删除运单配载线路
export function delWmsStowageRoute(routeId) {
  return request({
    url: '/wms/WmsStowageRoute/' + routeId,
    method: 'delete'
  })
}
