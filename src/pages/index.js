import { useState, useEffect } from "react";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Login() {
  const [adminDb, setAdminDb] = useState([]);
  const [currentAdminID, setCurrentAdminID] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedInAdmin, setIsLoggedInAdmin] = useState("");

  const router = useRouter();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/tutorPlus/admins")
      .then((response) => {
        setAdminDb(response.data);
        console.log(adminDb);
        alert("Successfully fetched Admin data");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const admin = adminDb.find((a) => a.adminId === username);
    if (admin && password === admin.adminName) {
      setIsLoggedInAdmin(true);
      setCurrentAdminID(username);
      router.push("/admin");
    } else {
      setIsLoggedInAdmin(false);
      alert("Incorrect username or password");
      alert({ adminDb });
      console.table(adminDb);
      console.log(username);
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
