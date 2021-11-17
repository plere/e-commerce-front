import client from './client';

// 회원가입
export const storeRegister = ({ storename, password, email, tel, description }) => {
  const store_name = storename, store_email = email, store_tel = tel, store_description = description;
  return client.post('/store/register', { store_name, password, store_email, store_tel, store_description });
};

// 로그인
export const storeLogin = ({ storename, password }) =>  
  client.post('/store/login', { store_name: storename, password });

// 로그인 상태 확인
export const check = (access_token) => {
  return client.get('/store/check', {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
};
