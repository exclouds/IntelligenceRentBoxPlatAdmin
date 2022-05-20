import fetch from 'utils/fetch';
//获取路线列表
export function getAllLinSiteList(obj) {
    return fetch({
        url: '/DBService/api/services/app/LinSite/GetAllLinSiteInfo',
        method: 'post',
        data: obj
    });
}
//删除路线
export function deleteBatchLinSite(obj) {
    return fetch({
        url: '/DBService/api/services/app/LinSite/BatchDeleteLinSite',
        method: 'post',
        data: obj
    });
}

//根据ID获取路线
export function getLinSiteInfoById(obj) {
    return fetch({
        url: '/DBService/api/services/app/LinSite/GetOneLinSite',
        method: 'get',
        params: obj
    });
}


//创建或修改路线
export function createorUpdateLinSite(obj) {
    return fetch({
        url: '/DBService/api/services/app/LinSite/CreateOrUpdateLinSite',
        method: 'post',
        data: obj
    });
}