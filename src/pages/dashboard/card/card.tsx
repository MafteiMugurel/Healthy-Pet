import { Button } from "@mui/material";
import "./card.scss";
import SVGIcon from "../../../components/svg-icon/svg-icon";
import { Animal } from "../../../interfaces/animal.model";

const Card = ({ data }: { data: Animal }) => {
  const calculateAge = () => {
    const birthDate = new Date(data.dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const overdueRemindersCount = () => {
    return (
      data.reminders.filter((reminder) => {
        const reminderDate = new Date(reminder.date);
        const today = new Date();
        return reminderDate < today;
      }).length || 0
    );
  };

  const reminderColor = () => {
    if (data.reminders.length === 0) return "success";

    if (overdueRemindersCount() > 0) return "error";

    return "warning";
  };

  const redirectToAddMedical = (animalId: string) => {
    window.location.href = "/add-medical/" + animalId;
  };

  const redirectToViewAnimal = (animalId: string) => {
    window.location.href = "/view-animal/" + animalId;
  };

  return (
    <div className="card-container">
      <div className="card-container__header">
        <div
          style={{
            backgroundImage: `url(${data.imgURL})`,
          }}
          className="card-container__header__image"
        />
        {data.name}
      </div>

      <div className="card-container__info">
        <div className="card-container__info__item">
          <SVGIcon type="cake" />
          {calculateAge()} years
        </div>
        <div className="card-container__info__item">
          <SVGIcon type="calendar" />
          {data.latestVetVisit ? data.latestVetVisit : "No visits yet"}
        </div>
        <div className="card-container__info__item">
          <SVGIcon type="bell" />
          <span className={`${reminderColor()}`}>
            {Object.keys(data.reminders).length} reminders{" "}
            {overdueRemindersCount() > 0 &&
              `(${overdueRemindersCount()} overdue)`}
          </span>
        </div>
      </div>

      <div className="card-container__actions">
        <Button
          variant="contained"
          onClick={() => redirectToViewAnimal(data.id)}
        >
          View
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => redirectToAddMedical(data.id)}
        >
          Add data
        </Button>
      </div>
    </div>
  );
};

export default Card;
