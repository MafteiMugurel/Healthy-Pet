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
    { id: "cat", icon: "cat" },
    { id: "dog", icon: "dog" },
    { id: "bird", icon: "bird" },
    { id: "rabbit", icon: "rabbit" },
    { id: "reptile", icon: "reptile" },
    { id: "turtle", icon: "turtle" },
    { id: "other", icon: "question-mark" },
  ];
  const [selectedAnimal, setSelectedAnimal] = useState({} as any);

  return (
    <div className="add-animal-container">
      <div className="add-animal-container__content">
        <div className="add-animal-container__title">Add new animal form</div>
        <p>What type of animal it is? Select one of the questions</p>

        <div className="add-animal-container__animal-select">
          {animalTypes.map((animal) => (
            <div key={animal.id} className="animal-option-wrapper">
              <div
                key={animal.id}
                onClick={() => setSelectedAnimal(animal)}
                className={
                  "animal-option" +
                  (selectedAnimal.id === animal.id
                    ? " animal-option__selected"
                    : "")
                }
              >
                <SVGIcon type={animal.icon} />
              </div>
              {animal.id.charAt(0).toUpperCase() + animal.id.slice(1)}
            </div>
          ))}
        </div>
        <form className="add-animal-container__animal-form">
          <TextField required label="Animal name" fullWidth size="small" />
          <TextField required label="Breed" size="small" />
          <TextField label="Species" size="small" />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Birth date"
              slotProps={{ textField: { size: "small" } }}
            />
          </LocalizationProvider>
          <FormControl fullWidth size="small">
            <InputLabel>Gender</InputLabel>
            <Select value={gender} label="Gender">
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>
          <TextField label="Weight" size="small" />
          <TextField label="Coloring" size="small" />
          <TextField
            label="Microchip / ID number"
            className="full-width"
            size="small"
          />
        </form>
      </div>
      <div className="add-animal-actions">
        <span>Next, you have to</span>
        <Button variant="contained">add medical records</Button>
        <span> or just </span>
        <Button variant="contained" color="success">
          save and exit
        </Button>
      </div>
    </div>
  );
};

export default AddAnimal;
