import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { requestNotificationPermission } from "./firebase"; // Import function

// Import components
import Header from "./Header";
import SignIn from "./Signin";
import Footer from "./Footer";
import Note from "./Note";
import Contact from "./Contact";
import SignUp from "./SignUp";
import Donate from "./Donate";
import Register from "./Register";
import Dashboard from "./Dashboard";
import CityInsights from "./cityInsights";
import DonateFood from "./DonateFood";
import VolunteerForm from "./VolunteerForm";
import FundraisingPage from "./FundraisingPage";
import BiogasDonation from "./BiogasDonation";

function AppContent() {
  const location = useLocation();

  // ✅ Place useEffect inside a function component
  useEffect(() => {
    requestNotificationPermission().then((token) => {
      if (token) {
        // Send this token to your backend to store for later
        fetch("http://localhost:3000/registerToken", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ deviceToken: token }),
        });
      }
    });
  }, []); // Run only once on mount

  return (
    <div>
      {/* Render Header only on the home page */}
      {location.pathname === "/" && <Header />}

      {/* Routes for different pages */}
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/Donate" element={<Donate />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cityInsights" element={<CityInsights />} />
        <Route path="/VolunteerForm" element={<VolunteerForm />} />
        <Route path="/FundraisingPage" element={<FundraisingPage />} />
        <Route path="/BiogasDonation" element={<BiogasDonation />} />
        <Route
          path="/"
          element={
            <>
              <Note />
              <Contact />
            </>
          }
        />
      </Routes>

      {/* Optional Footer rendering */}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((registration) => {
      console.log("Service Worker Registered", registration);
    })
    .catch((error) => {
      console.log("Service Worker Registration Failed", error);
    });
}
