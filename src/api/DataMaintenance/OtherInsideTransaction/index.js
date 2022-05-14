import fetch from 'utils/fetch';

//查询业务数据信息
export function PostInTransactQueryList(obj) {
    return fetch({
      url: '/DBService/api/services/app/OtherInsideTransact/PostInTransactQueryList',
      method: 'post',
      data:obj
    });
  }
  //获取单个业务数据信息
export function GetInTransactById(obj) {
  return fetch({
    url: '/DBService/api/services/app/OtherInsideTransact/GetInTransactByIdAsync',
    method: 'get',
    params:obj
  });
}

  //新增编辑业务数据信息
export function CreateOrUpdateInTransact(obj) {
    return fetch({
      url: '/DBService/api/services/app/OtherInsideTransact/CreateOrUpdateInTransact',
      method: 'post',
      data:obj,
      msg:"保存"
    });
  }

  //批量删除业务数据信息
export function BathDeleteInTransact(obj) {
    return fetch({
      url: '/DBService/api/services/app/OtherInsideTransact/BathDeleteInTransact',
      method: 'post',
      data:obj
     
    });
  }
//业务数据提交
export function SubmitData(obj) {
  return fetch({
    url: '/DBService/api/services/app/OtherInsideTransact/SubmitData',
    method: 'post',
    data:obj,
    
  });
}
//业务数据取消提交
export function CancelSubmit(obj) {
  return fetch({
    url: '/DBService/api/services/app/OtherInsideTransact/CancelSubmit',
    method: 'post',
    data:obj,
    
  });
}
//同意业务数据取消提交
export function AgreeCancelSubmit(obj) {
  return fetch({
    url: '/DBService/api/services/app/OtherInsideTransact/AgreeCancelSubmit',
    method: 'post',
    data:obj,
  
  });
}
//批量操作
export function BathOperation(obj) {
  return fetch({
    url: '/DBService/api/services/app/OtherInsideTransact/BathOperation',
    method: 'post',
    data:obj,
   
  });
}
//初始化数据
export function InitInsideMonthData(obj) {
  return fetch({
    url: '/DBService/api/services/app/OtherInsideTransact/InitInsideMonthData',
    method: 'post',
    data:obj,
   
  });
}
//内部交易导入
export function ImportInTransactData(obj) {
  return fetch({
    url: '/DBService/api/services/app/OtherInsideTransact/ImportInTransactData',
    method: 'post',
    data:obj,
   
  });
}