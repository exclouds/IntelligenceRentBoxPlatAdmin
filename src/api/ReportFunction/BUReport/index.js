import fetch from 'utils/fetch';

//报表查询
export function BUInquireProfitStatement(obj) {
    return fetch({
      url: '/DBService/api/services/app/Report/BUInquireProfitStatement',
      method: 'post',
      data:obj
    });
  }
//报表导出
export function ExportBUFile(obj) {
  return fetch({
    url: '/DBService/api/services/app/Report/ExportBUFile',
    method: 'post',
    data:obj,
    msg:'导出'
  });
}


  





