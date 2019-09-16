import produce from 'immer';

export const Types = {
  ADD: '@cart/ADD',
  REMOVE: '@cart/REMOVE',
  UPDATE: '@cart/UPDATE',
};

export default function cart(state = [], action) {
  switch (action.type) {
    case Types.ADD:
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.product.id);

        if (productIndex >= 0) {
          draft[productIndex].amount += 1;
        } else {
          draft.push({ ...action.product, amount: 1 });
        }
      });
    case Types.REMOVE:
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.productId);

        if (productIndex >= 0) {
          draft.splice(productIndex, 1);
        }
      });
    case Types.UPDATE: {
      if (action.amount <= 0) {
        return state;
      }

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
  addProduct: product => ({
    type: Types.ADD,
    product,
  }),

  removeProduct: productId => ({
    type: Types.REMOVE,
    productId,
  }),

  updateProduct: (productId, amount) => ({
    type: Types.UPDATE,
    productId,
    amount,
  }),
};
