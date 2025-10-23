import plusIcon from "../../../assets/plus.svg";
import syringeIcon from "../../../assets/syringe.svg";
import cakeIcon from "../../../assets/cake.svg";
import calendarIcon from "../../../assets/calendar.svg";
import "./card.scss";
const Card = () => {
  return (
    <div className="card-container">
      <div className="card-container-header">
        <img
          src={plusIcon}
          alt="PlusIcon"
          className="card-container-header-image"
        />
        <p>Name your pet</p>
      </div>

      <div className="card-container-info">
        <div className="card-container-info-item">
          <img src={cakeIcon} alt="CakeIcon" />
          <p>How old</p>
        </div>
        <div className="card-container-info-item">
          <img src={calendarIcon} alt="CalendarIcon" />
          <p>Calendar</p>
        </div>
        <div className="card-container-info-item">
          <img src={syringeIcon} alt="SyringeIcon" />
          <p>Vaccine</p>
        </div>
      </div>

      <div className="card-container-actions">
        <button>View</button>
        <button>Add Record</button>
      </div>
    </div>
  );
};

export default Card;
