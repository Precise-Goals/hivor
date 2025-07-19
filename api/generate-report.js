export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const students = req.body;

  if (!students || !Array.isArray(students)) {
    return res.status(400).json({ error: "Invalid input data." });
  }

  try {
    const headers = Object.keys(students[0]).join(",");
    const rows = students.map((s) => Object.values(s).join(",")).join("\n");
    const csv = [headers, rows].join("\n");

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=report.csv");
    res.status(200).send(csv);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "CSV export failed." });
  }
}
