import request from '@/utils/request'

// 查询配载运单中间关联列表
export function listWmsStowageMdWaybill(query) {
  return request({
    url: '/wms/WmsStowageMdWaybill/list',
    method: 'get',
    params: query
  })
}

// 查询配载运单中间关联详细
export function getWmsStowageMdWaybill(routeId) {
  return request({
    url: '/wms/WmsStowageMdWaybill/' + routeId,
    method: 'get'
  })
}

// 新增配载运单中间关联
export function addWmsStowageMdWaybill(data) {
  return request({
    url: '/wms/WmsStowageMdWaybill',
    method: 'post',
    data: data
  })
}

// 修改配载运单中间关联
export function updateWmsStowageMdWaybill(data) {
  return request({
    url: '/wms/WmsStowageMdWaybill',
    method: 'put',
    data: data
  })
}

// 删除配载运单中间关联
export function delWmsStowageMdWaybill(routeId) {
  return request({
    url: '/wms/WmsStowageMdWaybill/' + routeId,
    method: 'delete'
  })
}
// 删除配载运单中间关联
export function delWaybillFormRoute(waybillId) {
  return request({
    url: '/wms/WmsStowageMdWaybill/delWaybillFormRoute/'+waybillId,
    method: 'delete'
  })
}
//配载运单关联
export function makeStowage(routeId,waybillIds) {
  return request({
    url: '/wms/WmsStowageMdWaybill/makeStowage/'+routeId+'/'+waybillIds,
    method: 'post',
  });
}
