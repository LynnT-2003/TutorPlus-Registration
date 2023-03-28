import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function AddSessionForm() {
  const router = useRouter();
  const { tutorId } = router.query;

  const [sessionId, setSessionId] = useState("");
  const [sessionTime, setSessionTime] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Make an API request to add the new session
    try {
      const response = await axios.post("/api/tutorPlus/sessions", {
        sessionId,
        sessionTime,
        tutorId,
      });
      console.log(response.data);
      alert("Successfully added a new session");
      router.push(`/tutor?tutorId=${tutorId}`);
    } catch (error) {
      console.error(error);
      alert("Failed to add a new session");
    }
  };

  return (
    <div>
      <h1>Add a New Session</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="sessionId">Session ID:</label>
          <input
            type="text"
            id="sessionId"
            name="sessionId"
            value={sessionId}
            onChange={(event) => setSessionId(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="sessionTime">Session Time:</label>
          <input
            type="datetime-local"
            id="sessionTime"
            name="sessionTime"
            value={sessionTime}
            onChange={(event) => setSessionTime(event.target.value)}
          />
        </div>
        <button type="submit">Add Session</button>
      </form>
    </div>
  );
}
