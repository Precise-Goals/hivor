// src/components/dashboard/StudentCard.jsx
const StudentCard = ({ student }) => {
  return (
    <div className="border rounded p-4 shadow bg-white">
      <h3 className="font-bold">{student.name}</h3>
      <p className="text-sm">{student.email}</p>
      <p className="text-xs text-gray-600">Skills: {student.skills?.join(", ") || "N/A"}</p>
      <p className="text-xs text-gray-500">Status: {student.status || "Not Placed"}</p>
    </div>
  );
};

export default StudentCard;
