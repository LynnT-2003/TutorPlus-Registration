import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function AddTutor() {
  const router = useRouter();
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("https://tutor-plus.vercel.app/api/tutorPlus/students", {
        studentId,
        studentName,
      });
      alert("Student added successfully");
      router.back();
    } catch (error) {
      console.log(error);
      alert("Error adding student");
    }
  };

  return (
    <div>
      <h1>Add New Student</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="studentId">Student ID:</label>
          <input
            type="text"
            id="studentId"
            value={studentId}
            onChange={(event) => setStudentId(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="studentName">Student Name:</label>
          <input
            type="text"
            id="studentName"
            value={studentName}
            onChange={(event) => setStudentName(event.target.value)}
          />
        </div>
        <button type="submit">Add Student</button>
      </form>
      <button variant="outline-secondary" onClick={() => router.back()}>
        Back
      </button>
    </div>
  );
}
