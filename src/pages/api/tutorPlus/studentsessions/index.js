import { connect, model, models, Schema } from "mongoose";
const connectionString =
  "mongodb+srv://user1:d1aVx26YFCCnVKgr@cluster0.e6jfgzx.mongodb.net/tutorplus";

export default async function handler(req, res) {
  await connect(connectionString);
  console.log("req.method: ", req.method);

  if (req.method === "GET") {
    const docs = await StudentSessions.find();
    res.status(200).json(docs);
  } else if (req.method === "POST") {
    console.log("Received POST request");
    console.log(req.body);
    // res.status(200).json(req.body);
    const doc = await StudentSessions.create(req.body);
    res.status(201).json(doc);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

const studentSessionSchema = new Schema({
  sessionId: String,
  studentId: String,
});

console.log("Mongoose Models", models);
const StudentSessions =
  models?.studentsessions || model("studentsessions", studentSessionSchema);
