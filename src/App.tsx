import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Homepage from "./pages/homepage/homepage";
import AddAnimal from "./pages/add-animal/add-animal";
import Dashboard from "./pages/dashboard/dashboard";
import Header from "./components/header/header";
import AddMedical from "./pages/add-medical/add-medical";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ViewAnimal from "./pages/view-animal/view-animal";

function App() {
  return (
    <div>
      <AuthProvider>
        <Header />
        <div className="container">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Homepage />}></Route>
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/add-animal"
                element={
                  <ProtectedRoute>
                    <AddAnimal />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/add-medical/:animalId"
                element={
                  <ProtectedRoute>
                    <AddMedical />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/view-animal/:animalId"
                element={
                  <ProtectedRoute>
                    <ViewAnimal />
                  </ProtectedRoute>
                }
              ></Route>
            </Routes>
          </BrowserRouter>
        </div>
      </AuthProvider>
    </div>
  );
}

export default App;
