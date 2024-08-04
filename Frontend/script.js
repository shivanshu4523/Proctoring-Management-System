function showAlert(message) {
    alert(message);
}

function handleNavigation() {
    const links = document.querySelectorAll('#homeLink');

    links.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();

            showAlert("You Need to LogIn First!!"); 

            // Navigate to signIn.html
            window.location.href = "signin.html";
        });
    });
}

document.addEventListener("DOMContentLoaded", handleNavigation);


document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let username = document.getElementById('loginUsername').value;
    let password = document.getElementById('loginPassword').value;

    if (username === 'shiva@gmail.com' && password === 'abc@1234') {
        window.location.href = 'dashboard.html';
    } else {
        alert('Invalid username or password. Please try again.');
    }
});





//////////////////////////////////////////////////////////////////////////////////////



// New Sign-in Functionality
document.getElementById('signinForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (response.status === 200) {
            alert('Sign-in successful!');
            window.location.href = 'dashboard.html';
        } else {
            alert(result.error);
        }
    } catch (error) {
        console.error('Error signing in:', error);
        alert('Error signing in. Please try again later.');
    }
});



