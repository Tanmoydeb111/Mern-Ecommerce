import axios from 'axios';
// import { useEffect, useReducer } from 'react';
import { useContext, useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import Rating from '../components/Rating';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';
import { Store } from '../Store';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductScreen() {
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const addToCartHandler = () => {
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity: 1 },
    });
  };

  return loading ? (
    <div>
      <LoadingBox />
    </div>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1>{slug}</h1>
      <div className="flex text-white">
        <div className="w-1/2">
          <img className="w-full" src={product.image} alt={product.name}></img>
        </div>
        <div className="w-1/4 px-4 ">
          <ul>
            <li>
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
              <h1>{product.name}</h1>
            </li>
            <li>
              <Rating
                rating={product.rating}
                numReviews={product.numReviews}
              ></Rating>
            </li>
            <li>Price : ${product.price}</li>
            <li>
              Description:
              <p>{product.description}</p>
            </li>
          </ul>
        </div>
        <div className="w-1/4 px-4">
          <div className="border p-4">
            <ul>
              <li>
                <div className="flex justify-between ">
                  <div>Price:</div>
                  <div>${product.price}</div>
                </div>
              </li>
              <li>
                <div className="flex justify-between">
                  <div>Status:</div>
                  <div>
                    {product.countInStock > 0 ? (
                      <span className="bg-green-500 text-white px-2 py-1 rounded ">
                        In Stock
                      </span>
                    ) : (
                      <span className="bg-red-500 text-white px-2 py-1 rounded">
                        Unavailable
                      </span>
                    )}
                  </div>
                </div>
              </li>

              {product.countInStock > 0 && (
                <li>
                  <button
                    onClick={addToCartHandler}
                    className="w-full bg-blue-500 text-white p-2 rounded"
                  >
                    Add to Cart
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductScreen;
