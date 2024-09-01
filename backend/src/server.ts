import express from "express";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import cors from "cors";

//Routes imports
import quizRouter from "./routes/quiz.routes";
import userRoutes from "./routes/user.routes";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", //Specifies which origin is allowed. "*" means any
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    methods: ["GET", "POST", "PUT", "DELETE"], // Specifies the allowed HTTP methods, "*" for all
    allowedHeaders: ["Content-Type", "Authorization"], // Specify the allowed headers
  })
);

app.use(cookieParser()); //allows to easily parse and manipulate HTTP cookies in your Express application.
app.disable("x-powered-by"); //makes it more difficult for users to see that I am using Express

express.urlencoded({
  extended: true,
}); /*to parse the URL-encoded form data sent in the request.
When extended is set to true, the values can be of any type, 
allowing for complex objects and arrays to be encoded in the URL-encoded format*/

app.use(express.json()); //to parse incoming requests with JSON payloads.

//Routes registration
app.use("/quiz", quizRouter);
app.use("/users", userRoutes);

const config = {
  port: process.env.PORT || 8000,
};

app.listen(config.port, () =>
  console.log("Successfully connected on port 8000")
);
