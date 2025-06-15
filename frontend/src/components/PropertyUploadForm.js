// import React, { useState } from "react";
// import { Upload } from "lucide-react";

// const PropertyUploadForm = () => {
//   const [formData, setFormData] = useState({
//     description: "",
//     price: "",
//     address: "",
//     features: "",
//     ownerName: "",
//     ownerMobile: "",
//   });

//   const [image, setImage] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState("");

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewUrl(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission here
//     console.log("Form Data:", formData);
//     console.log("Image:", image);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-10">
//       <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h1 className="text-3xl font-bold text-gray-900 mb-8">
//           Upload Property
//         </h1>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="bg-white rounded-lg shadow p-6">
//             {/* Image Upload Section */}
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Upload Image
//               </label>
//               <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
//                 <div className="space-y-2 text-center">
//                   {previewUrl ? (
//                     <img
//                       src={previewUrl}
//                       alt="Property preview"
//                       className="mx-auto h-48 w-auto object-cover rounded-lg"
//                     />
//                   ) : (
//                     <Upload className="mx-auto h-12 w-12 text-gray-400" />
//                   )}
//                   <div className="flex text-sm text-gray-600">
//                     <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
//                       <span>Upload a file</span>
//                       <input
//                         type="file"
//                         className="sr-only"
//                         accept="image/*"
//                         onChange={handleImageChange}
//                       />
//                     </label>
//                     <p className="pl-1">or drag and drop</p>
//                   </div>
//                   <p className="text-xs text-gray-500">
//                     PNG, JPG, GIF up to 10MB
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Description */}
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Description
//               </label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleInputChange}
//                 rows={4}
//                 className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
//                 placeholder="Enter description of the property"
//               />
//             </div>

//             {/* Price */}
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Price
//               </label>
//               <input
//                 type="text"
//                 name="price"
//                 value={formData.price}
//                 onChange={handleInputChange}
//                 className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
//                 placeholder="Enter price"
//               />
//             </div>

//             {/* Address */}
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Address
//               </label>
//               <input
//                 type="text"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleInputChange}
//                 className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
//                 placeholder="Enter address"
//               />
//             </div>

//             {/* Features */}
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Features
//               </label>
//               <textarea
//                 name="features"
//                 value={formData.features}
//                 onChange={handleInputChange}
//                 rows={4}
//                 className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
//                 placeholder="Enter property features"
//               />
//             </div>

//             {/* Owner Name */}
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Owner Name
//               </label>
//               <input
//                 type="text"
//                 name="ownerName"
//                 value={formData.ownerName}
//                 onChange={handleInputChange}
//                 className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
//                 placeholder="Enter owner's full name"
//               />
//             </div>

//             {/* Owner Mobile Number */}
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Owner Mobile Number
//               </label>
//               <input
//                 type="tel"
//                 name="ownerMobile"
//                 value={formData.ownerMobile}
//                 onChange={handleInputChange}
//                 className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
//                 placeholder="Enter 10-digit mobile number"
//               />
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors duration-200"
//             >
//               Upload Details
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PropertyUploadForm;

import React, { useState } from "react";
import { Upload } from "lucide-react";

const PropertyUploadForm = () => {
  const [formData, setFormData] = useState({
    description: "",
    price: "",
    address: "",
    features: "",
    ownerName: "",
    ownerMobile: "",
  });

  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    console.log("Image:", image);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Upload Property
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-lg p-6 space-y-6"
        >
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Image
            </label>
            <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
              <div className="space-y-2 text-center">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Property preview"
                    className="mx-auto h-48 w-auto object-cover rounded-lg"
                  />
                ) : (
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                )}
                <div className="flex text-sm text-gray-600 justify-center">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                    <span>Upload a file</span>
                    <input
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              placeholder="Enter description of the property"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              placeholder="Enter price"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              placeholder="Enter address"
            />
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Features
            </label>
            <textarea
              name="features"
              value={formData.features}
              onChange={handleInputChange}
              rows={4}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              placeholder="Enter property features"
            />
          </div>

          {/* Owner Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Owner Name
            </label>
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleInputChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              placeholder="Enter owner's full name"
            />
          </div>

          {/* Owner Mobile */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Owner Mobile Number
            </label>
            <input
              type="tel"
              name="ownerMobile"
              value={formData.ownerMobile}
              onChange={handleInputChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              placeholder="Enter 10-digit mobile number"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors duration-200"
          >
            Upload Details
          </button>
        </form>
      </div>
    </div>
  );
};

export default PropertyUploadForm;
