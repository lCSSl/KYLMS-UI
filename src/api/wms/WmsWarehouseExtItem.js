import request from '@/utils/request'

// 查询仓库拓展-仓库方格信息列表
export function listWmsWarehouseExtItem(query) {
  return request({
    url: '/wms/WmsWarehouseExtItem/list',
    method: 'get',
    params: query
  })
}

// 查询仓库拓展-仓库方格信息详细
export function getWmsWarehouseExtItem(itemId) {
  return request({
    url: '/wms/WmsWarehouseExtItem/' + itemId,
    method: 'get'
  })
}
// 查询仓库拓展-仓库方格信息详细
export function getWmsWarehouseExtItemByXY(query) {
  return request({
    url: '/wms/WmsWarehouseExtItem/getInfo',
    method: 'get',
    params: query
  })
}
// 查询仓库拓展-仓库方格信息详细
export function getWmsWaybillByItemId(itemId) {
  return request({
    url: '/wms/WmsWarehouseExtItem/getWaybillInfo/'+itemId,
    method: 'get',
  })
}
// 新增仓库拓展-仓库方格信息
export function addWmsWarehouseExtItem(data) {
  return request({
    url: '/wms/WmsWarehouseExtItem',
    method: 'post',
    data: data
  })
}

// 修改仓库拓展-仓库方格信息
export function updateWmsWarehouseExtItem(data) {
  return request({
    url: '/wms/WmsWarehouseExtItem',
    method: 'put',
    data: data
  })
}

// 删除仓库拓展-仓库方格信息
export function delWmsWarehouseExtItem(itemId) {
  return request({
    url: '/wms/WmsWarehouseExtItem/' + itemId,
    method: 'delete'
  })
}
// 装载方格
export function loadWaybill(waybillId,data) {
  return request({
    url: '/wms/WmsWarehouseExtItem/loadWaybill/' + waybillId,
    method: 'put',
    data
  })
}
