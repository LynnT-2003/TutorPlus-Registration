import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";

const API_URL = "https://tutor-plus.vercel.app/api/tutorPlus/students";

async function updateStudentById(_id, studentData) {
  try {
    await axios.put(`${API_URL}/${_id}`, studentData);
    console.log(`Student with _id ${_id} updated successfully.`);
  } catch (error) {
    console.error("Error updating student:", error.message);
  }
}

export default function UpdateStudent() {
  const router = useRouter();
  const { id } = router.query;
  const [student, setStudent] = useState(null);

  useEffect(() => {
    async function fetchStudent() {
      if (!id) return;
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        setStudent(response.data);
      } catch (error) {
        console.error("Error fetching student:", error.message);
      }
    }

    fetchStudent();
  }, [id]);

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (student) {
      setValue("studentId", student.studentId);
      setValue("studentName", student.studentName);
    }
  }, [student]);

  const onSubmit = async (data) => {
    await updateStudentById(id, data);
    router.back();
  };

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <Container style={{ margin: "2rem", maxWidth: "50%" }}>
      <h1>Update Student</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="studentId">
          <Form.Label>Student ID</Form.Label>
          <Form.Control type="text" {...register("studentId")} readOnly />
        </Form.Group>

        <br />

        <Form.Group controlId="studentName">
          <Form.Label>Student Name</Form.Label>
          <Form.Control type="text" {...register("studentName")} />
        </Form.Group>

        <br />

        <Button variant="outline-primary" type="submit">
          Update Student
        </Button>
      </Form>
      <br />
      <Button variant="outline-secondary" onClick={() => router.back()}>
        Back
      </Button>
    </Container>
  );
}
