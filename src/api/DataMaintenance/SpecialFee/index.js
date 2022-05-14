import fetch from 'utils/fetch';

//查询特殊费用信息
export function GetSpecialFeeQueryList(obj) {
    return fetch({
      url: '/DBService/api/services/app/SpecialFee/GetSpecialFeeQueryList',
      method: 'get',
      params:obj
    });
  }
  //获取单个特殊费用信息
export function GetSpecialFeeById(obj) {
  return fetch({
    url: '/DBService/api/services/app/SpecialFee/GetSpecialFeeByIdAsync',
    method: 'get',
    params:obj
  });
}

  //新增编辑特殊费用信息
export function CreateOrUpdateSpecialFee(obj) {
    return fetch({
      url: '/DBService/api/services/app/SpecialFee/CreateOrUpdateSpecialFee',
      method: 'post',
      data:obj,
      msg:"保存"
    });
  }

  //批量删除特殊费用信息
export function BathDeleteSpecialFee(obj) {
    return fetch({
      url: '/DBService/api/services/app/SpecialFee/BathDeleteSpecialFee',
      method: 'post',
      data:obj,
     
    });
  }
//特殊费用提交
export function SubmitSpecialFee(obj) {
  return fetch({
    url: '/DBService/api/services/app/SpecialFee/SubmitSpecialFee',
    method: 'post',
    data:obj,
    
  });
}
//特殊费用取消提交
export function CancelSubmit(obj) {
  return fetch({
    url: '/DBService/api/services/app/SpecialFee/CancelSubmit',
    method: 'post',
    data:obj,
   
  });
}
//同意特殊费用取消提交
export function AgreeCancelSubmit(obj) {
  return fetch({
    url: '/DBService/api/services/app/SpecialFee/AgreeCancelSubmit',
    method: 'post',
    data:obj,
    
  });
}
//批量操作
export function BathOperation(obj) {
  return fetch({
    url: '/DBService/api/services/app/SpecialFee/BathOperation',
    method: 'post',
    data:obj,
  
  });
}