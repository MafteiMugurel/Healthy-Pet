import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Homepage from "./pages/homepage/homepage";
import AddAnimal from "./pages/add-animal/add-animal";
import Dashboard from "./pages/dashboard/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/add-animal" element={<AddAnimal />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
