const productsData  = [
 {
     id: 1,
     name: "Premium Wireless Headphones",
     price: 149.99,
     originalPrice: 199.99,
     image: "https://www.ooberpad.com/cdn/shop/products/B_WPx8-black.jpg?v=1670560666&width=1200",
     description: "Noise cancelling technology with premium sound quality. Enjoy 30+ hours of battery life.",
     sale: true
 },
 {
     id: 2,
     name: "Smart Fitness Watch",
     price: 89.99,
     originalPrice: 119.99,
     image: "https://m.media-amazon.com/images/I/41RFuTHqnaL.jpg",
     description: "Track your workouts, heart rate, and sleep patterns with this waterproof smart watch.",
     sale: true
 },
 {
     id: 3,
     name: "Gaming Laptop",
     price: 1200.00,
     originalPrice: 1500.00,
     image: "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/g-series/g16-7630/pdp/laptop-g16-7630-intel-pdp-hero.psd?qlt=95&fit=constrain,1&hei=400&wid=570&fmt=png-alpha",
     description: "High-performance gaming laptop with a 144Hz display and powerful GPU.",
     sale: true
 },
 {
     id: 4,
     name: "4K Smart TV",
     price: 799.99,
     originalPrice: 999.99,
     image: "https://res.cloudinary.com/sharp-consumer-eu/image/fetch/w_3000,f_auto/https://s3.infra.brandquad.io/accounts-media/SHRP/DAM/origin/de0d3686-4766-11ee-8cfb-8ee861fd9236.jpg",
     description: "Ultra HD 4K Smart TV with HDR support and voice assistant integration.",
     sale: false
 },
 {
     id: 5,
     name: "Wireless Earbuds",
     price: 59.99,
     originalPrice: 79.99,
     image: "https://yamaha.ndcdn.in/media/catalog/product/cache/9e0f31af0cdc06df956748b13dabad87/t/w/tw-e3b_black_a.jpg",
     description: "Compact and lightweight earbuds with superior sound and noise isolation.",
     sale: true
 },
 {
     id: 6,
     name: "Smart Home Speaker",
     price: 129.99,
     originalPrice: 159.99,
     image: "https://www.cnet.com/a/img/resize/9fa02d8976b7d88565107e685ef8e0e480c9343a/hub/2020/10/21/a532eddf-2122-4ca0-bc56-539295329d2b/amazon-echo-2020-2.jpg?auto=webp&fit=crop&height=360&width=640",
     description: "Voice-controlled smart home speaker with built-in assistant support.",
     sale: false
 },
 {
     id: 7,
     name: "Digital Camera",
     price: 499.99,
     originalPrice: 599.99,
     image: "https://in.canon/media/image/2018/11/19/b639ce271d2b450c974112ee3a7246ba_PowerShot-SX70-HS-Front-Slant.png",
     description: "Capture stunning photos and videos with this high-resolution digital camera.",
     sale: true
 },
 {
     id: 8,
     name: "Electric Toothbrush",
     price: 79.99,
     originalPrice: 99.99,
     image: "https://cdn11.bigcommerce.com/s-xyx0x9ybhg/images/stencil/1280x1280/products/1250/9075/B0C1H5CFSX.MAIN__71094.1722318163.jpg?c=2",
     description: "Advanced electric toothbrush with multiple cleaning modes and timer.",
     sale: false
 },
 {
     id: 9,
     name: "Smartphone Gimbal",
     price: 109.99,
     originalPrice: 139.99,
     image: "https://m.media-amazon.com/images/I/71rMpxI9dYL.jpg",
     description: "Stabilize your smartphone videos with this professional-grade gimbal.",
     sale: true
 },
 {
     id: 10,
     name: "Robot Vacuum Cleaner",
     price: 349.99,
     originalPrice: 399.99,
     image: "https://www.electrolux.com.au/globalassets/article/robotic-vacuum-cleaner-contender/robotic-contender-banner-mb.jpg?width=464",
     description: "Intelligent robot vacuum cleaner with mapping and automatic charging.",
     sale: false
 },
 {
     id: 11,
     name: "Bluetooth Keyboard",
     price: 49.99,
     originalPrice: 69.99,
     image: "https://images-cdn.ubuy.co.in/652f8785514e1a748c78be39-wireless-bluetooth-keyboard-2-4ghz.jpg",
     description: "Slim and responsive Bluetooth keyboard for all your typing needs.",
     sale: true
 },
 {
     id: 12,
     name: "Portable Power Bank",
     price: 39.99,
     originalPrice: 49.99,
     image: "https://mobilla.in/cdn/shop/files/white_725_1st_images.webp?v=1735369854",
     description: "High-capacity portable power bank with fast charging support.",
     sale: true
 }
];

let cart = [];
function displayProducts(products) {
 console.log(products)
 const productsContainer = document.getElementById('productsContainer');
 productsContainer.innerHTML = '';
 
 products.forEach(product => {
   const productElement = document.createElement('div');
   productElement.className = 'product-card';
   
   productElement.innerHTML = `
     <div class="product-image-container">
       ${product.originalPrice > product.price ? '<span class="product-badge">SALE</span>' : ''}
       <img src="${product.image}" alt="${product.name}" class="product-image">
     </div>
     <div class="product-info">
       <h3 class="product-name">${product.name}</h3>
       <p class="product-price">
         $${product.price.toFixed(2)}
         ${product.originalPrice > product.price ? 
           `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
       </p>
       <p class="product-description">${product.description}</p>
       <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
     </div>
   `;
   
   productsContainer.appendChild(productElement);
 });

 // Add event listeners to all "Add to Cart" buttons
 document.querySelectorAll('.add-to-cart').forEach(button => {
   button.addEventListener('click', addToCart);
 });
}

function addToCart(event) {
 const productId = parseInt(event.target.getAttribute('data-id'));
 const product = productsData.find(item => item.id === productId);

 const existingProduct = cart.find(item => item.id === productId);
 
 if (existingProduct) {
   existingProduct.quantity += 1;
 } else {
   cart.push({
     ...product,
     quantity: 1
   });
 }

 updateCartCounter();
 
 // Show notification
 showNotification(`${product.name} added to cart!`);
}

// Function to update the cart counter
function updateCartCounter() {
 const cartCounter = document.getElementById('cartCounter');
 if (cartCounter) {
   const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
   cartCounter.textContent = totalItems;
   cartCounter.style.display = totalItems > 0 ? 'flex' : 'none';
 }
}

// Function to show notification
function showNotification(message) {
 const notification = document.createElement('div');
 notification.className = 'notification';
 notification.textContent = message;
 
 document.body.appendChild(notification);
 
 // Remove notification after 3 seconds
 setTimeout(() => {
   notification.classList.add('hide');
   setTimeout(() => {
     document.body.removeChild(notification);
   }, 300);
 }, 3000);
}

function displayCart() {
 let cartSidebar = document.getElementById('cartSidebar');
 
 if (!cartSidebar) {
   cartSidebar = document.createElement('div');
   cartSidebar.id = 'cartSidebar';
   cartSidebar.className = 'cart-sidebar';
   
   document.body.appendChild(cartSidebar);
 }

 const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

 const averagePrice = cart.length > 0 ? totalPrice / cart.reduce((total, item) => total + item.quantity, 0) : 0;
 
 cartSidebar.innerHTML = `
   <div class="cart-header">
     <h2>Shopping Cart</h2>
     <button id="closeCart" class="close-cart">&times;</button>
   </div>
   <div class="cart-actions">
     <button id="sortCart">Sort by Price</button>
     <button id="clearCart">Clear Cart</button>
   </div>
   <div class="cart-summary">
     <p>Total Items: ${cart.reduce((total, item) => total + item.quantity, 0)}</p>
     <p>Total Price: $${totalPrice.toFixed(2)}</p>
     <p>Average Price: $${averagePrice.toFixed(2)}</p>
   </div>
   <div class="cart-items">
     ${cart.length > 0 ? cart.map(item => `
       <div class="cart-item">
         <img src="${item.image}" alt="${item.name}" class="cart-item-image">
         <div class="cart-item-info">
           <h3>${item.name}</h3>
           <p>$${item.price.toFixed(2)}</p>
           <div class="quantity-controls">
             <button class="quantity-btn decrease" data-id="${item.id}">-</button>
             <span>${item.quantity}</span>
             <button class="quantity-btn increase" data-id="${item.id}">+</button>
           </div>
         </div>
         <button class="remove-item" data-id="${item.id}">&times;</button>
       </div>
     `).join('') : '<p class="empty-cart">Your cart is empty</p>'}
   </div>
   <button class="checkout-btn ${cart.length === 0 ? 'disabled' : ''}">Checkout</button>
 `;

 cartSidebar.classList.add('open');
 
 document.getElementById('closeCart').addEventListener('click', closeCart);
 document.getElementById('clearCart').addEventListener('click', clearCart);
 document.getElementById('sortCart').addEventListener('click', sortCart);
 
 // Add event listeners for quantity buttons and remove buttons
 document.querySelectorAll('.quantity-btn.decrease').forEach(button => {
   button.addEventListener('click', decreaseQuantity);
 });
 
 document.querySelectorAll('.quantity-btn.increase').forEach(button => {
   button.addEventListener('click', increaseQuantity);
 });
 
 document.querySelectorAll('.remove-item').forEach(button => {
   button.addEventListener('click', removeFromCart);
 });
}

// Function to close cart sidebar
function closeCart() {
 const cartSidebar = document.getElementById('cartSidebar');
 if (cartSidebar) {
   cartSidebar.classList.remove('open');
 }
}

// Function to increase item quantity
function increaseQuantity(event) {
 const productId = parseInt(event.target.getAttribute('data-id'));
 const cartItem = cart.find(item => item.id === productId);
 
 if (cartItem) {
   cartItem.quantity += 1;
   displayCart();
   updateCartCounter();
 }
}
function decreaseQuantity(event) {
 const productId = parseInt(event.target.getAttribute('data-id'));
 const cartItem = cart.find(item => item.id === productId);
 
 if (cartItem && cartItem.quantity > 1) {
   cartItem.quantity -= 1;
   displayCart();
   updateCartCounter();
 } else if (cartItem && cartItem.quantity === 1) {
   removeFromCart(event);
 }
}
function removeFromCart(event) {
 const productId = parseInt(event.target.getAttribute('data-id'));
 cart = cart.filter(item => item.id !== productId);
 
 displayCart();
 updateCartCounter();
 showNotification('Item removed from cart');
}

function clearCart() {
 cart = [];
 displayCart();
 updateCartCounter();
}

function sortCart() {
 cart.sort((a, b) => a.price - b.price);
 displayCart();
}

document.addEventListener('DOMContentLoaded', () => {

 displayProducts(productsData);
 
 const navDiv = document.querySelector('.nav-class > div');
 const cartLink = navDiv.querySelector('a:first-child');
 
 const cartCounter = document.createElement('span');
 cartCounter.id = 'cartCounter';
 cartCounter.className = 'cart-counter';
 cartCounter.textContent = '0';
 cartCounter.style.display = 'none';
 
 cartLink.appendChild(cartCounter);
 
 cartLink.addEventListener('click', function(event) {
   event.preventDefault();
   displayCart();
 });
});