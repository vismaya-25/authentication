import axios from "axios";

const API_URL = "http://localhost:3000";

// Login user
export const loginUser = async (email, password) => {
  const response = await axios.get(
    `${API_URL}/users?email=${email}`
  );

  const users = response.data;

  if (users.length === 0) {
    throw new Error("Invalid email or password");
  }

  const user = users[0];

  if (user.password !== password) {
    throw new Error("Invalid email or password");
  }

  return user;
};


// Register user
export const registerUser = async (userData) => {
  const response = await axios.post(
    `${API_URL}/users`,
    userData
  );

  return response.data;
};


// Get user by ID
export const getUserById = async (id) => {
  const response = await axios.get(
    `${API_URL}/users/${id}`
  );

  return response.data;
};


// Check username
export const checkUsername = async (username) => {
  const response = await axios.get(
    `${API_URL}/users?username=${username}`
  );

  return response.data;
};