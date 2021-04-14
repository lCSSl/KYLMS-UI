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
// 查询站点(仓库)信息列表
export function listNotExistsWarehouse(query) {
  return request({
    // url: '/wms/warehouse/list',
    url: '/wms/warehouse/listNotExists/vo',
    method: 'get',
    params: query
  })
}

// 查询仓库主管列表
export function getWarehouseInChargeList() {
  return request({
    url: 'wms/warehouse/getInChargeList',
    method: 'get',
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

// 初始化站点(仓库)方格
export function initWarehouseExtItem(data) {
  return request({
    url: '/wms/warehouse/initWarehouseExtItem' + testLoopObj(data),
    method: 'post'
  });
}
// 获取默认站点
export function getDefaultWarehouse() {
  return request({
    url: '/wms/warehouse/getDefaultWarehouse',
    method: 'get'
  });
}

function testLoopObj(data) {
  let params = '';
  for (let key in data) {
    params = params + '/' + data[key];
  }
  console.log(params)
  return params;
}
