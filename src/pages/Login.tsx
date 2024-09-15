import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { doSignInWithEmailAndPassword } from "../firebase/auth";
import { useAuth } from "../contexts/authContext/authContext";
import { useNavigate } from "react-router-dom";

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
    <form onSubmit={submitHandler}>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={loginDetails.email}
          onChange={changeHandler}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={loginDetails.password}
          onChange={changeHandler}
          required
        />
      </label>
      <button type="submit" disabled={isSigningIn}>
        {isSigningIn ? "Signing In..." : "Login"}
      </button>
    </form>
  );
}
