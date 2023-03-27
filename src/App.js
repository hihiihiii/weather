import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./style.css";
import Recommendations from "./Pages/Recommendations";
import Home from "./Pages/Home";
import Search from "./Pages/Search";
import Header from "./Components/Header";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/recommendations" element={<Recommendations />}></Route>
        <Route path="/search" element={<Search />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
