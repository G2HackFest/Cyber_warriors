document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const logoutBtn = document.getElementById("logout-btn");
    const welcomeMessage = document.getElementById("welcome-message");

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    function redirectToDashboard(user) {
        if (user) {
            localStorage.setItem("loggedInUser", JSON.stringify(user)); // Store logged-in user info

            if (user.userType === "seller") {
                window.location.href = "seller-dashboard.html"; // Redirect seller
            } else if (user.userType === "buyer") {
                window.location.href = "buyer-dashboard.html"; // Redirect buyer
            } else {
                alert("Invalid user type!");
                localStorage.removeItem("loggedInUser");
            }
        } else {
            alert("Invalid email or password!");
        }
    }

    function logout() {
        localStorage.removeItem("loggedInUser");
        window.location.href = "login.html";
    }

    if (welcomeMessage && loggedInUser) {
        welcomeMessage.innerHTML = `Welcome, ${loggedInUser.name}!`;
    }

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const email = document.getElementById("login-email").value.trim();
            const password = document.getElementById("login-password").value.trim();

            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                redirectToDashboard(user);
            } else {
                alert("Invalid login credentials");
            }
        });
    }

    if (signupForm) {
        signupForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const name = document.getElementById("signup-name").value.trim();
            const email = document.getElementById("signup-email").value.trim();
            const password = document.getElementById("signup-password").value.trim();
            const userType = document.querySelector('input[name="user-role"]:checked')?.value; 

            if (!name || !email || !password || !userType) {
                alert("All fields are required.");
                return;
            }

            if (users.some(u => u.email === email)) {
                alert("Email already exists. Please log in.");
                return;
            }

            let newUser = { name, email, password, userType };
            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));

            alert("Signup successful! You can now log in.");
            window.location.href = "login.html";
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", logout);
    }

    // Redirect users if they are already logged in
    if (loggedInUser) {
        redirectToDashboard(loggedInUser);
    }
});

