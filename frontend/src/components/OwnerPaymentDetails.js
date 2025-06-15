import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logoImage from "../assets/logo.jpeg";
import SignInRegisterForm from "./SignInRegisterForm";

const OwnerPaymentDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {
    owner_name,
    owner_contact,
    upi_id,
    account_number,
    bank_name,
    ifsc_code,
    qr_code,
  } = location.state || {};

  const NavItem = ({ children, to }) => (
    <li>
      <Link
        to={to}
        className="text-gray-700 hover:text-black px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
      >
        {children}
      </Link>
    </li>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img src={logoImage} alt="logo" className="h-10 w-auto" />
            <Link to="/" className="text-xl font-bold text-gray-900">
              HomEstate
            </Link>
          </div>
          <nav className="hidden md:flex">
            <ul className="flex space-x-6">
              <NavItem to="/">Home</NavItem>
              <NavItem to="/categories">Categories</NavItem>
              <NavItem to="/contact">Contact</NavItem>
            </ul>
          </nav>
          <div className="flex items-center">
            <button
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
              onClick={() => setIsSignInOpen(true)}
            >
              Sign In
            </button>
            <button
              className="ml-4 md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Payment Details */}
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6 text-gray-900">
            Owner & Payment Details
          </h1>
          <div className="space-y-4 text-gray-700">
            <p>
              <strong>Owner Name:</strong> {owner_name || "N/A"}
            </p>
            <p>
              <strong>Owner Contact:</strong> {owner_contact || "N/A"}
            </p>
            <p>
              <strong>UPI ID:</strong> {upi_id || "N/A"}
            </p>
            <p>
              <strong>Account Number:</strong> {account_number || "N/A"}
            </p>
            <p>
              <strong>Bank Name:</strong> {bank_name || "N/A"}
            </p>
            <p>
              <strong>IFSC Code:</strong> {ifsc_code || "N/A"}
            </p>
            <p>
              <strong>QR Code:</strong>
            </p>

            {qr_code ? (
              <img
                src={qr_code}
                alt="QR Code"
                className="w-40 h-40 object-contain border rounded"
              />
            ) : (
              <p className="text-gray-500">No QR Code available</p>
            )}
          </div>

          <div className="mt-6">
            <button
              onClick={() => navigate(-1)}
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors"
            >
              Back
            </button>
          </div>
        </div>
      </main>

      {/* Sign In Modal */}
      {isSignInOpen && (
        <SignInRegisterForm onClose={() => setIsSignInOpen(false)} />
      )}
    </div>
  );
};

export default OwnerPaymentDetails;
