import { useContext } from "react";
import "./form.css";
import { useFormik } from "formik";
import axios from "axios";
import { userContext } from "../contexts/useContext";
let Form = () => {
  let { dispatch } = useContext(userContext);
  const formik = useFormik({
    initialValues: {
      title: "",
      reps: "",
      load: "",
    },
    validate: (currState) => {
      let errors = {};
      if (!currState.title) errors.title = "Title field is required";
      if (!currState.reps) errors.reps = "Reps field is required";
      if (!currState.load) errors.load = "Load field is required";
      return errors;
    },
    onSubmit: async (currState) => {
      try {
        let data = await axios.post("http://localhost:8000/workouts", { title: currState.title, reps: currState.reps, load: currState.load });
        dispatch({ type: "CREATED", payload: [data.data] });
        currState.title = "";
        currState.reps = "";
        currState.load = "";
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div className="formContainer">
      <div className="mainForm">
        <h2>Enter New Workout Here</h2>
        <form action="" onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="title">Title</label>
            <input name="title" type="text" value={formik.values.title} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            <p>{formik.errors.title && formik.touched.title ? formik.errors.title : ""}</p>
          </div>

          <div>
            <label htmlFor="reps">Reps</label>
            <input name="reps" type="number" value={formik.values.reps} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            <p>{formik.errors.reps && formik.touched.reps ? formik.errors.reps : ""}</p>
          </div>

          <div>
            <label htmlFor="title">Load</label>
            <input name="load" type="number" value={formik.values.load} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            <p>{formik.errors.load && formik.touched.load ? formik.errors.load : ""}</p>
          </div>
          <div className="btn">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
