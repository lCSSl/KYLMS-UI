import request from '@/utils/request'

// 查询运单拓展信息-费用列表
export function listWmsWaybillExtSettlement(query) {
  return request({
    url: '/wms/WmsWaybillExtSettlement/list',
    method: 'get',
    params: query
  })
}

// 查询运单拓展信息-费用详细
export function getWmsWaybillExtSettlement(wbSettlementId) {
  return request({
    url: '/wms/WmsWaybillExtSettlement/' + wbSettlementId,
    method: 'get'
  })
}

// 新增运单拓展信息-费用
export function addWmsWaybillExtSettlement(data) {
  return request({
    url: '/wms/WmsWaybillExtSettlement',
    method: 'post',
    data: data
  })
}

// 修改运单拓展信息-费用
export function updateWmsWaybillExtSettlement(data) {
  return request({
    url: '/wms/WmsWaybillExtSettlement',
    method: 'put',
    data: data
  })
}

// 删除运单拓展信息-费用
export function delWmsWaybillExtSettlement(wbSettlementId) {
  return request({
    url: '/wms/WmsWaybillExtSettlement/' + wbSettlementId,
    method: 'delete'
  })
}
