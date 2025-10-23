import "./homepage.scss";
import imageRight from "./../../assets/Homepage.png";
import { Button } from "@mui/material";

const Homepage = () => {
  return (
    <div className="homepage-container">
      <div className="homepage-container__left">
        <div className="homepage-container__left__welcome">Welcome to</div>
        <div className="homepage-container__left__title">HealthyPet</div>
        <div>Your safe place which helps you help the others.</div>
        <div className="homepage-container__left__actions">
          <Button variant="contained">LOGIN</Button>
          &nbsp;&nbsp;into your account, or&nbsp;&nbsp;
          <Button variant="contained" color="success">
            register
          </Button>
        </div>
      </div>
      <div className="homepage-container__right">
        <img src={imageRight} alt="" />
      </div>
    </div>
  );
};

export default Homepage;
