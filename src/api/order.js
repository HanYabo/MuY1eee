import service from '../util/request'

// 查询订单列表
export const getOrderListAPI = () => {
    return service({
        url: '/order',
        method: 'GET'
    })
}