import fetch from 'utils/fetch';
//获取箱东发布申请列表
export function getBusinessConfirmInfoList(obj) {
    return fetch({
        url: '/DBService/api/services/app/BusinessConfirm/GetAllBusinessConfirm',
        method: 'post',
        data: obj
    });
}

//获取箱东发布申请信息详情
export function getBusinessConfirmInfo(obj) {
    return fetch({
        url: '/DBService/api/services/app/BusinessConfirm/GetBusinessConfirmInfo',
        method: 'post',
        data: obj
    });
}

//更新审核信息
export function updateBusinessConfirmInfo(obj) {
    return fetch({
        url: '/DBService/api/services/app/BusinessConfirm/UpdateBusinessConfirmInfo',
        method: 'post',
        data: obj
    });
}