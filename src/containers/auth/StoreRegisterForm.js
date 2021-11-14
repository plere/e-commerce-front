import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import StoreForm from '../../components/auth/StoreForm';
import { StoreChangeField, storeInitializeForm, storeRegister } from '../../modules/auth';
import { check } from '../../modules/user';

const StoreRegisterForm = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();  
  const { form, store, storeError, user } = useSelector(({ auth, user }) => ({
    form: auth.store_register,
    store: auth.auth,
    storeError: auth.authError,
    user: user.user
  }));

  const navigate = useNavigate();

  // 인풋 변경 이벤트 핸들러
  const onChange = e => {
    const { value, name } = e.target;
    dispatch(
      StoreChangeField({
        form: 'store_register',
        key: name,
        value,
      }),
    );
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = e => {
    e.preventDefault();
    const { storename, password, passwordConfirm, email, tel, description } = form;
    // 하나라도 비어있다면
    if ([storename, password, passwordConfirm, email, tel].includes('')) {
      setError('빈 칸을 모두 입력하세요.');
      return;
    }
    // 비밀번호가 일치하지 않는다면
    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      StoreChangeField({ form: 'store_register', key: 'password', value: '' });
      StoreChangeField({ form: 'store_register', key: 'passwordConfirm', value: '' });
      return;
    }
    dispatch(storeRegister({ storename, password, email, tel, description }));
  };

  // 컴포넌트가 처음 렌더링 될 때 form 을 초기화함
  useEffect(() => {
    dispatch(storeInitializeForm('store_register'));
  }, [dispatch]);

  // 회원가입 성공 / 실패 처리
  useEffect(() => {
    if (storeError) {
      // 계정명이 이미 존재할 때
      if (storeError.response.status === 409) {
        setError('이미 존재하는 계정명입니다.');
        return;
      }
      // 기타 이유
      setError('회원가입 실패');
      return;
    }

    if (store) {
      dispatch(check(store));
    }
  }, [store, storeError, dispatch]);

  useEffect(() => {
    if (user) {
      navigate('/'); // 홈 화면으로 이동
    }
  }, [navigate, user]);

  return (
    <StoreForm
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
      />
  );
};

export default StoreRegisterForm;
