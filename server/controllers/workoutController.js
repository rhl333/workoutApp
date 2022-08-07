const mongoose = require("mongoose");
const workoutSchema = require("../models/workout");

// create new workout
const createWorkout = async (req, res) => {
  try {
    const { title, reps, load } = req.body;
    const workout = new workoutSchema({
      title: title,
      load: load,
      reps: reps,
    });
    await workout.save();
    return res.status(200).json(workout);
  } catch (error) {
    console.log(error);
    res.status(400).json({ mag: error.message });
  }
};

// get all the workouts
const getAllWorkouts = async (req, res) => {
  try {
    let allWorkouts = await workoutSchema.find({}).sort({ createdAt: -1 });
    res.send(allWorkouts);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// get a single workout
const getSingleWorkout = async (req, res) => {
  const { id } = req.params;
  // checking if the provided id is a valid mongoose id or not
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ msg: "No such workout" });
  else {
    let data;
    if ((data = await workoutSchema.findById(id))) res.status(200).json(data);
    else res.json({ msg: "No such workout" });
  }
};

// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ msg: "No workout to delete" });

  try {
    let data = await workoutSchema.findByIdAndDelete(id);
    return res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ msg: "No workout to delete" });
  }
};

// update workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ msg: "No workout to update" });
  else {
    if (await workoutSchema.findById(id)) {
      let data = await workoutSchema.findByIdAndUpdate(id, { ...req.body });
      console.log(data);
      res.status(200).json({ msg: "updated successfully" });
    } else res.json({ msg: "No such workout" });
  }
};

module.exports = { createWorkout, getAllWorkouts, getSingleWorkout, deleteWorkout, updateWorkout };
