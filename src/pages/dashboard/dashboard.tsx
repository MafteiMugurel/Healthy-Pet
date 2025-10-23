import "./dashboard.scss";
import plusIcon from "../../assets/plus.svg";
import syringeIcon from "../../assets/syringe.svg";
import cakeIcon from "../../assets/cake.svg";
import calendarIcon from "../../assets/calendar.svg";

const Dashboard = () => {
  return (
    <div>
      <div>
        <img src={plusIcon} alt="PlusIcon" />
        <p>Name your pet</p>
      </div>

      <div>
        <img src={cakeIcon} alt="CakeIcon" />
        <p>How old</p>
        <img src={calendarIcon} alt="CalendarIcon" />
        <p>Calendar</p>
        <img src={syringeIcon} alt="SyringeIcon" />
        <p>Vaccine</p>
      </div>

      <div>
        <button>View</button>
        <button>Add Record</button>
      </div>
    </div>
  );
};

export default Dashboard;
