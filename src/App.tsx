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
        <div className="bg-[url('./images/main-background.jpg')] absolute top-0 left-0 w-full h-full blur z-[-5]"></div>
        <div className="p-10 bg-zinc-700 rounded-xl">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/movies" element={<Movies />} />
          </Routes>
        </div>
      </AuthProvider>
    </>
  );
}
