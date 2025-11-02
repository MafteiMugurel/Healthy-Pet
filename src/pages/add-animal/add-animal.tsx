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
          <p>What type of animal it is? Select one of the questions</p>
        </div>
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
          </div>
        ))}
      </div>
      <form className="add-animal-container__animal-form">
        <TextField
          required
          label="Animal name"
          className="field-single"
          fullWidth
        />
        <TextField required label="Breed" />
        <TextField label="Species" />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="Birth date" />
        </LocalizationProvider>
        <FormControl>
          <InputLabel>Gender</InputLabel>
          <Select value={gender} label="Gender">
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
        </FormControl>
        <TextField label="Weight" />
        <TextField label="Coloring" />
        <TextField label="Microchip / ID number" className="full-width" />
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
