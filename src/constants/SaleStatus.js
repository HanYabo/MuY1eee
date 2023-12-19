// 定义一个售卖状态常量
const SALE_STATUS = {
    0: '停售',
    1: '在售'
}

// 映射函数
export const getSaleStatus = (status) => {
    return SALE_STATUS[status] || '错误状态'
}