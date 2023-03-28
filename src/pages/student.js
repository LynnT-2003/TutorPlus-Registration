import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Student() {
  const [student, setStudent] = useState(null);
  const router = useRouter();
  const { studentId } = router.query; // Get the studentId from router.query

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
      console.log("wtf is null");
    }
  };

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="title">
        <h1>Student Page</h1>
      </div>
      <br />
      <div classname="student-details">
        <h2>Student Details</h2>
        <p>ID: {student.studentId}</p>
        <p>Name: {student.studentName}</p>
        {/* Add any other student details you want to display */}
      </div>
      <div classname="functionalities">
        <button>See tutoring sessions</button>
      </div>
    </>
  );
}
