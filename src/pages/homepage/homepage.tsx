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
import { logIn, signUp } from "../../services/firebaseService";

const Homepage = () => {
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState("none");
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/", { replace: true });
    }
  }, [user, loading, navigate]);

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
      console.log("Registering user:", values);
      if (values.password !== values.repeatPassword) {
        alert("Passwords do not match!");
        return;
      }
      signUp(
        values.email as string,
        values.password as string,
        values.name as string
      )
        .then((response) => {
          console.log("Registration successful:", response);
          navigate("/dashboard", { replace: true });
          handleClose();
        })
        .catch((error) => {
          alert("Registration failed: " + error.message);
          return;
        });
    } else {
      console.log("Logging in user:", values);
      logIn(values.email as string, values.password as string)
        .then((response) => {
          console.log("Login successful:", response);
          navigate("/dashboard", { replace: true });
          handleClose();
        })
        .catch((error) => {
          alert("Login failed: " + error.message);
          return;
        });
    }
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
