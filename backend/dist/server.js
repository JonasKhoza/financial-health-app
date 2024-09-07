"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv = __importStar(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
// // Query using a connection from the pool
// const getUsers = async () => {
//   const client = await pool.connect(); // Borrow a connection
//   try {
//     const res = await client.query('SELECT * FROM users');
//     return res.rows;
//   } finally {
//     client.release(); // Return the connection to the pool
//   }
// };
// getUsers().then(console.log).catch(console.error);
//Routes imports
const quiz_routes_1 = __importDefault(require("./routes/quiz.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
dotenv.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:3000", //Specifies which origin is allowed. "*" means any
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    methods: ["GET", "POST", "PUT", "DELETE"], // Specifies the allowed HTTP methods, "*" for all
    allowedHeaders: ["Content-Type", "Authorization"], // Specify the allowed headers
}));
app.use((0, cookie_parser_1.default)()); //allows to easily parse and manipulate HTTP cookies in your Express application.
app.disable("x-powered-by"); //makes it more difficult for users to see that I am using Express
express_1.default.urlencoded({
    extended: true,
}); /*to parse the URL-encoded form data sent in the request.
When extended is set to true, the values can be of any type,
allowing for complex objects and arrays to be encoded in the URL-encoded format*/
app.use(express_1.default.json()); //to parse incoming requests with JSON payloads.
//Routes registration
app.use("/quiz", quiz_routes_1.default);
app.use("/users", user_routes_1.default);
const config = {
    port: process.env.PORT || 8000,
};
app.listen(config.port, () => console.log("Successfully connected on port 8000"));
