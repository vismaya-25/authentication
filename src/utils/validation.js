// Check username
export const validateUsername = (username) => {
  if (!username.trim()) {
    return "Username is required";
  }

  if (username.length < 3) {
    return "Username must be at least 3 characters";
  }

  if (username.length > 20) {
    return "Username must not exceed 20 characters";
  }

  return "";
};


// Check email
export const validateEmail = (email) => {
  if (!email.trim()) {
    return "Email is required";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return "Enter a valid email";
  }

  return "";
};


// Check password
export const validatePassword = (password) => {
  if (!password) {
    return "Password is required";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }

  return "";
};


// Check full name
export const validateFullName = (fullName) => {
  if (!fullName.trim()) {
    return "Full name is required";
  }

  if (fullName.trim().length < 2) {
    return "Full name must be at least 2 characters";
  }

  return "";
};