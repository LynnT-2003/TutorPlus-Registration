import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import axios from "axios";

const apiUrl = process.env.API_URL;

const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        userId: { label: "User ID", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { userId, password } = credentials;

        // Check if the user exists in the admin collection
        const adminRes = await axios.get(`${apiUrl}/api/tutorPlus/admins`);
        const admin = adminRes.data.find((admin) => admin.adminId === userId);
        if (admin) {
          const match = await bcrypt.compare(password, admin.adminID);
          if (match) {
            console.log("Successfully authenticated as admin:", admin.adminId);
            return { id: admin.adminId, name: admin.adminName, role: "admin" };
          }
        }

        // Check if the user exists in the tutor collection
        const tutorRes = await axios.get(`${apiUrl}/api/tutorPlus/tutors`);
        const tutor = tutorRes.data.find((tutor) => tutor.tutorId === userId);
        if (tutor) {
          const match = await bcrypt.compare(password, tutor.tutorId);
          if (match) {
            console.log("Successfully authenticated as tutor:", tutor.tutorId);
            return { id: tutor.tutorId, name: tutor.tutorName, role: "tutor" };
          }
        }

        // Check if the user exists in the student collection
        const studentRes = await axios.get(`${apiUrl}/api/tutorPlus/students`);
        const student = studentRes.data.find(
          (student) => student.studentId === userId
        );
        if (student) {
          const match = await bcrypt.compare(password, student.studentId);
          if (match) {
            console.log(
              "Successfully authenticated as student:",
              student.studentId
            );
            return {
              id: student.studentId,
              name: student.studentName,
              role: "student",
            };
          }
        }

        return null;
      },
    }),
  ],
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
};

export default (req, res) => NextAuth(req, res, options);
