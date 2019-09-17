import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import history from '../../../services/history';

import { formatPrice } from '../../../util/format';

import { Creators as CartActions, Types as CartTypes } from './reducer';

function* addToCart({ id }) {
  const productExists = yield select(state =>
    state.cart.find(p => p.id === id)
  );

  const stock = yield call(api.get, `/stock/${id}`);

  const stockAmount = stock.data.amount;
  const currentAmount = productExists ? productExists.amount : 0;

  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    toast.error('Quantidade solicitada fora de estoque');
    return;
  }

  if (productExists) {
    yield put(CartActions.updateProductSuccess(id, amount));
  } else {
    const response = yield call(api.get, `/products/${id}`);

    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
    };

    yield put(CartActions.addProductSuccess(data));
    history.push('/cart');
  }
}

function* updateAmount(action) {
  const { productId, amount } = action;

  if (amount <= 0) return;

  const stock = yield call(api.get, `/stock/${productId}`);

  const stockAmount = stock.data.amount;

  if (amount > stockAmount) {
    toast.error('Quantidade solicitada fora de estoque');
    return;
  }

  yield put(CartActions.updateProductSuccess(productId, amount));
}

export default all([
  takeLatest(CartTypes.ADD_REQUEST, addToCart),
  takeLatest(CartTypes.UPDATE_REQUEST, updateAmount),
]);
