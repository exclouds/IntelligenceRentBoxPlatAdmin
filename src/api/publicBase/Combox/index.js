import fetch from 'utils/fetch';

//根据字典类型获取字典项下拉
export function GetBaseKeyValueComboBox(obj) {
    return fetch({
      url: '/DBService/api/services/app/PublicComboxAppSevrice/GetBaseKeyValueComboBox',
      method: 'get',
      params:obj
    });
  }

  //获取国家下拉
export function GetCountryComboBox(obj) {
    return fetch({
      url: '/DBService/api/services/app/PublicComboxAppSevrice/GetCountryComboBox',
      method: 'get',
      params:obj
    });
  }

  //获取城市下拉
export function GetCityComboBox(obj) {
    return fetch({
      url: '/DBService/api/services/app/PublicComboxAppSevrice/GetCityComboBox',
      method: 'get',
      params:obj
    });
  }

  
   //获取城市联动下拉
export function GetCityByComBox(obj) {
    return fetch({
      url: '/DBService/api/services/app/PublicComboxAppSevrice/GetCityByComBox',
      method: 'get',
      params:obj
    });
  }
//根据科目下拉
export function GetProjectList(obj) {
  return fetch({
    url: '/DBService//api/services/app/Common/GetProjectList',
    method: 'get',
    params:obj
  });
}
//根据权限获取BU下拉
export function GetBuComboBox(obj) {
  return fetch({
    url: '/DBService//api/services/app/Common/GetBuComboBox',
    method: 'get',
    params:obj
  });
}
//根据权限获取内部BU下拉
export function GetInsideBuComboBox(obj) {
  return fetch({
    url: '/DBService//api/services/app/Common/GetInsideBuComboBox',
    method: 'get',
    params:obj
  });
}

//根据权限获取BU下拉
export function GetRegionList(obj) {
  return fetch({
    url: '/DBService//api/services/app/Common/GetRegionList',
    method: 'get',
    params:obj
  });
}

//获取科目下拉
export function GetAccountList(obj) {
  return fetch({
    url: '/DBService//api/services/app/Common/GetAccountList',
    method: 'get',
    params:obj
  });
}

