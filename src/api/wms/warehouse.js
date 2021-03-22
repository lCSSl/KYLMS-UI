import request from '@/utils/request'

// 查询站点(仓库)信息列表
export function listWarehouse(query) {
  return request({
    // url: '/wms/warehouse/list',
    url: '/wms/warehouse/list/vo',
    method: 'get',
    params: query
  })
}

// 查询站点(仓库)信息详细
export function getWarehouse(warehouseId) {
  return request({
    url: '/wms/warehouse/' + warehouseId,
    method: 'get'
  })
}

// 新增站点(仓库)信息
export function addWarehouse(data) {
  return request({
    url: '/wms/warehouse',
    method: 'post',
    data: data
  })
}

// 修改站点(仓库)信息
export function updateWarehouse(data) {
  return request({
    url: '/wms/warehouse',
    method: 'put',
    data: data
  })
}

// 删除站点(仓库)信息
export function delWarehouse(warehouseId) {
  return request({
    url: '/wms/warehouse/' + warehouseId,
    method: 'delete'
  })
}
