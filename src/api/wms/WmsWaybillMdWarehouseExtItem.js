import request from '@/utils/request'

// 查询运单-仓库方格中间列表
export function listWmsWaybillMdWarehouseExtItem(query) {
  return request({
    url: '/wms/WmsWaybillMdWarehouseExtItem/list',
    method: 'get',
    params: query
  })
}

// 查询运单-仓库方格中间详细
export function getWmsWaybillMdWarehouseExtItem(id) {
  return request({
    url: '/wms/WmsWaybillMdWarehouseExtItem/' + id,
    method: 'get'
  })
}

// 新增运单-仓库方格中间
export function addWmsWaybillMdWarehouseExtItem(data) {
  return request({
    url: '/wms/WmsWaybillMdWarehouseExtItem',
    method: 'post',
    data: data
  })
}

// 修改运单-仓库方格中间
export function updateWmsWaybillMdWarehouseExtItem(data) {
  return request({
    url: '/wms/WmsWaybillMdWarehouseExtItem',
    method: 'put',
    data: data
  })
}

// 删除运单-仓库方格中间
export function delWmsWaybillMdWarehouseExtItem(id) {
  return request({
    url: '/wms/WmsWaybillMdWarehouseExtItem/' + id,
    method: 'delete'
  })
}
