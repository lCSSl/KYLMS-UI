import request from '@/utils/request'

// 查询货物列表
export function listCargo(query) {
  return request({
    url: '/wms/cargo/list',
    method: 'get',
    params: query
  })
}

// 查询货物详细
export function getCargo(cargoId) {
  return request({
    url: '/wms/cargo/' + cargoId,
    method: 'get'
  })
}

// 新增货物
export function addCargo(data) {
  return request({
    url: '/wms/cargo',
    method: 'post',
    data: data
  })
}

// 修改货物
export function updateCargo(data) {
  return request({
    url: '/wms/cargo',
    method: 'put',
    data: data
  })
}

// 删除货物
export function delCargo(cargoId) {
  return request({
    url: '/wms/cargo/' + cargoId,
    method: 'delete'
  })
}
