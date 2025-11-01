import "./dashboard.scss";
import Card from "./card/card";
import CardAdd from "./card-add/card-add";
import { animalsMock } from "./mock";
const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {animalsMock.map((animal) => (
        <Card data={animal} />
      ))}
      <CardAdd />
    </div>
  );
};

export default Dashboard;
