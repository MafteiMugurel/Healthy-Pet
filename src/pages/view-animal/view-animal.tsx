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
import { fetchAnimalById } from "../../services/firebaseService";
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

  useEffect(() => {
    const loadProfile = async () => {
      if (userData?.uid && animalId) {
        const data = await fetchAnimalById(userData.uid, animalId);
        const vaccineArray = [] as Vaccine[];
        Object.keys(data.vaccine || {}).forEach((key) =>
          vaccineArray.push({
            ...data.vaccine[key],
            key,
          })
        );
        const consultationArray = [] as Consultation[];
        Object.keys(data.consultation || {}).forEach((key) =>
          consultationArray.push({
            ...data.consultation[key],
            key,
          })
        );
        const bloodWorkArray = [] as BloodWork[];
        Object.keys(data.bloodWork || {}).forEach((key) =>
          bloodWorkArray.push({
            ...data.bloodWork[key],
            key,
          })
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
              label="Birth date"
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

      {animal.consultation && animal.consultation.length > 0 && (
        <CustomTabPanel value={value} index={0}>
          {animal.consultation.map((consultationRecord, index) => (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <h4>{consultationRecord.consultationDate}</h4>
              </AccordionSummary>
              <AccordionDetails>
                <p>Symptoms: {consultationRecord.symptoms}</p>
                <p>Diagnosis: {consultationRecord.diagnosis}</p>
                <p>Treatment Plan: {consultationRecord.treatmentPlan}</p>
                <div>
                  <h5>Medications Prescribed:</h5>
                  <table>
                    <tr>
                      <th>Name</th>
                      <th>Dosage</th>
                      <th>Frequency</th>
                      <th>Duration</th>
                    </tr>
                    {consultationRecord.medicationsPrescribed.map(
                      (medication, medIndex) => (
                        <tr key={medIndex}>
                          <td>{medication.name}</td>
                          <td>{medication.dosage}</td>
                          <td>{medication.frequency}</td>
                          <td>{medication.duration}</td>
                        </tr>
                      )
                    )}
                  </table>
                </div>
                <p>Clinic Name: {consultationRecord.clinicName}</p>
                <p>Vet Name: {consultationRecord.vetName}</p>
                <p>Weight: {consultationRecord.weight}</p>
                <p>Temperature: {consultationRecord.temperature}</p>
                <p>Heart Rate: {consultationRecord.heartRate}</p>
                <p>Notes: {consultationRecord.notes}</p>
                <p>Follow Up: {consultationRecord.followUp}</p>
              </AccordionDetails>
            </Accordion>
          ))}
        </CustomTabPanel>
      )}

      {animal.consultation && animal.consultation.length <= 0 && (
        <CustomTabPanel value={value} index={0}>
          No consultation records available.
        </CustomTabPanel>
      )}

      {animal.bloodWork && animal.bloodWork.length > 0 && (
        <CustomTabPanel value={value} index={1}>
          {animal.bloodWork.map((bloodWorkRecord, index) => (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <h4>{bloodWorkRecord.bloodWorkDate}</h4>
              </AccordionSummary>
              <AccordionDetails>
                <p>Lab/Clinic Name: {bloodWorkRecord.labClinicName}</p>
                <p>Results Summary: {bloodWorkRecord.resultsSummary}</p>
                <p>Vet Interpretation: {bloodWorkRecord.vetInterpretation}</p>
                <p>
                  Medication at Time of Blood Work:{" "}
                  {bloodWorkRecord.medicationAtTimeOfBloodWork}
                </p>
                <p>Notes: {bloodWorkRecord.notes}</p>
                <div>
                  <h5>Blood Tests:</h5>
                  <table>
                    <tr>
                      <th>Test Name</th>
                      <th>Result</th>
                      <th>Reference Range</th>
                      <th>Flag</th>
                    </tr>
                    {bloodWorkRecord.bloodTests.map((test, testIndex) => (
                      <tr key={testIndex}>
                        <td>{test.testName}</td>
                        <td>{test.result}</td>
                        <td>{test.referenceRange}</td>
                        <td>{test.flag}</td>
                      </tr>
                    ))}
                  </table>
                </div>
              </AccordionDetails>
            </Accordion>
          ))}
        </CustomTabPanel>
      )}

      {animal.bloodWork && animal.bloodWork.length <= 0 && (
        <CustomTabPanel value={value} index={1}>
          No bloodWork records available.
        </CustomTabPanel>
      )}

      {animal.vaccine && animal.vaccine.length > 0 && (
        <CustomTabPanel value={value} index={2}>
          {animal.vaccine.map((vaccineRecord, index) => (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <h4>
                  {vaccineRecord.vaccineName} -{" "}
                  {vaccineRecord.dateAdministrated}
                </h4>
              </AccordionSummary>
              <AccordionDetails>
                <p>Manufacturer: {vaccineRecord.manufacturer}</p>
                <p>
                  Route of Administration: {vaccineRecord.routeOfAdministration}
                </p>
                <p>Dose: {vaccineRecord.dose}</p>
                <p>Batch Number: {vaccineRecord.batchNumber}</p>
                <p>Clinic Name: {vaccineRecord.clinicName}</p>
                <p>Vet Name: {vaccineRecord.vetName}</p>
                <p>
                  Side Effects Observed: {vaccineRecord.sideEffectsObserved}
                </p>
                <p>Date Administrated: {vaccineRecord.dateAdministrated}</p>
                <p>Next Due Date: {vaccineRecord.nextDueDate}</p>
              </AccordionDetails>
            </Accordion>
          ))}
        </CustomTabPanel>
      )}

      {animal.vaccine && animal.vaccine.length <= 0 && (
        <CustomTabPanel value={value} index={2}>
          No vaccine records available.
        </CustomTabPanel>
      )}

      <div className="add-animal-actions">
        <Button variant="contained" onClick={handleAddMedical}>
          add medical records
        </Button>
      </div>
    </div>
  );
};

export default ViewAnimal;
