import React from "react";
import FlashcardForm from "./FlashcardForm";
import "./Dashboard.css"; // Import CSS for styling

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>
      <FlashcardForm />
    </div>
  );
};

export default Dashboard;
