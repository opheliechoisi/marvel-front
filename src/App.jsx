import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router";

// IMPORTS PAGES
import Header from "./pages/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Comics from "./pages/Comics";
import CharacterComics from "./pages/CharacterComics";
import Characters from "./pages/Characters";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/comics/:characterId" element={<CharacterComics />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
}

export default App;
