import { Button } from "@mui/material";
import "./header.scss";

const Header = () => {
  return (
    <header>
      <div className="header-container">
        <div className="header-container__title">HealthyPet</div>
        <div className="header-container__actions">
          <Button variant="contained">Logout</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
