import "./homepage.scss";
import imageRight from "./../../assets/Homepage.png";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO
    const checkAuth = async () => {
      try {
        // const response = await fetch("/api/auth/status");
        const response = { ok: true }; // Mocked response

        if (!response.ok) throw new Error("Not authenticated");
        // const data = await response.json();
        const data = { loggedIn: true };

        if (data.loggedIn) {
          navigate("/dashboard", { replace: true });
        }
      } catch {
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

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
