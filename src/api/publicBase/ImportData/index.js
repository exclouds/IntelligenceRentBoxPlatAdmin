import fetch from 'utils/fetch';

//查询会计科目信息
export function GetIMportData(obj) {
    return fetch({
      url: '/DBService/api/services/app/ImportDataSeacher/GetIMportData',
      method: 'get',
      params:obj
    });
  }

