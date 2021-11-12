import client from './client';

// 회원가입
export const storeRegister = ({ storename, password, email, tel, description }) => {
  let store_name = storename, store_email = email, store_tel = tel, store_description = description;
  client.post('/store/register', { store_name, password, store_email, store_tel, store_description })};
