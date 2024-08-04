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




