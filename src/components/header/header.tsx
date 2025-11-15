import { Button } from "@mui/material";
import "./header.scss";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const auth = useAuth();
  if (!auth) return null;
  const { user } = auth;

  return (
    <header>
      <div className="header-container">
        <div className="header-container__title">HealthyPet</div>
        <div className="header-container__actions">
          {user && (
            <Button
              variant="contained"
              onClick={() => {
                (auth as any).logout?.();
              }}
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
