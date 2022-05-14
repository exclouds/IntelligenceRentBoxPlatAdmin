import fetch from 'utils/fetch';
//合资公司预算导入校验
export function CheckImportOrgReport(obj) {
  return fetch({
    url: '/DBService/api/services/app/OriginalBudget/CheckImportOrgReport',
    method: 'post',
    data:obj
  });
}
//合资公司预算导入
export function ImportOrgReport(obj) {
    return fetch({
      url: '/DBService/api/services/app/OriginalBudget/ImportOrgReportAsync',
      method: 'post',
      data:obj
    });
  }

  //合资公司预算查询
export function PostOrgReportQueryList(obj) {
  return fetch({
    url: '/DBService/api/services/app/OriginalBudget/PostOrgReportQueryList',
    method: 'post',
    data:obj
  });
}
//获取单个合资公司预算信息
export function GetOrgReportById(obj) {
  return fetch({
    url: '/DBService/api/services/app/OriginalBudget/GetOrgReportById',
    method: 'get',
    params:obj
  });
}
//新增编辑合资公司预算
export function CreateOrUpdateOrgReport(obj) {
  return fetch({
    url: '/DBService/api/services/app/OriginalBudget/CreateOrUpdateOrgReport',
    method: 'post',
    data:obj,
    msg:"保存"
  });
}
//删除合资公司预算
export function BathDeleteOrgReport(obj) {
  return fetch({
    url: '/DBService/api/services/app/OriginalBudget/BathDeleteOrgReport',
    method: 'post',
    data:obj,
 
  });
}
//预算提交
export function SubmitOrgReport(obj) {
  return fetch({
    url: '/DBService/api/services/app/OriginalBudget/SubmitOrgReport',
    method: 'post',
    data:obj
   
  });
}
//预算取消提交
export function CancelSubmit(obj) {
  return fetch({
    url: '/DBService/api/services/app/OriginalBudget/CancelSubmit',
    method: 'post',
    data:obj,
 
  });
}
//同意预算取消提交
export function AgreeCancelSubmit(obj) {
  return fetch({
    url: '/DBService/api/services/app/OriginalBudget/AgreeCancelSubmit',
    method: 'post',
    data:obj,

  });
}
//批量操作
export function BathOperation(obj) {
  return fetch({
    url: '/DBService/api/services/app/OriginalBudget/BathOperation',
    method: 'post',
    data:obj,
    
  });
}


