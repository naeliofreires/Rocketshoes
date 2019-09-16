import { call, put, all, takeLatest } from 'redux-saga/effects';

import api from '../../../services/api';

import { Creators as CartActions, Types as CartTypes } from './reducer';

function* addToCart({ id }) {
  const response = yield call(api.get, `/products/${id}`);

  yield put(CartActions.addProductSuccess(response.data));
}

export default all([takeLatest(CartTypes.ADD_REQUEST, addToCart)]);
