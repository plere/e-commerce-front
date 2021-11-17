import React from 'react';
import { useLocation } from 'react-router';
import StoreLoginForm from '../containers/auth/StoreLoginForm';
import StoreRegisterForm from '../containers/auth/StoreRegisterForm';


const StoreRegisterPage = () => {
  let location = useLocation();
  let type = location.pathname === '/store/register' ? 'register' : 'login';

  return (
    <>
    {type === 'register' ? 
      <StoreRegisterForm /> : <StoreLoginForm />
    }
    </>
  );
};

export default StoreRegisterPage;
