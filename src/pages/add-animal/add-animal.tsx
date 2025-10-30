import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import "./add-animal.scss";

import turtleIcon from "../../assets/turtle.svg";
import catIcon from "../../assets/cat.svg";
import dogIcon from "../../assets/dog.svg";
import rabbitIcon from "../../assets/rabbit.svg";
import reptileIcon from "../../assets/reptile.svg";
import birdIcon from "../../assets/bird.svg";
import otherIcon from "../../assets/other.svg";
import { useState } from "react";

const AddAnimal = () => {
  let gender;
  const animalTypes = [
    { id: "cat", label: "Cat", icon: catIcon },
    { id: "dog", label: "Dog", icon: dogIcon },
    { id: "bird", label: "Bird", icon: birdIcon },
    { id: "rabbit", label: "Rabbit", icon: rabbitIcon },
    { id: "reptile", label: "Reptile", icon: reptileIcon },
    { id: "turtle", label: "Turtle", icon: turtleIcon },
    { id: "other", label: "Other", icon: otherIcon },
  ];
  const [selectedAnimal, setSelectedAnimal] = useState({} as any);

  return (
    <div className="add-animal-container">
      <div className="add-animal-container__title">Add new animal</div>
      <div className="add-animal-container__description">
        What type of animal it is? Select one of the options
      </div>
      <div className="add-animal-container__animal-select">
        {animalTypes.map((animal) => (
          <div
            key={animal.id}
            className={
              "animal-option" +
              (selectedAnimal.id === animal.id
                ? " animal-option__selected"
                : "")
            }
            onClick={() => setSelectedAnimal(animal)}
          >
            <img src={animal.icon} alt={animal.label} />
            <div className="animal-option__label">{animal.label}</div>
          </div>
        ))}
      </div>
      <form className="add-animal-container__animal-form">
        <TextField required label="Animal name" />
        <TextField required label="Breed" />
        <TextField label="Weight" />
        <TextField label="Species" />
        <TextField required label="Birth Date" />
        <TextField label="Coloring" />
        <TextField label="Microchip/ID" />
        <FormControl fullWidth>
          <InputLabel>Gender</InputLabel>
          <Select value={gender} label="Gender">
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
        </FormControl>
      </form>
      <div className="add-animal-container__buttons">
        <Button>ADD MEDICAL RECORDS</Button>
        <Button>SAVE AND EXIT</Button>
      </div>
    </div>
  );
};

export default AddAnimal;
