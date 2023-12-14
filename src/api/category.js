import service from '../util/request'

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
