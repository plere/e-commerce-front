import React from 'react';
import { useLocation } from 'react-router';
import StoreRegisterForm from '../containers/auth/StoreRegisterForm';


const StoreRegisterPage = () => {
  let location = useLocation();
  let type = location.pathname === '/store/register' ? 'register' : 'login';

  return (
    <>
    {type === 'register' ? 
      <StoreRegisterForm /> : null //login
    }
    </>
  );
};

export default StoreRegisterPage;
