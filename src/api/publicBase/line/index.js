import fetch from 'utils/fetch';
//获取路线列表
export function getAllLineList(obj) {
    return fetch({
        url: '/DBService/api/services/app/Line/GetAllLineInfo',
        method: 'post',
        data: obj
    });
}
//删除路线
export function deleteBatchLine(obj) {
    return fetch({
        url: '/DBService/api/services/app/Line/BatchDeleteLine',
        method: 'post',
        data: obj
    });
}

//根据ID获取路线
export function getLineInfoById(obj) {
    return fetch({
        url: '/DBService/api/services/app/Line/GetOneLine',
        method: 'get',
        params: obj
    });
}


//创建或修改路线
export function createorUpdateLine(obj) {
    return fetch({
        url: '/DBService/api/services/app/Line/CreateOrUpdateLine',
        method: 'post',
        data: obj
    });
}