          
          
          //---Resistration-----


const registerForm = document.querySelector("form");

if (registerForm && window.location.pathname.includes("register.html")) {

    registerForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;
        const role = document.getElementById("role").value;

        // Check passwords
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch(
                "http://127.0.0.1:3000/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password,
                        role
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {
                alert("Registration successful!");
                registerForm.reset();
                window.location.href = "login.html";
            } else {
                alert(data.message);
            }

        } catch (error) {
            console.error(error);
            alert("Could not connect to the server.");
        }
    });
}

// ==================== LOGIN ====================

const loginForm = document.querySelector("form");

if (loginForm && window.location.pathname.includes("login.html")) {

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch(
                "http://127.0.0.1:3000/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {
                alert("Login successful!");

                localStorage.setItem("user", JSON.stringify(data.user));

                window.location.href = "index.html";
            } else {
                alert(data.message);
            }

        } catch (error) {
            console.error(error);
            alert("Could not connect to the server.");
        }
    });
}