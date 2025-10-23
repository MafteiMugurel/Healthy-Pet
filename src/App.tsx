import "./App.scss";
//import Button from "@mui/material/Button";
import Homepage from "./pages/homepage/homepage";
import Dashboard from "./pages/dashboard/dashboard";
import Addanimal from "./pages/addanimal/addanimal";

function App() {
  return (
    <div className="App">
      <Homepage />
      <Dashboard />
      <Addanimal /> 
    </div>
  );
}

export default App;
