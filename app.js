//zmienne środowiskowe
require('dotenv').config()


// importuje expressa
const express = require("express")

// tworzę instancję expressa
const app = express()

const cors = require("cors");

app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
}));

//połączenie z bazą danych
const mongoose = require("mongoose")
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.x2m5o.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`)

//logger
const morgan = require("morgan")
app.use(morgan("dev"))

//parsowanie body
const bodyParser = require("body-parser")
app.use(bodyParser.json()) //od tej pory req.body ma informacje z części body

// importuje routy
const classesRoutes = require("./api/router/classes");
const reviewsRoutes = require("./api/router/reviews");
const schoolsRoutes = require("./api/router/schools");
const trainersRoutes = require("./api/router/trainers");
const usersRoutes = require("./api/router/users");

// stosuje te routy
app.use("/classes", classesRoutes);
app.use("/reviews", reviewsRoutes);
app.use("/schools", schoolsRoutes);
app.use("/trainers", trainersRoutes);
app.use("/users", usersRoutes);

//błąd routu
app.use((req, res, next) => {
    res.status(404).json({wiadomość: "Not found"})
})

app.get("/classes", (req, res) => {
    res.status(200).json({ message: "Trasa działa poprawnie!" });
  });

  app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        res.setHeader('Allow', 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD');
        return res.status(204).send();
    }
    next();
});

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

mongoose.connection.on("connected", () => {
    console.log("Połączono z MongoDB");
  });
  
  mongoose.connection.on("error", (err) => {
    console.error("Błąd połączenia z MongoDB:", err);
  });

module.exports = app


