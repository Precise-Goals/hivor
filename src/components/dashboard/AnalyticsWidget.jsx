// src/components/dashboard/AnalyticsWidget.jsx
import { useEffect, useState } from "react";
import { fetchStudents } from "../../services/storage";

const AnalyticsWidget = () => {
  const [stats, setStats] = useState({ total: 0, placed: 0 });

  useEffect(() => {
    const loadStats = async () => {
      const students = await fetchStudents();
      const placed = students.filter((s) => s.status === "placed").length;
      setStats({ total: students.length, placed });
    };
    loadStats();
  }, []);

  return (
    <div className="bg-gray-100 p-4 rounded shadow mt-4">
      <h2 className="text-lg font-bold mb-2">Placement Stats</h2>
      <p>Total Students: {stats.total}</p>
      <p>Placed Students: {stats.placed}</p>
      <p>Placement Rate: {stats.total ? ((stats.placed / stats.total) * 100).toFixed(1) : 0}%</p>
    </div>
  );
};

export default AnalyticsWidget;
