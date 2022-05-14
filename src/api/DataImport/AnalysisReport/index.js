import fetch from 'utils/fetch';
//合资公司预算导入校验
export function CheckImportReport(obj) {
  return fetch({
    url: '/DBService/api/services/app/AnalysisReport/CheckImportReport',
    method: 'post',
    data:obj
  });
}
//合资公司预算导入
export function ImportReport(obj) {
    return fetch({
      url: '/DBService/api/services/app/AnalysisReport/ImportReportAsync',
      method: 'post',
      data:obj
    });
  }

  //合资公司预算查询
export function GetReportQueryList(obj) {
  return fetch({
    url: '/DBService/api/services/app/AnalysisReport/PostReportQueryList',
    method: 'post',
    data:obj
  });
}
//获取单个合资公司预算信息
export function GetReportById(obj) {
  return fetch({
    url: '/DBService/api/services/app/AnalysisReport/GetReportById',
    method: 'get',
    params:obj
  });
}
//新增编辑合资公司预算
export function CreateOrUpdateReport(obj) {
  return fetch({
    url: '/DBService/api/services/app/AnalysisReport/CreateOrUpdateReport',
    method: 'post',
    data:obj,
    msg:"保存"
  });
}
//删除合资公司预算
export function BathDeleteReport(obj) {
  return fetch({
    url: '/DBService/api/services/app/AnalysisReport/BathDeleteReport',
    method: 'post',
    data:obj,
 
  });
}
//预算提交
export function SubmitReport(obj) {
  return fetch({
    url: '/DBService/api/services/app/AnalysisReport/SubmitReport',
    method: 'post',
    data:obj
   
  });
}
//预算取消提交
export function CancelSubmit(obj) {
  return fetch({
    url: '/DBService/api/services/app/AnalysisReport/CancelSubmit',
    method: 'post',
    data:obj,
 
  });
}
//同意预算取消提交
export function AgreeCancelSubmit(obj) {
  return fetch({
    url: '/DBService/api/services/app/AnalysisReport/AgreeCancelSubmit',
    method: 'post',
    data:obj,

  });
}
//批量操作
export function BathOperation(obj) {
  return fetch({
    url: '/DBService/api/services/app/AnalysisReport/BathOperation',
    method: 'post',
    data:obj,
    
  });
}


