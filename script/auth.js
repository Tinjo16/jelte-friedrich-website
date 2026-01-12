
    // code bereitgestellt von ChatGPT
    
    function checkPassword() {
        const correctPassword = "admin9604";
        const userInput = document.getElementById("password").value;

        if (userInput === correctPassword) {
            const expirationTime = Date.now() + 30 * 24 * 60 * 60 * 1000; // 30 Tage in Millisekunden
            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("expiresAt", expirationTime);
            window.location.href = "../Pages/family/main.html"; // Weiterleitung
        } else {
            document.getElementById("message").textContent = "Falsches Passwort!";
        }
    }

    function checkLoginStatus() {
        const expiresAt = localStorage.getItem("expiresAt");

        if (expiresAt && Date.now() > expiresAt) {
            localStorage.removeItem("loggedIn");
            localStorage.removeItem("expiresAt");
            window.location.href = "index.html"; // Zurück zur Login-Seite
        } else if (localStorage.getItem("loggedIn") === "true") {
            window.location.href = "../Pages/family/main.html";
        }
    }

    checkLoginStatus();