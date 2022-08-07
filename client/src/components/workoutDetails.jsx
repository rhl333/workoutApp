import axios from "axios";
import { useContext } from "react";
import { userContext } from "../contexts/useContext";

const WorkoutDetails = ({ workout }) => {
  let { dispatch } = useContext(userContext);

  const handleClick = async () => {
    let response = await axios.delete(`http://localhost:8000/workouts//${workout._id}`);
    dispatch({ type: "DELETED", payload: response.data });
  };

  return (
    <div className="workoutDetailsContainer">
      <div className="workoutDetails">
        <h3>{workout.title}</h3>
        <p>
          <strong>Load : </strong> {workout.load}
        </p>
        <p>
          <strong>Reps : </strong> {workout.reps}
        </p>
        <p className="createdAt">Created At : {workout.createdAt}</p>
      </div>
      <div>
        <button className="delete" onClick={handleClick}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default WorkoutDetails;
