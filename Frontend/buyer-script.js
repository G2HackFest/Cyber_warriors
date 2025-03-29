
//seller Dashboard Functionality
document.addEventListener("DOMContentLoaded", loadDashboard);

function loadDashboard() {
    document.getElementById("profile-name").textContent = "John Doe";
    document.getElementById("profile-email").textContent = "john@example.com";
    document.getElementById("profile-contact").textContent = "+91 9876543210";
    showSection("profile");
}

/* Show Section */
function showSection(sectionId) {
    document.querySelectorAll("section").forEach(section => {
        section.style.display = "none";
    });
    document.getElementById(sectionId).style.display = "block";
}

/* Toggle Dark Mode */
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

function loadDashboard() {
    let user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (user) {
        document.getElementById("welcome-name").textContent = user.name; // Set welcome name
        document.getElementById("profile-name").textContent = user.name;
        document.getElementById("profile-email").textContent = user.email;
        document.getElementById("profile-contact").textContent = user.contact || "Not Provided";
    } else {
        alert("No user found! Redirecting to login.");
        window.location.href = "login.html"; // Redirect if not logged in
    }
}


function updateProfile() {
    let newName = document.getElementById("update-name").value.trim();
    let newContact = document.getElementById("update-contact").value.trim();

    let user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (newName) user.name = newName;
    if (newContact) user.contact = newContact;

    localStorage.setItem("loggedInUser", JSON.stringify(user)); // Update stored data

    document.getElementById("profile-name").textContent = user.name;
    document.getElementById("profile-contact").textContent = user.contact;
    document.getElementById("welcome-name").textContent = user.name; // Update welcome text

    alert("Profile updated successfully!");
}


/* Add Product */
function addProduct() {
    let name = document.getElementById("product-name").value;
    let price = document.getElementById("product-price").value;
    let description = document.getElementById("product-description").value;
    let image = document.getElementById("image-preview").src;

    if (!name || !price || !description || image.includes("product-image")) {
        alert("Please fill all fields and upload an image.");
        return;
    }

    let productList = document.getElementById("product-list");
    let productItem = document.createElement("div");
    productItem.classList.add("product-item");
    productItem.innerHTML = `
        <img src="${image}" width="100%" height="150px" style="border-radius:5px;">
        <h4>${name}</h4>
        <p>₹${price}</p>
        <p>${description}</p>
        <button class="delete-btn" onclick="deleteProduct(this)">🗑 Delete</button>
    `;
    productList.appendChild(productItem);

    alert("Product added successfully!");
    resetProductForm();
}

/* Reset Product Form */
function resetProductForm() {
    document.getElementById("product-name").value = "";
    document.getElementById("product-price").value = "";
    document.getElementById("product-description").value = "";
    document.getElementById("image-preview").src = "product-image";
}

/* Delete Product */
function deleteProduct(button) {
    button.parentElement.remove();
    alert("Product deleted successfully!");
}

/* Preview Image */
function previewImage() {
    let file = document.getElementById("product-image").files[0];
    let reader = new FileReader();

    reader.onload = function () {
        document.getElementById("image-preview").src = reader.result;
    };

    if (file) {
        reader.readAsDataURL(file);
    }
}

// Default Store Products
// Store Products Data
const storeProducts = [
    // Vegetables
    { name: "Cabbage", category: "vegetables", price: 40, image: "https://res.cloudinary.com/dzlvoajci/image/upload/v1743224048/Cauliflower_fl8fck.jpg", description: "Quantity: 1kg" },
    { name: "Carrot", category: "vegetables", price: 50, image: "https://res.cloudinary.com/dzlvoajci/image/upload/v1743224310/Carrot_vr82aj.jpg", description: "Quantity: 1kg" },
    { name: "Cauliflower", category: "vegetables", price: 45, image: "https://res.cloudinary.com/dzlvoajci/image/upload/v1743224017/Cabbage_r22qkn.jpg", description: "Quantity: 1kg" },
    { name: "Green Capsicum", category: "vegetables", price: 60, image: "https://res.cloudinary.com/dzlvoajci/image/upload/v1743224529/Green_Capsicum_o9dh46.jpg", description: "Quantity: 500g" },
    { name: "Onion", category: "vegetables", price: 30, image: "https://res.cloudinary.com/dzlvoajci/image/upload/v1743224368/Onion_yuwph3.jpg", description: "Quantity: 1kg" },
    { name: "Tomato", category: "vegetables", price: 50, image: "https://res.cloudinary.com/dzlvoajci/image/upload/v1743224380/Tomato_tcnvog.jpg", description: "Quantity: 1kg" },
    { name: "Broccoli", category: "vegetables", price: 70, image: "https://res.cloudinary.com/dzlvoajci/image/upload/v1743224315/brocoli_otccwg.jpg", description: "Quantity: 500g" },
    { name: "Potato", category: "vegetables", price: 25, image: "https://res.cloudinary.com/dzlvoajci/image/upload/v1743224374/patato_dtjyx9.jpg", description: "Quantity: 1kg" },

    // Fruits
    { name: "Apple", category: "fruits", price: 150, image: "https://res.cloudinary.com/dzlvoajci/image/upload/v1743222988/Apple_uohlxw.jpg", description: "Quantity: 1kg" },
    { name: "Bananas", category: "fruits", price: 60, image: "https://res.cloudinary.com/dzlvoajci/image/upload/v1743223000/Bananas_xckeoi.jpg", description: "Quantity: 1 dozen" },
    { name: "Green Grapes", category: "fruits", price: 100, image: "https://res.cloudinary.com/dzlvoajci/image/upload/v1743223001/Green_Grapes_cvvo3d.jpg", description: "Quantity: 500g" },
    { name: "Mango", category: "fruits", price: 180, image: "https://res.cloudinary.com/dzlvoajci/image/upload/v1743223001/Mango_sgxcjz.jpg", description: "Quantity: 1kg" },
    { name: "Orange", category: "fruits", price: 90, image: "https://res.cloudinary.com/dzlvoajci/image/upload/v1743224450/orange_mwkyoo.webp", description: "Quantity: 1kg" },
    { name: "Strawberry", category: "fruits", price: 200, image: "https://res.cloudinary.com/dzlvoajci/image/upload/v1743224471/strawberry_ffi3ar.jpg", description: "Quantity: 500g" }
];

// Function to Display Products
function displayProducts(products) {
    const storeSection = document.getElementById("store-products");
    storeSection.innerHTML = ""; // Clear existing content

    products.forEach(product => {
        let productHTML = `
            <div class="store-item">
                <img src="${product.image}" alt="${product.name}">
                <h4>${product.name}</h4>
                <p>${product.description}</p>
                <p class="price">₹${product.price}</p>
            </div>
        `;
        storeSection.innerHTML += productHTML;
    });
}

// Function to Filter Products
function filterProducts() {
    const category = document.getElementById("category-filter").value;
    const minPrice = document.getElementById("min-price").value;
    const maxPrice = document.getElementById("max-price").value;

    let filteredProducts = storeProducts.filter(product => {
        return (
            (category === "all" || product.category === category) &&
            (!minPrice || product.price >= minPrice) &&
            (!maxPrice || product.price <= maxPrice)
        );
    });

    displayProducts(filteredProducts);
}



// Load Store Products on Page Load
document.addEventListener("DOMContentLoaded", () => {
    displayProducts(storeProducts);
});


function logout() {
    // Clear any stored user session data (if using localStorage/sessionStorage)
    localStorage.removeItem("userData"); // Example, modify as needed
    sessionStorage.removeItem("userData");

    // Redirect to the landing page (change 'index.html' to your actual landing page)
    window.location.href = "index.html"; 
}




// Buyer Dashboard Functionality
document.addEventListener("DOMContentLoaded", loadBuyerDashboard);

function loadBuyerDashboard() {
    let user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (user && user.userType === "buyer") {
        document.getElementById("buyer-name").textContent = user.name; // Set welcome name
        document.getElementById("profile-name").textContent = user.name;
        document.getElementById("profile-email").textContent = user.email;
        document.getElementById("profile-contact").textContent = user.contact || "Not Provided";
        showSection("profile"); // Show profile by default
        loadStoreProducts(); // Load store products
    } else {
        alert("Unauthorized access! Redirecting to login.");
        window.location.href = "login.html"; // Redirect if not logged in
    }
}

/* Show Section */
function showSection(sectionId) {
    document.querySelectorAll("section").forEach(section => {
        section.style.display = "none";
    });
    document.getElementById(sectionId).style.display = "block";
}

/* Load Store Products (Same as Seller's Products) */
// Function to Display Products
function displayProducts(products) {
    const storeSection = document.getElementById("store-products");
    storeSection.innerHTML = ""; // Clear existing content

    products.forEach(product => {
        let productHTML = `
            <div class="store-item">
                <img src="${product.image}" alt="${product.name}">
                <h4>${product.name}</h4>
                <p>${product.description}</p>
                <p class="price">₹${product.price}</p>
            </div>
        `;
        storeSection.innerHTML += productHTML;
    });
}

function loadSellers() {
    let sellerList = document.getElementById("seller-names");
    sellerList.innerHTML = ""; 

    const sellersRef = ref(db, "sellers");
    onChildAdded(sellersRef, (snapshot) => {
        let seller = snapshot.val();
        console.log("Seller Loaded:", seller);
        let sellerItem = document.createElement("li");
        sellerItem.innerText = seller.name;
        sellerItem.onclick = () => selectSeller(seller.id);
        sellerList.appendChild(sellerItem);
    });
}
 
/* Logout Function */
function logout() {
    localStorage.removeItem("loggedInUser");
    sessionStorage.removeItem("loggedInUser");
    window.location.href = "index.html"; // Redirect to homepage
}

// Load Store Products on Page Load
document.addEventListener("DOMContentLoaded", () => {
    loadStoreProducts();
});


function sendMessage() {
    if (!currentSeller) {
        alert("Select a seller to chat!");
        return;
    }

    let messageInput = document.getElementById("message-input");
    let messageText = messageInput.value.trim();
    
    if (messageText !== "") {
        console.log("Sending Message:", messageText); // Debugging

        const chatRef = push(ref(db, `chats/${currentSeller}`));
        set(chatRef, { sender: "buyer", text: messageText })
        .then(() => console.log("Message sent successfully!"))
        .catch((error) => console.error("Error sending message:", error));

        messageInput.value = "";
    }
}
