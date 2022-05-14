import fetch from 'utils/fetch';

//集团1内部报表查询
export function BUSummaryReportInquire(obj) {
    return fetch({
      url: '/DBService/api/services/app/Report/BUSummaryReportInquire',
      method: 'post',
      data:obj,
      timeout:600000,
    });
  }
  //集团2外部查询
export function NonOperatReportInquire(obj) {
  return fetch({
    url: '/DBService/api/services/app/Report/NonOperatReportInquire',
    method: 'post',
    data:obj
  });
}
//报表导出
export function ExportBUSummaryFile(obj) {
  return fetch({
    url: '/DBService/api/services/app/Report/ExportBUSummaryFile',
    method: 'post',
    data:obj,
    msg:'导出',
    timeout:600000,
  });
}
//报表导出
export function ExportNonOperatReportFile(obj) {
  return fetch({
    url: '/DBService/api/services/app/Report/ExportNonOperatReportFile',
    method: 'post',
    data:obj,
    msg:'导出'
  });
}

  





