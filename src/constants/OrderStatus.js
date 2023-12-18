// 订单状态常量 1为待付款 2为待派送 3为已派送 4为已完成 5为已取消
const ORDER_STATUS = {
    1: '待付款',
    2: '待派送',
    3: '已派送',
    4: '已完成',
    5: '已取消'
}

// 定义一个方法 接收一个number  number和以下状态匹配 匹配到返回相对的信息
export const getOrderStatus = (status) => {
    return ORDER_STATUS[status] || '未知状态'
}


