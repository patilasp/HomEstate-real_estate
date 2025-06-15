import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logoImage from "../assets/logo.jpeg";
import accountIcon from "../assets/accountIcon.png";
import { Menu, X, User, CreditCard, Settings } from "lucide-react";
import OwnProperty from "./OwnProperty";

// NavItem component for reusable navigation links
const NavItem = ({ to, onClick, children }) => (
  <li className="list-none">
    <Link
      to={to}
      onClick={onClick}
      className="text-lg font-medium text-gray-700 hover:text-gray-900"
    >
      {children}
    </Link>
  </li>
);

// Navbar with responsive menu
const Navbar = ({ onLogoClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo & Title */}
          <div className="flex items-center space-x-4">
            <img
              src={logoImage}
              alt="logo"
              className="h-10 w-10 rounded-full cursor-pointer"
              onClick={onLogoClick}
            />
            <Link to="/" className="text-2xl font-bold text-gray-900">
              HomEstate
            </Link>
          </div>

          {/* Main nav */}
          <nav className="hidden md:flex space-x-8 items-center">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/categories">Categories</NavItem>
            <NavItem to="/contact">Contact us</NavItem>
            <img
              src={accountIcon}
              alt="Account"
              className="h-8 w-8 rounded-full"
            />
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile nav menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <NavItem to="/account">Profile</NavItem>
            <NavItem to="/payment-history">Payment History</NavItem>
            <NavItem to="/own-property">Own Property</NavItem>
          </div>
        )}
      </div>
    </header>
  );
};

const AccountSettings = () => {
  const [currentView, setCurrentView] = useState("profile");
  const [user, setUser] = useState({ name: "", email: "" });

  // Fetch user data when component mounts
  useEffect(() => {
    const token = localStorage.getItem("token"); // JWT from localStorage

    // Fetch Name
    const fetchusername = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/user/username",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch name");

        const data = await response.json();
        setUser((prev) => ({ ...prev, name: data.username }));
      } catch (err) {
        console.error("Error fetching name:", err.message);
      }
    };

    // Fetch Email
    const fetchEmail = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/user/email", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Failed to fetch email");

        const data = await response.json();
        setUser((prev) => ({ ...prev, email: data.email }));
      } catch (err) {
        console.error("Error fetching email:", err.message);
      }
    };

    fetchusername();
    fetchEmail();
  }, []);

  return (
    <div className="min-h-screen pb-10">
      <Navbar />
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto mt-6 h-full">
        {/* Sidebar */}
        <aside className="bg-black w-full md:w-1/3 p-10 rounded-lg shadow-lg text-white h-full">
          <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
          <ul className="space-y-6">
            <li>
              <button
                onClick={() => setCurrentView("profile")}
                className={`text-lg flex items-center space-x-2 ${
                  currentView === "profile" ? "text-yellow-300" : ""
                }`}
              >
                <User size={24} />
                <span>Profile</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentView("payment")}
                className={`text-lg flex items-center space-x-2 ${
                  currentView === "payment" ? "text-yellow-300" : ""
                }`}
              >
                <CreditCard size={24} />
                <span>Payment History</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentView("ownProperty")}
                className={`text-lg flex items-center space-x-2 ${
                  currentView === "ownProperty" ? "text-yellow-300" : ""
                }`}
              >
                <Settings size={24} />
                <span>Own Property</span>
              </button>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-grow p-10 ml-0 md:ml-6 rounded-lg shadow-lg">
          {currentView === "profile" && (
            <>
              <h1 className="text-4xl font-bold mb-6">Profile</h1>
              <div className="space-y-6">
                <div className="bg-gray-200 p-6 rounded-md">
                  <label className="text-sm font-medium">Name</label>
                  <div className="text-lg">{user.name || "Loading..."}</div>
                </div>
                <div className="bg-gray-200 p-6 rounded-md">
                  <label className="text-sm font-medium">Email</label>
                  <div className="text-lg">{user.email || "Loading..."}</div>
                </div>
              </div>
            </>
          )}

          {currentView === "ownProperty" && <OwnProperty />}

          {currentView === "payment" && (
            <div>
              <h1 className="text-4xl font-bold mb-6">Payment History</h1>
              <p>Payment history details go here...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AccountSettings;
