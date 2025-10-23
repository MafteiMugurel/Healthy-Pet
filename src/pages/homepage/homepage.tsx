import "./homepage.scss";
import imageRight from "./../../assets/Homepage.png";

const Homepage = () => {
  return (
    <div className="homepage-container">
      <div>
        <div>
          <div>Welcome to</div>
          <div>HealthyPet</div>
          <div>Your safe place which helps you help the others.</div>
        </div>
        <div>
          <button>Login</button>
          into your account, or
          <button>Register</button>
        </div>
      </div>
      <div>
        <img src={imageRight} />
      </div>
    </div>
  );
};

export default Homepage;
