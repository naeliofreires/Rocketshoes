import produce from 'immer';

export const Types = {
  ADD: 'ADD_TO_CART',
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
    default:
      return state;
  }
}

export const Creators = {
  AddProduct: product => ({
    type: Types.ADD,
    product,
  }),
};
