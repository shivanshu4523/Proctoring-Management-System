function showConfirm(message) {
    return confirm(message);
}

function handleNavigation() {
    const links = document.querySelectorAll('#homeLink');

    links.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();

            // Show confirm dialog with OK and Cancel buttons
            const userConfirmed = showConfirm("You Need to LogIn First!!");

            // If user clicks OK, navigate to signIn.html
            if (userConfirmed) {
                window.location.href = "signin.html";
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", handleNavigation);


// document.getElementById('loginForm').addEventListener('submit', function(event) {
//     event.preventDefault();

//     let username = document.getElementById('loginUsername').value;
//     let password = document.getElementById('loginPassword').value;

//     if (username === 'shiva@gmail.com' && password === 'abc@1234') {
//         window.location.href = 'dashboard.html';
//     } else {
//         alert('Invalid username or password. Please try again.');
//     }
// });





document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    let username = document.getElementById('loginUsername').value;
    let password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('/api/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: username, password })
        });
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token); // Store the token
            window.location.href = 'dashboard.html';
        } else {
            alert(data.error);
        }
    } catch (error) {
        alert('An error occurred. Please try again.');
    }
});

document.getElementById('signupForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    let username = document.getElementById('signupUsername').value;
    let email = document.getElementById('signupEmail').value;
    let password = document.getElementById('signupPassword').value;
    let confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    try {
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token); // Store the token
            window.location.href = 'signin.html';
        } else {
            alert(data.error);
        }
    } catch (error) {
        alert('An error occurred. Please try again.');
    }
});
