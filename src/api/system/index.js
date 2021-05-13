import request from '@/utils/request'

// 查询行政区列表
export function count() {
  return request({
    url: '/system/index/count',
    method: 'get',
  })
}
