// // export default OwnProperty;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// const OwnProperty = () => {
//   const [property, setProperty] = useState({
//     property_name: "",
//     address: "",
//     features: "",
//     price: "",
//     category: "",
//     city: "",
//     subarea: "",
//     images_link: "",
//     ownerName: "",
//     ownerMobile: "",
//   });

//   const [userEmail, setUserEmail] = useState("");
//   const [userProperties, setUserProperties] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchUserDetails();
//   }, []);

//   useEffect(() => {
//     if (userEmail) fetchUserProperties();
//   }, [userEmail]);

//   const fetchUserDetails = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/user/email", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       const data = await response.json();
//       if (response.ok) {
//         setUserEmail(data.email);
//       } else {
//         setError(data.message || "Failed to fetch user email");
//       }
//     } catch (error) {
//       setError("Network error. Please try again later.");
//     }
//   };

//   const fetchUserProperties = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:5000/api/properties/my-properties",
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       const data = await response.json();
//       if (response.ok) {
//         setUserProperties(data);
//       } else {
//         setError(data.message || "Failed to fetch properties");
//       }
//     } catch (error) {
//       setError("Network error. Please try again later.");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProperty({ ...property, [name]: value });
//   };

//   const handleUpload = async () => {
//     setLoading(true);
//     setError("");

//     // Convert comma-separated image URLs to array
//     const imagesArray = property.images_link
//       .split(",")
//       .map((img) => img.trim());

//     try {
//       const response = await fetch("http://localhost:5000/api/properties/add", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify({ ...property, images_link: imagesArray }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setShowModal(false);
//         setProperty({
//           property_name: "",
//           address: "",
//           features: "",
//           price: "",
//           category: "",
//           city: "",
//           subarea: "",
//           images_link: "",
//         });
//         fetchUserProperties();
//       } else {
//         setError(data.message || "Failed to upload property");
//       }
//     } catch (error) {
//       setError("Network error. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleOpenModal = () => setShowModal(true);
//   const handleCloseModal = () => setShowModal(false);

//   const getFirstImage = (images_link) => {
//     if (Array.isArray(images_link)) return images_link[0];
//     if (typeof images_link === "string")
//       return images_link.split(",")[0].trim();
//     return "https://via.placeholder.com/150";
//   };

//   return (
//     <div className="min-h-screen p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-3xl font-bold">Own Property</h1>
//         <button
//           onClick={handleOpenModal}
//           className="bg-black text-white px-4 py-2 rounded-md"
//         >
//           Upload Details
//         </button>
//       </div>
//       <hr className="mb-6" />

//       {error && <p className="text-red-500 mb-4">{error}</p>}

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {userProperties.map((prop, index) => (
//           <div key={index} className="border p-4 rounded-md shadow-md w-72">
//             <img
//               src={getFirstImage(prop.images_link)}
//               alt="Property"
//               className="w-full h-32 object-cover mb-4 rounded-md"
//             />
//             <h2 className="text-xl font-bold mb-1">{prop.property_name}</h2>
//             <div class="flex space-x-4">
//               <p className="text-sm text-gray-600 mb-1">{prop.city}</p>
//               <p className="text-sm text-gray-600 mb-1">{prop.subarea}</p>
//             </div>
//             <p >Address : {prop.address}</p>
//             <p>Features : {prop.features}</p>
//             <p >Price : {prop.price}</p>
//             <span
//               className={`inline-block px-2 py-1 rounded text-xs mb-2 ${
//                 prop.status === "approved"
//                   ? "bg-green-100 text-green-800"
//                   : "bg-yellow-100 text-yellow-800"
//               }`}
//             >
//               {prop.status}
//             </span>
//             {/* <Link
//               to={`/property-details/${prop.id}`}
//               className="bg-black text-white px-4 py-2 rounded-md block text-center"
//             >
//               See More
//             </Link> */}
//           </div>
//         ))}
//       </div>

//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
//           <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-lg max-h-screen overflow-y-auto">
//             <h1 className="text-2xl font-bold mb-6">Upload Property Details</h1>
//             <form>
//               <input
//                 type="text"
//                 name="property_name"
//                 value={property.property_name}
//                 onChange={handleChange}
//                 placeholder="Enter property name"
//                 className="w-full p-2 border rounded-md mb-4"
//               />
//               <input
//                 type="text"
//                 name="images_link"
//                 value={property.images_link}
//                 onChange={handleChange}
//                 placeholder="Enter image URLs (comma separated)"
//                 className="w-full p-2 border rounded-md mb-4"
//               />
//               <textarea
//                 name="features"
//                 value={property.features}
//                 onChange={handleChange}
//                 placeholder="Enter features"
//                 className="w-full p-2 border rounded-md mb-4"
//               />
//               <input
//                 type="number"
//                 name="price"
//                 value={property.price}
//                 onChange={handleChange}
//                 placeholder="Enter price"
//                 className="w-full p-2 border rounded-md mb-4"
//               />
//               <input
//                 type="text"
//                 name="address"
//                 value={property.address}
//                 onChange={handleChange}
//                 placeholder="Enter address"
//                 className="w-full p-2 border rounded-md mb-4"
//               />
//               <input
//                 type="text"
//                 name="category"
//                 value={property.category}
//                 onChange={handleChange}
//                 placeholder="Enter category"
//                 className="w-full p-2 border rounded-md mb-4"
//               />
//               <input
//                 type="text"
//                 name="city"
//                 value={property.city}
//                 onChange={handleChange}
//                 placeholder="Enter city"
//                 className="w-full p-2 border rounded-md mb-4"
//               />
//               <input
//                 type="text"
//                 name="subarea"
//                 value={property.subarea}
//                 onChange={handleChange}
//                 placeholder="Enter subarea"
//                 className="w-full p-2 border rounded-md mb-4"
//               />

//             {/* Owner Name */}
//           <div>
//             <input
//               type="text"
//               name="ownerName"
//               value={property.ownerName}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-md mb-4"
//               placeholder="Enter Owner full name"
//             />
//           </div>

//           {/* Owner Mobile */}
//           <div>
//             <input
//               type="tel"
//               name="ownerMobile"
//               value={property.ownerMobile}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-md mb-4"
//               placeholder="Enter 10-digit mobile number"
//             />
//           </div>

//           <input
//     type="text"
//     name="upiId"
//     value={property.upiId}
//               onChange={handleChange}
//     placeholder="Owner UPI ID"
//     className="w-full p-2 border rounded-md mb-4"
//   />
//   <input
//     type="text"
//     name="accountNumber"
//     value={property.accountNumber}
//               onChange={handleChange}
//     placeholder="Owner Account Number"
//     className="w-full p-2 border rounded-md mb-4"
//   />
//   <input
//     type="text"
//     name="bankName"
//     value={property.bankName}
//               onChange={handleChange}
//     placeholder="Owner Bank Name"
//     className="w-full p-2 border rounded-md mb-4"
//   />
//   <input
//     type="text"
//     name="ifscCode"
//     value={property.ifscCode}
//               onChange={handleChange}
//     placeholder="Owner IFSC Code"
//     className="w-full p-2 border rounded-md mb-4"
//   />

//               <div className="flex gap-4">
//                 <button
//                   type="button"
//                   onClick={handleUpload}
//                   className="bg-black text-white p-2 rounded-md"
//                   disabled={loading}
//                 >
//                   {loading ? "Uploading..." : "Upload"}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={handleCloseModal}
//                   className="bg-red-500 text-white p-2 rounded-md"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>

//       )}

//       const OWNProperty = () => {
//         const [showPaymentForm, setShowPaymentForm] = useState(false);
//         const [property, setProperty] = useState({
//           upiId: '',
//           accountNumber: '',
//           bankName: '',
//           ifscCode: '',
//         });

//         const togglePaymentForm = () => {
//           setShowPaymentForm(!showPaymentForm);
//         };

//         const handleChange = (e) => {
//           const { name, value } = e.target;
//           setProperty((prev) => ({
//             ...prev,
//             [name]: value
//           }));
//         };

//         return (
//           <div className="p-4">
//             <button
//               onClick={togglePaymentForm}
//               className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
//             >
//               Upload Payment Details
//             </button>

//             {showPaymentForm && (
//               <div className="bg-gray-100 p-4 rounded-md shadow-md">
//                 <input
//                   type="text"
//                   name="upiId"
//                   value={property.upiId}
//                   onChange={handleChange}
//                   placeholder="Owner UPI ID"
//                   className="w-full p-2 border rounded-md mb-4"
//                 />
//                 <input
//                   type="text"
//                   name="accountNumber"
//                   value={property.accountNumber}
//                   onChange={handleChange}
//                   placeholder="Owner Account Number"
//                   className="w-full p-2 border rounded-md mb-4"
//                 />
//                 <input
//                   type="text"
//                   name="bankName"
//                   value={property.bankName}
//                   onChange={handleChange}
//                   placeholder="Owner Bank Name"
//                   className="w-full p-2 border rounded-md mb-4"
//                 />
//                 <input
//                   type="text"
//                   name="ifscCode"
//                   value={property.ifscCode}
//                   onChange={handleChange}
//                   placeholder="Owner IFSC Code"
//                   className="w-full p-2 border rounded-md mb-4"
//                 />
//               </div>
//             )}
//           </div>
//         );
//       };

// export default OwnProperty;

import React, { useState, useEffect } from "react";

const OwnProperty = () => {
  const [property, setProperty] = useState({
    property_name: "",
    address: "",
    features: "",
    price: "",
    category: "",
    city: "",
    subarea: "",
    images_link: "",
    owner_name: "",
    owner_contact: "",
    upi_id: "",
    account_name: "",
    account_number: "",
    bank_name: "",
    ifsc_code: "",
    qr_code: "",
  });

  const [userEmail, setUserEmail] = useState("");
  const [userProperties, setUserProperties] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUserDetails();
  }, []);

  useEffect(() => {
    if (userEmail) fetchUserProperties();
  }, [userEmail]);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/user/email", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setUserEmail(data.email);
      } else {
        setError(data.message || "Failed to fetch user email");
      }
    } catch (error) {
      setError("Network error. Please try again later.");
    }
  };

  const fetchUserProperties = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/properties/my-properties",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setUserProperties(data);
      } else {
        setError(data.message || "Failed to fetch properties");
      }
    } catch (error) {
      setError("Network error. Please try again later.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpload = async () => {
    setLoading(true);
    setError("");

    const imagesArray = property.images_link
      .split(",")
      .map((img) => img.trim())
      .filter((img) => img !== "");

    try {
      const response = await fetch("http://localhost:5000/api/properties/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ ...property, images_link: imagesArray }),
      });

      const data = await response.json();
      if (response.ok) {
        setShowModal(false);
        setProperty({
          property_name: "",
          address: "",
          features: "",
          price: "",
          category: "",
          city: "",
          subarea: "",
          images_link: "",
          owner_name: "",
          owner_contact: "",
          upi_id: "",
          account_name: "",
          account_number: "",
          bank_name: "",
          ifsc_code: "",
          qr_code:"",
        });
        fetchUserProperties();
      } else {
        setError(data.message || "Failed to upload property");
      }
    } catch (error) {
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const getFirstImage = (images_link) => {
    if (Array.isArray(images_link)) return images_link[0];
    if (typeof images_link === "string")
      return images_link.split(",")[0].trim();
    return "https://via.placeholder.com/150";
  };

  return (
    <div className="min-h-screen p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Own Property</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-black text-white px-4 py-2 rounded-md"
        >
          Upload Details
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {userProperties.map((prop, index) => (
          <div key={index} className="border p-4 rounded-md shadow-md w-72">
            <img
              src={getFirstImage(prop.images_link)}
              alt="Property"
              className="w-full h-32 object-cover mb-4 rounded-md"
            />
            <h2 className="text-xl font-bold">{prop.property_name}</h2>
            <p className="text-sm text-gray-600">
              {prop.city} - {prop.subarea}
            </p>
            <p className="text-sm">₹{prop.price}</p>
            <p className="text-sm">{prop.address}</p>
            <p className="text-sm">Features: {prop.features}</p>
            <span
              className={`inline-block px-2 py-1 mt-1 rounded text-xs ${
                prop.status === "approved"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {prop.status}
            </span>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-lg max-h-screen overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Upload Property</h2>
            <form>
              {[
                ["property_name", "Property Name"],
                ["images_link", "Image URLs (comma separated)"],
                ["features", "Features"],
                ["price", "Price"],
                ["address", "Address"],
                ["category", "Category"],
                ["city", "City"],
                ["subarea", "Subarea"],
                ["owner_name", "Owner Name"],
                ["owner_contact", "Owner Mobile"],
                ["upi_id", "Owner UPI ID"],
                ["account_name", "Account Holder Name"],
                ["account_number", "Owner Account Number"],
                ["bank_name", "Bank Name"],
                ["ifsc_code", "IFSC Code"],
                ["qr_code", "Upload QR Code"]
              ].map(([key, label]) => (
                <input
                  key={key}
                  name={key}
                  value={property[key]}
                  onChange={handleChange}
                  placeholder={label}
                  className="w-full p-2 border rounded-md mb-3"
                  type={
                    key === "price" || key === "owner_contact" || key === "account_number"
                      ? "number"
                      : "text"
                  }
                />
              ))}

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleUpload}
                  className="bg-black text-white px-4 py-2 rounded-md"
                  disabled={loading}
                >
                  {loading ? "Uploading..." : "Upload"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnProperty;
