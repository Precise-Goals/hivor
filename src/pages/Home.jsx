import { useState } from "react";
import { AuthForm } from "../components/auth";
import  StudentDashboard  from "./StudentDashboard";
import  TPODashboard  from "./TPODashboard";

const Home = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  const handleLogin = (firebaseUser, userRole) => {
    setUser(firebaseUser);
    setRole(userRole);
  };

  const handleLogout = () => {
    setUser(null);
    setRole(null);
  };

  // If user is logged in, show their dashboard
  if (user && role) {
    return role === "tpo" ? (
      <TPODashboard onLogout={handleLogout} />
    ) : (
      <StudentDashboard onLogout={handleLogout} />
    );
  }

  // Landing/Login screen
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-700 mb-6">
        Automated Placement Management System
      </h1>
      <p className="mb-8 text-gray-700 max-w-md text-center">
        A serverless platform for colleges to manage placements — Students can upload and optimize resumes with AI, while TPOs track analytics, job postings, and reports.
      </p>
      <AuthForm onLogin={handleLogin} />
    </div>
  );
};

export default Home;
