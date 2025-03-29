import { cart, removeFromCart, calCartQuantity, updateQuantity, updateDeliveryOption } from '../../data/cart.js';
import { getMatchingProduct } from '../../data/products.js';
import { currency } from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions, getDeliveryOptions, calculateDeliveryDate } from '../../data/deliveryOptions.js';
import {renderPaymentSummary} from './paymentSummary.js';
import {renderCheckoutHeader} from './checkoutHeader.js';


export function renderOrderSummary() {

let cartHTML = '';
cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  const matchingProd = getMatchingProduct(productId);

  // check which option is seleced for delivery and display in title
  const deliveryOptionId = cartItem.deliveryOptionId;
  const deliveryOption = getDeliveryOptions(deliveryOptionId);

  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.dDays, 'days');
  const dateString = calculateDeliveryDate(deliveryOption);

  cartHTML += `
        <div class="cart-item-container item-${matchingProd.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProd.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProd.name}
                </div>
                <div class="product-price">
                  $${currency(matchingProd.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label update-quantity-${matchingProd.id}">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary" data-product-id="${matchingProd.id}">
                    Update
                  </span>
                  <input class="quantity-input updated-quantity-${matchingProd.id}">
                  <span class="save-quantity-link link-primary" data-product-id="${matchingProd.id}">Save</span>
                  <span class="delete-quantity-link link-primary" data-product-id="${matchingProd.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingProd, cartItem)}
              </div>
            </div>
          </div>
        `;
});

function deliveryOptionsHTML(matchingProd, cartItem) {
  let html = '';

  deliveryOptions.forEach((deliveryOption) => {
    // const today = dayjs();
    // const deliveryDate = today.add(deliveryOption.dDays, 'days');
    const dateString = calculateDeliveryDate(deliveryOption);
    
    const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${currency(deliveryOption.priceCents)} -`; 
    
    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
    html += `<div class="delivery-option js-delivery-option" data-product-id="${matchingProd.id}" data-delivery-option-id="${deliveryOption.id}">
        <input type="radio" ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProd.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>`
  });
  return html;
}
document.querySelector('.order-summary').innerHTML = cartHTML;

// when page loads, show count value present in cart
updateCart();

// delete items
document.querySelectorAll('.delete-quantity-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);

    // when delete, change the count value
    renderCheckoutHeader();

    // when we delete, order should be removed and remaining should be updated
    renderOrderSummary();

    // when we delete, payment calculations should also be updated
    renderPaymentSummary();
  });
});

function updateCart() {
  let totalQuantity = calCartQuantity();
  document.querySelector('.total-checkout-items').innerHTML = totalQuantity + ' items';
}

// update items
document.querySelectorAll('.update-quantity-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    //console.log(productId);

    const container = document.querySelector(`.item-${productId}`);
    container.classList.add('is-editing-quantity');
  })
});

// save items
document.querySelectorAll('.save-quantity-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;

    // enter quantity and update
    const val = document.querySelector(`.updated-quantity-${productId}`);
    const newQuantity = Number(val.value);
    // console.log(newQuantity);
    if (newQuantity <= 0 || newQuantity >= 1000) {
      alert('Quantity should be atleast 1 and less than 1000');
      return;
    }
    updateQuantity(productId, newQuantity);

    // update on total checkout count items
    const newQ = document.querySelector(`.update-quantity-${productId}`);
    newQ.innerHTML = newQuantity;
    
    // when delete, change the count value
    renderCheckoutHeader();

    // when update the quantity and click n save, value should also be updated
    renderPaymentSummary();

    const container = document.querySelector(`.item-${productId}`);
    container.classList.remove('is-editing-quantity');

  });
});

// delivery option
document.querySelectorAll('.js-delivery-option').forEach((elem) => {
  elem.addEventListener('click',() => {
    const {productId, deliveryOptionId} = elem.dataset;
    updateDeliveryOption(productId, deliveryOptionId);

    renderOrderSummary();

    // when we change the delivery option, payment calculations should also be updated
    renderPaymentSummary();
  });
});

}