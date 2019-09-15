export const Types = {
  ADD: 'ADD_TO_CART',
};

export default function cart(state = [], action) {
  switch (action.type) {
    case Types.ADD:
      return [
        ...state,
        {
          ...action.product,
          amount: 1,
        },
      ];
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
