import fetch from 'utils/fetch';
//获取箱东发布申请列表
export function getBoxReleaseInfoList(obj) {
    return fetch({
        url: '/DBService/api/services/app/BoxReleaseReview/GetAllBoxReleaseInfo',
        method: 'post',
        data: obj
    });
}

//获取箱东发布申请信息详情
export function getBoxReleaseInfoById(obj) {
    return fetch({
        url: '/DBService/api/services/app/BoxReleaseReview/GetBoxReleaseInfo',
        method: 'post',
        data: obj
    });
}

//更新审核信息
export function updateBoxReleaseInfo(obj) {
    return fetch({
        url: '/DBService/api/services/app/BoxReleaseReview/UpdateBoxReleaseInfo',
        method: 'post',
        data: obj
    });
}