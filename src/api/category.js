import service from '../util/request'

// 获取分类列表
export const getCategoryListAPI = (index, size) => {
    return service({
        url: `/category/${index}/${size}`,
        method: 'GET'
    })
}

// 删除分类
export const deleteCategoryByIdAPI = (id) => {
    return service({
        url: `/category/${id}`,
        method: 'DELETE'
    })
}

// 新增分类
export const addCategoryByTypeAPI = (type, obj) => {
    return service({
        url: `/category/${type}`,
        method: 'PUT',
        data: obj
    })
}

// 修改分类
export const updateCategoryByIdAPI = (obj) => {
    return service({
        url: `/category`,
        method: 'POST',
        data: obj
    })
}
