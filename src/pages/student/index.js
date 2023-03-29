import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/legacy/image";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";

export default function Student() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await axios.get(
        "https://tutor-plus.vercel.app/api/tutorPlus/sessions"
      );
      setSessions(response.data);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };

  const [student, setStudent] = useState(null);
  const router = useRouter();
  const { studentId } = router.query; // Get the studentId from router.query

  const goHome = () => {
    router.push("/");
  };

  const goAdmin = () => {
    router.push("/login/admin");
  };

  const goTutor = () => {
    router.push("/login/tutor");
  };

  const goStudent = () => {
    router.push("/login/student");
  };

  useEffect(() => {
    if (studentId) {
      // Only fetch student details when studentId is available
      console.log("Student: " + studentId);
      console.log("Fetching Student details...");
      fetchStudentDetails(studentId);
      console.log("Student details fetched");
      console.log("student", student);
    }
  }, [studentId]);

  const fetchStudentDetails = async (id) => {
    try {
      const response = await axios.get(
        `https://tutor-plus.vercel.app/api/tutorPlus/students/${id}`
      );
      console.log("response", response.data);
      setStudent(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!student) {
    return <div>Loading...</div>;
  }

  const cardStyle = {
    width: "60vw",
    backgroundColor: "white",
    color: "black",
    borderRadius: "10px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
    margin: "5vw auto",
    textAlign: "center",
    padding: "3vw",
  };

  const cardText = {
    fontSize: "2.5rem",
    fontWeight: "300",
    lineHeight: "1.2",
    color: "#333",
    marginBottom: "2rem",
  };

  const handleRegister = async (sessionId) => {
    console.log("Registering student...");
    console.log("studentId", student.studentId);
    console.log("sessionId", sessionId);
    try {
      console.log("Sending POST request to API endpoint");
      const response = await axios.post(
        "https://tutor-plus.vercel.app/api/tutorPlus/studentsessions",
        {
          studentId: student.studentId,
          sessionId,
        }
      );
      console.log("Successfully registered:", response.data);
      alert("Successfully Enrolled");
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand onClick={goHome}>TutorPlus</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={goAdmin}>Admin</Nav.Link>
            <Nav.Link onClick={goTutor}>Tutor</Nav.Link>
            <Nav.Link onClick={goStudent}>Student</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div style={cardStyle}>
        <Container style={cardText}>Welcome {student.studentName}</Container>

        <div>
          <h6>Offered Sessions</h6>
          <Table style={{ marginTop: "4em", marginBottom: "6em" }}>
            <thead>
              <tr>
                <th>Session ID</th>
                <th>Session Time</th>
                <th>Tutor ID</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session) => (
                <tr key={session._id}>
                  <td>{session.sessionId}</td>
                  <td>{new Date(session.sessionTime).toLocaleString()}</td>
                  <td>{session.tutorId}</td>
                  <td>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => handleRegister(session.sessionId)}
                    >
                      Register +
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}
