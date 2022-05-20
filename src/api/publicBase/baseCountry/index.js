import fetch from 'utils/fetch';
//获取国家列表
export function getAllCountryList(obj) {
  return fetch({
    url: '/DBService/api/services/app/Country/GetAllCountryInfo',
    method: 'post',
    data: obj
  });
}
//删除国家
export function deleteBatchCountry(obj) {
  return fetch({
    url: '/DBService/api/services/app/Country/BatchDeleteCountry',
    method: 'post',
    data: obj
  });
}

//根据ID获取国家
export function getCountryInfoById(obj) {
  return fetch({
    url: '/DBService/api/services/app/Country/GetOneCountry',
    method: 'get',
    params: obj
  });
}


//创建或修改国家
export function createorUpdateCountry(obj) {
  return fetch({
    url: '/DBService/api/services/app/Country/CreateOrUpdateCountry',
    method: 'post',
    data: obj
  });
}