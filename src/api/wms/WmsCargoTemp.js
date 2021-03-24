import request from '@/utils/request'

// 查询运单货物临时列表
export function listWmsCargoTemp(query) {
  return request({
    url: '/wms/WmsCargoTemp/list',
    method: 'get',
    params: query
  })
}

// 查询运单货物临时详细
export function getWmsCargoTemp(id) {
  return request({
    url: '/wms/WmsCargoTemp/' + id,
    method: 'get'
  })
}

// 新增运单货物临时
export function addWmsCargoTemp(data) {
  return request({
    url: '/wms/WmsCargoTemp',
    method: 'post',
    data: data
  })
}

// 修改运单货物临时
export function updateWmsCargoTemp(data) {
  return request({
    url: '/wms/WmsCargoTemp',
    method: 'put',
    data: data
  })
}

// 删除运单货物临时
export function delWmsCargoTemp(id) {
  return request({
    url: '/wms/WmsCargoTemp/' + id,
    method: 'delete'
  })
}
