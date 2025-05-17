import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // for redirect
import Header from "./components/Header";
import Slider from "./components/Slider";
import ProductionHouse from "./components/ProductionHouse";
import GenreMovieList from "./components/GenreMovieList";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();

  // On mount, check localStorage for user and read isLoggedIn field
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user.isLoggedIn) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch {
        // corrupted data, remove it
        localStorage.removeItem("user");
        setIsLoggedIn(false);
      }
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowAuthModal(false);

    // Update isLoggedIn in localStorage user object
    const storedUser = localStorage.getItem("user");
    let user;
    if (storedUser) {
      user = JSON.parse(storedUser);
      user.isLoggedIn = true;
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      // Fallback dummy user with isLoggedIn true
      user = { email: "user@example.com", password: "******", isLoggedIn: true };
      localStorage.setItem("user", JSON.stringify(user));
    }

    navigate("/"); // redirect to home on login
  };

  const handleLogout = () => {
    setIsLoggedIn(false);

    // Update isLoggedIn in localStorage user object
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      user.isLoggedIn = false;
      localStorage.setItem("user", JSON.stringify(user));
    }

    navigate("/");
  };

  return (
    <div>
      <Header
        isLoggedIn={isLoggedIn}
        onLoginClick={() => setShowAuthModal(true)}
        onLogoutClick={handleLogout}
      />

      {!isLoggedIn ? (
        <div className="flex items-center justify-center min-h-screen text-white text-xl bg-gray-900">
          Please{" "}
          <p
            onClick={() => setShowAuthModal(true)}
            className="text-blue-500 ml-1 mr-1 cursor-pointer"
          >
            login
          </p>{" "}
          to access content.
        </div>
      ) : (
        <>
          <Slider />
          <ProductionHouse />
          <GenreMovieList />
          <Footer />
        </>
      )}

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLoginSuccess={handleLogin}
      />
    </div>
  );
}

export default App;
