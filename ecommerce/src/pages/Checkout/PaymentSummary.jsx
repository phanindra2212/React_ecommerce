import { formatMoney } from "../../utils/money"

export function PaymentSummary({ 
  totalQuantity = 0, 
  itemsPriceCents = 0, 
  shippingCents = 0, 
  totalBeforeTaxCents = 0, 
  estimatedTaxCents = 0, 
  orderTotalCents = 0 
}) {
  return (
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
  );
}
