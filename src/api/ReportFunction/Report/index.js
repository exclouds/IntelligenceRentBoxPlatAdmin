import fetch from 'utils/fetch';

//集团3报表查询
export function Report3Inquire(obj) {
    return fetch({
      url: '/DBService/api/services/app/Report/Report3Inquire',
      method: 'post',
      data:obj
    });
  }

  





