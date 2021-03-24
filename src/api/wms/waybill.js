import request from '@/utils/request'

// 查询运单信息主列表
export function listWaybill(query) {
  return request({
    // url: '/wms/waybill/list',
    url: '/wms/waybill/list/vo',
    method: 'get',
    params: query
  })
}

// 查询运单信息主详细
export function getWaybill(waybillId) {
  return request({
    url: '/wms/waybill/' + waybillId,
    method: 'get'
  })
}

// 新增运单信息主
export function addWaybill(data) {
  return request({
    url: '/wms/waybill',
    method: 'post',
    data: data
  })
}

// 修改运单信息主
export function updateWaybill(data) {
  return request({
    url: '/wms/waybill',
    method: 'put',
    data: data
  })
}

// 删除运单信息主
export function delWaybill(waybillId) {
  return request({
    url: '/wms/waybill/' + waybillId,
    method: 'delete'
  })
}
