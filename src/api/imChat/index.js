import fetch from 'utils/fetch';

//获取客服信息
export function getIMUser() {
    return fetch({
        url: '/DBService/api/services/app/IMChat/GetIMUser',
        method: 'get',
    });
}
//修改客服上下线信息
export function updateServerChat(obj) {
    return fetch({
        url: '/DBService/api/services/app/IMChat/UpdateServerChat',
        method: 'get',
        params: obj
    });
}
