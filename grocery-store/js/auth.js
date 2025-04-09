// Simulated user database
let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// DOM Elements
const registrationForm = document.getElementById('registrationForm');
const loginForm = document.getElementById('loginForm');
const logoutLink = document.getElementById('logoutLink');
const welcomeMessage = document.getElementById('welcomeMessage');
const profileLink = document.getElementById('profileLink');
const cartLink = document.getElementById('cartLink');

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    if (currentUser && welcomeMessage) {
        welcomeMessage.textContent = `Hello ${currentUser.name} to Online Grocery Store`;
    }
});

// **Registration Form Validation**
if (registrationForm) {
    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const customerId = generateCustomerId(); // Generate unique Customer ID
        const password = document.getElementById('password').value;
        const address = document.getElementById('address').value;
        const contact = document.getElementById('contact').value;

        // Validate Name (alphabets only)
        if (!/^[a-zA-Z ]+$/.test(name)) {
            document.getElementById('name').classList.add('is-invalid');
            return;
        } else {
            document.getElementById('name').classList.remove('is-invalid');
        }

        // Validate Password (min 5 chars, 1 uppercase, 1 number, 1 special char)
        if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/.test(password)) {
            document.getElementById('password').classList.add('is-invalid');
            return;
        } else {
            document.getElementById('password').classList.remove('is-invalid');
        }

        // Validate Address
        if (address.trim() === '') {
            document.getElementById('address').classList.add('is-invalid');
            return;
        } else {
            document.getElementById('address').classList.remove('is-invalid');
        }

        // Validate Contact (10 digits)
        if (!/^\d{10}$/.test(contact)) {
            document.getElementById('contact').classList.add('is-invalid');
            return;
        } else {
            document.getElementById('contact').classList.remove('is-invalid');
        }

        // Create new user
        const newUser = {
            id: customerId, // Use Customer ID instead of email
            name,
            password,
            address,
            contact,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Show success message
        const registrationDetails = document.getElementById('registrationDetails');
        registrationDetails.innerHTML = `
            <p><strong>Customer ID:</strong> ${customerId}</p>
            <p><strong>Name:</strong> ${name}</p>
        `;

        const successModal = new bootstrap.Modal(document.getElementById('registrationSuccessModal'));
        successModal.show();

        // Reset form
        registrationForm.reset();
    });
}

// **Login Form (Login with Customer ID)**
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const customerId = document.getElementById('loginCustomerId').value;
        const password = document.getElementById('loginPassword').value;

        // Find user by Customer ID and Password
        const user = users.find(u => u.id === customerId && u.password === password);

        if (user) {
            // Set current user
            currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));

            // Redirect to home page
            window.location.href = 'index.html';
        } else {
            // Show error
            const loginError = document.getElementById('loginError');
            loginError.textContent = 'Invalid Customer ID or Password';
            loginError.classList.remove('d-none');
        }
    });
}

// **Logout**
if (logoutLink) {
    logoutLink.addEventListener('click', (e) => {
        e.preventDefault();
        currentUser = null;
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    });
}

// **Profile Link**
if (profileLink) {
    profileLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentUser) {
            const profileModal = new bootstrap.Modal(document.getElementById('profileModal'));
            document.getElementById('profileName').value = currentUser.name;
            document.getElementById('profileAddress').value = currentUser.address;
            document.getElementById('profileContact').value = currentUser.contact;
            profileModal.show();
        } else {
            window.location.href = 'login.html';
        }
    });
}

// **Cart Link**
if (cartLink) {
    cartLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentUser) {
            const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
            updateCartDisplay();
            cartModal.show();
        } else {
            window.location.href = 'login.html';
        }
    });
}

// **Helper function to generate Customer ID**
function generateCustomerId() {
    return 'CUST-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

// **Initialize Cart Count**
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});