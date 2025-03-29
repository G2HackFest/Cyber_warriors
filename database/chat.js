import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getDatabase, ref, set, push, onChildAdded } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "farmchat",
    authDomain: "farm-to-market-9b389.firebaseapp.com",
    databaseURL: "https://farm-to-market-9b389-default-rtdb.firebaseio.com/",
    projectId: "farm-to-market-9b389",
    storageBucket: "farm-to-market-9b389.appspot.com",
    messagingSenderId: "buyer"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

let currentSeller = null;  // Stores the selected seller

// Load Sellers from Firebase and MySQL
function loadSellers() {
    let sellerList = document.getElementById("seller-names");
    sellerList.innerHTML = ""; // Clear list before loading

    const sellersRef = ref(db, "sellers");
    onChildAdded(sellersRef, (snapshot) => {
        let seller = snapshot.val();
        addSellerToList(seller.id, seller.name);
    });

    // Fetch sellers from MySQL
    fetch("http://localhost:3000/get-sellers")
        .then(response => response.json())
        .then(sellers => {
            sellers.forEach(seller => addSellerToList(seller.id, seller.name));
        })
        .catch(error => console.error("Error fetching MySQL sellers:", error));
}

function addSellerToList(sellerId, sellerName) {
    let sellerList = document.getElementById("seller-names");
    let sellerItem = document.createElement("li");
    sellerItem.innerText = sellerName;
    sellerItem.onclick = () => selectSeller(sellerId);
    sellerList.appendChild(sellerItem);
}

// Select Seller and Load Messages
function selectSeller(sellerId) {
    currentSeller = sellerId;
    document.getElementById("chat-box").innerHTML = ""; // Clear previous chat

    const chatRef = ref(db, `chats/${currentSeller}`);
    onChildAdded(chatRef, (snapshot) => {
        let message = snapshot.val();
        let messageDiv = document.createElement("div");
        messageDiv.classList.add("message", message.sender === "buyer" ? "user-message" : "seller-message");
        messageDiv.innerText = message.text;
        document.getElementById("chat-box").appendChild(messageDiv);
    });
}

// Send Message to Seller
function sendMessage() {
    if (!currentSeller) {
        alert("Select a seller to chat!");
        return;
    }

    let messageInput = document.getElementById("message-input");
    let messageText = messageInput.value.trim();
    
    if (messageText !== "") {
        const chatRef = push(ref(db, `chats/${currentSeller}`));
        set(chatRef, { sender: "buyer", text: messageText });

        messageInput.value = ""; // Clear input field
    }
}

// Send Sellers Data to MySQL
function sendDataToMySQL() {
    const sellers = JSON.parse(localStorage.getItem("sellers")) || [];
    fetch("http://localhost:3000/save-sellers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sellers }),
    })
    .then(response => response.text())
    .then(data => console.log("MySQL Response:", data))
    .catch(error => console.error("Error sending data to MySQL:", error));
}

window.onload = function() {
    loadSellers();
    sendDataToMySQL();
};
