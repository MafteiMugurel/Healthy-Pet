import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Homepage from "./pages/homepage/homepage";
import AddAnimal from "./pages/add-animal/add-animal";
import Dashboard from "./pages/dashboard/dashboard";
import Header from "./components/header/header";
import AddMedical from "./pages/add-medical/add-medical";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <div>
      <AuthProvider>
        <Header />
        <div className="container">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Homepage />}></Route>
              <Route path="/dashboard" element={<Dashboard />}></Route>
              <Route path="/add-animal" element={<AddAnimal />}></Route>
              <Route path="/add-medical" element={<AddMedical />}></Route>
            </Routes>
          </BrowserRouter>
        </div>
      </AuthProvider>
    </div>
  );
}

export default App;
