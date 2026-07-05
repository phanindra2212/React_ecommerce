import { formatMoney } from "../../utils/money";

export function ProductsGrid({ products = [] }) {
  return (
    <div className="products-grid">
      {products.map((product) => (
        <div key={product.id} className="product-container">
          <div className="product-image-container">
            <img
              className="product-image"
              src={`/${product.image}`}
              alt={product.name}
            />
          </div>

          <div className="product-name limit-text-to-2-lines">
            {product.name}
          </div>

          <div className="product-rating-container">
            <img
              className="product-rating-stars"
              src={`/images/ratings/rating-${product.rating.stars * 10}.png`}
              alt="Rating"
            />

            <div className="product-rating-count link-primary">
              {product.rating.count}
            </div>
          </div>

          <div className="product-price">
            ${formatMoney(product.priceCents)}
          </div>

          <div className="product-quantity-container">
            <select defaultValue={1}>
              {[...Array(10)].map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="product-spacer"></div>

          <div className="added-to-cart">
            <img src="/images/icons/checkmark.png" alt="Added" />
            Added
          </div>

          <button className="add-to-cart-button button-primary">
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
