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
function displayProductDetails() {

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


   

    const product =
        products.find(
            product => product.id === productId
        );


    

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