import "./homepage.scss";
import imageRight from "./../../assets/Homepage.png";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Homepage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState("none");
  const { setIsLoggedIn } = useAuth();

  useEffect(() => {
    // TODO
    const checkAuth = async () => {
      try {
        // const response = await fetch("/api/auth/status");
        const response = { ok: false }; // Mocked response

        if (!response.ok) throw new Error("Not authenticated");
        // const data = await response.json();
        const data = { loggedIn: false };

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

  const openLoginDialog = () => {
    setDialogOpen("login");
  };

  const openRegisterDialog = () => {
    setDialogOpen("register");
  };

  const handleClose = () => {
    setDialogOpen("none");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(data.entries());
    console.log(values);

    if (dialogOpen === "register") {
      // Registration logic here
      console.log("Registering user:", values);
      if (values.password !== values.repeatPassword) {
        alert("Passwords do not match!");
        return;
      }
    } else {
      // Login logic here
      console.log("Logging in user:", values);
    }

    setIsLoggedIn(true);
    navigate("/dashboard", { replace: true });
    handleClose();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="homepage-container">
        <div className="homepage-container__left">
          <div className="homepage-container__left__welcome">Welcome to</div>
          <div className="homepage-container__left__title">HealthyPet</div>
          <div>Your safe place which helps you help the others.</div>
          <div className="homepage-container__left__actions">
            <Button variant="contained" onClick={openLoginDialog}>
              LOGIN
            </Button>
            &nbsp;&nbsp;into your account, or&nbsp;&nbsp;
            <Button
              variant="contained"
              color="success"
              onClick={openRegisterDialog}
            >
              register
            </Button>
          </div>
        </div>
        <div className="homepage-container__right">
          <img src={imageRight} alt="" />
        </div>
      </div>

      <Dialog open={dialogOpen === "login"} onClose={handleClose}>
        <DialogTitle>Login into your account</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} id="subscription-form">
            <TextField
              required
              name="email"
              label="Email"
              type="email"
              fullWidth
              size="small"
            />
            <TextField
              required
              name="password"
              label="Password"
              type="password"
              fullWidth
              size="small"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button type="submit" form="subscription-form" variant="contained">
            Login
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={dialogOpen === "register"} onClose={handleClose}>
        <DialogTitle>Register new account</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} id="subscription-form">
            <TextField
              required
              name="name"
              label="Your name"
              type="text"
              fullWidth
              size="small"
            />
            <TextField
              required
              name="email"
              label="Email"
              type="email"
              fullWidth
              size="small"
            />
            <TextField
              required
              name="password"
              label="Password"
              type="password"
              fullWidth
              size="small"
            />
            <TextField
              required
              name="repeatPassword"
              label="Repeat password"
              type="password"
              fullWidth
              size="small"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button type="submit" form="subscription-form" variant="contained">
            Register
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Homepage;
