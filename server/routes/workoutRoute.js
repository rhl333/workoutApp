const express = require("express");
const { createWorkout, getAllWorkouts, getSingleWorkout, deleteWorkout, updateWorkout } = require("../controllers/workoutController");

const router = express.Router();

// get all the workouts
router.get("/", getAllWorkouts);

// create new workout
router.post("/", createWorkout);

// get a single workout
router.get("/:id", getSingleWorkout);

// delete a workout
router.delete("/:id", deleteWorkout);

// update workout
router.patch("/:id", updateWorkout);

module.exports = router;
