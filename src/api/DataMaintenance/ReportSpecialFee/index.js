import fetch from 'utils/fetch';

//查询特殊费用信息
export function GetReportSpecialFeeQueryList(obj) {
    return fetch({
      url: '/DBService/api/services/app/ReportSpecialFee/GetReportSpecialFeeQueryList',
      method: 'get',
      params:obj
    });
  }
  //获取单个特殊费用信息
export function GetReportSpecialFeeById(obj) {
  return fetch({
    url: '/DBService/api/services/app/ReportSpecialFee/GetReportSpecialFeeByIdAsync',
    method: 'get',
    params:obj
  });
}

  //新增编辑特殊费用信息
export function CreateOrUpdateReportSpecialFee(obj) {
    return fetch({
      url: '/DBService/api/services/app/ReportSpecialFee/CreateOrUpdateReportSpecialFee',
      method: 'post',
      data:obj,
      msg:"保存"
    });
  }

  //批量删除特殊费用信息
export function BathDeleteReportSpecialFee(obj) {
    return fetch({
      url: '/DBService/api/services/app/ReportSpecialFee/BathDeleteReportSpecialFee',
      method: 'post',
      data:obj,
     
    });
  }
//特殊费用提交
export function SubmitReportSpecialFee(obj) {
  return fetch({
    url: '/DBService/api/services/app/ReportSpecialFee/SubmitReportSpecialFee',
    method: 'post',
    data:obj,
    
  });
}
//特殊费用取消提交
export function CancelSubmit(obj) {
  return fetch({
    url: '/DBService/api/services/app/ReportSpecialFee/CancelSubmit',
    method: 'post',
    data:obj,
   
  });
}
//同意特殊费用取消提交
export function AgreeCancelSubmit(obj) {
  return fetch({
    url: '/DBService/api/services/app/ReportSpecialFee/AgreeCancelSubmit',
    method: 'post',
    data:obj,
   
  });
}
//批量操作
export function BathOperation(obj) {
  return fetch({
    url: '/DBService/api/services/app/ReportSpecialFee/BathOperation',
    method: 'post',
    data:obj,
   
  });
}