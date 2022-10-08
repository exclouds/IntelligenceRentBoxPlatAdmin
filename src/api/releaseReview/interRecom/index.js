import fetch from 'utils/fetch';
//获取智能推荐列表
export function getInterRecomList(obj) {
    return fetch({
        url: '/DBService/api/services/app/InterRecom/GetInterRecomList',
        method: 'post',
        data: obj
    });
}
//获取智能推荐列表
export function getInterRecomAllList(obj) {
    return fetch({
        url: '/DBService/api/services/app/InterRecom/GetInterRecomAllList',
        method: 'post',
        data: obj
    });
}