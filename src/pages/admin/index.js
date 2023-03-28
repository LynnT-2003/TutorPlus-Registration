import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Admin() {
  const router = useRouter();
  const { adminId } = router.query;
  const [adminDb, setAdminDb] = useState([]);
  const [adminName, setAdminName] = useState("");
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    axios
      .get("https://tutor-plus.vercel.app/api/tutorPlus/admins")
      .then((response) => {
        setAdminDb(response.data);
        console.log(adminDb);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (adminDb.length > 0) {
      const admin = adminDb.find((admin) => admin.adminId === adminId);
      if (admin) {
        setAdminName(admin.adminName);
      }
    }
  }, [adminDb, adminId]);

  useEffect(() => {
    axios
      .get("https://tutor-plus.vercel.app/api/tutorPlus/tutors")
      .then((response) => {
        setTutors(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = async (tutorId) => {
    try {
      await axios.delete(
        `https://tutor-plus.vercel.app/api/tutorPlus/tutors/${tutorId}`
      );
      alert("Tutor deleted successfully");
      setTutors(tutors.filter((tutor) => tutor._id !== tutorId));
    } catch (error) {
      console.log(error);
      alert("Error deleting tutor");
    }
  };

  return (
    <div>
      <h1>Welcome Admin {adminId}</h1>
      {adminName && <p>Admin Name: {adminName}</p>}
      <table>
        <thead>
          <tr>
            <th>Tutor ID</th>
            <th>Tutor Name</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {tutors.map((tutor) => (
            <tr key={tutor._id}>
              <td>{tutor.tutorId}</td>
              <td>{tutor.tutorName}</td>
              <td>
                {" "}
                <button
                  onClick={() =>
                    router.push({
                      pathname: `/admin/update/${tutor._id}`,
                    })
                  }
                >
                  Edit
                </button>
              </td>
              <td>
                <button onClick={() => handleDelete(tutor._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link href="/admin/add">
        <button>Add New Tutor</button>
      </Link>{" "}
    </div>
  );
}
// import Image from 'next/legacy/image';
// import Button from 'react-bootstrap/Button';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';

// export default function admin() {
//   return (
//     <>
//             <Navbar bg="light" variant="light">
//             <Container>
//               <Navbar.Brand href="#home">TutorPlus</Navbar.Brand>
//               <Nav className="me-auto">
//                 <Nav.Link href="/login/admin">Admin</Nav.Link>
//                 <Nav.Link href="/login/tutor">Tutor</Nav.Link>
//                 <Nav.Link href="/login/student">Student</Nav.Link>
//               </Nav>
//             </Container>
//         </Navbar>

//         <div style={{
//           zIndex: -1,
//           position: "fixed",
//           width: "100vw",
//           height: "100vh"
//         }}>
//           <Image
//             src="/images/background.jpg"
//             alt="Background"
//             layout="fill"
//             objectFit="cover"

//           />
//         </div>

//       <div className="title">Admin Page</div>
//     </>
//   );
// }
