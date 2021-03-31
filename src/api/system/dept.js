import request from '@/utils/request'

// 查询部门列表
export function listDept(query) {
  return request({
    url: '/system/dept/list',
    method: 'get',
    params: query
  })
}

// 查询部门列表（排除节点）
export function listDeptExcludeChild(deptId) {
  return request({
    url: '/system/dept/list/exclude/' + deptId,
    method: 'get'
  })
}

// 查询部门详细
export function getDept(deptId) {
  return request({
    url: '/system/dept/' + deptId,
    method: 'get'
  })
}
// 查询部门详细
export function getDeptNameByDeptId(deptId) {
  return request({
    url: '/system/dept/getName/' + deptId,
    method: 'get'
  })
}

// 查询部门下拉树结构
export function treeSelect(params) {
  return request({
    url: '/system/dept/treeSelect',
    method: 'get',
    params
  })
}

// 根据角色ID查询部门树结构
export function roleDeptTreeSelect(roleId) {
  return request({
    url: '/system/dept/roleDeptTreeSelect/' + roleId,
    method: 'get'
  })
}

// 新增部门
export function addDept(data) {
  return request({
    url: '/system/dept',
    method: 'post',
    data: data
  })
}

// 修改部门
export function updateDept(data) {
  return request({
    url: '/system/dept',
    method: 'put',
    data: data
  })
}

// 删除部门
export function delDept(deptId) {
  return request({
    url: '/system/dept/' + deptId,
    method: 'delete'
  })
}
export function countByName(deptName){
  return request({
    url: '/system/dept/count/name/' + deptName,
    method: 'get'
  })
}
