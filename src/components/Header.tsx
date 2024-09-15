import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/authContext/authContext";
import { doSignOut } from "../firebase/auth";
import { Button } from "@mui/material";

export function Header() {
  const { userLoggedIn } = useAuth();

  const ulStyle = "text-xl flex gap-5 justify-center items-center";

  const link = "text-black hover:text-violet-300 delay-100";
  const activLink = `${link} text-violet-500`;

  const linkStyle = ({ isActive }: { isActive: boolean }) =>
    isActive ? activLink : link;

  return (
    <header>
      <nav>
        <ul className={ulStyle}>
          <li>
            <NavLink className={linkStyle} to="/">
              Home
            </NavLink>
          </li>
          {userLoggedIn ? (
            <>
              <li>
                <NavLink className={linkStyle} to="/movies">
                  Movies
                </NavLink>
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
                <NavLink className={linkStyle} to="/login">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink className={linkStyle} to="/register">
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
