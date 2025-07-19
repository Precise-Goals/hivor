import { db } from "./firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

// Save student profile
export const saveStudent = async (student) => {
  await addDoc(collection(db, "students"), student);
};

// Fetch all students
export const fetchStudents = async () => {
  const snapshot = await getDocs(collection(db, "students"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Post a new job (TPO) - supports both saveJob and postJob names
export const saveJob = async (job) => {
  await addDoc(collection(db, "jobs"), job);
};
export const postJob = saveJob; // alias, in case some components use postJob

// Fetch active jobs
export const fetchJobs = async () => {
  const now = new Date();
  const q = query(collection(db, "jobs"), where("deadline", ">=", now));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Default export for flexibility
export default {
  saveStudent,
  fetchStudents,
  saveJob,
  postJob,
  fetchJobs,
};
