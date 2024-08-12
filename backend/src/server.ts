import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";

//Routes imports
import quizRouter from "./routes/quiz.routes";
import userRoutes from "./routes/user.routes";

dotenv.config();

const app = express();

app.use(cookieParser()); //allows to easily parse and manipulate HTTP cookies in your Express application.
app.disable("x-powered-by"); //makes it more difficult for users to see that I am using Express

express.urlencoded({
  extended: true,
}); /*to parse the URL-encoded form data sent in the request.
When extended is set to true, the values can be of any type, 
allowing for complex objects and arrays to be encoded in the URL-encoded format*/

app.use(express.json()); //to parse incoming requests with JSON payloads.

//Routes
app.use("/quiz", quizRouter);
app.use("/users", userRoutes);

const config = {
  port: process.env.PORT || 8000,
};

app.listen(config.port, () =>
  console.log("Successfully connected on port 8000")
);
