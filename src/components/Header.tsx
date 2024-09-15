import { Link } from "react-router-dom";
import { useAuth } from "../contexts/authContext/authContext";
import { doSignOut } from "../firebase/auth";

export function Header() {
  const { userLoggedIn } = useAuth();

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {userLoggedIn ? (
            <>
              <li>
                <Link to="/movies">Movies</Link>
              </li>
              <li>
                <button onClick={doSignOut}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
