import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/authContext/authContext";
import { doSignOut } from "../firebase/auth";
import { Button } from "@mui/material";

export function Header() {
  const { userLoggedIn } = useAuth();

  const link = "text-violet hover:text-violet-500 transition delay-100";
  const activLink = `${link} text-violet-500 underline`;

  const linkStyle = ({ isActive }: { isActive: boolean }) =>
    isActive ? activLink : link;

  return (
    <header className="p-5 max-w-7xl">
      <nav>
        <ul className="p-2 bg-slate-600 rounded-lg text-xl flex gap-5 justify-center items-center">
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
