import fetch from 'utils/fetch';
//获取站点列表
export function getAllSiteTablesList(obj) {
    return fetch({
        url: '/DBService/api/services/app/SiteTables/GetAllSiteTablesInfo',
        method: 'post',
        data: obj
    });
}
//删除站点
export function deleteBatchSiteTables(obj) {
    return fetch({
        url: '/DBService/api/services/app/SiteTables/BatchDeleteSiteTables',
        method: 'post',
        data: obj
    });
}

//根据ID获取站点
export function getSiteTablesInfoById(obj) {
    return fetch({
        url: '/DBService/api/services/app/SiteTables/GetOneSiteTable',
        method: 'get',
        params: obj
    });
}

//创建或修改站点
export function createorUpdateSiteTables(obj) {
    return fetch({
        url: '/DBService/api/services/app/SiteTables/CreateOrUpdateSiteTables',
        method: 'post',
        data: obj
    });
}