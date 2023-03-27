import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      userId,
      password,
    });
    if (result.error) {
      console.error(result.error);
    } else {
      router.push(`/${result.role}/${result.id}`);
    }
  };

  if (session) {
    router.push(`/${session.role}/${session.id}`);
    return null;
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userId">User ID:</label>
          <input
            type="text"
            id="userId"
            name="userId"
            value={userId}
            onChange={(event) => setUserId(event.target.value)}
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
    </>
  );
}
