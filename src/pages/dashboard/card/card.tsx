import { Button } from "@mui/material";
import "./card.scss";
import SVGIcon from "../../../components/svg-icon/svg-icon";
import { Animal } from "../../../interfaces/animal.model";

const Card = ({ data }: { data: Animal }) => {
  const calculateAge = (dateOfBirth: string) => {
    const birthDate = new Date(dateOfBirth);
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

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // TODO
  const reminderColor = data.reminders.length > 0 ? "red" : "green";

  return (
    <div className="card-container">
      <div className="card-container__header">
        <div
          style={{
            backgroundImage: `url(${data.imageUrl})`,
          }}
          className="card-container__header__image"
        />
        {data.name}
      </div>

      <div className="card-container__info">
        <div className="card-container__info__item">
          <SVGIcon type="cake" />
          {calculateAge(data.dateOfBirth)} years
        </div>
        <div className="card-container__info__item">
          <SVGIcon type="calendar" />
          {formatDate(data.lastVetVisit)}
        </div>
        <div className="card-container__info__item">
          <SVGIcon type="bell" />
          <span className={`${reminderColor}`}>
            {data.reminders.length} reminders
          </span>
        </div>
      </div>

      <div className="card-container__actions">
        <Button variant="contained">View</Button>
        <Button variant="contained" color="success">
          Add data
        </Button>
      </div>
    </div>
  );
};

export default Card;
