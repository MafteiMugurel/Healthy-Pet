import "./dashboard.scss";
import Card from "./card/card";
import CardAdd from "./card-add/card-add";
import { useAuth } from "../../context/AuthContext";
import { fetchAnimals } from "../../services/firebaseService";
import { useEffect, useState } from "react";
import { Animal } from "../../interfaces/animal.model";

const Dashboard = () => {
  const { userData } = useAuth();
  const [animals, setAnimals] = useState<Animal[]>([]);

  useEffect(() => {
    const loadProfile = async () => {
      if (userData?.uid) {
        const data = await fetchAnimals(userData.uid);
        console.log(data);
        setAnimals(data);
      }
    };

    loadProfile();
  }, [userData]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-container__salutation">
        Welcome back, <b>{userData?.name}</b>. Here are your pets' health
        summaries:
      </div>
      <div className="dashboard-container__cards">
        {animals.map((animal) => (
          <Card data={animal} />
        ))}
        <CardAdd />
      </div>
    </div>
  );
};

export default Dashboard;
