import React, { useState } from "react";
import { Search, Menu, X, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import logoImage from "../assets/logo.jpeg";
import contactImage from '../assets/contact.jpg';
import SignInRegisterForm from "./SignInRegisterForm"; // Matching the import from HomePage

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

const ContactPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    alert("Thank you for your message! We will get back to you soon.");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header - Matching the HomePage header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            {/* Logo */}
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

            {/* Navigation Links (Desktop) */}
            <nav className="hidden md:flex">
              <ul className="flex space-x-6">
                <NavItem to="/">Home</NavItem>
                <NavItem to="/categories">Categories</NavItem>
                <NavItem to="/contact">Contact us</NavItem>
              </ul>
            </nav>

            {/* Buttons and Mobile Menu */}
            <div className="flex items-center">
              <button
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors duration-200"
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

        {/* Mobile Navigation */}
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
      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-64 bg-gray-300 flex items-center justify-center"> 
  <img
    src={contactImage}
    alt="Contact Us"
    className="absolute inset-0 w-full h-full object-cover"
  />
  <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-white">
    <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
    <p className="text-center max-w-2xl">
      We're here to help with any questions or concerns about our
      properties or services.
    </p>
  </div>
</section>

        {/* Contact Form and Info Section */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div className="bg-gray-100 p-8 rounded-lg">
                <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                <p className="mb-8">
                  Have questions about our properties or services? Our team is
                  ready to assist you. Fill out the form or contact us directly
                  using the information below.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="mr-4 text-black" size={24} />
                    <div>
                      <h3 className="font-bold">Our Office</h3>
                      <p className="text-gray-600">
                        123 Property Street
                        <br />
                        Mumbai, MH 400001
                        <br />
                        India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="mr-4 text-black" size={24} />
                    <div>
                      <h3 className="font-bold">Phone</h3>
                      <p className="text-gray-600">+91 98765 43210</p>
                      <p className="text-gray-600">
                        Monday to Friday, 9am to 6pm
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="mr-4 text-black" size={24} />
                    <div>
                      <h3 className="font-bold">Email</h3>
                      <p className="text-gray-600">info@yourpropertysite.com</p>
                      <p className="text-gray-600">
                        support@yourpropertysite.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="border rounded-lg p-8 shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="subject"
                      className="block text-gray-700 mb-2"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="block text-gray-700 mb-2"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="5"
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors duration-200 w-full"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-12 px-4 bg-gray-100">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Find Us</h2>
            <div className="h-96 bg-gray-300 rounded-lg">
              {/* Placeholder for map - in a real application, you would integrate Google Maps or another map service here */}
              <div className="w-full h-full flex items-center justify-center bg-gray-300 border">
                <p className="text-gray-600">Map would be displayed here</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section*/}
        <section className="py-12 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Find Your Perfect Property?
          </h2>
          <p className="mb-8">
            Let us help you discover the ideal home that meets all your
            requirements.
          </p>
          <Link
            to="/categories"
            className="bg-white text-black px-6 py-2 rounded font-bold hover:bg-gray-100 transition-colors duration-200 inline-block text-center"
          >
            Browse Properties
          </Link>
        </section>
      </main>

      {/* Footer */}
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

      {/* Sign In / Register Modal */}
      {isSignInOpen && (
        <SignInRegisterForm onClose={() => setIsSignInOpen(false)} />
      )}
    </div>
  );
};

export default ContactPage;
