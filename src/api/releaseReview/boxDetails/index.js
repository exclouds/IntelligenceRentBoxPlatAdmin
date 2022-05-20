import fetch from 'utils/fetch';
//获取箱东发布申请列表
export function getBoxDetailsInfoList(obj) {
    return fetch({
        url: '/DBService/api/services/app/BoxDetailsReview/GetAllBoxDetailsInfo',
        method: 'post',
        data: obj
    });
}
