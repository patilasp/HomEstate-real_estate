import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logoImage from "../assets/logo.jpeg";
import { Menu, X } from "lucide-react";
import SignInRegisterForm from "./SignInRegisterForm";

const PropertyDetails = () => {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        if (!id) throw new Error("No property ID provided");
        const response = await axios.get(
          `http://localhost:5000/api/properties/${id}`
        );
        if (!response.data) throw new Error("Property not found");
        setProperty(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching property details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading property details...</div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || "Property not found"}</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

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

      {/* Property Details */}
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            {property.images_link?.length > 0 ? (
              <>
                <div className="md:col-span-2">
                  <img
                    src={property.images_link[0]}
                    alt="Main property"
                    className="w-full h-96 object-cover rounded-lg"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {property.images_link.slice(1, 5).map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Property view ${idx + 1}`}
                      className="w-full h-48 object-cover rounded"
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="md:col-span-3 h-96 bg-gray-200 rounded flex items-center justify-center text-gray-500">
                No images available
              </div>
            )}
          </div>

          {/* Property Info */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {property.property_name}
                </h1>
                <p className="text-gray-600 mt-1">{property.address}</p>
              </div>
              <div className="mt-4 md:mt-0">
                <span className="text-2xl font-bold text-black">
                  ₹{property.price}
                </span>
                {property.price_per_unit && (
                  <span className="text-gray-600 ml-2">
                    ({property.price_per_unit})
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">Property Details</h2>
                <p>
                  <strong>City:</strong> {property.city}
                </p>
                <p>
                  <strong>Subarea:</strong> {property.subarea}
                </p>
                <p>
                  <strong>Category:</strong> {property.category}
                </p>
                <p>
                  <strong>Owner:</strong> {property.owner_name || "N/A"}
                </p>
                <p>
                  <strong>Contact:</strong> {property.owner_contact || "N/A"}
                </p>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <p>{property.features || "No description available."}</p>
              </div>
            </div>

            {/* Buttons */}

            <div className="mt-6 flex space-x-4">
              <Link
                to="/ownerpaymentdetails"
                state={{
                  owner_name: property.owner_name,
                  owner_contact: property.owner_contact,
                  upi_id: property.upi_id,
                  account_number: property.account_name,
                  bank_name: property.bank_name,
                  ifsc_code: property.ifsc_code,
                  qr_code: property.qr_code,
                }}
              >
                <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors">
                  Interested
                </button>
              </Link>

              <div className="flex space-x-4">
                <button
                  onClick={() => navigate(-1)}
                  className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors"
                >
                  Not Interested
                </button>
              </div>
            </div>
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

export default PropertyDetails;

