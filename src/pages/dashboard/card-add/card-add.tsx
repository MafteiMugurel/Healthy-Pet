import { Button } from "@mui/material";
import plusIcon from "../../../assets/plus.svg";
import "./card-add.scss";
const CardAdd = () => {
  return (
    <div className="card-add-container">
      <div className="card-add-container__header">
        <img
          src={plusIcon}
          alt="PlusIcon"
          className="card-add-container__header__image"
        />
      </div>

      <div className="card-add-container__actions">
        <Button variant="contained" color="success">
          Add new pet
        </Button>
      </div>
    </div>
  );
};

export default CardAdd;
