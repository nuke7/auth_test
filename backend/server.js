const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");

const app = express();

//Middlewares

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);

//! app.use(cors({ credentials: true }));

let token = "7a55204fb9d7076b6d73b3bc5d8ed2849d86a26e";

app.use(cors());

app.use(cookieParser("secretcode"));

//Server listen settings

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});

//Routes

app.post("/login", (req, res) => {
  console.log(req.body);
  if (req.body.username === "admin" && req.body.password === "Admin123") {
    res.json({ token: token });
    /* .redirect("http://localhost:5000/data"); */
  } else {
    res.status(401).json({ status: "Unathorized" });
  }
});

app.get("/data", (req, res) => {
  console.log(req.header("x-api-key"));
  if (req.header("x-api-key") === token) {
    res.json([
      { id: 1, text: "First" },
      { id: 2, text: "Second" },
      { id: 3, text: "Third" },
      { id: 4, text: "Fourth" },
    ]);
  } else {
    res.status(401).json({ status: "Unathorized" });
  }
});
