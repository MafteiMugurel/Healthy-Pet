import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tabs,
  TextField,
  Tab,
} from "@mui/material";
import "./view-animal.scss";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { useEffect, useState } from "react";
import { push, ref } from "firebase/database";
import { db } from "../../services/firebase";
import { useAuth } from "../../context/AuthContext";
import { Animal } from "../../interfaces/animal.model";
import { fetchAnimalById } from "../../services/firebaseService";
import dayjs from "dayjs";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const ViewAnimal = () => {
  const getAnimalIdFromUrl = (): string | undefined => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.has("animalId")) return params.get("animalId") || undefined;
      const parts = window.location.pathname.split("/").filter(Boolean);
      return parts.length ? parts[parts.length - 1] : undefined;
    } catch {
      return undefined;
    }
  };
  const animalId = getAnimalIdFromUrl();

  const { userData } = useAuth();
  const [animal, setAnimal] = useState<Animal>({} as Animal);

  useEffect(() => {
    const loadProfile = async () => {
      if (userData?.uid && animalId) {
        const data = await fetchAnimalById(userData.uid, animalId);
        setAnimal(data);
      }
    };

    loadProfile();
  }, [userData, animalId]);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;

    setAnimal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddMedical = () => {
    window.location.href = `/add-medical/${animalId}`;
  };

  const handleSaveData = () => {
    return (async () => {
      try {
        const usersRef = ref(db, `users/${userData?.uid}/animals`);
        const newUserRef = await push(usersRef, animal);
        return newUserRef;
      } catch (error) {
        throw error;
      }
    })();
  };

  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index } = props;

    return (
      <div role="tabpanel" hidden={value !== index}>
        {value === index && <>{children}</>}
      </div>
    );
  }

  const [value, setValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="view-animal-container">
      <div className="view-animal-container__content">
        <div className="view-animal-container__title">
          {animal.name}'s Profile
        </div>
        <form className="view-animal-container__animal-form">
          <TextField
            required
            label="Animal name"
            fullWidth
            size="small"
            onChange={handleChange}
            value={animal.name ?? ""}
            name="name"
          />
          <TextField
            label="Breed"
            size="small"
            onChange={handleChange}
            value={animal.breed ?? ""}
            name="breed"
          />
          <TextField
            label="Species"
            size="small"
            onChange={handleChange}
            value={animal.species ?? ""}
            name="species"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date of blood work"
              format="DD/MM/YYYY"
              slotProps={{ textField: { size: "small" } }}
              value={dayjs(animal.dateOfBirth) ?? ""}
              name="dateOfBirth"
              onChange={(value) => {
                handleChange({
                  target: {
                    name: "dateOfBirth",
                    value: value?.format("DD/MM/YYYY"),
                  },
                });
              }}
            />
          </LocalizationProvider>
          <FormControl fullWidth size="small">
            <InputLabel>Gender</InputLabel>
            <Select
              label="Gender"
              onChange={handleChange}
              value={animal.gender ?? ""}
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
            value={animal.weight ?? ""}
            name="weight"
          />
          <TextField
            label="Coloring"
            size="small"
            onChange={handleChange}
            value={animal.coloring ?? ""}
            name="coloring"
          />
          <TextField
            label="Microchip / ID number"
            className="full-width"
            size="small"
            onChange={handleChange}
            value={animal.microchipId ?? ""}
            name="microchipId"
          />
        </form>
      </div>

      <div className="add-animal-actions">
        <Button variant="contained" color="success" onClick={handleSaveData}>
          update animal info
        </Button>
      </div>

      <Tabs value={value} onChange={handleTabChange}>
        <Tab label="Consultations" />
        <Tab label="Lab Results" />
        <Tab label="Vaccinations" />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        ergsergse
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        sergreg
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>

      <div className="add-animal-actions">
        <Button variant="contained" onClick={handleAddMedical}>
          add medical records
        </Button>
      </div>
    </div>
  );
};

export default ViewAnimal;
