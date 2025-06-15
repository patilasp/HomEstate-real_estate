import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./artifact/AuthContext";

// Public Pages
import HomePage from "./components/HomePage";
import Categories from "./components/Categories";
import CityCategoriesPage from "./components/CityCategoriesPage";
import SubareasPage from "./components/SubareasPage";
import PropertiesPage from "./components/PropertiesPage";
import PropertyDetails from "./components/PropertyDetails";
import ContactPage from "./components/ContactPage";

// User Features
import AccountSettings from "./components/AccountSettings";
import PropertyUploadForm from "./components/PropertyUploadForm";
import OwnProperty from "./components/OwnProperty";

// Admin
import AdminDashboard from "./admin/AdminDashboard";
import ProtectedAdminRoute from "./admin/ProtectedAdminRoute";

//payment details
import OwnerPaymentDetails from './components/OwnerPaymentDetails';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route path="/" element={<HomePage />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:city" element={<CityCategoriesPage />} />
            <Route
              path="/subareas/:city/:category"
              element={<SubareasPage />}
            />
            <Route
              path="/properties/:city/:category/:subarea"
              element={<PropertiesPage />}
            />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* User */}
            <Route path="/account" element={<AccountSettings />} />
            <Route path="/propertyUpload" element={<PropertyUploadForm />} />
            <Route path="/ownProperty" element={<OwnProperty />} />

            {/* Admin */}
            <Route
              path="/admin"
              element={
                <ProtectedAdminRoute>
                  <AdminDashboard />
                </ProtectedAdminRoute>
              }
            />

            <Route path="/property/:id" element={<PropertyDetails />} />
            {/* <Route path="E:\megap\realestate\frontend\src\components\OwnerPaymentDetail.js" element={<OwnerPaymentDetails />} /> */}
            <Route path="/ownerpaymentdetails" element={<OwnerPaymentDetails />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}



export default App;



