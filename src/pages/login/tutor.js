import { useState, useEffect } from "react";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function admin() {
  const [tutorDB, setTutorDB] = useState([]);
  const [currentTutorID, setCurrentTutorID] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedinTutor, setIsLoggedinTutor] = useState("");

  const router = useRouter();

  useEffect(() => {
    axios
      .get("https://tutor-plus.vercel.app/api/tutorPlus/tutors")
      .then((response) => {
        setTutorDB(response.data);
        console.log(tutorDB);
        alert("Successfully fetched tutors data");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const tutor = tutorDB.find((a) => a.tutorId === username);
    if (tutor && password === tutor.tutorName) {
      setIsLoggedinTutor(true);
      setCurrentTutorID(username);
      router.push("/tutor");
    } else {
      setIsLoggedinTutor(false);
      alert("Incorrect username or password");
      alert({ tutorDB });
      console.table(tutorDB);
    }
  };

  return (
    <>
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
