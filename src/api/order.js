import service from '../util/request'

// 查询订单列表（可根据条件进行查询）
export const getOrderListAPI = (index, size, queryParam) => {
    return service({
        url: `/order/${index}/${size}`,
        method: 'POST',
        data: queryParam
    })
}

// 修改订单状态
export const updateOrderStatusAPI = (status, obj) => {
    return service({
        url: `/order/${status}`,
        method: 'POST',
        data: obj
    })
}