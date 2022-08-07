import { Link } from "react-router-dom";
import "./navbar.css";
const Navbar = () => {
  return (
    <div>
      <div className="navContainer">
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
