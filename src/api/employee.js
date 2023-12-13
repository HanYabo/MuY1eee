import service from '../util/request'

// 查询员工信息列表
export const getEmployeeListAPI = (index, size) => {
    return service({
        url: `/employee/${index}/${size}`,
        method: 'POST'
    })
}

// 根据员工姓名查找
export const getEmployeeByNameAPI = (name) => {
    return service({
        url: `/employee/${name}`,
        method: 'GET'
    })
}

// 新增员工
export const addEmployeeAPI = (obj) => {
    return service({
        url: '/employee',
        method: 'PUT',
        data: obj
    })
}

// 删除员工
export const deleteEmployeeByIdAPI = (id) => {
    return service({
        url: `/employee/${id}`,
        method: 'DELETE',
    })
}