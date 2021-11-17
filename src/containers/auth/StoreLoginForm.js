import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import StoreForm from '../../components/auth/StoreForm';
import { StoreChangeField, storeInitializeForm, storeLogin } from '../../modules/auth';
import { check } from '../../modules/user';

const StoreLoginForm = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, store, storeError, user } = useSelector(({ auth, user }) => ({
    form: auth.store_login,
    store: auth.auth,
    storeError: auth.authError,
    user: user.user,
  }));

  const navigate = useNavigate();

  const onChange = e => {
    const { value, name } = e.target;
    dispatch(
      StoreChangeField({
        form: 'store_login',
        key: name,
        value,
      }),
    );
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = e => {
    e.preventDefault();
    const { storename, password } = form;
    dispatch(storeLogin({ storename, password }));
  };

  // 컴포넌트가 처음 렌더링 될 때 form 을 초기화함
  useEffect(() => {
    dispatch(storeInitializeForm('store_login'));
  }, [dispatch]);

  useEffect(() => {
    if (storeError) {
      console.log('오류 발생');
      console.log(storeError);
      setError('로그인 실패');
      return;
    }
    if (store) {
      console.log('로그인 성공');
      dispatch(check(store));
    }
  }, [store, storeError, dispatch]);

  useEffect(() => {
    if (user) {
      navigate('/');      
    }
  }, [navigate, user]);

  return (
    <StoreForm
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
      />    
  );
};

export default StoreLoginForm;
