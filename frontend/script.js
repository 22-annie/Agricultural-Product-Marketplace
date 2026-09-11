const products = [

    {
        id: 1,
        name: "Premium Rice",
        category: "Grains",
        price: 80,
        unit: "kg",
        farmer: "Rahim Uddin",
        description: "High quality locally produced rice.",
        image: "🌾"
    },

    {
        id: 2,
        name: "Fresh Wheat",
        category: "Grains",
        price: 65,
        unit: "kg",
        farmer: "Karim Hasan",
        description: "Fresh wheat collected from local farms.",
        image: "🌾"
    },

    {
        id: 3,
        name: "Fresh Tomatoes",
        category: "Vegetables",
        price: 60,
        unit: "kg",
        farmer: "Abdul Karim",
        description: "Freshly harvested tomatoes.",
        image: "🍅"
    },

    {
        id: 4,
        name: "Organic Potatoes",
        category: "Vegetables",
        price: 45,
        unit: "kg",
        farmer: "Sadia Akter",
        description: "Fresh organic potatoes.",
        image: "🥔"
    },

    {
        id: 5,
        name: "Seasonal Mango",
        category: "Fruits",
        price: 120,
        unit: "kg",
        farmer: "Mizanur Rahman",
        description: "Sweet and fresh seasonal mangoes.",
        image: "🥭"
    },

    {
        id: 6,
        name: "Fresh Banana",
        category: "Fruits",
        price: 70,
        unit: "dozen",
        farmer: "Hasan Ali",
        description: "Naturally ripened fresh bananas.",
        image: "🍌"
    },

    {
        id: 7,
        name: "Fresh Eggs",
        category: "Other",
        price: 140,
        unit: "dozen",
        farmer: "Nur Islam",
        description: "Farm fresh eggs.",
        image: "🥚"
    },

    {
        id: 8,
        name: "Pure Honey",
        category: "Other",
        price: 600,
        unit: "kg",
        farmer: "Jamal Hossain",
        description: "Natural honey collected locally.",
        image: "🍯"
    }

];

function displayProducts(productList) {

    const productContainer =
        document.getElementById("productContainer");

    const noProducts =
        document.getElementById("noProducts");

    const productCount =
        document.getElementById("productCount");


    // Stop if this is not the products page

    if (!productContainer) {
        return;
    }


    // Clear previous products

    productContainer.innerHTML = "";


    // Show product count

    productCount.textContent =
        `Showing ${productList.length} product(s)`;


    // Show no products message

    if (productList.length === 0) {

        noProducts.classList.remove("hidden");

        return;
    }


    noProducts.classList.add("hidden");


    // Create product cards

    productList.forEach(product => {

        const productCard =
            document.createElement("article");


        productCard.classList.add("product-card");


        productCard.innerHTML = `

        <div class="product-image">

            ${product.image}

        </div>


        <div class="product-info">

            <span class="product-category">

                ${product.category}

            </span>


            <h2>

                ${product.name}

            </h2>


            <p class="product-description">

                ${product.description}

            </p>


            <p class="farmer-name">

                Farmer: ${product.farmer}

            </p>


            <p class="price">

                ৳${product.price} / ${product.unit}

            </p>


            <a
                href="product-details.html?id=${product.id}"
                class="product-button"
            >

                View Details

            </a>

        </div>

    `;


        productContainer.appendChild(productCard);

    });

}

function filterProducts() {


    const searchInput =
        document.getElementById("searchInput");

    const categoryFilter =
        document.getElementById("categoryFilter");


    // Stop if this is not products.html

    if (!searchInput || !categoryFilter) {
        return;
    }


    const searchValue =
        searchInput.value.toLowerCase();


    const selectedCategory =
        categoryFilter.value;


    const filteredProducts =
        products.filter(product => {

            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(searchValue);


            const matchesCategory =
                selectedCategory === "all" ||
                product.category === selectedCategory;


            return matchesSearch &&
                matchesCategory;

        });


    displayProducts(filteredProducts);


}



document.addEventListener(
    "DOMContentLoaded",
    () => {

        const productContainer =
            document.getElementById("productContainer");



        if (!productContainer) {
            return;
        }




        displayProducts(products);


        const searchInput =
            document.getElementById("searchInput");


        const categoryFilter =
            document.getElementById("categoryFilter");



        searchInput.addEventListener(
            "input",
            filterProducts
        );



        categoryFilter.addEventListener(
            "change",
            filterProducts
        );



        const urlParams =
            new URLSearchParams(
                window.location.search
            );


        const category =
            urlParams.get("category");


        if (category) {

            categoryFilter.value =
                category;

            filterProducts();

        }

    }

);
async function displayProductDetails() {

    const productDetails =
        document.getElementById("productDetails");


    // Stop if this is not the product details page

    if (!productDetails) {
        return;
    }




    const urlParams =
        new URLSearchParams(
            window.location.search
        );


    const productId =
        Number(
            urlParams.get("id")
        );



    let product = null;

    try {
        const response = await fetch(
            `http://localhost:3000/api/products/${productId}`
        );

        if (response.ok) {
            product = await response.json();
        }
    } catch (error) {
        console.error("Failed to fetch product:", error);
    }




    if (!product) {

        productDetails.innerHTML = `

            <div class="product-not-found">

                <h1>
                    Product Not Found
                </h1>

                <p>
                    The product you are looking for does not exist.
                </p>

                <a
                    href="products.html"
                    class="btn"
                >
                    Back to Products
                </a>

            </div>

        `;

        return;

    }


    productDetails.innerHTML = `

        <div class="product-details-card">


            <div class="product-details-image">

                ${product.image}

            </div>


            <div class="product-details-info">


                <span class="product-category">

                    ${product.category}

                </span>


                <h1>

                    ${product.name}

                </h1>


                <p class="details-description">

                    ${product.description}

                </p>


                <div class="details-info">

                    <p>

                        <strong>Farmer:</strong>
                        ${product.farmer}

                    </p>


                    <p>

                        <strong>Category:</strong>
                        ${product.category}

                    </p>


                    <p>

                        <strong>Available Unit:</strong>
                        ${product.unit}

                    </p>

                </div>


                <h2 class="details-price">

                    ৳${product.price} / ${product.unit}

                </h2>


                <div class="details-buttons">

                    <button
                        class="btn"
                        type="button"
                        onclick="addToCart(${product.id})"
                    >
                        Add to Cart
                    </button>


                    <a
                        href="products.html"
                        class="btn btn-secondary"
                    >
                        Back to Products
                    </a>

                </div>


            </div>

        </div>

    `;

}


document.addEventListener(
    "DOMContentLoaded",
    displayProductDetails
);

function addToCart(productId) {

    const product = products.find(
        product => product.id === productId
    );

    if (!product) {
        return;
    }

    let cart = JSON.parse(
        localStorage.getItem("cart")
    ) || [];


    // Check whether product is already in cart

    const existingProduct = cart.find(
        item => item.id === productId
    );


    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            unit: product.unit,
            image: product.image,
            quantity: 1
        });

    }


    // Save cart

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    alert(`${product.name} added to cart!`);

}
function displayCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartSummary =
        document.getElementById("cartSummary");


    // Stop if this is not the cart page

    if (!cartItems || !cartSummary) {
        return;
    }


    let cart = JSON.parse(
        localStorage.getItem("cart")
    ) || [];


    // Empty cart

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <h2>Your cart is empty 🛒</h2>

                <p>
                    You haven't added any products yet.
                </p>

                <a
                    href="products.html"
                    class="btn"
                >
                    Browse Products
                </a>

            </div>

        `;

        cartSummary.innerHTML = "";

        return;
    }


    // Display cart products

    cartItems.innerHTML = "";


    let total = 0;


    cart.forEach(item => {

        const itemTotal =
            item.price * item.quantity;


        total += itemTotal;


        const cartItem =
            document.createElement("div");


        cartItem.classList.add("cart-item");


        cartItem.innerHTML = `

            <div class="cart-item-image">

                ${item.image}

            </div>


            <div class="cart-item-info">

                <h2>
                    ${item.name}
                </h2>

                <p>
                    ৳${item.price} / ${item.unit}
                </p>

            </div>


            <div class="cart-quantity">

                <button
                    onclick="changeQuantity(${item.id}, -1)"
                >
                    −
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    onclick="changeQuantity(${item.id}, 1)"
                >
                    +
                </button>

            </div>


            <div class="cart-item-total">

                <strong>
                    ৳${itemTotal}
                </strong>

            </div>


            <button
                class="remove-cart-item"
                onclick="removeFromCart(${item.id})"
            >
                Remove
            </button>

        `;


        cartItems.appendChild(cartItem);

    });


    // Display summary

    cartSummary.innerHTML = `

        <div class="cart-summary">

            <h2>
                Cart Summary
            </h2>

            <div class="cart-total">

                <span>
                    Total:
                </span>

                <strong>
                    ৳${total}
                </strong>

            </div>


            <div class="cart-buttons">

                <a
                    href="products.html"
                    class="btn btn-secondary"
                >
                    Continue Shopping
                </a>

                <button
                    class="btn"
                    onclick="proceedToCheckout()"
                >
                    Proceed to Checkout
                </button>

            </div>

        </div>

    `;

}
function changeQuantity(productId, change) {

    let cart = JSON.parse(
        localStorage.getItem("cart")
    ) || [];


    const product =
        cart.find(item => item.id === productId);


    if (!product) {
        return;
    }


    product.quantity += change;


    // Remove product if quantity reaches zero

    if (product.quantity <= 0) {

        cart = cart.filter(
            item => item.id !== productId
        );

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    displayCart();

}

function removeFromCart(productId) {

    let cart = JSON.parse(
        localStorage.getItem("cart")
    ) || [];


    cart = cart.filter(
        item => item.id !== productId
    );


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    displayCart();

}
function proceedToCheckout() {

    window.location.href =
        "checkout.html";

}
document.addEventListener(
    "DOMContentLoaded",
    displayCart
);
function displayCheckout() {

    const checkoutItems =
        document.getElementById("checkoutItems");

    const checkoutTotal =
        document.getElementById("checkoutTotal");


    // Stop if this is not the checkout page

    if (!checkoutItems || !checkoutTotal) {
        return;
    }


    let cart = JSON.parse(
        localStorage.getItem("cart")
    ) || [];


    // If cart is empty

    if (cart.length === 0) {

        checkoutItems.innerHTML = `

            <div class="empty-cart">

                <h2>Your cart is empty 🛒</h2>

                <p>
                    Add some products before checking out.
                </p>

                <a
                    href="products.html"
                    class="btn"
                >
                    Browse Products
                </a>

            </div>

        `;

        checkoutTotal.innerHTML = "";

        return;
    }


    checkoutItems.innerHTML = "";

    let total = 0;


    cart.forEach(item => {

        const itemTotal =
            item.price * item.quantity;


        total += itemTotal;


        const itemElement =
            document.createElement("div");


        itemElement.classList.add(
            "checkout-item"
        );


        itemElement.innerHTML = `

            <div class="checkout-item-image">
                ${item.image}
            </div>

            <div class="checkout-item-info">

                <h3>
                    ${item.name}
                </h3>

                <p>
                    Quantity: ${item.quantity}
                </p>

                <p>
                    ৳${item.price} / ${item.unit}
                </p>

            </div>

            <strong>
                ৳${itemTotal}
            </strong>

        `;


        checkoutItems.appendChild(itemElement);

    });


    checkoutTotal.innerHTML = `

        <div class="checkout-total">

            <span>
                Total:
            </span>

            <strong>
                ৳${total}
            </strong>

        </div>

    `;

}
document.addEventListener(
    "DOMContentLoaded",
    () => {

        const checkoutForm =
            document.getElementById("checkoutForm");


        if (!checkoutForm) {
            return;
        }


        checkoutForm.addEventListener(
            "submit",
            async function (event)  {

                event.preventDefault();


                const name =
                    document.getElementById(
                        "customerName"
                    ).value.trim();


                const phone =
                    document.getElementById(
                        "phone"
                    ).value.trim();


                const address =
                    document.getElementById(
                        "address"
                    ).value.trim();


                const city =
                    document.getElementById(
                        "city"
                    ).value.trim();


                const payment =
                    document.querySelector(
                        'input[name="payment"]:checked'
                    ).value;


                const cart =
                    JSON.parse(
                        localStorage.getItem("cart")
                    ) || [];


                if (cart.length === 0) {

                    alert(
                        "Your cart is empty."
                    );

                    return;
                }


                const total =
                    cart.reduce(
                        (sum, item) =>
                            sum +
                            item.price * item.quantity,
                        0
                    );

                // Send order to backend

                try {

                    const response = await fetch(
                        "http://localhost:3000/api/orders",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type": "application/json"
                            },

                            body: JSON.stringify({
                                customerName: name,
                                phone: phone,
                                address: address,
                                city: city,
                                paymentMethod: payment,
                                items: cart,
                                total: total
                            })
                        }
                    );


                    const result = await response.json();


                    if (!response.ok) {

                        alert(
                            result.message ||
                            "Failed to place order."
                        );

                        return;
                    }


                    // Save order information for confirmation page

                    const order = {

                        orderId: result.orderId,

                        customerName: name,

                        phone: phone,

                        address: address,

                        city: city,

                        paymentMethod: payment,

                        items: cart,

                        total: total

                    };


                    localStorage.setItem(
                        "latestOrder",
                        JSON.stringify(order)
                    );


                    // Clear cart after successful order

                    localStorage.removeItem("cart");


                    // Go to confirmation page

                    window.location.href =
                        "order-confirmation.html";


                } catch (error) {

                    console.error(
                        "Order submission failed:",
                        error
                    );

                    alert(
                        "Could not connect to the backend."
                    );

                }

            }
        );

    }
);
function displayOrderConfirmation() {

    const confirmation =
        document.getElementById(
            "orderConfirmation"
        );


    if (!confirmation) {
        return;
    }


    const order =
        JSON.parse(
            localStorage.getItem("latestOrder")
        );


    if (!order) {

        confirmation.innerHTML = `

            <h1>
                No Order Found
            </h1>

            <p>
                We couldn't find a recent order.
            </p>

            <a
                href="products.html"
                class="btn"
            >
                Browse Products
            </a>

        `;

        return;
    }


    confirmation.innerHTML = `


        <h1>
            Order Placed Successfully! 
        </h1>

        <p>
            Thank you, ${order.customerName}!
        </p>

        <p>
            Your order has been received.
        </p>


        <div class="order-details">

            <p>
                <strong>Order ID:</strong>
                ${order.orderId}
            </p>

            <p>
                <strong>Total:</strong>
                ৳${order.total}
            </p>

            <p>
                <strong>Payment:</strong>
                ${order.paymentMethod}
            </p>

            <p>
                <strong>Delivery Address:</strong>
                ${order.address}, ${order.city}
            </p>

        </div>


        <a
            href="products.html"
            class="btn"
        >
            Continue Shopping
        </a>

    `;

}


document.addEventListener(
    "DOMContentLoaded",
    displayOrderConfirmation
);

/* =========================
   DASHBOARD
========================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const isDashboardPage =
            window.location.pathname
                .includes("dashboard.html");


        if (!isDashboardPage) {
            return;
        }


        /* Get Logged In User */

        const storedUser =
            localStorage.getItem("user");


        /* Redirect if user is not logged in */

        if (!storedUser) {

            window.location.href =
                "login.html";

            return;

        }


        const user =
            JSON.parse(storedUser);


        /* User Information */

        const userName =
            user.name || "User";


        const userEmail =
            user.email || "Not available";


        const userRole =
            user.role || "Customer";


        /* Welcome Message */

        const welcomeMessage =
            document.getElementById(
                "welcomeMessage"
            );


        if (welcomeMessage) {

            welcomeMessage.textContent =
                `Welcome, ${userName}!`;

        }


        /* User Role */

        const userRoleElement =
            document.getElementById(
                "userRole"
            );


        if (userRoleElement) {

            userRoleElement.textContent =
                `Logged in as ${userRole}`;

        }


        /* Account Information */

        const accountName =
            document.getElementById(
                "accountName"
            );


        if (accountName) {

            accountName.textContent =
                userName;

        }


        const accountEmail =
            document.getElementById(
                "accountEmail"
            );


        if (accountEmail) {

            accountEmail.textContent =
                userEmail;

        }


        const accountRole =
            document.getElementById(
                "accountRole"
            );


        if (accountRole) {

            accountRole.textContent =
                userRole;

        }


        /* Role Statistics */

        const roleDisplay =
            document.getElementById(
                "roleDisplay"
            );


        if (roleDisplay) {

            roleDisplay.textContent =
                userRole;

        }


        /* User Avatar Initial */

        const userInitial =
            document.getElementById(
                "userInitial"
            );


        if (
            userInitial &&
            userName
        ) {

            userInitial.textContent =
                userName
                    .charAt(0)
                    .toUpperCase();

        }


        /* Cart Count */

        const cartCount =
            document.getElementById(
                "cartCount"
            );


        const storedCart =
            localStorage.getItem("cart");


        let cart =
            [];


        if (storedCart) {

            try {

                cart =
                    JSON.parse(storedCart);

            }

            catch (error) {

                cart =
                    [];

            }

        }


        if (cartCount) {

            const totalItems =
                cart.reduce(
                    (
                        total,
                        item
                    ) => {

                        return (
                            total +
                            item.quantity
                        );

                    },
                    0
                );


            cartCount.textContent =
                totalItems;

        }


        /* Logout */

        const logoutBtn =
            document.getElementById(
                "logoutBtn"
            );


        if (logoutBtn) {

            logoutBtn.addEventListener(
                "click",
                event => {

                    event.preventDefault();


                    localStorage.removeItem(
                        "user"
                    );


                    window.location.href =
                        "index.html";

                }
            );

        }


    }
);