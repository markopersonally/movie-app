import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header";
import { Movies } from "./pages/Movies";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { AuthProvider } from "./contexts/authContext/authContext";

export default function App() {
  return (
    <>
      <AuthProvider>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<p>register</p>} />
          <Route path="/movies" element={<Movies />} />
        </Routes>
      </AuthProvider>
    </>
  );
}
