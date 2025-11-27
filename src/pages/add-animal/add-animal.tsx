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
import { push, ref } from "firebase/database";
import { db } from "../../services/firebase";
import { useAuth } from "../../context/AuthContext";

const AddAnimal = () => {
  const { userData } = useAuth();
  const animalTypes = [
    { id: "cat", icon: "cat" },
    { id: "dog", icon: "dog" },
    { id: "bird", icon: "bird" },
    { id: "rabbit", icon: "rabbit" },
    { id: "reptile", icon: "reptile" },
    { id: "turtle", icon: "turtle" },
    { id: "other", icon: "question-mark" },
  ];
  const [formData, setFormData] = useState({
    animalType: "cat",
    breed: "",
    coloring: "",
    dateOfBirth: null,
    gender: "",
    microchipId: "",
    name: "",
    species: "",
    weight: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    console.log(name, " - ", value);

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    console.log(formData);
  };
  const handleDateChange = (date: any) => {
    setFormData((prev) => ({
      ...prev,
      dateOfBirth: date,
    }));
  };

  const handleAddMedical = () => {
    handleSubmitData().then((newUserRef) => {
      window.location.href = `/add-medical/${newUserRef.key}`;
    });
  };

  const handleSaveAndExit = () => {
    handleSubmitData().then(() => {
      window.location.href = "/dashboard";
    });
  };

  const handleSubmitData = () => {
    return (async () => {
      try {
        const usersRef = ref(db, `users/${userData?.uid}/animals`);
        const newUserRef = await push(usersRef, formData);
        return newUserRef;
      } catch (error) {
        throw error;
      }
    })();
  };

  return (
    <div className="add-animal-container">
      <div className="add-animal-container__content">
        <div className="add-animal-container__title">Add new animal</div>
        <p>
          What type of animal it is? Select one of the types and fill in the
          required information.
        </p>

        <div className="add-animal-container__animal-select">
          {animalTypes.map((animal) => (
            // TODO there's a bug
            <div key={animal.id} className="animal-option-wrapper">
              <div
                key={animal.id}
                onClick={() =>
                  handleChange({
                    target: { name: "animalType", value: animal.id },
                  })
                }
                className={
                  "animal-option" +
                  (formData.animalType === animal.id
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
          <TextField
            required
            label="Animal name"
            fullWidth
            size="small"
            onChange={handleChange}
            value={formData.name}
            name="name"
          />
          <TextField
            label="Breed"
            size="small"
            onChange={handleChange}
            value={formData.breed}
            name="breed"
          />
          <TextField
            label="Species"
            size="small"
            onChange={handleChange}
            value={formData.species}
            name="species"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Birth date"
              format="DD/MM/YYYY"
              slotProps={{ textField: { size: "small" } }}
              value={formData.dateOfBirth}
              name="dateOfBirth"
              onChange={handleDateChange}
            />
          </LocalizationProvider>
          <FormControl fullWidth size="small">
            <InputLabel>Gender</InputLabel>
            <Select
              label="Gender"
              onChange={handleChange}
              value={formData.gender}
              name="gender"
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Weight"
            size="small"
            onChange={handleChange}
            value={formData.weight}
            name="weight"
          />
          <TextField
            label="Coloring"
            size="small"
            onChange={handleChange}
            value={formData.coloring}
            name="coloring"
          />
          <TextField
            label="Microchip / ID number"
            className="full-width"
            size="small"
            onChange={handleChange}
            value={formData.microchipId}
            name="microchipId"
          />
        </form>
      </div>
      <div className="add-animal-actions">
        <span>Next, you have to</span>
        <Button
          variant="contained"
          onClick={handleAddMedical}
          disabled={!formData.name.trim()}
        >
          add medical records
        </Button>
        <span> or just </span>
        <Button
          variant="contained"
          color="success"
          onClick={handleSaveAndExit}
          disabled={!formData.name.trim()}
        >
          save and exit
        </Button>
      </div>
    </div>
  );
};

export default AddAnimal;
