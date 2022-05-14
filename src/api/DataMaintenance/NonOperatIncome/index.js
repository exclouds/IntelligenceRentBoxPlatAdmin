import fetch from 'utils/fetch';

//获取行号
export function GetLinNoList(obj) {
  return fetch({
    url: '/DBService/api/services/app/NonOperatIncome/GetLinNoList',
    method: 'get',
    params:obj
  });
}
//查询业务数据信息
export function PostNonOperatQueryList(obj) {
    return fetch({
      url: '/DBService/api/services/app/NonOperatIncome/PostNonOperatQueryList',
      method: 'post',
      data:obj
    });
  }
  //获取单个业务数据信息
export function GetNonOperatById(obj) {
  return fetch({
    url: '/DBService/api/services/app/NonOperatIncome/GetNonOperatByIdAsync',
    method: 'get',
    params:obj
  });
}

  //新增编辑业务数据信息
export function CreateOrUpdateNonOperat(obj) {
    return fetch({
      url: '/DBService/api/services/app/NonOperatIncome/CreateOrUpdateNonOperat',
      method: 'post',
      data:obj,
      msg:"保存"
    });
  }

  //批量删除业务数据信息
export function BathDeleteNonOperat(obj) {
    return fetch({
      url: '/DBService/api/services/app/NonOperatIncome/BathDeleteNonOperat',
      method: 'post',
      data:obj
     
    });
  }
//业务数据提交
export function SubmitData(obj) {
  return fetch({
    url: '/DBService/api/services/app/NonOperatIncome/SubmitData',
    method: 'post',
    data:obj,
    
  });
}
//业务数据取消提交
export function CancelSubmit(obj) {
  return fetch({
    url: '/DBService/api/services/app/NonOperatIncome/CancelSubmit',
    method: 'post',
    data:obj,
    
  });
}
//同意业务数据取消提交
export function AgreeCancelSubmit(obj) {
  return fetch({
    url: '/DBService/api/services/app/NonOperatIncome/AgreeCancelSubmit',
    method: 'post',
    data:obj,
  
  });
}
//批量操作
export function BathOperation(obj) {
  return fetch({
    url: '/DBService/api/services/app/NonOperatIncome/BathOperation',
    method: 'post',
    data:obj,
   
  });
}