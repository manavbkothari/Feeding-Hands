// import React, { useState } from "react";
// import axios from "axios";
// import "./Register.css";

// function Register() {
//   console.log("Register component is rendering...");

//   const [organizationName, setOrganizationName] = useState("");
//   const [organizationLocation, setOrganizationLocation] = useState("");
//   const [organizationDescription, setOrganizationDescription] = useState("");
//   const [contactPerson, setContactPerson] = useState("");
//   const [contactEmail, setContactEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (
//       !organizationName ||
//       !organizationLocation ||
//       !organizationDescription ||
//       !contactPerson ||
//       !contactEmail
//     ) {
//       alert("Please fill out all fields.");
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axios.post("http://localhost:5000/api/register", {
//         organizationName,
//         organizationLocation,
//         organizationDescription,
//         contactPerson,
//         contactEmail,
//       });

//       // Check if registration was successful
//       if (response.status === 200) {
//         alert("Thank you for registering your organization!");
//         // Clear the form
//         setOrganizationName("");
//         setOrganizationLocation("");
//         setOrganizationDescription("");
//         setContactPerson("");
//         setContactEmail("");
//       } else {
//         alert("Registration failed. Please try again.");
//       }
//     } catch (err) {
//       console.error("Error during registration:", err);
//       setError("There was an error submitting your form. Please try again.");
//     } finally {
//       // Hide loading state after the request is complete
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="register-organization-container">
//       <h2>Register Your Organization</h2>
//       <form onSubmit={handleSubmit} className="register-form">
//         {/* Form Fields */}
//         <div className="form-group">
//           <label htmlFor="organizationName">Organization Name</label>
//           <input
//             type="text"
//             id="organizationName"
//             name="organizationName"
//             value={organizationName}
//             onChange={(e) => setOrganizationName(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="organizationLocation">Organization Location</label>
//           <input
//             type="text"
//             id="organizationLocation"
//             name="organizationLocation"
//             value={organizationLocation}
//             onChange={(e) => setOrganizationLocation(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="organizationDescription">Description</label>
//           <textarea
//             id="organizationDescription"
//             name="organizationDescription"
//             value={organizationDescription}
//             onChange={(e) => setOrganizationDescription(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="contactPerson">Contact Person</label>
//           <input
//             type="text"
//             id="contactPerson"
//             name="contactPerson"
//             value={contactPerson}
//             onChange={(e) => setContactPerson(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="contactEmail">Contact Email</label>
//           <input
//             type="email"
//             id="contactEmail"
//             name="contactEmail"
//             value={contactEmail}
//             onChange={(e) => setContactEmail(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="register-btn" disabled={loading}>
//           {loading ? "Registering..." : "Register Organization"}
//         </button>
//         {error && <p className="error-message">{error}</p>}{" "}
//         {/* Display error message */}
//       </form>
//     </div>
//   );
// }

// export default Register;
// import { createClient } from "@supabase/supabase-js";

// // Initialize Supabase
// const SUPABASE_URL = "https://your-project-url.supabase.co";
// const SUPABASE_ANON_KEY = "your-anon-key";
// const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// // Function to insert data into Supabase
// const insertData = async (name, address, description, contactNo, email) => {
//   const { data, error } = await supabase.from("your_table_name").insert([
//     {
//       name: name,
//       address: address,
//       description: description,
//       contact_no: contactNo,
//       email: email,
//     },
//   ]);

//   if (error) {
//     console.error("Error inserting data:", error.message);
//   } else {
//     console.log("Data inserted successfully:", data);
//   }
// };
import React, { useState } from "react";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";
import "./Register.css";

// Initialize Supabase
const SUPABASE_URL = "https://evrxtwxxwptqjhecthdv.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2cnh0d3h4d3B0cWpoZWN0aGR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkwODIzMDgsImV4cCI6MjA1NDY1ODMwOH0.QKuD5Wz8HxibrI_zpM-7BRq8KX7MHlYTZ9Yis_REmI0";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function Register() {
  console.log("Register component is rendering...");

  const [organizationName, setOrganizationName] = useState("");
  const [organizationLocation, setOrganizationLocation] = useState("");
  const [organizationDescription, setOrganizationDescription] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to insert data into Supabase
  const insertData = async () => {
    const { data, error } = await supabase.from("Organization").insert([
      {
        name: organizationName,
        address: organizationLocation,
        description: organizationDescription,
        contact: contactPerson,
        email: contactEmail,
      },
    ]);

    if (error) {
      console.error("Error inserting data:", error.message);
      setError("There was an error submitting your form. Please try again.");
    } else {
      console.log("Data inserted successfully:", data);
      alert("Thank you for registering your organization!");
      setOrganizationName("");
      setOrganizationLocation("");
      setOrganizationDescription("");
      setContactPerson("");
      setContactEmail("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !organizationName ||
      !organizationLocation ||
      !organizationDescription ||
      !contactPerson ||
      !contactEmail
    ) {
      alert("Please fill out all fields.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await insertData();
    } catch (err) {
      console.error("Error during registration:", err);
      setError("There was an error submitting your form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-organization-container">
      <h2>Register Your Organization</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="organizationName">Organization Name</label>
          <input
            type="text"
            id="organizationName"
            name="organizationName"
            value={organizationName}
            onChange={(e) => setOrganizationName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="organizationLocation">Organization Location</label>
          <input
            type="text"
            id="organizationLocation"
            name="organizationLocation"
            value={organizationLocation}
            onChange={(e) => setOrganizationLocation(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="organizationDescription">Description</label>
          <textarea
            id="organizationDescription"
            name="organizationDescription"
            value={organizationDescription}
            onChange={(e) => setOrganizationDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contactPerson">Contact Person</label>
          <input
            type="text"
            id="contactPerson"
            name="contactPerson"
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contactEmail">Contact Email</label>
          <input
            type="email"
            id="contactEmail"
            name="contactEmail"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="register-btn" disabled={loading}>
          {loading ? "Registering..." : "Register Organization"}
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}

export default Register;
