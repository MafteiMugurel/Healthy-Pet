import { Button } from "@mui/material";
import plusIcon from "../../../assets/plus.svg";
import syringeIcon from "../../../assets/syringe.svg";
import cakeIcon from "../../../assets/cake.svg";
import calendarIcon from "../../../assets/calendar.svg";
import "./card.scss";
const Card = () => {
  return (
    <div className="card-container">
      <div className="card-container__header">
        <img
          src={plusIcon}
          alt="PlusIcon"
          className="card-container__header__image"
        />
        <p>Name your pet</p>
      </div>

      <div className="card-container__info">
        <div className="card-container__info__item">
          <img src={cakeIcon} alt="CakeIcon" />
          How old is your pet?
        </div>
        <div className="card-container__info__item">
          <img src={calendarIcon} alt="CalendarIcon" />
          Calendar
        </div>
        <div className="card-container__info__item">
          <img src={syringeIcon} alt="SyringeIcon" />
          Vaccines
        </div>
      </div>

      <div className="card-container__actions">
        <Button variant="contained">View</Button>
        <Button variant="contained" color="success">
          Add Record
        </Button>
      </div>
    </div>
  );
};

export default Card;
