import React, { Fragment, useEffect, useState } from 'react';
import Header from '../../components/header';
import './OrdersPages.css';
import { Link } from 'react-router';
import axios from 'axios';
import dayjs from 'dayjs';
import { formatMoney } from '../../utils/money';

export function OrdersPage({ cartItems = [] }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/api/orders?expand=products')
      .then((response) => {
        setOrders(response.data);
      });
  }, []);

  return (
    <>
      <title>Orders</title>

      <Header cart={cartItems} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.map((order) => {
            const orderDateStr = dayjs(order.orderTimeMs).format('MMMM D');
            const totalCostStr = formatMoney(order.totalCostCents);

            return (
              <div key={order.id} className="order-container">
                <div className="order-header">
                  <div className="order-header-left-section">
                    <div className="order-date">
                      <div className="order-header-label">Order Placed:</div>
                      <div>{orderDateStr}</div>
                    </div>
                    <div className="order-total">
                      <div className="order-header-label">Total:</div>
                      <div>${totalCostStr}</div>
                    </div>
                  </div>

                  <div className="order-header-right-section">
                    <div className="order-header-label">Order ID:</div>
                    <div>{order.id}</div>
                  </div>
                </div>

                <div className="order-details-grid">
                  {order.products?.map((item) => {
                    const deliveryDateStr = dayjs(item.estimatedDeliveryTimeMs).format('MMMM D');

                    return (
                      <Fragment key={item.productId}>
                        <div className="product-image-container">
                          <img src={`/${item.product?.image}`} alt={item.product?.name} />
                        </div>

                        <div className="product-details">
                          <div className="product-name">
                            {item.product?.name}
                          </div>
                          <div className="product-delivery-date">
                            Arriving on: {deliveryDateStr}
                          </div>
                          <div className="product-quantity">
                            Quantity: {item.quantity}
                          </div>
                          <button className="buy-again-button button-primary">
                            <img
                              className="buy-again-icon"
                              src="/images/icons/buy-again.png"
                              alt="Buy again"
                            />
                            <span className="buy-again-message">Add to Cart</span>
                          </button>
                        </div>

                        <div className="product-actions">
                          <Link to="/tracking" className="track-package-link">
                            <button className="track-package-button button-secondary">
                              Track package
                            </button>
                          </Link>
                        </div>
                      </Fragment>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
