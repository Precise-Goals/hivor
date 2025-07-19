import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import StudentDashboard from "./pages/StudentDashboard";
import TPODashboard from "./pages/TPODashboard";
import { auth } from "./services/firebase";

const App = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        // Check role from custom claims or Firestore if needed
        const storedRole = localStorage.getItem("role") || "student";
        setRole(storedRole);
        setUser(currentUser);
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<Home />} />

        {/* Protected Student Dashboard */}
        <Route
          path="/student"
          element={
            user && role === "student" ? (
              <StudentDashboard onLogout={() => auth.signOut()} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Protected TPO Dashboard */}
        <Route
          path="/tpo"
          element={
            user && role === "tpo" ? (
              <TPODashboard onLogout={() => auth.signOut()} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
