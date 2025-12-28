const express = require("express");
const app = express();
const PORT = 8080;
const ticketRoute = require("./route/ticket");
const authRoute = require("./route/auth");
const userRoute = require("./route/user");
const path = require("path");
const connectDB = require("./config/db");

const cors = require('cors');

app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175',
      process.env.FRONTEND_URL 
    ].filter(Boolean); // Remove undefined if env var is missing

    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));


connectDB(); 

app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "Static")));

// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, PATCH, OPTIONS"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.setHeader("Access-Control-Allow-Credentials", true);

//   // Handle preflight OPTIONS requests
//   if (req.method === "OPTIONS") res.sendStatus(200);
//   else next();
// });

app.get("/", (req, res) => {
  res.status(200);
  res.send("Welcome to root URL of server");
  res.end();
});

app.use("/ticket", ticketRoute);
app.use("/auth", authRoute);
app.use("/user", userRoute);

app.listen(PORT, (error) => {
  console.log(error ? "Something went wrong" : `Server is running at ${PORT} `);
});
