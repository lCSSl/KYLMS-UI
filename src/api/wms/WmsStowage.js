import request from '@/utils/request'

// 查询运单配载列表
export function listWmsStowage( query ) {
  return request( {
    url: '/wms/WmsStowage/list',
    method: 'get',
    params: query
  } )
}

// 查询运单配载详细
export function getWmsStowage( stowageId ) {
  return request( {
    url: '/wms/WmsStowage/' + stowageId,
    method: 'get'
  } )
}

// 新增运单配载
export function addWmsStowage( data ) {
  return request( {
    url: '/wms/WmsStowage',
    method: 'post',
    data: data
  } )
}

// 修改运单配载
export function updateWmsStowage( data ) {
  return request( {
    url: '/wms/WmsStowage',
    method: 'put',
    data: data
  } )
}

// 删除运单配载
export function delWmsStowage( stowageId ) {
  return request( {
    url: '/wms/WmsStowage/' + stowageId,
    method: 'delete'
  } )
}

// 结束运单配载
export function endStowage( stowageId ) {
  return request( {
    url: '/wms/WmsStowage/endStowage/' + stowageId,
    method: 'post'
  } )
}

// 发车
export function departure( stowageId ) {
  return request( {
    url: '/wms/WmsStowage/departure/' + stowageId,
    method: 'post'
  } )
}

