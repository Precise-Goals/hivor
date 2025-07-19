// src/components/auth/RoleSelector.jsx
const RoleSelector = ({ role, setRole }) => {
  return (
    <div className="flex flex-col gap-2 mt-3">
      <label className="text-gray-700 font-semibold">Select Role:</label>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="student">Student</option>
        <option value="tpo">TPO (Training & Placement Officer)</option>
      </select>
    </div>
  );
};

export default RoleSelector;
