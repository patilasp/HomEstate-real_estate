import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import homeImage from "../assets/home.jpg";
import logoImage from "../assets/logo.jpeg";
import { Menu, X } from "lucide-react";
import SignInRegisterForm from "./SignInRegisterForm";
import big from "../assets/big.png";

const HomePage = () => {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    city: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });
  const [properties, setProperties] = useState([]);

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

  const handleSearchChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleMinPriceChange = (e) => {
    const value = e.target.value;
    if (value >= 0 || value === "") {
      setSearchParams({ ...searchParams, minPrice: value });
    }
  };

  const handleMaxPriceChange = (e) => {
    const value = e.target.value;
    if (value >= 0 || value === "") {
      setSearchParams({ ...searchParams, maxPrice: value });
    }
  };

  const handleSearch = async () => {
    const { city, category, minPrice, maxPrice } = searchParams;

    const queryParams = new URLSearchParams({
      ...(city && { city }),
      ...(category && { category }),
      ...(minPrice && { minPrice }),
      ...(maxPrice && { maxPrice }),
    });

    try {
      const response = await fetch(
        `http://localhost:5000/api/properties/search?${queryParams}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProperties(data);
    } catch (error) {
      console.error("Error searching properties:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center space-x-3">
              <img
                src={logoImage}
                alt="logo"
                className="h-8 md:h-10 lg:h-12 w-auto"
              />
              <div>
                <Link
                  to="/"
                  className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900"
                >
                  HomEstate
                </Link>
              </div>
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
      <section
        className="relative h-[500px] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${homeImage})` }}
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
            <div className="bg-white p-4 rounded-lg flex flex-wrap md:flex-nowrap justify-center items-center gap-3 w-full">
              <input
                type="text"
                name="city"
                placeholder="City"
                className="text-black p-2 border rounded h-11 w-full md:w-[200px]"
                onChange={handleSearchChange}
              />

              <select
                name="category"
                className="text-black p-2 border rounded h-11 w-full md:w-[200px]"
                onChange={handleSearchChange}
              >
                <option value="">Select Category</option>
                <option value="buy">Buy</option>
                <option value="rent">Rent</option>
                <option value="plot">Plot</option>
                <option value="pg">PGs</option>
              </select>

              <input
                type="number"
                name="minPrice"
                placeholder="Min Price"
                className="text-black p-2 border rounded h-11 w-full md:w-[200px]"
                value={searchParams.minPrice}
                min="0"
                onChange={handleMinPriceChange}
              />

              <input
                type="number"
                name="maxPrice"
                placeholder="Max Price"
                className="text-black p-2 border rounded h-11 w-full md:w-[200px]"
                value={searchParams.maxPrice}
                min="0"
                onChange={handleMaxPriceChange}
              />

              <button
                className="bg-black text-white px-4 py-2 rounded flex items-center justify-center h-11 w-full md:w-[200px]"
                onClick={handleSearch}
              >
                <Search className="mr-2" /> Search Now
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 bg-white">
        <h2 className="text-3xl font-bold text-center mb-8">Search Results</h2>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {properties.length > 0 ? (
            properties.map((property) => (
              <div
                key={property.id}
                className="border rounded-lg overflow-hidden shadow-lg"
              >
                <img
                  src={
                    Array.isArray(property.images_link) && property.images_link.length > 0
                      ? property.images_link[0]
                      : homeImage
                  }
                  alt="Property"
                  className="w-full h-48 object-cover"
                />
            
                <div className="p-4">
                  <p className="font-bold mb-2">Property: {property.property_name}</p>
                  <h3 className="font-bold mb-2">Address: {property.address}</h3>
                  <h3 className="font-bold mb-2">Price: {property.price}</h3>
                  <h3 className="font-bold mb-2">Features: {property.features}</h3>
                  <div className="mt-4">
                    <Link to={`/property/${property.id}`}>
                      <button className="bg-black text-white px-6 py-2 rounded">
                        See More
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
            

          ) : (
            <p className="text-center text-gray-500">No properties found.</p>
          )}
        </div>
      </section>
      <section className="bg-gray-100 py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Explore Cities</h2>
        <p className="text-center max-w-2xl mx-auto mb-8">
          Discover the best places to live and work around the world, from
          bustling metropolises to serene coastal towns. Find your perfect
          match! Whether you're looking for a new adventure or a permanent move,
          we've got you covered.
        </p>
        <div className="text-center mb-8">
          <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors duration-200">
            Start Now
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            {["Mumbai, India", "Bengaluru, India", "Jaipur, India"].map(
              (city) => (
                <div key={city} className="mb-4 p-4 bg-white rounded-lg shadow">
                  <h3 className="font-bold mb-2">Exploring {city}</h3>
                  <p className="text-gray-600 mb-2">
                    Discover the unique charm and opportunities in{" "}
                    {city.split(",")[0]}.
                  </p>
                  <button className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
                    Explore →
                  </button>
                </div>
              )
            )}
          </div>
          <img
            src={big}
            alt="City skyline"
            className="w-full rounded-lg shadow-lg"
          />{" "}
        </div>
      </section>

      {/* Call-to-Action Section */}
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

      {/* Footer Section */}
      <footer className="bg-black text-white p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-bold mb-4">HomEstate</div>
          </div>
          {[1, 2, 3].map((col) => (
            <div key={col}>
              {/* <h3 className="font-bold mb-2">Column {col}</h3> */}
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="hover:text-gray-300 transition-colors duration-200"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-gray-300 transition-colors duration-200"
                  >
                    Categories
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-gray-300 transition-colors duration-200"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </footer>

      {isSignInOpen && (
        <SignInRegisterForm onClose={() => setIsSignInOpen(false)} />
      )}
    </div>
  );
};

export default HomePage;
