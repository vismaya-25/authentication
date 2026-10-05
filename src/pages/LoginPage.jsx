import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

import {
  validateEmail,
  validatePassword,
} from "../utils/validation";

function LoginPage() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);

  const [serverError, setServerError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setServerError("");

    if (name === "email") {
      setErrors({
        ...errors,
        email: validateEmail(value),
      });
    }

    if (name === "password") {
      setErrors({
        ...errors,
        password: validatePassword(value),
      });
    }
  };

  // Handle login
  const handleSubmit = async (e) => {
    e.preventDefault();

    setServerError("");

    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    const newErrors = {
      email: emailError,
      password: passwordError,
    };

    setErrors(newErrors);

    // Stop if validation fails
    if (emailError || passwordError) {
      return;
    }

    setIsSubmitting(true);

    try {
      await login({
        email: formData.email,
        password: formData.password,
      });

      // Remember me
      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberMe");
      }

      navigate("/dashboard");
    } catch (error) {
      setServerError(
        error.message || "Invalid email or password"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h1>Welcome Back</h1>

        <p className="auth-subtitle">
          Login to your account
        </p>

        {serverError && (
          <p className="server-error">
            {serverError}
          </p>
        )}

        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="form-group">

            <label>Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
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
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
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
                className="password-button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
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

          {/* Remember Me */}
          <div className="remember-container">

            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) =>
                  setRememberMe(e.target.checked)
                }
              />

              Remember me
            </label>

            <Link to="/forgot-password">
              Forgot password?
            </Link>

          </div>

          {/* Login button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="submit-button"
          >
            {isSubmitting
              ? "Logging in..."
              : "Login"}
          </button>

        </form>

        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default LoginPage;