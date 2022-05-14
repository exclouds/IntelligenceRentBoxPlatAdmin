import fetch from 'utils/fetch';

//报表查询
export function ZHYInquireStatement(obj) {
    return fetch({
      url: '/DBService/api/services/app/Report/ZHYInquireStatement',
      method: 'post',
      data:obj
    });
  }



  





