import './CheckoutHeader.css'
import './CheckoutPages.css'
import { Link } from 'react-router';
import { formatMoney } from '../utils/money';
import axios from 'axios';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

export function CheckoutPage({ cartItems = [] }) {
  const [deliveryOption, setDeliveryOption] = useState([]);
  useEffect(() => {
    axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
      .then((response) => {
        setDeliveryOption(response.data);
      })
  }, []);

  let totalQuantity = 0;
  let itemsPriceCents = 0;

  cartItems.forEach((carts) => {
    totalQuantity += carts.quantity;
    if (carts.product) {
      itemsPriceCents += carts.product.priceCents * carts.quantity;
    }
  });

  const shippingCents = cartItems.length > 0 ? 499 : 0;
  const totalBeforeTaxCents = itemsPriceCents + shippingCents;
  const estimatedTaxCents = Math.round(totalBeforeTaxCents * 0.1);
  const orderTotalCents = totalBeforeTaxCents + estimatedTaxCents;

  return (
    <>
      <title>Checkout</title>

      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <Link to="/">
              <img className="logo" src="/images/logo.png" />
              <img className="mobile-logo" src="/images/mobile-logo.png" />
            </Link>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (<Link className="return-to-home-link"
              to="/"> {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'} </Link>)
          </div>

          <div className="checkout-header-right-section">
            <img src="/images/icons/checkout-lock-icon.png" />
          </div>
        </div>
      </div>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <div className="order-summary">
            {cartItems.map((carts) => {
              return (
                <div key={carts.productId} className="cart-item-container">
                  <div className="delivery-date">
                    {dayjs(carts.deliverySLA).format('dddd, MMMM D')}

                  </div>

                  <div className="cart-item-details-grid">
                    <img className="product-image"
                      src={`/${carts.product?.image}`} />

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
                      {deliveryOption.map((deliveryOption) => {
                        let priceString = "Free shipping";

                        if (deliveryOption.priceCents > 0) {
                          priceString = `$${formatMoney(deliveryOption.priceCents)} shipping `
                        }
                        return (
                          <div className="delivery-option">
                            <input type="radio" defaultChecked
                              className="delivery-option-input"
                              name={`delivery-option-${carts.productId}`} />
                            <div>
                              <div className="delivery-option-date">
                                Tuesday, June 21
                              </div>
                              <div className="delivery-option-price">
                                FREE Shipping
                              </div>
                            </div>
                          </div>
                        );
                      }
                      )}
                      <div className="delivery-option">
                        <input type="radio" defaultChecked
                          className="delivery-option-input"
                          name={`delivery-option-${carts.productId}`} />
                        <div>
                          <div className="delivery-option-date">
                            Tuesday, June 21
                          </div>
                          <div className="delivery-option-price">
                            FREE Shipping
                          </div>
                        </div>
                      </div>
                      <div className="delivery-option">
                        <input type="radio"
                          className="delivery-option-input"
                          name={`delivery-option-${carts.productId}`} />
                        <div>
                          <div className="delivery-option-date">
                            Wednesday, June 15
                          </div>
                          <div className="delivery-option-price">
                            $4.99 - Shipping
                          </div>
                        </div>
                      </div>
                      <div className="delivery-option">
                        <input type="radio"
                          className="delivery-option-input"
                          name={`delivery-option-${carts.productId}`} />
                        <div>
                          <div className="delivery-option-date">
                            Monday, June 13
                          </div>
                          <div className="delivery-option-price">
                            $9.99 - Shipping
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="payment-summary">
            <div className="payment-summary-title">
              Payment Summary
            </div>

            <div className="payment-summary-row">
              <div>Items ({totalQuantity}):</div>
              <div className="payment-summary-money">${formatMoney(itemsPriceCents)}</div>
            </div>

            <div className="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div className="payment-summary-money">${formatMoney(shippingCents)}</div>
            </div>

            <div className="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div className="payment-summary-money">${formatMoney(totalBeforeTaxCents)}</div>
            </div>

            <div className="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div className="payment-summary-money">${formatMoney(estimatedTaxCents)}</div>
            </div>

            <div className="payment-summary-row total-row">
              <div>Order total:</div>
              <div className="payment-summary-money">${formatMoney(orderTotalCents)}</div>
            </div>

            <button className="place-order-button button-primary">
              Place your order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
