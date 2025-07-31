// Declare all DOM element variables first
let searchForm   = document.querySelector('.search-form');
let shoppingCart = document.querySelector('.shopping-cart');
let loginForm    = document.querySelector('.login-form');
let navbar       = document.querySelector('.navbar');

// Toggle search form
document.querySelector('#search-btn').onclick = () => {
  searchForm.classList.toggle('active');
  shoppingCart.classList.remove('active');
  loginForm.classList.remove('active');
  navbar.classList.remove('active');
};

// Toggle shopping cart
document.querySelector('#cart-btn').onclick = () => {
  shoppingCart.classList.toggle('active');
  searchForm.classList.remove('active');
  loginForm.classList.remove('active');
  navbar.classList.remove('active');
};

// Toggle login form
document.querySelector('#login-btn').onclick = () => {
  loginForm.classList.toggle('active');
  searchForm.classList.remove('active');
  shoppingCart.classList.remove('active');
  navbar.classList.remove('active');
};

// Toggle navbar
document.querySelector('#menu-btn').onclick = () => {
  navbar.classList.toggle('active');
  shoppingCart.classList.remove('active');
  searchForm.classList.remove('active');
  loginForm.classList.remove('active');
};

// Remove active classes on scroll
window.onscroll = () => {
  searchForm.classList.remove('active');
  shoppingCart.classList.remove('active');
  loginForm.classList.remove('active');
  navbar.classList.remove('active');
};

// Initialize Swiper for Products Slider
var productsSwiper = new Swiper(".products-slider", {
  loop: true,
  spaceBetween: 20,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0:    { slidesPerView: 1 },
    768:  { slidesPerView: 2 },
    1020: { slidesPerView: 3 },
  },
});

// Initialize Swiper for Review Slider
var reviewSwiper = new Swiper(".review-slider", {
  loop: true,
  spaceBetween: 20,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0:    { slidesPerView: 1 },
    768:  { slidesPerView: 2 },
    1020: { slidesPerView: 3 },
  },
});

/* ========================
   Add to Cart Functionality
   ======================== */

// Select all "add to cart" buttons from product boxes.
// Ensure that in your product HTML, the button has a unique class (e.g., .add-to-cart)
// If you already use .btn for other buttons, you can add an extra class to these product buttons.
const addToCartButtons = document.querySelectorAll('.products .box .btn');

addToCartButtons.forEach(button => {
  button.addEventListener('click', function(event) {
    event.preventDefault();

    // Find the parent product box element
    const productBox = this.closest('.box');

    // Extract product details (adjust selectors as needed)
    const productName  = productBox.querySelector('h1').innerText;
    const productPrice = productBox.querySelector('.price').innerText;
    const productImg   = productBox.querySelector('img').src;

    // Create a new cart item element with similar structure to existing items
    const cartItem = document.createElement('div');
    cartItem.classList.add('box');
    cartItem.innerHTML = `
      <i class="fa fa-trash"></i>
      <img src="${productImg}" alt="${productName}" />
      <div class="content">
        <h3>${productName}</h3>
        <span class="price">${productPrice}</span>
        <span class="quantity">Qty : 1</span>
      </div>
    `;

    // Insert the new cart item before the total element in the shopping cart
    // Assumes that the shopping cart contains an element with the class "total"
    const totalElement = shoppingCart.querySelector('.total');
    shoppingCart.insertBefore(cartItem, totalElement);

    // Add delete functionality to the trash icon of the new item
    const trashIcon = cartItem.querySelector('.fa-trash');
    trashIcon.addEventListener('click', function() {
      cartItem.remove();
      updateCartTotal();
    });

    // Optionally update the cart total when a new item is added
    updateCartTotal();
  });
});

/* ========================
   Update Cart Total Function
   ======================== */

// This function loops through the cart items and calculates a simple total.
// Note: This example assumes each product price is a single value like "$12.99/-"
// If your price format is more complex, you may need to adjust the regex or logic.
function updateCartTotal() {
  let total = 0;
  const cartItems = shoppingCart.querySelectorAll('.box');

  cartItems.forEach(item => {
    const priceText = item.querySelector('.price').innerText;
    // Use regex to extract the first number (assuming format "$12.99/-")
    const priceMatch = priceText.match(/\$(\d+(\.\d+)?)/);
    if (priceMatch) {
      const price = parseFloat(priceMatch[1]);
      total += price;
    }
  });

  // Update the total element's text
  const totalElement = shoppingCart.querySelector('.total');
  if (totalElement) {
    totalElement.innerText = `total : $${total.toFixed(2)}`;
  }
}


// Updated login form functionality with validation
loginForm.addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent default form submission

  // Retrieve and trim values
  const emailField = this.querySelector('input[type="email"]');
  const passwordField = this.querySelector('input[type="password"]');
  const email = emailField.value.trim();
  const password = passwordField.value.trim();

  // Simple client-side validation
  if (!email || !password) {
    alert("Please fill in both email and password.");
    return;
  }
  
  // Further validation can be added here (e.g., regex for email format)

  // Simulate login process (replace with actual authentication logic)
  alert("Logged in successfully!");

  // Reset and hide the login form after successful login
  this.reset();
  loginForm.classList.remove('active');
});


// Handle search form submission with validation
searchForm.addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent default form submission

  // Retrieve the search term and trim whitespace
  const searchInput = this.querySelector('#search-box');
  const searchTerm = searchInput.value.trim();

  // Validate that the search term is not empty
  if (!searchTerm) {
    alert("Please enter a search term.");
    return;
  }
  
  // Replace the following with your actual search logic
  console.log("Searching for: " + searchTerm);
  
  // Optionally clear the search input and hide the search form
  searchInput.value = "";
  searchForm.classList.remove('active');
});

document.querySelector(".search-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission

    const searchInput = document.querySelector("#search-box");
    const searchTerm = searchInput.value.trim().toLowerCase();

    if (!searchTerm) {
        alert("Please enter a search term.");
        return;
    }

    const productContainer = document.querySelector(".products-container"); // Update this selector based on your HTML structure
    const products = Array.from(productContainer.querySelectorAll(".product")); // Select all product elements

    let matchingProducts = [];
    let otherProducts = [];

    products.forEach(product => {
        const productName = product.querySelector(".product-name").textContent.toLowerCase();

        if (productName.includes(searchTerm)) {
            matchingProducts.push(product);
        } else {
            otherProducts.push(product);
        }
    });

    if (matchingProducts.length === 0) {
        alert("No matching products found.");
        return;
    }

    // Reorder the products so that matching ones appear first
    productContainer.innerHTML = ""; // Clear the current list
    matchingProducts.forEach(product => productContainer.appendChild(product));
    otherProducts.forEach(product => productContainer.appendChild(product));

    searchInput.value = ""; // Clear search input
    document.querySelector(".search-form").classList.remove("active"); // Hide search form
});
document.querySelector(".search-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission

    const searchInput = document.querySelector("#search-box");
    const searchTerm = searchInput.value.trim().toLowerCase();

    if (!searchTerm) {
        alert("Please enter a search term.");
        return;
    }

    const productContainer = document.querySelector(".products-container"); // Update this selector based on your HTML structure
    const products = Array.from(productContainer.querySelectorAll(".product")); // Select all product elements

    let matchingProducts = [];
    let otherProducts = [];

    products.forEach(product => {
        const productName = product.querySelector(".product-name").textContent.toLowerCase();

        if (productName.includes(searchTerm)) {
            matchingProducts.push(product);
        } else {
            otherProducts.push(product);
        }
    });

    if (matchingProducts.length === 0) {
        alert("No matching products found.");
        return;
    }

    // Reorder the products so that matching ones appear first
    productContainer.innerHTML = ""; // Clear the current list
    matchingProducts.forEach(product => productContainer.appendChild(product));
    otherProducts.forEach(product => productContainer.appendChild(product));

    searchInput.value = ""; // Clear search input
    document.querySelector(".search-form").classList.remove("active"); // Hide search form
});
document.querySelector(".search-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission

    const searchInput = document.querySelector("#search-box");
    const searchTerm = searchInput.value.trim().toLowerCase();

    if (!searchTerm) {
        alert("Please enter a search term.");
        return;
    }

    const productContainer = document.querySelector(".products-container"); // Update this selector based on your HTML structure
    const products = Array.from(productContainer.querySelectorAll(".product")); // Select all product elements

    let matchingProducts = [];
    let otherProducts = [];

    products.forEach(product => {
        const productName = product.querySelector(".product-name").textContent.toLowerCase();

        if (productName.includes(searchTerm)) {
            matchingProducts.push(product);
        } else {
            otherProducts.push(product);
        }
    });

    if (matchingProducts.length === 0) {
        alert("No matching products found.");
        return;
    }

    // Reorder the products so that matching ones appear first
    productContainer.innerHTML = ""; // Clear the current list
    matchingProducts.forEach(product => productContainer.appendChild(product));
    otherProducts.forEach(product => productContainer.appendChild(product));

    searchInput.value = ""; // Clear search input
    document.querySelector(".search-form").classList.remove("active"); // Hide search form
});
document.querySelector(".search-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission

    const searchInput = document.querySelector("#search-box");
    const searchTerm = searchInput.value.trim().toLowerCase();

    if (!searchTerm) {
        alert("Please enter a search term.");
        return;
    }

    const productContainer = document.querySelector(".products-container"); // Update this selector based on your HTML structure
    const products = Array.from(productContainer.querySelectorAll(".product")); // Select all product elements

    let matchingProducts = [];
    let otherProducts = [];

    products.forEach(product => {
        const productName = product.querySelector(".product-name").textContent.toLowerCase();

        if (productName.includes(searchTerm)) {
            matchingProducts.push(product);
        } else {
            otherProducts.push(product);
        }
    });

    if (matchingProducts.length === 0) {
        alert("No matching products found.");
        return;
    }

    // Reorder the products so that matching ones appear first
    productContainer.innerHTML = ""; // Clear the current list
    matchingProducts.forEach(product => productContainer.appendChild(product));
    otherProducts.forEach(product => productContainer.appendChild(product));

    searchInput.value = ""; // Clear search input
    document.querySelector(".search-form").classList.remove("active"); // Hide search form
});
document.querySelector(".search-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission

    const searchInput = document.querySelector("#search-box");
    const searchTerm = searchInput.value.trim().toLowerCase();

    if (!searchTerm) {
        alert("Please enter a search term.");
        return;
    }

    const productContainer = document.querySelector(".products-container"); // Update this selector based on your HTML structure
    const products = Array.from(productContainer.querySelectorAll(".product")); // Select all product elements

    let matchingProducts = [];
    let otherProducts = [];

    products.forEach(product => {
        const productName = product.querySelector(".product-name").textContent.toLowerCase();

        if (productName.includes(searchTerm)) {
            matchingProducts.push(product);
        } else {
            otherProducts.push(product);
        }
    });

    if (matchingProducts.length === 0) {
        alert("No matching products found.");
        return;
    }

    // Reorder the products so that matching ones appear first
    productContainer.innerHTML = ""; // Clear the current list
    matchingProducts.forEach(product => productContainer.appendChild(product));
    otherProducts.forEach(product => productContainer.appendChild(product));

    searchInput.value = ""; // Clear search input
    document.querySelector(".search-form").classList.remove("active"); // Hide search form
});
document.querySelector(".search-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission

    const searchInput = document.querySelector("#search-box");
    const searchTerm = searchInput.value.trim().toLowerCase();

    if (!searchTerm) {
        alert("Please enter a search term.");
        return;
    }

    const productContainer = document.querySelector(".products-container"); // Update this selector based on your HTML structure
    const products = Array.from(productContainer.querySelectorAll(".product")); // Select all product elements

    let matchingProducts = [];
    let otherProducts = [];

    products.forEach(product => {
        const productName = product.querySelector(".product-name").textContent.toLowerCase();

        if (productName.includes(searchTerm)) {
            matchingProducts.push(product);
        } else {
            otherProducts.push(product);
        }
    });

    if (matchingProducts.length === 0) {
        alert("No matching products found.");
        return;
    }

    // Reorder the products so that matching ones appear first
    productContainer.innerHTML = ""; // Clear the current list
    matchingProducts.forEach(product => productContainer.appendChild(product));
    otherProducts.forEach(product => productContainer.appendChild(product));

    searchInput.value = ""; // Clear search input
    document.querySelector(".search-form").classList.remove("active"); // Hide search form
});
