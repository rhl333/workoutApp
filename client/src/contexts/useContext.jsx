import { useReducer, createContext } from "react";

let initialState = { data: [] };

let reducerFunction = (state = initialState, action) => {
  switch (action.type) {
    case "CREATED":
      return { ...state, data: action.payload.concat(state.data) };
    case "DELETED":
      return { ...state, data: state.data.filter((workout) => workout._id !== action.payload._id) };
    case "RECIEVED":
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

let userContext = createContext();

let UserProvider = ({ children }) => {
  let [state, dispatch] = useReducer(reducerFunction, initialState);

  return <userContext.Provider value={{ state: state, dispatch: dispatch }}>{children}</userContext.Provider>;
};

export { userContext, UserProvider };
