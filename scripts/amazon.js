import {cart, addtoCart, calCartQuantity} from '../data/cart.js';
import {products} from '../data/products.js';
import { currency } from './utils/money.js';

// when page loads, show count value present in cart
updateCart();

let productsHTML = '';
products.forEach((product) => {
  productsHTML += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
          ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
            ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
          $${currency(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select  class="quan-id-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart added-msg-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary add-btn" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>`;

});

function addDisplayMsg(productId) {
  // Added msg popup
  const addMsg = document.querySelector(`.added-msg-${productId}`);
  addMsg.style.opacity = '1';
  
  const previousTimeoutId = addedMsgTimeouts[productId];
  if (previousTimeoutId) {
    clearTimeout(previousTimeoutId);
  }
  
  const timeoutId = setTimeout(() => {
    addMsg.style.opacity = '0';
  }, 2000);

  addedMsgTimeouts[productId] = timeoutId;
}

function updateCart() {
  let totalQuantity = calCartQuantity();
  
  if(totalQuantity === 0) {
    document.querySelector('.cart-quantity').innerHTML = '';
  }
  else {
    document.querySelector('.cart-quantity').innerHTML = totalQuantity;
  }
}

// reset the timeout interval, created object
const addedMsgTimeouts = {};

document.querySelector('.products-grid').innerHTML = productsHTML;
document.querySelectorAll('.add-btn')
  .forEach((button) => {
    button.addEventListener('click', () => {
      //const productId = button.dataset.productId;
      const {productId} = button.dataset;

      addtoCart(productId);
      updateCart();

      addDisplayMsg(productId);
    });
  });