import service from '../util/request'

export const getDishListAPI = (index, size) => {
    return service({
        url: `/dish/${index}/${size}`
    })
}