import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import "./Donate.css";

// Initialize Supabase
const SUPABASE_URL = "https://evrxtwxxwptqjhecthdv.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2cnh0d3h4d3B0cWpoZWN0aGR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkwODIzMDgsImV4cCI6MjA1NDY1ODMwOH0.QKuD5Wz8HxibrI_zpM-7BRq8KX7MHlYTZ9Yis_REmI0";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function Donate() {
  const [foodType, setFoodType] = useState("Vegetarian");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("Grams");
  const [pickupLocation, setPickupLocation] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const insertData = async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.from("donation").insert([
      {
        type: foodType,
        quantity: `${quantity} ${unit}`,
        location: pickupLocation,
        notes: additionalNotes,
      },
    ]);

    if (error) {
      console.error("Error inserting data:", error.message);
      setError(
        "There was an error submitting your donation. Please try again."
      );
    } else {
      alert("Thank you for your donation!");
      setFoodType("Vegetarian");
      setQuantity("");
      setUnit("Grams");
      setPickupLocation("");
      setAdditionalNotes("");
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!quantity || !pickupLocation) {
      alert("Please fill out all required fields.");
      return;
    }
    await insertData();
  };

  return (
    <div className="donate-food-page">
      <div className="header">
        <h1>Donate Food</h1>
        <p>Share Your Kindness with Those in Need</p>
      </div>
      <div className="main-section">
        <div className="donation-form">
          <h3>Donation Form</h3>
          <div className="form-group">
            <label>Type of Food</label>
            <select
              value={foodType}
              onChange={(e) => setFoodType(e.target.value)}
            >
              <option>Non-Vegetarian</option>
              <option>Vegetarian</option>
              <option>Packaged Food</option>
              <option>Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Quantity</label>
            <div className="quantity-input">
              <input
                type="number"
                placeholder="Enter amount"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <select value={unit} onChange={(e) => setUnit(e.target.value)}>
                <option>Grams</option>
                <option>Kilograms</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Pickup Location</label>
            <input
              type="text"
              placeholder="Enter your address"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Additional Notes</label>
            <textarea
              placeholder="Any special instructions or details"
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
            ></textarea>
          </div>
          <button
            className="submit-button"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Donation"}
          </button>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
      <div className="footer">
        <p>Contact Us: 1-800-FOOD-HELP</p>
        <p>© 2024 Food Donation Platform. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Donate;
