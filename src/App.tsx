import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Movie from "./components/Movie";
import Homepage from "./components/Homepage";
import Favorites from "./components/Favorites";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/my-favorites" element={<Favorites />} />
        <Route path="*" element={<>Error!</>} />
      </Routes>
    </>
  );
}

export default App;
