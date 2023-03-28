import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";

const API_URL = "https://tutor-plus.vercel.app/api/tutorPlus/sessions";

async function updateSessionTimeById(_id, newSessionTime) {
  try {
    const response = await axios.get(API_URL);
    const sessions = response.data;

    const session = sessions.find((s) => s._id === _id);

    if (!session) {
      console.log(`Session with _id ${_id} not found.`);
      return;
    }

    const updatedSession = { ...session, sessionTime: newSessionTime };

    await axios.put(`${API_URL}/${_id}`, updatedSession);
    console.log(`Session with _id ${_id} updated successfully.`);
  } catch (error) {
    console.error("Error updating session:", error.message);
  }
}

export default function UpdateSession() {
  const router = useRouter();
  const { id } = router.query;
  const { register, handleSubmit } = useForm();

  const [session, setSession] = useState(null);

  useEffect(() => {
    async function fetchSession() {
      if (!id) return;
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        setSession(response.data);
      } catch (error) {
        console.error("Error fetching session:", error.message);
      }
    }

    fetchSession();
  }, [id]);

  const onSubmit = async (data) => {
    await updateSessionTimeById(id, data.newSessionTime);
    router.back();
  };

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <Container style={{ margin: "2rem", maxWidth: "50%" }}>
      <h1>Update Session Time</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="sessionId">
          <Form.Label>Session ID</Form.Label>
          <Form.Control
            type="text"
            value={session.sessionId}
            readOnly
            style={{ width: "750px" }}
          />
        </Form.Group>

        <br />

        <Form.Group controlId="newSessionTime">
          <Form.Label>New Session Time</Form.Label>
          <Form.Control
            type="datetime-local"
            {...register("newSessionTime", { required: true })}
            defaultValue={session.sessionTime.slice(0, -1)}
            style={{ width: "750px" }}
          />
        </Form.Group>

        <br />

        <Button variant="outline-primary" type="submit">
          Update Time
        </Button>
      </Form>
      <br />
      <Button variant="outline-secondary" onClick={() => router.back()}>
        Back
      </Button>
    </Container>
  );
}
