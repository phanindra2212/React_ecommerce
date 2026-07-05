import dayjs from 'dayjs';
import { formatMoney } from '../../utils/money';

export function OrderSummary({ cartItems = [], deliveryOption = [] }) {
  return (
    <div className="order-summary">
      {cartItems.map((carts) => {
        const selectedDeliveryOption = deliveryOption.find(
          (option) => option.id === carts.deliveryOptionId
        ) || { estimatedDeliveryTimeMs: Date.now() + 7 * 24 * 60 * 60 * 1000 };

        return (
          <div key={carts.productId} className="cart-item-container">
            <div className="delivery-date">
              Delivery date: {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
            </div>

            <div className="cart-item-details-grid">
              <img className="product-image"
                src={`/${carts.product?.image}`} alt={carts.product?.name} />

              <div className="cart-item-details">
                <div className="product-name">
                  {carts.product?.name}
                </div>
                <div className="product-price">
                  ${formatMoney(carts.product?.priceCents)}
                </div>
                <div className="product-quantity">
                  <span>
                    Quantity: <span className="quantity-label">{carts.quantity}</span>
                  </span>
                  <span className="update-quantity-link link-primary">
                    Update
                  </span>
                  <span className="delete-quantity-link link-primary">
                    Delete
                  </span>
                </div>
              </div>

              <div className="delivery-options">
                <div className="delivery-options-title">
                  Choose a delivery option:
                </div>
                {deliveryOption.length > 0 ? deliveryOption.map((option) => {
                  let priceString = 'Free shipping';

                  if (option.priceCents > 0) {
                    priceString = `$${formatMoney(option.priceCents)} shipping`;
                  }
                  const isChecked = option.id === carts.deliveryOptionId;
                  return (
                    <div className="delivery-option" key={option.id}>
                      <input type="radio" checked={isChecked} readOnly
                        className="delivery-option-input"
                        name={`delivery-option-${carts.productId}`} />
                      <div>
                        <div className="delivery-option-date">
                          {dayjs(option.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                        </div>
                        <div className="delivery-option-price">
                          {priceString}
                        </div>
                      </div>
                    </div>
                  );
                }) : (
                  <div className="delivery-option">
                    <input type="radio" checked readOnly
                      className="delivery-option-input"
                      name={`delivery-option-${carts.productId}`} />
                    <div>
                      <div className="delivery-option-date">
                        {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                      </div>
                      <div className="delivery-option-price">
                        Free shipping
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
