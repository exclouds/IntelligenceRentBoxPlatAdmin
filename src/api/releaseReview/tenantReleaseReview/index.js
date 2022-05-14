import fetch from 'utils/fetch';
//获取租客发布申请列表
export function getTenantReleaseInfoList(obj) {
    return fetch({
        url: '/DBService/api/services/app/TenantReleaseReview/GetAllTenantReleaseInfo',
        method: 'post',
        data: obj
    });
}

//获取租客发布申请信息详情
export function getTenantReleaseInfoById(obj) {
    return fetch({
        url: '/DBService/api/services/app/TenantReleaseReview/GetTenantReleaseInfo',
        method: 'post',
        data: obj
    });
}

//更新审核信息
export function updateTenantReleaseInfo(obj) {
    return fetch({
        url: '/DBService/api/services/app/TenantReleaseReview/UpdateTenantReleaseInfo',
        method: 'post',
        data: obj
    });
}