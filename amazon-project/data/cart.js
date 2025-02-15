export let cart = JSON.parse(localStorage.getItem('cart'));

// if no items in cart present, will give null value and to handle the null value, we can give default value
if(!cart) {
cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1'
  },
  {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId: '2'
  }];
}
function saveToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}
export function addtoCart(productId) {
  const selectElement = document.querySelector(`.quan-id-${productId}`);
  const selectQuan = selectElement ? selectElement.value : '1'; // Default value if input is missing
  const quantity = Number(selectQuan); // as the value is in form of string

  let matchingItem;
  cart.forEach((CartItem) => {
    if (productId === CartItem.productId) {
      matchingItem = CartItem;
    }
  });

  if (matchingItem) {
    //matchingItem.quantity += 1;
    matchingItem.quantity += quantity;
  }
  else {
    cart.push({
      productId: productId,
      //quantity: 1
      quantity: quantity,
      deliveryOptionId: '1'
    });
  }
  //console.log(cart);
  saveToLocalStorage();
}

export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;

  saveToLocalStorage();
}

// general function for calculating total  item count
export function calCartQuantity() {
  let totalQuantity = 0;

  cart.forEach((CartItem) => {
    totalQuantity += CartItem.quantity;
  });
  return totalQuantity;
}

export function updateQuantity(productId, newQuantity) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if(productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  
  matchingItem.quantity = newQuantity;
  
  saveToLocalStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if(productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
    matchingItem.deliveryOptionId = deliveryOptionId;

    saveToLocalStorage();
}

// to delete the data and to show default data
//localStorage.removeItem('cart');

// if you get an error, but your code looks correct maybe bad data saved in localStorage
// localStorage.clear();