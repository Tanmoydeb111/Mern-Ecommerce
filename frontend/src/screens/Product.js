import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';

function Product(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
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

  return (
    <div className="flex flex-col m-2 px-5" key={product.slug}>
      <div
        className="flex flex-col cursor-pointer bg-white justify-center py-6 px-10 text-center items-center mt-12 rounded-tl-[35px] rounded-br-[35px] shadow-2xl md:min-h-[340px] w-full card-item-div max-w-screen-md min-h-[260px]"
        style={{ backgroundImage: `url(${product.image})` }}
      >
        {/* <div> */}
        <Link to={`/product/${product.slug}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-[75px] mb-4"
          />
        </Link>

        {/* <div> */}
        <Link to={`/product/${product.slug}`}>
          <p className="text-[24px] font-bold uppercase mb-7">{product.name}</p>
        </Link>
        <p>
          <strong>${product.price}</strong>
        </p>
        <p>
          <Rating rating={product.rating} numReviews={product.numReviews} />
        </p>
        {product.countInStock === 0 ? (
          <button disabled>Out of stock</button>
        ) : (
          <button
            className="flex items-center justify-center button-64"
            onClick={() => addToCartHandler(product)}
          >
            <span>Add to cart</span>
          </button>
        )}
        {/* </div> */}
        {/* </div> */}
      </div>
    </div>
  );
}
export default Product;
