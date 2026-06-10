// ── Authentication System with localStorage ──────────────────

// Initialize users storage if it doesn't exist
function initializeStorage() {
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]));
  }
}

// Get all users from localStorage
function getAllUsers() {
  initializeStorage();
  return JSON.parse(localStorage.getItem('users')) || [];
}

// Save users to localStorage
function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

// Check if email already exists
function emailExists(email) {
  const users = getAllUsers();
  return users.some(user => user.email.toLowerCase() === email.toLowerCase());
}

// Check if username already exists
function usernameExists(username) {
  const users = getAllUsers();
  return users.some(user => user.username.toLowerCase() === username.toLowerCase());
}

// Simple email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Handle Sign Up
function handleSignup() {
  clearErrors();
  
  const name = document.getElementById('signupName').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const agreeTerms = document.getElementById('agreeTerms').checked;

  let isValid = true;

  // Validate name
  if (name.length < 2) {
    showError('nameError', 'Name must be at least 2 characters');
    isValid = false;
  }

  // Validate email
  if (!isValidEmail(email)) {
    showError('emailError', 'Please enter a valid email');
    isValid = false;
  } else if (emailExists(email)) {
    showError('emailError', 'Email already registered');
    isValid = false;
  }

  // Validate password
  if (password.length < 6) {
    showError('passwordError', 'Password must be at least 6 characters');
    isValid = false;
  }

  // Validate password match
  if (password !== confirmPassword) {
    showError('confirmError', 'Passwords do not match');
    isValid = false;
  }

  // Validate terms
  if (!agreeTerms) {
    showError('termsError', 'You must agree to the Terms of Service');
    isValid = false;
  }

  if (!isValid) return;

  // Create new user
  const newUser = {
    id: Date.now(),
    name: name,
    email: email,
    username: email.split('@')[0], // username is part of email
    password: btoa(password), // simple encoding (not secure - for demo only)
    createdAt: new Date().toISOString(),
  };

  // Add to users array
  const users = getAllUsers();
  users.push(newUser);
  saveUsers(users);

  // Log user in
  loginUser(newUser);

  // Show success message
  showMessage('signupMessage', '✓ Account created! Redirecting...', 'success');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1500);
}

// Handle Login
function handleLogin() {
  clearErrors();

  const emailInput = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  const rememberMe = document.getElementById('rememberMe').checked;

  let isValid = true;

  // Validate inputs
  if (!emailInput) {
    showError('emailError', 'Email or username is required');
    isValid = false;
  }

  if (!password) {
    showError('passwordError', 'Password is required');
    isValid = false;
  }

  if (!isValid) return;

  // Find user by email or username
  const users = getAllUsers();
  const user = users.find(u => 
    u.email.toLowerCase() === emailInput.toLowerCase() || 
    u.username.toLowerCase() === emailInput.toLowerCase()
  );

  if (!user) {
    showError('emailError', 'User not found');
    return;
  }

  // Check password
  const decodedPassword = atob(user.password); // simple decoding (not secure - for demo only)
  if (decodedPassword !== password) {
    showError('passwordError', 'Invalid password');
    return;
  }

  // Remember me functionality
  if (rememberMe) {
    localStorage.setItem('rememberMe', 'true');
    localStorage.setItem('sessionExpiry', new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString());
  } else {
    localStorage.removeItem('rememberMe');
  }

  // Log user in
  loginUser(user);

  // Show success message
  showMessage('loginMessage', '✓ Welcome back! Redirecting...', 'success');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1500);
}

// Login user (save session)
function loginUser(user) {
  const userSession = {
    id: user.id,
    name: user.name,
    email: user.email,
    username: user.username,
    loginTime: new Date().toISOString(),
  };
  
  localStorage.setItem('currentUser', JSON.stringify(userSession));
  localStorage.setItem('isLoggedIn', 'true');
}

// Logout user
function logoutUser() {
  localStorage.removeItem('currentUser');
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('rememberMe');
  window.location.href = 'login.html';
}

// Get current logged-in user
function getCurrentUser() {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
}

// Check if user is logged in
function isUserLoggedIn() {
  return localStorage.getItem('isLoggedIn') === 'true';
}

// Show error message
function showError(elementId, message) {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = message;
    element.style.display = 'block';
  }
}

// Clear all error messages
function clearErrors() {
  const errors = document.querySelectorAll('.error-message');
  errors.forEach(error => {
    error.textContent = '';
    error.style.display = 'none';
  });
}

// Show auth message (success/info)
function showMessage(elementId, message, type = 'info') {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = message;
    element.className = `auth-message ${type}`;
    element.style.display = 'block';
  }
}

// Demo: Add sample user for testing
function addSampleUser() {
  if (!emailExists('demo@pomofocus.com')) {
    const users = getAllUsers();
    users.push({
      id: Date.now(),
      name: 'Demo User',
      email: 'demo@pomofocus.com',
      username: 'demo',
      password: btoa('demo123'), // password is "demo123"
      createdAt: new Date().toISOString(),
    });
    saveUsers(users);
  }
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', function() {
  initializeStorage();
  addSampleUser(); // Create demo account for testing
});
