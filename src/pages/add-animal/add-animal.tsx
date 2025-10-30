import { Button } from "@mui/material";
import "./add-animal.scss";

import turtleIcon from "../../assets/turtle.svg";
import catIcon from "../../assets/cat.svg";
import dogIcon from "../../assets/dog.svg";
import rabbitIcon from "../../assets/rabbit.svg";
import reptileIcon from "../../assets/reptile.svg";
import birdIcon from "../../assets/bird.svg";
import otherIcon from "../../assets/other.svg";

const AddAnimal = () => {
  return (
    <div className="add-animal-container">
      <div className="Add-Animal-Container__title">Add new animal</div>
      <div className="Add-Animal-Container__description">
        What type of animal it is? Select one of the options
      </div>
      <div className="Add-Animal-Container__animal-select">
        <div className="container">
          <div className="radio-tile-group">
            <div className="input-container">
              <input
                id="cat"
                className="radio-button"
                type="radio"
                name="radio"
              />
              <div className="radio-tile">
                <div className="icon cat-Icon">
                  <img src={catIcon} alt="cat icon" />
                </div>
                <label className="radio-tile-label">Cat</label>
              </div>
            </div>

            <div className="input-container">
              <input
                id="dog"
                className="radio-button"
                type="radio"
                name="radio"
              />
              <div className="radio-tile">
                <div className="icon dog-Icon">
                  <img src={dogIcon} alt="dog icon" />
                </div>
                <label className="radio-tile-label">Dog</label>
              </div>
            </div>

            <div className="input-container">
              <input
                id="bird"
                className="radio-button"
                type="radio"
                name="radio"
              />
              <div className="radio-tile">
                <div className="icon bird-Icon">
                  <img src={birdIcon} alt="bird icon" />
                </div>
                <label className="radio-tile-label">Bird</label>
              </div>
            </div>

            <div className="input-container">
              <input
                id="rabbit"
                className="radio-button"
                type="radio"
                name="radio"
              />
              <div className="radio-tile">
                <div className="icon rabbit-Icon">
                  <img src={rabbitIcon} alt="rabbit icon" />
                </div>
                <label className="radio-tile-label">Rabbit</label>
              </div>
            </div>
            <div className="input-container">
              <input
                id="reptile"
                className="radio-button"
                type="radio"
                name="radio"
              />
              <div className="radio-tile">
                <div className="icon reptile-Icon">
                  <img src={reptileIcon} alt="reptile icon" />
                </div>
                <label className="radio-tile-label">Reptile</label>
              </div>
            </div>
            <div className="input-container">
              <input
                id="rabbit"
                className="radio-button"
                type="radio"
                name="radio"
              />
              <div className="radio-tile">
                <div className="icon turtle-Icon">
                  <img src={turtleIcon} alt="turtle icon" />
                </div>
                <label className="radio-tile-label">Turtle</label>
              </div>
            </div>
            <div className="input-container">
              <input
                id="rabbit"
                className="radio-button"
                type="radio"
                name="radio"
              />
              <div className="radio-tile">
                <div className="icon other-Icon">
                  <img src={otherIcon} alt="other icon" />
                </div>
                <label className="radio-tile-label">Other</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <form className="Add-Animal-Container__animal-form"></form>
      <div className="Add-Animal-Container__buttons">
        <Button>ADD MEDICAL RECORDS</Button>
        <Button>SAVE AND EXIT</Button>
      </div>
    </div>
  );
};

export default AddAnimal;
