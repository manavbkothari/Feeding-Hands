import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { Edit2 } from "lucide-react"; // Importing a pencil icon from Lucide
import { Link, useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { createClient } from "@supabase/supabase-js";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

// Initialize Supabase Client
const supabase = createClient(
  "https://rbwlmdamzvmtfqyhnocj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJid2xtZGFtenZtdGZxeWhub2NqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkwODk2MzUsImV4cCI6MjA1NDY2NTYzNX0.LL-Zv5aoV_iuRMQK_90n6cPGwtHoG5QmiMRuJ2MQba0"
);

function Dashboard() {
  const navigate = useNavigate();

  // State initialization
  const [user, setUser] = useState({
    id: localStorage.getItem("userId") || null,
    name: "",
    donations: 0,
    impactScore: 0,
    points: 0,
    streak: 0,
  });

  const [chartData, setChartData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Donations",
        data: [0, 5, 0, 6, 2, 0],
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        tension: 0.4,
      },
    ],
  });

  const [leaderboard, setLeaderboard] = useState([]);

  // Fetch user data from Supabase
  const fetchUserData = async (userName) => {
    let { data, error } = await supabase
      .from("users")
      .select("id, name, donations, impactScore, points, streak")
      .eq("name", userName)
      .single();

    if (error) {
      console.error("Error fetching user data:", error);
    } else {
      setUser(data);
    }
  };

  // Handle real-time updates for donations
  useEffect(() => {
    const donationsChannel = supabase
      .channel("realtime-donations")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "donations" },
        (payload) => {
          console.log("New donation received:", payload.new);
          fetchUserData(user.name); // Refresh user stats
        }
      )
      .subscribe();

    return () => {
      donationsChannel.unsubscribe();
    };
  }, [user.name]);

  // Handle real-time updates for leaderboard
  useEffect(() => {
    const leaderboardChannel = supabase
      .channel("realtime-leaderboard")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "users" },
        () => {
          fetchLeaderboard();
        }
      )
      .subscribe();

    return () => {
      leaderboardChannel.unsubscribe();
    };
  }, []);

  // Fetch leaderboard data
  const fetchLeaderboard = async () => {
    let { data, error } = await supabase
      .from("users")
      .select("name, points")
      .order("points", { ascending: false });

    if (error) {
      console.error("Error fetching leaderboard:", error);
    } else {
      setLeaderboard(data);
    }
  };

  // Handle donation action
  const handleDonate = async () => {
    try {
      const { error } = await supabase
        .from("donations")
        .insert({ user_id: user.id, donationCount: 1 });
      if (error) {
        console.error("Error during donation:", error);
      }
    } catch (error) {
      console.error("Error during donation:", error);
    }
  };

  return (
    <div className="dashboard">
      <div className="profile">
        <img
          src="https://via.placeholder.com/80"
          alt="Profile"
          className="profile-img"
        />
        <h2>Namaste, Manav</h2>
        <p>Food Donation Enthusiast</p>
        <div className="progress">
          <span>Punya Points Progress</span>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${(user.points / 1000) * 100}%` }}
            ></div>
          </div>
          <small>{user.points}/1000 points</small>
        </div>
      </div>

      <div className="stats">
        <div className="stat-card">
          <h4>Total Donations</h4>
          <p>{user.donations}</p>
        </div>
        <div className="stat-card">
          <h4>Impact Score</h4>
          <p>{user.impactScore}</p>
        </div>
        <div className="stat-card">
          <h4>Donation Streak</h4>
          <p>{user.streak}</p>
        </div>
      </div>

      <div className="HalfDash">
        <div className="chart">
          <h4>Donation Activity</h4>
          <Line data={chartData} options={{ responsive: true }} />
        </div>

        <div className="leaderboard">
          <h4>Community Leaderboard</h4>
          <ul>
            {leaderboard.length > 0 ? (
              leaderboard.map((entry, index) => (
                <li key={index}>
                  {index + 1}. {entry.name} - {entry.points} points
                </li>
              ))
            ) : (
              <p>No data available for leaderboard.</p>
            )}
          </ul>
        </div>

        <div className="cta">
          <Link to="/donate">
            <button className="donate-button" onClick={handleDonate}>
              + Donate Now
            </button>
          </Link>
          <Link to="/Register">
            <button className="register-button">Register Organization</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
