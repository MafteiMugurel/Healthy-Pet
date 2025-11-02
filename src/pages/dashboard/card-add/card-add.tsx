import { Link } from "react-router-dom";
import SVGIcon from "../../../components/svg-icon/svg-icon";
import "./card-add.scss";

const CardAdd = () => {
  return (
    <Link to="/add-animal" className="custom-link">
      <div className="card-add-container">
        <div className="card-add-container__header">
          <div className="card-add-container__header__image">
            <SVGIcon type="plus" />
          </div>
          Add new animal
        </div>
      </div>
    </Link>
  );
};

export default CardAdd;
