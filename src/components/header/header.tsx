import { Button } from "@mui/material";
import "./header.scss";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { user } = useAuth();

  return (
    <header>
      <div className="header-container">
        <div className="header-container__title">HealthyPet</div>
        <div className="header-container__actions">
          {user && (
            <Button variant="contained" onClick={() => {}}>
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
