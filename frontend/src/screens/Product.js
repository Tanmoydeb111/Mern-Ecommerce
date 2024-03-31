import { Link } from 'react-router-dom';
import Rating from '../components/Rating';

function Product(props) {
  const { product } = props;
  return (
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
          <div>
            <p>
              <Rating rating={product.rating} numReviews={product.numReviews} />
            </p>
          </div>
          <div className="flex items-center justify-center">
            <button class="button-64">
              <span>Add to cart</span>
            </button>
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}
export default Product;
