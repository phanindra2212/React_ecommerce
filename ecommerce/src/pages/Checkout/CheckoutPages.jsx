import './CheckoutHeader.css'
import './CheckoutPages.css'
import { Link } from 'react-router';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';

export function CheckoutPage({ cartItems = [] }) {
  const [deliveryOption, setDeliveryOption] = useState([]);

  useEffect(() => {
    axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
      .then((response) => {
        setDeliveryOption(response.data);
      });
  }, []);

  const getSelectedDeliveryOption = (cartItem) => {
    return deliveryOption.find(option => option.id === cartItem.deliveryOptionId) || { deliveryDays: 7, priceCents: 0 };
  };

  let totalQuantity = 0;
  let itemsPriceCents = 0;
  let shippingCents = 0;

  cartItems.forEach((carts) => {
    totalQuantity += carts.quantity;
    if (carts.product) {
      itemsPriceCents += carts.product.priceCents * carts.quantity;
    }
    const selectedOption = getSelectedDeliveryOption(carts);
    shippingCents += selectedOption.priceCents;
  });

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
          <OrderSummary cartItems={cartItems} deliveryOption={deliveryOption} />

          <PaymentSummary 
            totalQuantity={totalQuantity}
            itemsPriceCents={itemsPriceCents}
            shippingCents={shippingCents}
            totalBeforeTaxCents={totalBeforeTaxCents}
            estimatedTaxCents={estimatedTaxCents}
            orderTotalCents={orderTotalCents}
          />
        </div>
      </div>
    </>
  );
}
