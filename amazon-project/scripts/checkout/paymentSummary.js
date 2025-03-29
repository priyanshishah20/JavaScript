import { cart, calCartQuantity } from "../../data/cart.js";
import { getMatchingProduct } from '../../data/products.js';
import { getDeliveryOptions } from '../../data/deliveryOptions.js';
import { currency } from '../utils/money.js';

// calcuate the cost of the products
export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    const product = getMatchingProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOptions(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });
  const totalBeforeTax = productPriceCents + shippingPriceCents;
  const tax = totalBeforeTax * 0.1;
  const totalCents = totalBeforeTax + tax;
  // console.log(productPriceCents);
  // console.log(shippingPriceCents);
  // console.log(totalBeforeTax);
  // console.log(totalCents);

  let paymentHTML = `<div class="payment-summary-title">
            Order Summary</div>

          <div class="payment-summary-row">
            <div>Items (${calCartQuantity()}):</div>
            <div class="payment-summary-money">$${currency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${currency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${currency(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${currency(tax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${currency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>`;
  //console.log(paymentHTML);

  document.querySelector('.payment-summary').innerHTML = paymentHTML;
  updateCart();

  // Order confirmation message
  const addMsg = document.querySelector('.order-confirmation');
  let showMsg, hideMsg;
  document.querySelector('.place-order-button').addEventListener('click', () => {

    clearTimeout(showMsg);
    clearTimeout(hideMsg);

    showMsg = setTimeout(() => {
      addMsg.style.opacity = '1';
      
      hideMsg = setTimeout(() => {
        addMsg.style.opacity = '0';
      }, 3000);
    }, 1000);

  });
}

function updateCart() {
  let totalQuantity = calCartQuantity();
  document.querySelector('.total-checkout-items').innerHTML = totalQuantity + ' items';
}


// document.querySelector('.place-order-button').addEventListener('click', async()=> {
//   window.location.href = 'orders.html';
// })