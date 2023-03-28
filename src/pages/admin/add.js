import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function AddTutor() {
  const router = useRouter();
  const [tutorId, setTutorId] = useState("");
  const [tutorName, setTutorName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("https://tutor-plus.vercel.app/api/tutorPlus/tutors", {
        tutorId,
        tutorName,
      });
      alert("Tutor added successfully");
      router.back();
    } catch (error) {
      console.log(error);
      alert("Error adding tutor");
    }
  };

  return (
    <div>
      <h1>Add New Tutor</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="tutorId">Tutor ID:</label>
          <input
            type="text"
            id="tutorId"
            value={tutorId}
            onChange={(event) => setTutorId(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="tutorName">Tutor Name:</label>
          <input
            type="text"
            id="tutorName"
            value={tutorName}
            onChange={(event) => setTutorName(event.target.value)}
          />
        </div>
        <button type="submit">Add Tutor</button>
      </form>
      <button variant="outline-secondary" onClick={() => router.back()}>
        Back
      </button>
    </div>
  );
}
