import React, { useState, useEffect } from "react";
import logo from "../assets/Images/logo.png";
import {
  HiHome,
  HiMagnifyingGlass,
  HiStar,
  HiPlayCircle,
  HiTv,
} from "react-icons/hi2";
import { HiPlus, HiDotsVertical } from "react-icons/hi";
import HeaderList from "./HeaderList";
import AuthModal from "./AuthModal";

function Header() {
  const [toggle, setToggle] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // On mount, check localStorage if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.isLoggedIn) {
        setIsLoggedIn(true);
      }
    }
  }, []);

  const menu = [
    { name: "HOME", icon: HiHome },
    { name: "SEARCH", icon: HiMagnifyingGlass },
    { name: "WATCH LIST", icon: HiPlus },
    { name: "ORIGINALS", icon: HiStar },
    { name: "MOVIES", icon: HiPlayCircle },
    { name: "SERIES", icon: HiTv },
  ];

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setAuthModalOpen(false);
    // Update user in localStorage and set isLoggedIn to true
    const storedUser = localStorage.getItem("user");
    let user;
    if (storedUser) {
      user = JSON.parse(storedUser);
      user.isLoggedIn = true;
    } else {
      user = { email: "user@example.com", password: "******", isLoggedIn: true };
    }
    localStorage.setItem("user", JSON.stringify(user));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Update user in localStorage and set isLoggedIn to false
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      user.isLoggedIn = false;
      localStorage.setItem("user", JSON.stringify(user));
      window.location.reload();
    }
  };

  return (
    <div className="flex items-center justify-between p-5 bg-black">
      <div className="flex gap-8 items-center">
        <img
          src={logo}
          alt="Logo"
          className="w-[80px] md:w-[115px] object-cover"
        />
        <div className="hidden md:flex gap-8">
          {menu.map((item) => (
            <HeaderList key={item.name} name={item.name} Icon={item.icon} />
          ))}
        </div>
        <div className="flex md:hidden gap-5">
          {menu.slice(0, 3).map((item) => (
            <HeaderList key={item.name} name={""} Icon={item.icon} />
          ))}
          <div className="md:hidden relative" onClick={() => setToggle(!toggle)}>
            <HeaderList name={""} Icon={HiDotsVertical} />
            {toggle && (
              <div className="absolute mt-3 bg-[#121212] border border-gray-700 p-3 px-5 py-4 right-0 z-10">
                {menu.slice(3).map((item) => (
                  <HeaderList key={item.name} name={item.name} Icon={item.icon} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <>
            <img
              src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
              alt="User Avatar"
              className="w-[40px] rounded-full"
            />
            <button
              onClick={handleLogout}
              className="text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => setAuthModalOpen(true)}
            className="text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
          >
            Login / Sign Up
          </button>
        )}
      </div>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

export default Header;
