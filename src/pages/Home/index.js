import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md';

import { formatPrice } from '../../util/format';
import api from '../../services/api';

import ProductList from './styles';

import { Creators as CartActions } from '../../store/modules/cart/reducer';

export default function Home() {
  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();
  const amountProducts = useSelector(state =>
    state.cart.reduce((amount, product) => {
      amount[product.id] = product.amount;

      return amount;
    }, {})
  );

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('products');

      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));

      setProducts(data);
    }

    loadProducts();
  }, []);

  return (
    <ProductList>
      {products.map(product => (
        <li key={product.id}>
          <img src={product.image} alt="Tênis" />
          <strong>{product.title}</strong>
          <span>{product.priceFormatted}</span>

          <button
            type="button"
            onClick={() => dispatch(CartActions.addProductRequest(product.id))}
          >
            <div>
              <MdAddShoppingCart size={16} color="#FFF" />
              <small>{amountProducts[product.id] || 0}</small>
            </div>
            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
}
