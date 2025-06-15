import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logoImage from "../assets/logo.jpeg";
import { Menu, X } from "lucide-react";
import SignInRegisterForm from "./SignInRegisterForm";
import { Link } from "react-router-dom";
import category from "../assets/category.jpg";
import citiesImage from "../assets/cities.jpg"; // Static image

const Categories = () => {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/properties/cities"
        );
        setCities(response.data);
      } catch (err) {
        console.error("Error fetching cities:", err);
        setError("Failed to load cities.");
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  const handleCityClick = (city) => {
    navigate(`/categories/${city}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center space-x-3">
              <img
                src={logoImage}
                alt="logo"
                className="h-8 md:h-10 lg:h-12 w-auto"
              />
              <Link
                to="/"
                className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900"
              >
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
              <NavItem to="/properties">Properties</NavItem>
              <NavItem to="/contact">Contact us</NavItem>
            </ul>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        className="relative h-[500px] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${category})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 text-center text-white space-y-4 md:space-y-6 lg:space-y-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4">
              Discover Your Perfect Home
            </h1>
            <p className="text-sm md:text-base lg:text-lg mb-4 md:mb-8">
              Browse through a wide range of properties from cozy apartments to
              spacious villas. Find your ideal home!
            </p>
          </div>
        </div>
      </section>

      {/* City Cards */}
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-8 text-center">Choose a City</h1>

        {loading && <p className="text-center text-gray-500">Loading cities...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && cities.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {cities.map((item, index) => (
              <div
                key={index}
                onClick={() => handleCityClick(item.city)}
                className="cursor-pointer bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 ease-in-out"
              >
                {/* Card Image */}
                <div className="h-40 w-full bg-gray-300">
                  <img
                    src={citiesImage}
                    alt={item.city}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* City Name */}
                <div className="p-4 text-center">
                  <h2 className="text-xl font-semibold text-gray-800">{item.city}</h2>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && cities.length === 0 && (
          <p className="text-center text-gray-500">No cities found.</p>
        )}
      </div>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-500 to-pink-500 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Find Your Perfect Property Today
          </h2>
          <p className="text-white mb-6">
            Explore our extensive listings to connect to your ideal rental or
            purchase.
          </p>
          <Link
            to="/contact"
            className="bg-white text-black px-6 py-2 rounded-md hover:bg-gray-100"
          >
            Contact now!
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-bold mb-4">HomEstate</div>
          </div>
          {[1, 2, 3].map((col) => (
            <div key={col}>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-gray-300 transition-colors duration-200">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300 transition-colors duration-200">
                    Categories
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300 transition-colors duration-200">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </footer>

      {/* Sign In / Register Modal */}
      {isSignInOpen && (
        <SignInRegisterForm onClose={() => setIsSignInOpen(false)} />
      )}
    </div>
  );
};

export default Categories;
