import "./dashboard.scss";
import Card from "./card/card";
import CardAdd from "./card-add/card-add";
const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Card />
      <Card />
      <CardAdd />
    </div>
  );
};

export default Dashboard;
