import { Button } from "@mui/material";
import "./add-animal.scss";
import TurtleIcon from "../../assets/Turtle.png";

const AddAnimal = () => {
  return (
    <div className="Add-Animal-Container">
      <div className="Add-Animal-Container__title">HealthyPet</div>
      <div className="Add-Animal-Container__subtitle">Add new animal form</div>
      <div className="Add-Animal-Container__description">
        What type of animal it is? Select one of the options
      </div>
      <div className="Add-Animal-Container__animal-select">
        <div>
          <Button variant="contained">
            <img src="./../../assets/cat.png" alt="cat" />
          </Button>
        </div>
        <div>
          <Button variant="contained">
            <img src={TurtleIcon} alt="dog" />
          </Button>
        </div>
        <div>
          <Button variant="contained">
            <img src="./../../assets/bird.png" alt="bird" />
          </Button>
        </div>
        <div>
          <Button variant="contained">
            <img src="./../../assets/rabbit.png" alt="rabbit" />
          </Button>
        </div>
        <div>
          <Button variant="contained">
            <img src="./../../assets/Reptile.png" alt="reptile" />
          </Button>
        </div>
        <div>
          <Button variant="contained">
            <img src="../../assets/Turtle.png" alt="turtle" />
          </Button>
        </div>
        <div>
          <Button variant="contained">
            <img src="" alt="other" />
          </Button>
        </div>
      </div>
      <form className="Add-Animal-Container__animal-form">
        <div>
          <label>Animal name *</label>
          <input type="text" required></input>
        </div>
        <div>
          <label>Breed*</label>
          <input type="text" required></input>
        </div>
        <div>
          <label>Specie</label>
          <input type="text"></input>
        </div>
        <div>
          <label>Birth date*</label>
          <input type="text" required></input>
        </div>
        <div>
          <label>Gender *</label>
          <select required>
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
        <div>
          <label>Weight *</label>
          <input type="text" required></input>
        </div>
        <div>
          <label>Coloring *</label>
          <input type="text" required></input>
        </div>
        <div>
          <label>Microchip / ID Number</label>
          <input type="text"></input>
        </div>
      </form>
      <div className="Add-Animal-Container__buttons">
        <Button>ADD MEDICAL RECORDS</Button>
        <Button>SAVE AND EXIT</Button>
      </div>
    </div>
  );
};

export default AddAnimal;
