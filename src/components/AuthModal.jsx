import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const { email, password, confirmPassword } = formData;
  
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
  
    if (!isLogin && password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
  
    if (isLogin) {
      // Login: Check if user exists in localStorage
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        toast.error("No user found, switching to Sign Up");
        setIsLogin(false); // Switch to signup mode
        return;
      }
  
      const user = JSON.parse(storedUser);
  
      if (user.email === email && user.password === password) {
        // Update isLoggedIn to true in localStorage
        const updatedUser = { ...user, isLoggedIn: true };
        localStorage.setItem("user", JSON.stringify(updatedUser));
  
        toast.success("Logged in successfully!");
        window.location.reload();
        onLoginSuccess();
        setFormData({ email: "", password: "", confirmPassword: "" });
        onClose();
      } else {
        toast.error("Invalid email or password");
      }
    } else {
      // Signup: Save user to localStorage with isLoggedIn true
      const newUser = { email, password, isLoggedIn: true };
      localStorage.setItem("user", JSON.stringify(newUser));
      toast.success("Signed up successfully!");
      window.location.reload();
      onLoginSuccess();
      setFormData({ email: "", password: "", confirmPassword: "" });
      onClose();
    }
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center px-4">
      <div className="bg-gray-900 text-white p-6 rounded-lg w-full max-w-sm relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-white text-2xl"
          aria-label="Close modal"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            required
            autoComplete="email"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
            required
            autoComplete={isLogin ? "current-password" : "new-password"}
          />
          {!isLogin && (
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              placeholder="Confirm Password"
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 border border-gray-700"
              required
              autoComplete="new-password"
            />
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="text-blue-400 hover:underline cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
