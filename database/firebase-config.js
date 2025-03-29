import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";

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

function loadSellers() {
    let sellerList = document.getElementById("seller-names");
    sellerList.innerHTML = ""; 

    const sellersRef = ref(db, "sellers");
    onChildAdded(sellersRef, (snapshot) => {
        let seller = snapshot.val();
        console.log("Seller Loaded:", seller); // Debugging

        let sellerItem = document.createElement("li");
        sellerItem.innerText = seller.name;
        sellerItem.onclick = () => selectSeller(seller.id);
        sellerList.appendChild(sellerItem);
    }, (error) => {
        console.error("Error loading sellers:", error);
    });
}


// Load sellers when the page loads
window.onload = loadSellers;
