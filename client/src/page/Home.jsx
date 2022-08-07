import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { userContext } from "../contexts/useContext";
import WorkoutDetails from "../components/workoutDetails";
import "./home.css";
import Form from "../components/Form";

let Home = () => {
  let { state, dispatch } = useContext(userContext);
  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.get("http://localhost:8000/workouts");
      dispatch({ type: "RECIEVED", payload: response.data });
    };
    fetchData();
  }, []);
  return (
    <div>
      <Form />
      <div className="homeContainer">
        <div className="main">
          {state.data?.map((workout) => {
            return <WorkoutDetails key={workout._id} workout={workout} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
