import produce from 'immer';

export const Types = {
  ADD_REQUEST: '@cart/ADD_REQUEST',
  ADD_SUCCESS: '@cart/ADD_SUCCESS',
  UPDATE_REQUEST: '@cart/UPDATE_REQUEST',
  UPDATE_SUCCESS: '@cart/UPDATE_SUCCESS',
  REMOVE: '@cart/REMOVE',
};

export default function cart(state = [], action) {
  switch (action.type) {
    case Types.ADD_SUCCESS:
      return produce(state, draft => {
        const { product } = action;

        draft.push(product);
      });

    case Types.REMOVE:
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.productId);

        if (productIndex >= 0) {
          draft.splice(productIndex, 1);
        }
      });

    case Types.UPDATE_SUCCESS: {
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.productId);

        if (productIndex >= 0) {
          draft[productIndex].amount = Number(action.amount);
        }
      });
    }

    default:
      return state;
  }
}

export const Creators = {
  addProductRequest: id => ({
    type: Types.ADD_REQUEST,
    id,
  }),

  addProductSuccess: product => ({
    type: Types.ADD_SUCCESS,
    product,
  }),

  removeProduct: productId => ({
    type: Types.REMOVE,
    productId,
  }),

  updateProductRequest: (productId, amount) => ({
    type: Types.UPDATE_REQUEST,
    productId,
    amount,
  }),

  updateProductSuccess: (productId, amount) => ({
    type: Types.UPDATE_SUCCESS,
    productId,
    amount,
  }),
};
