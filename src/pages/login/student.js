import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from 'next/legacy/image';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function admin() {
  const [studentDB, setStudentDB] = useState([]);
  const [currentStudentID, setCurrentStudentID] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedInStudent, setIsLoggedInStudent] = useState("");

  const router = useRouter();

  useEffect(() => {
    axios
      .get("https://tutor-plus.vercel.app/api/tutorPlus/students")
      .then((response) => {
        setStudentDB(response.data);
        console.log(studentDB);
        alert("Successfully fetched students data");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const student = studentDB.find((a) => a.studentId === username);
    if (student && password === student.studentName) {
      setIsLoggedInStudent(true);
      setCurrentStudentID(username);
      router.push({
        pathname: "/student",
        query: { studentId: student._id },
      });
    } else {
      setIsLoggedInStudent(false);
      alert("Incorrect username or password");
      alert({ studentDB });
      console.table(studentDB);
    }
  };

  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">TutorPlus</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/login/admin">Admin</Nav.Link>
              <Nav.Link href="/login/tutor">Tutor</Nav.Link>
              <Nav.Link href="/login/student">Student</Nav.Link>
            </Nav>
        </Container>
      </Navbar>

        <div style={{
          zIndex: -1,
          position: "fixed",
          width: "100vw",
          height: "100vh"
        }}>
          <Image
            src="/images/background.jpg"
            alt="Background"
            layout="fill"
            objectFit="cover"
            priority={true}
          />
        </div>

      <div className="admin-login">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">User ID:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}
