import request from '@/utils/request'

// 查询运输工具信息列表
export function listWmsVehicle(query) {
  return request({
    url: '/wms/WmsVehicle/list',
    method: 'get',
    params: query
  })
}

// 查询运输工具信息详细
export function getWmsVehicle(vehicleId) {
  return request({
    url: '/wms/WmsVehicle/' + vehicleId,
    method: 'get'
  })
}

// 新增运输工具信息
export function addWmsVehicle(data) {
  return request({
    url: '/wms/WmsVehicle',
    method: 'post',
    data: data
  })
}

// 修改运输工具信息
export function updateWmsVehicle(data) {
  return request({
    url: '/wms/WmsVehicle',
    method: 'put',
    data: data
  })
}

// 删除运输工具信息
export function delWmsVehicle(vehicleId) {
  return request({
    url: '/wms/WmsVehicle/' + vehicleId,
    method: 'delete'
  })
}

// 获取运输工具位置信息
export function getLocationById(vehicleId) {
  return request({
    url: '/wms/WmsVehicle/getLocationById/' + vehicleId,
    method: 'get'
  })
}
