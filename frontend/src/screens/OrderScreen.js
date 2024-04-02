import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';

import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import { getError } from '../utils';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}
export default function OrderScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const params = useParams();
  const { id: orderId } = params;
  const navigate = useNavigate();

  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    if (!userInfo) {
      return navigate('/login');
    }
    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
    }
  }, [order, userInfo, orderId, navigate]);
  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <Helmet>
        <title>Order {orderId}</title>
      </Helmet>
      <h1 className="my-3">Order {orderId}</h1>
      <div className="flex flex-wrap -mx-3">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <div className="p-4 shadow mb-4">
            <h2 className="font-bold mb-2">Shipping</h2>
            <p>
              <strong>Name:</strong> {order.shippingAddress.fullName} <br />
              <strong>Address: </strong> {order.shippingAddress.address},
              {order.shippingAddress.city}, {order.shippingAddress.postalCode},
              {order.shippingAddress.country}
            </p>
            {order.isDelivered ? (
              <div className="p-2 bg-green-500 text-white mt-2 rounded">
                Delivered at {order.deliveredAt}
              </div>
            ) : (
              <div className="p-2 bg-red-500 text-white mt-2 rounded">
                Not Delivered
              </div>
            )}
          </div>

          <div className="p-4 shadow mb-4">
            <h2 className="font-bold mb-2">Payment</h2>
            <p>
              <strong>Method:</strong> {order.paymentMethod}
            </p>
            {order.isPaid ? (
              <div className="p-2 bg-green-500 text-white mt-2 rounded">
                Paid at {order.paidAt}
              </div>
            ) : (
              <div className="p-2 bg-red-500 text-white mt-2 rounded">
                Not Paid
              </div>
            )}
          </div>

          <div className="p-4 shadow mb-4">
            <h2 className="font-bold mb-2">Items</h2>
            <ul className="list-none">
              {order.orderItems.map((item) => (
                <li key={item._id} className="py-1">
                  <div className="flex items-center">
                    <div className="w-1/2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full rounded"
                      />
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </div>
                    <div className="w-1/4">
                      <span>{item.quantity}</span>
                    </div>
                    <div className="w-1/4">${item.price}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full md:w-1/2 px-3">
          <div className="p-4 shadow">
            <h2 className="font-bold mb-2">Order Summary</h2>
            <ul className="list-none">
              <li className="py-1 flex justify-between">
                <span>Items</span>
                <span>${order.itemsPrice.toFixed(2)}</span>
              </li>
              <li className="py-1 flex justify-between">
                <span>Shipping</span>
                <span>${order.shippingPrice.toFixed(2)}</span>
              </li>
              <li className="py-1 flex justify-between">
                <span>Tax</span>
                <span>${order.taxPrice.toFixed(2)}</span>
              </li>
              <li className="py-1 flex justify-between">
                <strong>Order Total</strong>
                <strong>${order.totalPrice.toFixed(2)}</strong>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
