import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();

  const adminLogin = () => {
    router.push("/login/admin");
  };

  const tutorLogin = () => {
    router.push("/login/tutor");
  };

  const studentLogin = () => {
    router.push("/login/student");
  };

  return (
    <>
      <button onClick={adminLogin}>Login as Admin</button>
      <button onClick={tutorLogin}>Login as Tutor</button>
      <button onClick={studentLogin}>Login as Student</button>
    </>
  );
}
