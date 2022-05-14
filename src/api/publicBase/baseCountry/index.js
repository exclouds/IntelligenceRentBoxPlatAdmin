import fetch from 'utils/fetch';
//获取国家列表
export function getAllCountryList(obj) {
    return fetch({
      url: '/BaseDataService/api/services/app/CountryInfo/GetCountryList',
      method: 'get',
      params:obj
    });
  }
//删除国家
  export function deleteBatchCountry(obj){
    return fetch({
        url: '/BaseDataService/api/services/app/CountryInfo/BatchDeleteCountry',
        method: 'post',
        data:obj
      });
  }

  //根据ID获取国家
export function getCountryInfoById(obj) {
    return fetch({
      url: '/BaseDataService/api/services/app/CountryInfo/GetOneCountryInfo',
      method: 'get',
      params:obj
    });
  }

  
//创建或修改国家
export function createorUpdateCountry(obj) {
    return fetch({
      url: '/BaseDataService/api/services/app/CountryInfo/CreateOrUpdateCountry',
      method: 'post',
      data:obj
    });
  }

  //根据国家id获取海关舱单识别码
  export function getIndentList(obj) {
    return fetch({
      url: '/BaseDataService/api/services/app/CountryIdentifier/GetIdentifierList',
      method: 'get',
      params:obj
    });
  }
  //根据国家id获取瘟疫列表
  export function getPestNameList(obj) {
    return fetch({
      url: '/BaseDataService/api/services/app/CountryInfo/GetPestNameList',
      method: 'get',
      params:obj
    });
  }
  
//获取国家下拉框列表（用于下拉框）
export function getCountryInfoList(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PublicComboxAppSevrice/GetCountryComboBoxForEdit',
    method: 'get',
    params: obj,
  })
}

//获取国家下拉框列表（用于下拉框）
export function getCountryInfoListNew(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/Combox/GetCountryComboxList',
    method: 'get',
    params: obj,
  })
}

//获取国家下拉框列表（中文简称）
export function getCountryShortNameComboBoxForEdit(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PublicComboxAppSevrice/GetCountryShortNameComboBoxForEdit',
    method: 'get',
    params: obj,
  })
}
  //获取国家下拉框列表（中文简称）
export function GetCountryShortNameEdit(obj) {
  return fetch({
    url: '/BaseDataService/api/services/app/PublicComboxAppSevrice/GetCountryShortNameEdit',
    method: 'get',
    params: obj,
  })
}