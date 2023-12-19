import service from '../util/request'

export const checkUserAPI = (obj) => {
    return service({
        url: '/login',
        method: 'POST',
        data: obj
    })
}