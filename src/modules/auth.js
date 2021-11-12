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

// saga 생성
const storeRegisterSaga = createRequestSaga(STORE_REGISTER, authAPI.storeRegister);
export function* authSaga() {
  yield takeLatest(STORE_REGISTER, storeRegisterSaga);
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
    }),
    // 회원가입 실패
    [STORE_REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
    }),
  },
  initialState
);

export default auth;
