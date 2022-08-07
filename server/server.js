const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const workoutRouter = require("./routes/workoutRoute");

const server = express();

// some helpful middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cors());

// routes
server.use("/workouts", workoutRouter);

const port = process.env.port || 8000;

const start = async () => {
  await mongoose.connect("mongodb://127.0.0.1/tracker");
  server.listen(port, () => console.log(`server is listening on port ${port}`));
};

mongoose.connection.once("open", () => console.log("successfully connected to the database"));
mongoose.connection.on("error", (err) => console.log("some error occured", err));

start();
