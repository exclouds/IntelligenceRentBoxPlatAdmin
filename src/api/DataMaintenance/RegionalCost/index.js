import fetch from 'utils/fetch';

//查询信息
export function GetRegionalCostQueryList(obj) {
    return fetch({
      url: '/DBService/api/services/app/RegionalCost/GetRegionalCostQueryList',
      method: 'get',
      params:obj
    });
  }
  //获取单个信息
export function GetRegionalCostById(obj) {
  return fetch({
    url: '/DBService/api/services/app/RegionalCost/GetRegionalCostByIdAsync',
    method: 'get',
    params:obj
  });
}

  //新增编辑信息
export function CreateOrUpdateRegionalCost(obj) {
    return fetch({
      url: '/DBService/api/services/app/RegionalCost/CreateOrUpdateRegionalCost',
      method: 'post',
      data:obj,
      msg:"保存"
    });
  }

  //批量删除信息
export function BathDeleteRegionalCost(obj) {
    return fetch({
      url: '/DBService/api/services/app/RegionalCost/BathDeleteRegionalCost',
      method: 'post',
      data:obj,
     
    });
  }
//提交
export function SubmitRegionalCost(obj) {
  return fetch({
    url: '/DBService/api/services/app/RegionalCost/SubmitRegionalCost',
    method: 'post',
    data:obj,
    
  });
}
//取消提交
export function CancelSubmit(obj) {
  return fetch({
    url: '/DBService/api/services/app/RegionalCost/CancelSubmit',
    method: 'post',
    data:obj,
   
  });
}
//同意取消提交
export function AgreeCancelSubmit(obj) {
  return fetch({
    url: '/DBService/api/services/app/RegionalCost/AgreeCancelSubmit',
    method: 'post',
    data:obj,
   
  });
}
//撤回取消提交
export function BackCancelSubmit(obj) {
  return fetch({
    url: '/DBService/api/services/app/RegionalCost/BackCancelSubmit',
    method: 'post',
    data:obj,
   
  });
}
//批量操作
export function BathOperation(obj) {
  return fetch({
    url: '/DBService/api/services/app/RegionalCost/BathOperation',
    method: 'post',
    data:obj,
   
  });
}