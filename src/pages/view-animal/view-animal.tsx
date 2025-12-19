import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tabs,
  TextField,
  Tab,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import "./view-animal.scss";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { useEffect, useState } from "react";
import { push, ref } from "firebase/database";
import { db } from "../../services/firebase";
import { useAuth } from "../../context/AuthContext";
import {
  Animal,
  BloodWork,
  Consultation,
  Vaccine,
} from "../../interfaces/animal.model";
import { fetchAnimalById, removeAnimal } from "../../services/firebaseService";
import dayjs from "dayjs";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
  const [value, setValue] = useState(0);
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  useEffect(() => {
    const loadProfile = async () => {
      if (userData?.uid && animalId) {
        const data = await fetchAnimalById(userData.uid, animalId);
        const vaccineArray = [] as Vaccine[];
        Object.keys(data.vaccine || {}).forEach((key) =>
          vaccineArray.push({ ...data.vaccine[key], key })
        );
        const consultationArray = [] as Consultation[];
        Object.keys(data.consultation || {}).forEach((key) =>
          consultationArray.push({ ...data.consultation[key], key })
        );
        const bloodWorkArray = [] as BloodWork[];
        Object.keys(data.bloodWork || {}).forEach((key) =>
          bloodWorkArray.push({ ...data.bloodWork[key], key })
        );

        setAnimal({
          ...data,
          vaccine: vaccineArray,
          consultation: consultationArray,
          bloodWork: bloodWorkArray,
        });
      }
    };

    loadProfile();
  }, [userData, animalId]);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setAnimal((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddMedical = () => {
    window.location.href = `/add-medical/${animalId}`;
  };

  const handleSaveData = async () => {
    try {
      const usersRef = ref(db, `users/${userData?.uid}/animals`);
      await push(usersRef, animal);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveAnimal = () => {
    if (!userData?.uid) return;
    removeAnimal(userData.uid, animalId!);
    window.location.href = "/dashboard";
  };

  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        className="tab-panel-container"
      >
        {value === index && <>{children}</>}
      </div>
    );
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setExpanded(false);
  };

  const DataRow = ({ label, value }: { label: string; value: any }) => (
    <TableRow>
      <TableCell className="label-cell">{label}</TableCell>
      <TableCell>{value || "-"}</TableCell>
    </TableRow>
  );

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
              label="Birth date"
              format="DD/MM/YYYY"
              slotProps={{ textField: { size: "small" } }}
              value={
                animal.dateOfBirth
                  ? dayjs(animal.dateOfBirth, "DD/MM/YYYY")
                  : null
              }
              onChange={(newValue) => {
                handleChange({
                  target: {
                    name: "dateOfBirth",
                    value: newValue?.format("DD/MM/YYYY"),
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

      <Tabs
        value={value}
        onChange={handleTabChange}
        className="view-animal-tabs"
      >
        <Tab label="Consultations" />
        <Tab label="Lab Results" />
        <Tab label="Vaccinations" />
      </Tabs>

      <CustomTabPanel value={value} index={0}>
        {animal.consultation?.map((record, idx) => (
          <Accordion
            key={idx}
            expanded={expanded === `panel-c-${idx}`}
            onChange={handleAccordionChange(`panel-c-${idx}`)}
            className="view-animal-accordion"
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <span className="summary-title">
                {record.consultationDate} -{" "}
                {record.diagnosis || "General Checkup"}
              </span>
            </AccordionSummary>
            <AccordionDetails className="accordion-details-content">
              <TableContainer
                component={Paper}
                variant="outlined"
                className="table-wrapper"
              >
                <Table size="small" className="data-table">
                  <TableBody>
                    <DataRow label="Symptoms" value={record.symptoms} />
                    <DataRow label="Diagnosis" value={record.diagnosis} />
                    <DataRow
                      label="Treatment Plan"
                      value={record.treatmentPlan}
                    />
                    <DataRow
                      label="Clinic / Vet"
                      value={`${record.clinicName} / ${record.vetName}`}
                    />
                    <DataRow
                      label="Vitals"
                      value={`Weight: ${record.weight}kg | Temp: ${record.temperature}°C | HR: ${record.heartRate}bpm`}
                    />
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        ))}
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        {animal.bloodWork?.map((record, idx) => (
          <Accordion
            key={idx}
            expanded={expanded === `panel-l-${idx}`}
            onChange={handleAccordionChange(`panel-l-${idx}`)}
            className="view-animal-accordion"
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <span className="summary-title">
                {record.bloodWorkDate} - {record.labClinicName}
              </span>
            </AccordionSummary>
            <AccordionDetails className="accordion-details-content">
              <TableContainer component={Paper} variant="outlined">
                <Table size="small" className="data-table">
                  <TableBody>
                    <DataRow label="Summary" value={record.resultsSummary} />
                    <DataRow
                      label="Interpretation"
                      value={record.vetInterpretation}
                    />
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        ))}
      </CustomTabPanel>

      <CustomTabPanel value={value} index={2}>
        {animal.vaccine?.map((record, idx) => (
          <Accordion
            key={idx}
            expanded={expanded === `panel-v-${idx}`}
            onChange={handleAccordionChange(`panel-v-${idx}`)}
            className="view-animal-accordion"
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <span className="summary-title">
                {record.vaccineName} - {record.dateAdministrated}
              </span>
            </AccordionSummary>
            <AccordionDetails className="accordion-details-content">
              <TableContainer component={Paper} variant="outlined">
                <Table size="small" className="data-table">
                  <TableBody>
                    <DataRow label="Manufacturer" value={record.manufacturer} />
                    <DataRow label="Next Due Date" value={record.nextDueDate} />
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        ))}
      </CustomTabPanel>

      <div className="add-animal-actions bottom-actions">
        <Button variant="contained" onClick={handleAddMedical}>
          add medical records
        </Button>
        <span>or</span>
        <Button variant="contained" color="error" onClick={handleRemoveAnimal}>
          remove animal
        </Button>
      </div>
    </div>
  );
};

export default ViewAnimal;
