import fetch from 'utils/fetch';

//查询特殊费用信息
export function GetAccountSpecialFeeQueryList(obj) {
    return fetch({
      url: '/DBService/api/services/app/AccountSpecialFee/GetAccountSpecialFeeQueryList',
      method: 'get',
      params:obj
    });
  }
  //获取单个特殊费用信息
export function GetAccountSpecialFeeById(obj) {
  return fetch({
    url: '/DBService/api/services/app/AccountSpecialFee/GetAccountSpecialFeeByIdAsync',
    method: 'get',
    params:obj
  });
}

  //新增编辑特殊费用信息
export function CreateOrUpdateAccountSpecialFee(obj) {
    return fetch({
      url: '/DBService/api/services/app/AccountSpecialFee/CreateOrUpdateAccountSpecialFee',
      method: 'post',
      data:obj,
      msg:"保存"
    });
  }

  //批量删除特殊费用信息
export function BathDeleteAccountSpecialFee(obj) {
    return fetch({
      url: '/DBService/api/services/app/AccountSpecialFee/BathDeleteAccountSpecialFee',
      method: 'post',
      data:obj,
     
    });
  }
//特殊费用提交
export function SubmitAccountSpecialFee(obj) {
  return fetch({
    url: '/DBService/api/services/app/AccountSpecialFee/SubmitAccountSpecialFee',
    method: 'post',
    data:obj,
    
  });
}
//特殊费用取消提交
export function CancelSubmit(obj) {
  return fetch({
    url: '/DBService/api/services/app/AccountSpecialFee/CancelSubmit',
    method: 'post',
    data:obj,
   
  });
}
//同意特殊费用取消提交
export function AgreeCancelSubmit(obj) {
  return fetch({
    url: '/DBService/api/services/app/AccountSpecialFee/AgreeCancelSubmit',
    method: 'post',
    data:obj,
    
  });
}
//批量操作
export function BathOperation(obj) {
  return fetch({
    url: '/DBService/api/services/app/AccountSpecialFee/BathOperation',
    method: 'post',
    data:obj,
  
  });
}