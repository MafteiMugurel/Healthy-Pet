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
        const animalsArray: Animal[] = data
          ? Object.entries(data).map(([id, item]) => {
              const castItem = item as any;
              return {
                ...(castItem as Animal),
                id,
                reminders: castItem?.reminders
                  ? Object.values(castItem.reminders)
                  : [],
              };
            })
          : [];
        setAnimals(animalsArray);
      }
    };

    loadProfile();
  }, [userData]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-container__salutation">
        Welcome back, <b>{userData?.name}</b>! Here are the health summaries for
        your pets:
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
