import fetch from 'utils/fetch';

//查询锁账
export function GetLockAccountList(obj) {
    return fetch({
      url: '/DBService/api/services/app/LockAccouts/GetLockAccountList',
      method: 'get',
      params:obj
    });
  }
  //启用或者关闭锁账
export function BathLockAsync(obj) {
  return fetch({
    url: '/DBService/api/services/app/LockAccouts/BathLockAsync',
    method: 'post',
    data:obj
    
  });
}

  //新增编辑锁账信息
export function CreateOrUpdateLock(obj) {
    return fetch({
      url: '/DBService/api/services/app/LockAccouts/CreateOrUpdateLock',
      method: 'post',
      data:obj,
      msg:"保存"
    });
  }

    //删除锁账
export function onBatchDelete(obj) {
  return fetch({
    url: '/DBService/api/services/app/LockAccouts/onBatchDelete',
    method: 'post',
    data:obj
    
  });
}


