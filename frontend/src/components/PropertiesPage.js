import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logoImage from "../assets/logo.jpeg";
import { Menu, X } from "lucide-react";
import SignInRegisterForm from "./SignInRegisterForm";

const PropertiesPage = () => {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { city, category, subarea } = useParams();
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/properties/list/${city}/${category}/${subarea}`
        );
        setProperties(res.data);
      } catch (err) {
        console.error("Error fetching properties:", err);
      }
    };
    fetchProperties();
  }, [city, category, subarea]);

  const handleSeeMore = (propertyId) => {
    // Remove localStorage usage - we don't need it since we're passing via URL
    navigate(`/property/${propertyId}`);
  };

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
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
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
                <NavItem to="/contact">Contact us</NavItem>
              </ul>
            </nav>
            <div className="flex items-center">
              <button
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
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
        </div>
        {isMenuOpen && (
          <div className="md:hidden">
            <ul className="px-4 py-3 space-y-2">
              <NavItem to="/">Home</NavItem>
              <NavItem to="/categories">Categories</NavItem>
              <NavItem to="/contact">Contact us</NavItem>
            </ul>
          </div>
        )}
      </header>

      {/* Properties List */}
      <section className="bg-gray-50 py-10 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Properties in {subarea}</h1>
          {properties.length === 0 ? (
            <p className="text-center text-gray-500">No properties found.</p>
          ) : (
            <ul className="space-y-8">
              {properties.map((prop) => (
                <li
                  key={prop._id}
                  className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row gap-6"
                >
                  <div className="w-full md:w-1/3">
                    {prop.images_link && prop.images_link.length > 0 ? (
                      prop.images_link
                        .slice(0, 1)
                        .map((SingleImage, index) => (
                          <img
                            key={index}
                            src={SingleImage}
                            alt={`Property Image ${index + 1}`}
                            className="w-full h-48 object-cover rounded-md"
                          />
                        ))
                    ) : (
                      <div className="bg-gray-200 h-48 w-full rounded-md flex items-center justify-center text-gray-500">
                        No Image Available
                      </div>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 className="text-xl font-bold text-gray-800">
                            {prop.property_name}
                          </h2>
                          <p className="text-sm text-gray-500">
                            {prop.address}
                          </p>
                        </div>
                        <p className="text-xl font-bold text-gray-800">
                          ₹{prop.price}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-gray-700">
                        <p>
                          <span className="font-medium">Category:</span>{" "}
                          {prop.category}
                        </p>
                        <p>
                          <span className="font-medium">City:</span> {prop.city}
                        </p>
                        <p>
                          <span className="font-medium">Subarea:</span>{" "}
                          {prop.subarea}
                        </p>
                      </div>
                    </div>
                    {/* <div>
                      {properties.map((property) => (
                        <div key={property.id}>
                          <Link to={`/property/${prop.id}`} className="text-blue-600 hover:underline font-medium">
                            See More
                          </Link>
                        </div>
                      ))}
                    </div> */}
                    <div>
                      <Link
                        to={`/property/${prop.id}`}
                        className="text-blue-600 hover:underline font-medium"
                      >
                        See More
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Sign-in Modal (Optional Implementation Placeholder) */}
      {isSignInOpen && (
        <SignInRegisterForm onClose={() => setIsSignInOpen(false)} />
      )}
    </div>
  );
};

export default PropertiesPage;
