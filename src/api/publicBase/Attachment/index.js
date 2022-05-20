import fetch from 'utils/fetch';

//上传
export function GetUploaFile(obj) {
    return fetch({
        url: '/DBService/api/services/app/Attachment/AnnexUploaFile',
        method: 'post',
        data: obj
    });
}
//获取费用列表
export function GetUPFile(obj) {
    return fetch({
        url: '/DBService/api/services/app/Attachment/GetUPFile',
        method: 'get',
        params: obj
    });
}
//批量删除
export function BathDeltefile(obj) {
    return fetch({
        url: '/DBService/api/services/app/Attachment/BathDeltefile',
        method: 'post',
        data: obj,
        msg: "删除"
    });
}
