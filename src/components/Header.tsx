import { Link } from "react-router-dom";
import { useAuth } from "../contexts/authContext/authContext";
import { doSignOut } from "../firebase/auth";
import { Button } from "@mui/material";

export function Header() {
  const { userLoggedIn } = useAuth();

  const ulStyle = "text-xl flex gap-5 justify-center items-center";

  return (
    <header>
      <nav>
        <ul className={ulStyle}>
          <li>
            <Link to="/">Home</Link>
          </li>
          {userLoggedIn ? (
            <>
              <li>
                <Link to="/movies">Movies</Link>
              </li>
              <li>
                <Button onClick={doSignOut} color="secondary">
                  Logout
                </Button>
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
