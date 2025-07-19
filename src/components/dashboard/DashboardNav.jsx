// src/components/dashboard/DashboardNav.jsx
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";

const DashboardNav = ({ role, onLogout }) => {
  const handleLogout = async () => {
    await signOut(auth);
    onLogout();
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">
        {role === "tpo" ? "TPO Dashboard" : "Student Dashboard"}
      </h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </nav>
  );
};

export default DashboardNav;
