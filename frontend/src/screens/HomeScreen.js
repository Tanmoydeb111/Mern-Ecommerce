// import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useReducer, useState } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Featured Products</h1>
      <div className="flex flex-wrap items-start">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          products.map((product) => (
            <div className="flex flex-col m-2 px-5" key={product.slug}>
              <div
                className="flex flex-col cursor-pointer bg-white justify-center py-6 px-10 text-center items-center mt-12 rounded-tl-[35px] rounded-br-[35px] shadow-2xl md:min-h-[340px] w-full card-item-div max-w-screen-md min-h-[260px]"
                style={{ backgroundImage: `url(${product.image})` }}
              >
                <div>
                  <Link to={`/product/${product.slug}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-[75px] mb-4"
                    />
                  </Link>

                  {/* <div> */}
                  <Link to={`/product/${product.slug}`}>
                    <p className="text-[24px] font-bold uppercase mb-7">
                      {product.name}
                    </p>
                  </Link>
                  <p>
                    <strong>${product.price}</strong>
                  </p>
                  <button>Add to cart</button>
                  {/* </div> */}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
export default HomeScreen;
