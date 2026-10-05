import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

import {
  validateUsername,
  validateEmail,
  validatePassword,
  validateFullName,
} from "../utils/validation";

function RegisterPage() {
  const navigate = useNavigate();

  const { register, checkUsername } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
  });

  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);

  const [isCheckingUsername, setIsCheckingUsername] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [serverError, setServerError] = useState("");

  // Handle input changes
  const handleChange = async (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setServerError("");

    // Username validation
    if (name === "username") {
      const error = validateUsername(value);

      setErrors({
        ...errors,
        username: error,
      });

      if (!error) {
        setIsCheckingUsername(true);

        try {
          const exists = await checkUsername(value);

          if (exists) {
            setErrors((previous) => ({
              ...previous,
              username: "Username already exists",
            }));
          } else {
            setErrors((previous) => ({
              ...previous,
              username: "",
            }));
          }
        } catch (error) {
          console.log(error);
        } finally {
          setIsCheckingUsername(false);
        }
      }

      return;
    }

    // Email validation
    if (name === "email") {
      setErrors({
        ...errors,
        email: validateEmail(value),
      });
    }

    // Password validation
    if (name === "password") {
      setErrors({
        ...errors,
        password: validatePassword(value),
      });
    }

    // Full name validation
    if (name === "fullName") {
      setErrors({
        ...errors,
        fullName: validateFullName(value),
      });
    }
  };

  // Submit registration
  const handleSubmit = async (e) => {
    e.preventDefault();

    setServerError("");

    const usernameError = validateUsername(formData.username);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const fullNameError = validateFullName(formData.fullName);

    const newErrors = {
      username: usernameError,
      email: emailError,
      password: passwordError,
      fullName: fullNameError,
    };

    setErrors(newErrors);

    if (
      usernameError ||
      emailError ||
      passwordError ||
      fullNameError
    ) {
      return;
    }

    setIsSubmitting(true);

    try {
      const usernameExists = await checkUsername(formData.username);

      if (usernameExists) {
        setErrors((previous) => ({
          ...previous,
          username: "Username already exists",
        }));

        return;
      }

      const userData = {
        ...formData,
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
        createdAt: new Date().toISOString(),
      };

      await register(userData);

      alert("Registration successful!");

      navigate("/login");
    } catch (error) {
      setServerError("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h1>Create Account</h1>

        <p className="auth-subtitle">
          Register to create your account
        </p>

        {serverError && (
          <p className="server-error">
            {serverError}
          </p>
        )}

        <form onSubmit={handleSubmit}>

          {/* Username */}
          <div className="form-group">
            <label>Username</label>

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              className={
                formData.username
                  ? errors.username
                    ? "input error"
                    : "input success"
                  : "input"
              }
            />

            {isCheckingUsername && (
              <small>Checking username...</small>
            )}

            {errors.username && (
              <small className="error-text">
                {errors.username}
              </small>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className={
                formData.email
                  ? errors.email
                    ? "input error"
                    : "input success"
                  : "input"
              }
            />

            {errors.email && (
              <small className="error-text">
                {errors.email}
              </small>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>

            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className={
                  formData.password
                    ? errors.password
                      ? "input error"
                      : "input success"
                    : "input"
                }
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="password-button"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {errors.password && (
              <small className="error-text">
                {errors.password}
              </small>
            )}
          </div>

          {/* Full Name */}
          <div className="form-group">
            <label>Full Name</label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
              className={
                formData.fullName
                  ? errors.fullName
                    ? "input error"
                    : "input success"
                  : "input"
              }
            />

            {errors.fullName && (
              <small className="error-text">
                {errors.fullName}
              </small>
            )}
          </div>

          {/* Register button */}
          <button
            type="submit"
            disabled={isSubmitting || isCheckingUsername}
            className="submit-button"
          >
            {isSubmitting ? "Creating Account..." : "Register"}
          </button>

        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default RegisterPage;