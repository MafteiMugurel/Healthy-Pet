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
      <div className="add-animal-header">
        <div className="add-animal-header__topbar">
          <div className="add-animal-header__topbar__logo">
            <h1>HealthyPet</h1>
          </div>
        </div>
        <div className="add-animal-header__content">
          <h2 className="add-animal-header__content__title">
            Add new animal form
          </h2>
          <p>What type of animal it is? Click on one of the buttons below:</p>
        </div>
      </div>
      <div className="add-animal-container__animal-select">
        {animalTypes.map((animal) => (
          <div
            key={animal.id}
            className="animal-option-wrapper"
            onClick={() => setSelectedAnimal(animal)}
          >
            <div
              key={animal.id}
              className={
                "animal-option" +
                (selectedAnimal.id === animal.id
                  ? " animal-option__selected"
                  : "")
              }
            >
              <SVGIcon type={animal.icon} />
            </div>
            <div className="animal-option__label">
              {animal.id.charAt(0).toUpperCase() + animal.id.slice(1)}
            </div>
          </div>
        ))}
      </div>
      <form className="add-animal-container__animal-form">
        <TextField
          required
          label="Animal name"
          className="field-single"
          fullWidth
          size="small"
          margin="dense"
        />
        <TextField required label="Breed" size="small" margin="dense" />
        <TextField label="Species" size="small" margin="dense" />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Birth date"
            slotProps={{ textField: { size: "small", margin: "dense" } }}
          />
        </LocalizationProvider>
        <FormControl fullWidth size="small">
          <InputLabel>Gender</InputLabel>
          <Select value={gender} label="Gender">
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
        </FormControl>
        <TextField label="Weight" size="small" margin="dense" />
        <TextField label="Coloring" size="small" margin="dense" />
        <TextField
          label="Microchip / ID number"
          className="full-width"
          size="small"
          margin="dense"
        />
      </form>

      <div className="add-animal-footer">
        <p className="add-animal-footer__text">Next, you have to</p>
        <Button className="add-animal-footer__btn primary">
          ADD MEDICAL RECORDS
        </Button>
        <p className="add-animal-footer__text"> or just </p>
        <Button className="add-animal-footer__btn secondary">
          SAVE AND EXIT
        </Button>
      </div>
    </div>
  );
};

export default AddAnimal;
