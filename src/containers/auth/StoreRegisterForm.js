import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StoreForm from '../../components/auth/StoreForm';
import { StoreChangeField, storeInitializeForm, storeRegister } from '../../modules/auth';

const StoreRegisterForm = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();  
  const { form } = useSelector(({ auth }) => ({
    form: auth.store_register,
  }));
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
