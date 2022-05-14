import fetch from 'utils/fetch';

//BU报表查询
export function BUAnalyzeInquire(obj) {
    return fetch({
      url: '/DBService/api/services/app/Report/BUAnalyzeInquire',
      method: 'post',
      data:obj
    });
  }
  //报表导出
export function ExportFileBydata(obj) {
  return fetch({
    url: '/DBService/api/services/app/Report/ExportFileBydata',
    method: 'post',
    data:obj,
    msg:"导出成功"
  });
}


//集团分析报表查询
export function GroupAnalyzeInquire(obj) {
  return fetch({
    url: '/DBService/api/services/app/Report/GroupAnalyzeInquire',
    method: 'post',
    data:obj
  });
}
   //集团分析报表导出
export function ExportGroupAnalyzeFile(obj) {
  return fetch({
    url: '/DBService/api/services/app/Report/ExportGroupAnalyzeFile',
    method: 'post',
    data:obj,
    msg:"导出成功"
  });
} 

//大区分析报表查询
export function RegionAnalyzeInquire(obj) {
  return fetch({
    url: '/DBService/api/services/app/Report/RegionAnalyzeInquire',
    method: 'post',
    data:obj
  });
}



