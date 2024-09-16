import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { doSignInWithEmailAndPassword } from "../firebase/auth";
import { useAuth } from "../contexts/authContext/authContext";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from '@mui/material/Link';
interface LoginDetails {
  email: string;
  password: string;
}

export function Login() {
  const { userLoggedIn } = useAuth();

  const [loginDetails, setLoginDetails] = useState<LoginDetails>({
    email: "",
    password: "",
  });
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (userLoggedIn) {
      navigate("/movies");
    }
  }, [userLoggedIn, navigate]);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(
          loginDetails.email,
          loginDetails.password
        );
      } catch (error) {
        console.error("Login failed:", error);
      } finally {
        setIsSigningIn(false);
      }
    }
  };

  return (
    <form onSubmit={submitHandler} className="mt-40 flex flex-col">
      <TextField
        id="email-login"
        label="Email"
        type="email"
        name="email"
        autoComplete="current-password"
        variant="standard"
        value={loginDetails.email}
        onChange={changeHandler}
        required
        color="secondary"
      />
      <TextField
        id="password-login"
        label="Password"
        type="password"
        name="password"
        autoComplete="current-password"
        variant="standard"
        color="secondary"
        value={loginDetails.password}
        onChange={changeHandler}
        required
      />
      <Button type="submit" disabled={isSigningIn}>
        {isSigningIn ? "Signing In..." : "Login"}
      </Button>
      <Link href="/register">New Account</Link>
    </form>
  );
}
