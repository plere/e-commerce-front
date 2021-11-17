import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes
} from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';

const STORE_CHANGE_FIELD = 'store/CHANGE_FIELD';
const STORE_INITIALIZE_FORM = 'store/INITIALIZE_FORM';

const [STORE_REGISTER, STORE_REGISTER_SUCCESS, STORE_REGISTER_FAILURE] = createRequestActionTypes(
  'store/REGISTER'
);

const [STORE_LOGIN, STORE_LOGIN_SUCCESS, STORE_LOGIN_FAILURE] = createRequestActionTypes(
  'store/LOGIN'
);

export const StoreChangeField = createAction(
  STORE_CHANGE_FIELD,
  ({ form, key, value }) => ({
    form, 
    key, 
    value 
  })
);
export const storeInitializeForm = createAction(STORE_INITIALIZE_FORM, form => form); 
export const storeRegister = createAction(STORE_REGISTER, ({ storename, password, email, tel, description }) => ({
  storename,
  password,
  email, 
  tel, 
  description
}));
export const storeLogin = createAction(STORE_LOGIN, ({ storename, password }) => ({
  storename,
  password
}));

// saga 생성
const storeRegisterSaga = createRequestSaga(STORE_REGISTER, authAPI.storeRegister);
const storeLoginSaga = createRequestSaga(STORE_LOGIN, authAPI.storeLogin);
export function* authSaga() {
  yield takeLatest(STORE_REGISTER, storeRegisterSaga);  
  yield takeLatest(STORE_LOGIN, storeLoginSaga);
}

const initialState = {
  store_register: {
    storename: '',
    password: '',
    passwordConfirm: '',
    email: '',
    tel: '',
    description: ''
  },
  store_login: {
    storename: '',
    password: '',
  },  
  auth: null,
  authError: null 
};

const auth = handleActions(
  {
    [STORE_CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, draft => {
        draft[form][key] = value; 
      }),
    [STORE_INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
    }),
    // 회원가입 성공
    [STORE_REGISTER_SUCCESS]: (state, { payload: auth }) => ({
      ...state,      
      authError: null,
      auth,
    }),
    // 회원가입 실패
    [STORE_REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error
    }),
    // 로그인 성공
    [STORE_LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth
    }),
    // 로그인 실패
    [STORE_LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error
    })
  },
  initialState
);

export default auth;
