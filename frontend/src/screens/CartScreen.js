import { useContext } from 'react';
import { Store } from '../Store';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CartScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };
  const removeItemHandler = (item) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping');
  };

  return (
    <div className="container mx-auto px-4">
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
      <div className="flex flex-wrap -mx-4">
        <div className="w-full lg:w-2/3 px-4">
          {cartItems.length === 0 ? (
            <div
              className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3"
              role="alert"
            >
              Cart is empty.{' '}
              <Link to="/" className="underline text-blue-700">
                Go Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center space-x-4 bg-white p-4 rounded-md"
                >
                  <div className="w-1/3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full rounded-md"
                    />
                    <Link
                      to={`/product/${item.slug}`}
                      className="text-blue-500 underline"
                    >
                      {item.name}
                    </Link>
                  </div>
                  <div className="w-1/4 flex items-center space-x-2">
                    <button
                      onClick={() => updateCartHandler(item, item.quantity - 1)}
                      disabled={item.quantity === 1}
                      className="bg-gray-200 p-2 rounded-md"
                    >
                      <i className="fas fa-minus-circle"></i>
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="bg-gray-200 p-2 rounded-md"
                      onClick={() => updateCartHandler(item, item.quantity + 1)}
                      disabled={item.quantity === item.countInStock}
                    >
                      <i className="fas fa-plus-circle"></i>
                    </button>
                  </div>
                  <div className="w-1/4">${item.price}</div>
                  <div className="w-1/4">
                    <button
                      onClick={() => removeItemHandler(item)}
                      className="bg-red-500 text-white p-2 rounded-md"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="w-full lg:w-1/3 px-4">
          <div className="bg-white p-4 rounded-md">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold">
                  Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                  items) : $
                  {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                </h3>
              </div>
              <div>
                <button
                  onClick={checkoutHandler}
                  className="w-full bg-blue-500 text-white p-2 rounded-md"
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
