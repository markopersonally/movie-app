import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { doCreateUserWithEmailAndPassword } from "../firebase/auth";
import { useAuth } from "../contexts/authContext/authContext";
import { useNavigate } from "react-router-dom";

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
        console.error("Register failed:", error);
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
          value={registerDetails.email}
          onChange={changeHandler}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={registerDetails.password}
          onChange={changeHandler}
          required
        />
      </label>
      <button type="submit" disabled={isSigningIn}>
        {isSigningIn ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
