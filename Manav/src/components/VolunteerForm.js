import React, { useState } from "react";
import { supabase } from "../supabaseClient";

const VolunteerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    availability: "",
    skills: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.from("volunteers").insert([
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        availability: formData.availability,
        skills: formData.skills.split(","), // Convert skills to array
      },
    ]);

    if (error) {
      console.error("Error inserting data:", error.message);
      alert("Error submitting form. Please try again.");
    } else {
      alert("Thank you for volunteering!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        availability: "",
        skills: "",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        required
      />
      <input
        type="datetime-local"
        name="availability"
        value={formData.availability}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="skills"
        placeholder="Skills (comma-separated)"
        value={formData.skills}
        onChange={handleChange}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default VolunteerForm;
