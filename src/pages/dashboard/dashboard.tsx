import "./dashboard.scss";
import Card from "./card/card";
import CardAdd from "./card-add/card-add";
import { animalsMock } from "./mock";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const { userData } = useAuth();

  return (
    <div className="dashboard-container">
      <div className="dashboard-container__salutation">
        Welcome back, <b>{userData?.name}</b>. Here are your pets' health
        summaries:
      </div>
      <div className="dashboard-container__cards">
        {animalsMock.map((animal) => (
          <Card data={animal} />
        ))}
        <CardAdd />
      </div>
    </div>
  );
};

export default Dashboard;
