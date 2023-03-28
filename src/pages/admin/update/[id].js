import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";
import Link from "next/link";

const API_URL = "https://tutor-plus.vercel.app/api/tutorPlus/tutors";

async function updateTutorById(_id, tutorData) {
  try {
    await axios.put(`${API_URL}/${_id}`, tutorData);
    console.log(`Tutor with _id ${_id} updated successfully.`);
  } catch (error) {
    console.error("Error updating tutor:", error.message);
  }
}

export default function UpdateTutor() {
  const router = useRouter();
  const { id } = router.query;
  const [tutor, setTutor] = useState(null);

  useEffect(() => {
    async function fetchTutor() {
      if (!id) return;
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        setTutor(response.data);
      } catch (error) {
        console.error("Error fetching tutor:", error.message);
      }
    }

    fetchTutor();
  }, [id]);

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (tutor) {
      setValue("tutorId", tutor.tutorId);
      setValue("tutorName", tutor.tutorName);
    }
  }, [tutor]);

  const onSubmit = async (data) => {
    await updateTutorById(id, data);
    router.back();
  };

  if (!tutor) {
    return <div>Loading...</div>;
  }

  return (
    <Container style={{ margin: "2rem", maxWidth: "50%" }}>
      <h1>Update Tutor</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="tutorId">
          <Form.Label>Tutor ID</Form.Label>
          <Form.Control type="text" {...register("tutorId")} readOnly />
        </Form.Group>

        <br />

        <Form.Group controlId="tutorName">
          <Form.Label>Tutor Name</Form.Label>
          <Form.Control type="text" {...register("tutorName")} />
        </Form.Group>

        <br />

        <Button variant="outline-primary" type="submit">
          Update Tutor
        </Button>
      </Form>
      <br />
      <Button variant="outline-secondary" onClick={() => router.back()}>
        Back
      </Button>
    </Container>
  );
}
