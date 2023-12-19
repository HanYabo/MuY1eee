import service from '../util/request'

// 获取菜品列表
export const getDishListAPI = (index, size) => {
    return service({
        url: `/dish/${index}/${size}`
    })
}

// 删除菜品
export const deleteDishByIdAPI = (id) => {
    return service({
        url: `/dish/${id}`,
        method: 'DELETE',
    })
}

// 起售 停售状态切换
export const changeStatusAPI = (status, obj) => {
    return service({
        url: `/dish/${status}`,
        method: 'POST',
        data: obj
    })
}