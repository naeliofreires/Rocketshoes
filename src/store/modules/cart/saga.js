import { call, select, put, all, takeLatest } from 'redux-saga/effects';

import api from '../../../services/api';
import { formatPrice } from '../../../util/format';

import { Creators as CartActions, Types as CartTypes } from './reducer';

function* addToCart({ id }) {
  const productExists = yield select(state =>
    state.cart.find(p => p.id === id)
  );

  if (productExists) {
    const amount = productExists.amount + 1;

    yield put(CartActions.updateProduct(id, amount));
  } else {
    const response = yield call(api.get, `/products/${id}`);

    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
    };

    yield put(CartActions.addProductSuccess(data));
  }
}

export default all([takeLatest(CartTypes.ADD_REQUEST, addToCart)]);
