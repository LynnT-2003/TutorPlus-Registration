import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Tutor() {
  const router = useRouter();
  const { tutorId } = router.query;
  const [tutorDB, setTutorDB] = useState([]);
  const [tutorName, setTutorName] = useState("");
  const [sessions, setSessions] = useState([]);
  const [numStudentsEnrolled, setNumStudentsEnrolled] = useState({});

  useEffect(() => {
    axios
      .get("https://tutor-plus.vercel.app/api/tutorPlus/tutors")
      .then((response) => {
        setTutorDB(response.data);
        console.log(tutorDB);
        // alert("Successfully fetched tutors data");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (tutorDB.length > 0) {
      const tutor = tutorDB.find((tutor) => tutor.tutorId === tutorId);
      if (tutor) {
        setTutorName(tutor.tutorName);
      }
    }
  }, [tutorDB, tutorId]);

  useEffect(() => {
    // Fetch sessions from the API
    axios
      .get("https://tutor-plus.vercel.app/api/tutorPlus/sessions")
      .then((response) => {
        setSessions(response.data);
        // alert("Successfully fetched sessions data");
      })
      .catch((error) => {
        console.log(error);
      });

    // Fetch student sessions from the API
    axios
      .get("https://tutor-plus.vercel.app/api/tutorPlus/studentsessions")
      .then((response) => {
        // Group student sessions by session ID
        const sessionsData = response.data.reduce((acc, curr) => {
          if (!acc[curr.sessionId]) {
            acc[curr.sessionId] = [];
          }
          acc[curr.sessionId].push(curr);
          return acc;
        }, {});

        // Calculate the number of students enrolled in each session
        const numStudents = {};
        for (const [sessionId, studentSessions] of Object.entries(
          sessionsData
        )) {
          numStudents[sessionId] = studentSessions.length;
        }
        setNumStudentsEnrolled(numStudents);

        // alert("Successfully fetched student sessions data");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filteredSessions = sessions.filter(
    (session) => session.tutorId === tutorId
  );

  return (
    <div>
      <h1>Welcome Tutor {tutorId}</h1>
      {tutorName && <p>Tutor Name: {tutorName}</p>}
      <table>
        <thead>
          <tr>
            <th>Session ID</th>
            <th>Date</th>
            <th>Time</th>
            <th>Number of Students Enrolled</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredSessions.map((session) => (
            <tr key={session.sessionId}>
              <td>{session.sessionId}</td>
              <td>{new Date(session.sessionTime).toLocaleDateString()}</td>
              <td>{new Date(session.sessionTime).toLocaleTimeString()}</td>
              {/* <td>
                {new Date(session.sessionTime).toLocaleDateString("en-US", {
                  timeZone: "UTC",
                })}
              </td>
              <td>
                {new Date(session.sessionTime).toLocaleTimeString("en-US", {
                  timeZone: "UTC",
                })}
              </td> */}
              <td>{numStudentsEnrolled[session.sessionId]}</td>
              <td>
                <button
                  onClick={() =>
                    router.push({
                      pathname: `/tutor/update/${session._id}`,
                    })
                  }
                >
                  Edit
                </button>
              </td>
              <button
                onClick={async () => {
                  try {
                    // Delete the session
                    await axios.delete(
                      `http://localhost:3000/api/tutorPlus/sessions/${session._id}`
                    );

                    // Delete student sessions for this session
                    const studentSessions = await axios.get(
                      "http://localhost:3000/api/tutorPlus/studentsessions"
                    );
                    const studentSessionsToDelete = studentSessions.data.filter(
                      (ss) => ss.sessionId === session.sessionId
                    );
                    for (const ss of studentSessionsToDelete) {
                      await axios.delete(
                        `http://localhost:3000/api/tutorPlus/studentsessions/${ss._id}`
                      );
                    }

                    alert("Session deleted successfully");
                    window.location.reload(false);
                  } catch (error) {
                    console.log(error);
                    alert("Error deleting session");
                  }
                }}
              >
                Delete
              </button>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={() =>
          router.push({ pathname: "/tutor/add", query: { tutorId } })
        }
      >
        Add New Session
      </button>
    </div>
  );
}
