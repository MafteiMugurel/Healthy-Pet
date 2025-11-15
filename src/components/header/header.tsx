import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import "./header.scss";
import { useAuth } from "../../context/AuthContext";
const Header = () => {
  const { isLoggedIn: authIsLoggedIn } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(authIsLoggedIn);

  useEffect(() => {
    setIsLoggedIn(authIsLoggedIn);
  }, [authIsLoggedIn]);

  return (
    <header>
      <div className="header-container">
        <div className="header-container__title">HealthyPet</div>
        <div className="header-container__actions">
          {isLoggedIn && <Button variant="contained">Logout</Button>}
        </div>
      </div>
    </header>
  );
};

export default Header;
