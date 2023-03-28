import Image from 'next/legacy/image';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function admin() {
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
            
          />
        </div>

      <div className="title">Admin Page</div>
    </>
  );
}
