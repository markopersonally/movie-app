import { Route, Routes } from "react-router-dom";

import { Header } from "./components/Header";

import { Home } from "./pages/Home";
import { Movies } from "./pages/Movies";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

import { AuthProvider } from "./contexts/authContext/authContext";

import "./App.css";

export default function App() {
  return (
    <>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/movies" element={<Movies />} />
        </Routes>
      </AuthProvider>
    </>
  );
}
