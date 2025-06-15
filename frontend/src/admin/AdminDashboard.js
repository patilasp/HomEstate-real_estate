import React, { useEffect, useState } from "react";
import axios from "axios";

const TABS = ["pending", "approved", "reject"];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [properties, setProperties] = useState([]);

  const fetchProperties = async (status) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:5000/api/admin/properties/${status}`,
        {
          headers: {
            // Authorization: `Bearer ${token}`,
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc0NTQxMjk4OSwiZXhwIjoxNzQ2MDE3Nzg5fQ.nM6i32-iTfp-_BdgnUdGv87TWeKt7cuBdCffu07GLkU`,
          },
        }
      );
      setProperties(res.data);
    } catch (err) {
      console.error("Error fetching properties:", err);
    }
  };

  useEffect(() => {
    fetchProperties(activeTab);
  }, [activeTab]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/admin/property/${id}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc0NTQxMjk4OSwiZXhwIjoxNzQ2MDE3Nzg5fQ.nM6i32-iTfp-_BdgnUdGv87TWeKt7cuBdCffu07GLkU`,
          },
        }
      );
      fetchProperties(activeTab);
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Property Dashboard</h1>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "10px 20px",
              backgroundColor: activeTab === tab ? "#007bff" : "#e0e0e0",
              color: activeTab === tab ? "white" : "black",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      <div>
        {properties.length === 0 ? (
          <p>No {activeTab} properties found.</p>
        ) : (
          properties.map((property) => (
            <div
              key={property.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "5px",
                marginBottom: "10px",
              }}
            >
              <div className="w-full md:w-1/3">
                {property.images_link && property.images_link.length > 0 ? (
                  property.images_link
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
              <h3>{property.title}</h3>
              <p>City: {property.city}</p>
              <p>Category: {property.category}</p>
              <p>Status: {property.status}</p>
              <p>Owner Name: {property.owner_name}</p>
              {activeTab === "pending" && (
                <div>
                  <button
                    onClick={() => handleStatusChange(property.id, "approved")}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatusChange(property.id, "reject")}
                    style={{ marginLeft: "10px", color: "red" }}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
