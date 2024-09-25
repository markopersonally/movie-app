import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { doCreateUserWithEmailAndPassword } from "../firebase/auth";
import { useAuth } from "../contexts/authContext/authContext";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
interface RegisterDetails {
  email: string;
  password: string;
}

export function Register() {
  const { userLoggedIn } = useAuth();

  const [registerDetails, setRegisterDetails] = useState<RegisterDetails>({
    email: "",
    password: "",
  });
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (userLoggedIn) {
      navigate("/movies");
    }
  }, [userLoggedIn, navigate]);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doCreateUserWithEmailAndPassword(
          registerDetails.email,
          registerDetails.password
        );
      } catch (error) {
        setError(true);
        console.error("Register failed:", error);
      } finally {
        setIsSigningIn(false);
      }
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="mt-40 p-10 flex flex-col gap-2 border-2 bg-slate-300 rounded-xl"
    >
      <TextField
        id="email-register"
        label="Email"
        type="email"
        name="email"
        autoComplete="current-password"
        variant="standard"
        value={registerDetails.email}
        onChange={changeHandler}
        required
        color="secondary"
      />
      <TextField
        id="password-register"
        label="Password"
        type="password"
        name="password"
        autoComplete="current-password"
        variant="standard"
        color="secondary"
        value={registerDetails.password}
        onChange={changeHandler}
        required
      />
      <Button type="submit" disabled={isSigningIn}>
        {isSigningIn ? "Registering..." : "Register"}
      </Button>
      {error && (
        <p className="text-red-600 font-bold">Something went wrong...</p>
      )}
    </form>
  );
}
