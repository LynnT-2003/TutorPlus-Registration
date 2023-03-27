import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Sessions() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    axios
      .get("/api/tutorPlus/sessions")
      .then((response) => {
        const sessions = response.data;
        console.log(sessions); // log sessions to console
        const sessionIds = sessions.map((session) => session.sessionId);
        axios
          .get("/api/tutorPlus/studentsessions", {
            params: { sessionIds },
          })
          .then((response) => {
            const studentSessions = response.data;
            console.log(studentSessions);
            const sessionStudentMap = new Map();
            for (const studentSession of studentSessions) {
              const sessionId = studentSession.sessionId;
              const studentId = studentSession.studentId;
              if (!sessionStudentMap.has(sessionId)) {
                sessionStudentMap.set(sessionId, [studentId]);
              } else {
                sessionStudentMap.get(sessionId).push(studentId);
              }
            }
            for (const session of sessions) {
              session.studentIds =
                sessionStudentMap.get(session.sessionId) || [];
            }
            setSessions(sessions);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  console.log(sessions);

  return (
    <>
      <Head>
        <title>Sessions</title>
      </Head>
      <h1>Sessions</h1>
      <table>
        <thead>
          <tr>
            <th>Session ID</th>
            <th>Session Time</th>
            <th>Tutor ID</th>
            <th>Student IDs</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => (
            <tr key={session._id}>
              <td>{session.sessionId}</td>
              <td>{session.sessionTime}</td>
              <td>{session.tutorId}</td>
              <td>{session.studentIds.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
