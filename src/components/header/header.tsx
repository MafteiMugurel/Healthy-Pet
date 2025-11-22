import { Button } from "@mui/material";
import "./header.scss";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();

  const redirectToDashboard = () => {
    window.location.href = "/dashboard";
  };

  return (
    <header>
      <div className="header-container">
        <div className="header-container__title" onClick={redirectToDashboard}>
          HealthyPet
        </div>
        <div className="header-container__actions">
          {user && (
            <Button variant="contained" onClick={logout}>
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
