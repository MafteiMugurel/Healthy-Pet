import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import "./add-animal.scss";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { useState } from "react";
import SVGIcon from "../../components/svg-icon/svg-icon";

const AddAnimal = () => {
  let gender;
  const animalTypes = [
    { id: "cat", label: "Cat", icon: "cat" },
    { id: "dog", label: "Dog", icon: "dog" },
    { id: "bird", label: "Bird", icon: "bird" },
    { id: "rabbit", label: "Rabbit", icon: "rabbit" },
    { id: "reptile", label: "Reptile", icon: "reptile" },
    { id: "turtle", label: "Turtle", icon: "turtle" },
    { id: "other", label: "Other", icon: "question-mark" },
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
            <SVGIcon type={animal.icon} />
            <div className="animal-option__label">{animal.label}</div>
          </div>
        ))}
      </div>
      <form className="add-animal-container__animal-form">
        <TextField required label="Animal name" />
        <TextField required label="Breed" />
        <TextField label="Weight" />
        <TextField label="Species" />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker />
        </LocalizationProvider>
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
