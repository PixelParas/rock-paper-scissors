import express, { json } from "express";
import { connect, Schema, model } from "mongoose";
import cors from "cors";
import { config } from "dotenv";
import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";
const { sign } = jwt;
import { expressjwt as expressJwt } from "express-jwt";


config();
const app = express();
app.use(json());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
    throw new Error("Missing required environment variables"); 
}

// Database Connection
connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB Connection Error:", err));

// Schemas and Models
const UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
});

const ProblemSchema = new Schema({
    asker: String,
    topic: String,
    question: String,
    createdAt: { type: Date, default: Date.now },
    answers: [{
        user: String,
        text: String,
        upvotes: Number,
        verified: Boolean,
    }],
});

const User = model("User", UserSchema);
const Problem = model("Problem", ProblemSchema);

// Authentication Middleware
const verifyToken = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    requestProperty: "auth"
});

// API Routes
app.get('/getProblems', (req, res) => {
    Problem.find()
    .then((data) => {res.json(data)})
})

app.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, username: user.username });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

app.get("/questions", async (req, res) => {
    try {
      const questions = await Problem.find();
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  });
  app.post("/ask-question", verifyToken, async (req, res) => {
    try {
      const { topic, question } = req.body;
      const asker = req.auth.username; // coming from the decoded JWT
  
      const newProblem = new Problem({ topic, question, asker });
      await newProblem.save();
  
      res.json({ message: "Question posted successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  });

app.listen(3001, () => console.log("Server running on port 3001"));
