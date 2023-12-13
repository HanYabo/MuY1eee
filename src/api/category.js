import service from '../util/request.js'

// 查询列表接口
export const getCategoryPage = (params) => {
    return service({
        url: '/category/page',
        method: 'get',
        params
    })
}

// 编辑页面反查详情接口
export const queryCategoryById = (id) => {
    return service({
        url: `/category/${id}`,
        method: 'get'
    })
}

// 删除当前列的接口
export const deleCategory = (ids) => {
    return service({
        url: '/category',
        method: 'delete',
        params: { ids }
    })
}

// 修改接口
export const editCategory = (params) => {
    return service({
        url: '/category',
        method: 'put',
        data: { ...params }
    })
}

// 新增接口
export const addCategory = (params) => {
    return service({
        url: '/category',
        method: 'post',
        data: { ...params }
    })
}