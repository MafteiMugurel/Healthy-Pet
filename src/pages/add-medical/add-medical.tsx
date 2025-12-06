import { useState } from "react";
import SVGIcon from "../../components/svg-icon/svg-icon";
import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./add-medical.scss";
import { useAuth } from "../../context/AuthContext";
import { saveAnimalData } from "../../services/firebaseService";
import dayjs from "dayjs";

const AddMedical = () => {
  const { userData } = useAuth();
  const recordType = [
    { id: "vaccine", icon: "syringe" },
    { id: "consultation", icon: "document" },
    { id: "blood work", icon: "drop" },
  ];
  const [formData, setFormData] = useState({
    recordType: "",
    vaccineName: "", //Vaccine
    manufacturer: "", //Vaccine
    routeOfAdministration: "", //Vaccine
    dose: "", //Vaccine
    batchNumber: "", //Vaccine
    sideEffectsObserved: "", //Vaccine
    dateAdministered: "", //Vaccine
    nextDueDate: "", //Vaccine
    clinicName: "", //Vaccine   //Consultation
    vetName: "", //Vaccine   //Consultation
    medicationsPrescribed: [
      { name: "", dosage: "", frequency: "", duration: "" },
    ], //Consultation
    treatmentPlan: "", //Consultation
    diagnosis: "", //Consultation
    symptoms: "", //Consultation
    weight: "", //Consultation
    temperature: "", //Consultation
    heartRate: "", //Consultation
    consultationDate: "", //Consultation
    followUpDate: "", //Consultation
    notes: "", //Consultation   //Blood
    medicationAtTimeOfBloodWork: "", //Blood
    labClinicName: "", //Blood
    resultsSummary: "", //Blood
    vetInterpretation: "", //Blood
    bloodWorkDate: "", //Blood
  });

  const [tempError, setTempError] = useState("");

  const handleTemperatureChange = (e: { target: { value: string } }) => {
    const rawValue = e.target.value;

    if (rawValue === "") {
      setFormData((prev) => ({
        ...prev,
        temperature: "",
      }));
      setTempError("");
      return;
    }
    const numericPattern = /^[0-9]*[.,]?[0-9]*$/;

    if (!numericPattern.test(rawValue)) {
      return;
    }
    const normalized = rawValue.replace(",", ".");

    const num = Number(normalized);

    if (Number.isNaN(num)) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      temperature: normalized,
    }));

    if (num < 20 || num > 45) {
      // I searched on the internet and it didnt help, we can modify later if needed
      setTempError("Temperature must be between 20°C and 45°C");
    } else {
      setTempError("");
    }
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMedicationChange = (
    index: number,
    field: "name" | "dosage" | "frequency" | "duration",
    value: string
  ) => {
    setFormData((prev) => {
      const updated = [...prev.medicationsPrescribed];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
      return { ...prev, medicationsPrescribed: updated };
    });
  };

  const addMedicationRow = () => {
    setFormData((prev) => ({
      ...prev,
      medicationsPrescribed: [
        ...prev.medicationsPrescribed,
        { name: "", dosage: "", frequency: "", duration: "" },
      ],
    }));
  };

  const removeMedicationRow = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      medicationsPrescribed: prev.medicationsPrescribed.filter(
        (_, i) => i !== index
      ),
    }));
  };

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

  const saveAndExit = () => {
    let data = {};

    if (!userData?.uid || !animalId) {
      return;
    }

    switch (formData.recordType) {
      case "vaccine":
        data = {
          vaccineName: formData.vaccineName,
          manufacturer: formData.manufacturer,
          routeOfAdministration: formData.routeOfAdministration,
          dose: formData.dose,
          batchNumber: formData.batchNumber,
          clinicName: formData.clinicName,
          vetName: formData.vetName,
          sideEffectsObserved: formData.sideEffectsObserved,
          dateAdministrated: formData.dateAdministered,
          nextDueDate: formData.nextDueDate,
        };
        break;
      case "consultation":
        data = {
          symptoms: formData.symptoms,
          diagnosis: formData.diagnosis,
          treatmentPlan: formData.treatmentPlan,
          medicationsPrescribed: formData.medicationsPrescribed,
          clinicName: formData.clinicName,
          vetName: formData.vetName,
          weight: formData.weight,
          temperature: formData.temperature,
          heartRate: formData.heartRate,
          notes: formData.notes,
          consultationDate: formData.consultationDate,
          followUp: formData.followUpDate,
        };
        break;
      case "blood work":
        data = {
          labClinicName: formData.labClinicName,
          resultsSummary: formData.resultsSummary,
          vetInterpretation: formData.vetInterpretation,
          medicationAtTimeOfBloodWork: formData.medicationAtTimeOfBloodWork,
          notes: formData.notes,
          bloodWorkDate: formData.bloodWorkDate,
        };
        break;
    }

    return saveAnimalData(
      userData.uid || "",
      animalId as string,
      formData.recordType,
      data
    ).then(() => {
      window.location.href = "/dashboard";
    });
  };

  const isSaveButtonDisabled = () => {
    switch (formData.recordType) {
      case "vaccine":
        return (
          !formData.vaccineName ||
          !formData.manufacturer ||
          !formData.batchNumber ||
          !formData.clinicName ||
          !formData.vetName ||
          !formData.dose ||
          !formData.routeOfAdministration
        );
      case "consultation":
        return (
          !formData.symptoms ||
          !formData.diagnosis ||
          !formData.treatmentPlan ||
          !formData.clinicName ||
          !formData.vetName
        );
      case "blood work":
        return (
          !formData.labClinicName ||
          !formData.resultsSummary ||
          !formData.vetInterpretation
        );
      default:
        return true;
    }
  };

  return (
    <div className="add-medical-container">
      <div className="add-medical-container__content">
        <div className="add-medical-container__title">Add medical records</div>
        <p>What medical information would you like to add?</p>

        <div className="add-medical-container__medical-select">
          {recordType.map((medical) => (
            <div key={medical.id} className="medical-option-wrapper">
              <div
                onClick={() =>
                  handleChange({
                    target: { name: "recordType", value: medical.id },
                  })
                }
                className={
                  "medical-option" +
                  (formData.recordType === medical.id
                    ? " medical-option__selected"
                    : "")
                }
              >
                <SVGIcon type={medical.icon} />
              </div>
              {medical.id.charAt(0).toUpperCase() + medical.id.slice(1)}
            </div>
          ))}
        </div>

        <form className="add-medical-container__medical-form">
          {formData.recordType === "vaccine" && (
            <>
              <TextField
                required
                label="Vaccine name"
                fullWidth
                size="small"
                onChange={handleChange}
                name="vaccineName"
                value={formData.vaccineName}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date administered"
                  format="DD/MM/YYYY"
                  slotProps={{ textField: { size: "small" } }}
                  value={
                    formData.dateAdministered
                      ? dayjs(formData.dateAdministered)
                      : null
                  }
                  onChange={(value) => {
                    if (value) {
                      setFormData((prev) => ({
                        ...prev,
                        dateAdministered: value.format("DD-MM-YYYY"),
                      }));
                    } else {
                      setFormData((prev) => ({
                        ...prev,
                        dateAdministered: "",
                      }));
                    }
                  }}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Next due date"
                  format="DD/MM/YYYY"
                  slotProps={{ textField: { size: "small" } }}
                  value={
                    formData.nextDueDate ? dayjs(formData.nextDueDate) : null
                  }
                  onChange={(value) => {
                    if (value) {
                      setFormData((prev) => ({
                        ...prev,
                        nextDueDate: value.format("DD-MM-YYYY"),
                      }));
                    } else {
                      setFormData((prev) => ({
                        ...prev,
                        nextDueDate: "",
                      }));
                    }
                  }}
                />
              </LocalizationProvider>
              <TextField
                required
                label="Manufacturer"
                fullWidth
                size="small"
                onChange={handleChange}
                name="manufacturer"
                value={formData.manufacturer}
              />
              <TextField
                required
                label="Batch number"
                fullWidth
                size="small"
                onChange={handleChange}
                name="batchNumber"
                value={formData.batchNumber}
              />
              <TextField
                required
                label="Clinic name"
                fullWidth
                size="small"
                onChange={handleChange}
                name="clinicName"
                value={formData.clinicName}
              />
              <TextField
                required
                label="Administred by (vet name)"
                fullWidth
                size="small"
                onChange={handleChange}
                name="vetName"
                value={formData.vetName}
              />
              <TextField
                required
                label="Dose"
                fullWidth
                size="small"
                onChange={handleChange}
                name="dose"
                value={formData.dose}
              />
              <FormControl fullWidth size="small">
                <InputLabel>Route of administration</InputLabel>
                <Select
                  value={formData.routeOfAdministration}
                  label="Age"
                  name="routeOfAdministration"
                  fullWidth
                  size="small"
                  onChange={handleChange}
                >
                  <MenuItem value="subcutaneous">Subcutaneous (SC)</MenuItem>
                  <MenuItem value="intramuscular">Intramuscular (IM)</MenuItem>
                  <MenuItem value="intranasal">Intranasal (IN)</MenuItem>
                  <MenuItem value="oral">Oral</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Side effects observed"
                fullWidth
                size="small"
                onChange={handleChange}
                name="sideEffectsObserved"
                value={formData.sideEffectsObserved}
              />
            </>
          )}
          {formData.recordType === "consultation" && (
            <>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date of consultation"
                  format="DD/MM/YYYY"
                  slotProps={{ textField: { size: "small" } }}
                  value={
                    formData.consultationDate
                      ? dayjs(formData.consultationDate)
                      : null
                  }
                  onChange={(value) => {
                    if (value) {
                      setFormData((prev) => ({
                        ...prev,
                        consultationDate: value.format("YYYY-MM-DD"),
                      }));
                    } else {
                      setFormData((prev) => ({
                        ...prev,
                        consultationDate: "",
                      }));
                    }
                  }}
                />
              </LocalizationProvider>
              <TextField
                required
                label="Reason for visit / Symptoms"
                fullWidth
                size="small"
                onChange={handleChange}
                name="symptoms"
                value={formData.symptoms}
              />
              <TextField
                required
                label="Diagnosis"
                fullWidth
                size="small"
                onChange={handleChange}
                name="diagnosis"
                value={formData.diagnosis}
              />
              <TextField
                required
                label="Treatment plan"
                fullWidth
                size="small"
                onChange={handleChange}
                name="treatmentPlan"
                value={formData.treatmentPlan}
              />
              {/* TODO this should be a table with Name Dosage Frequency Duration */}
              <div className="medications-table">
                {formData.medicationsPrescribed.map((med, index) => (
                  <div key={index} className="medication-row">
                    <TextField
                      label="Name"
                      size="small"
                      value={med.name}
                      onChange={(e) =>
                        handleMedicationChange(index, "name", e.target.value)
                      }
                    />
                    <TextField
                      label="Dosage"
                      size="small"
                      value={med.dosage}
                      onChange={(e) =>
                        handleMedicationChange(index, "dosage", e.target.value)
                      }
                    />
                    <TextField
                      label="Frequency"
                      size="small"
                      value={med.frequency}
                      onChange={(e) =>
                        handleMedicationChange(
                          index,
                          "frequency",
                          e.target.value
                        )
                      }
                    />
                    <TextField
                      label="Duration"
                      size="small"
                      value={med.duration}
                      onChange={(e) =>
                        handleMedicationChange(
                          index,
                          "duration",
                          e.target.value
                        )
                      }
                    />
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => removeMedicationRow(index)}
                      className="remove-medication-btn"
                    >
                      X
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outlined"
                  size="small"
                  onClick={addMedicationRow}
                  className="add-medication-btn"
                >
                  Add medication
                </Button>
              </div>
              <TextField
                required
                label="Clinic name"
                fullWidth
                size="small"
                onChange={handleChange}
                name="clinicName"
                value={formData.clinicName}
              />
              <TextField
                required
                label="Administred by (vet name)"
                fullWidth
                size="small"
                onChange={handleChange}
                name="vetName"
                value={formData.vetName}
              />
              <TextField
                label="Weight"
                fullWidth
                size="small"
                onChange={handleChange}
                name="weight"
                value={formData.weight}
              />
              <TextField
                label="Temperature (°C)"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">°C</InputAdornment>
                  ),
                }}
                size="small"
                onChange={handleTemperatureChange}
                name="temperature"
                value={formData.temperature} //I DONT UNDERSTAND WHY IT DOESN'T WORK
                error={!!tempError}
                helperText={tempError}
              />
              <TextField
                label="Heart rate"
                fullWidth
                size="small"
                onChange={handleChange}
                name="heartRate"
                value={formData.heartRate}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Follow-up date"
                  format="DD/MM/YYYY"
                  slotProps={{ textField: { size: "small" } }}
                  value={
                    formData.followUpDate ? dayjs(formData.followUpDate) : null
                  }
                  onChange={(value) => {
                    if (value) {
                      setFormData((prev) => ({
                        ...prev,
                        followUpDate: value.format("DD-MM-YYYY"),
                      }));
                    } else {
                      setFormData((prev) => ({
                        ...prev,
                        followUpDate: "",
                      }));
                    }
                  }}
                />
              </LocalizationProvider>
              <TextField
                label="Notes"
                fullWidth
                size="small"
                onChange={handleChange}
                name="notes"
                value={formData.notes}
              />
            </>
          )}
          {formData.recordType === "blood work" && (
            <>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date of blood work"
                  format="DD/MM/YYYY"
                  slotProps={{ textField: { size: "small" } }}
                  value={
                    formData.bloodWorkDate
                      ? dayjs(formData.bloodWorkDate)
                      : null
                  }
                  onChange={(value) => {
                    if (value) {
                      setFormData((prev) => ({
                        ...prev,
                        bloodWorkDate: value.format("DD-MM-YYYY"),
                      }));
                    } else {
                      setFormData((prev) => ({
                        ...prev,
                        bloodWorkDate: "",
                      }));
                    }
                  }}
                />
              </LocalizationProvider>
              <TextField
                required
                label="Lab/Clinic name"
                fullWidth
                size="small"
                onChange={handleChange}
                name="labClinicName"
                value={formData.labClinicName}
              />
              {/* TODO this should be a table with Test name, Result, Reference range and flag if abnormal */}
              <TextField
                required
                label="Results summary"
                fullWidth
                size="small"
                onChange={handleChange}
                name="resultsSummary"
                value={formData.resultsSummary}
              />
              <TextField
                required
                label="Vet interpretation"
                fullWidth
                size="small"
                onChange={handleChange}
                name="vetInterpretation"
                value={formData.vetInterpretation}
              />
              <TextField
                label="Medication at the time of blood work"
                fullWidth
                size="small"
                onChange={handleChange}
                name="medicationAtTimeOfBloodWork"
                value={formData.medicationAtTimeOfBloodWork}
              />
              <TextField
                label="Notes"
                fullWidth
                size="small"
                onChange={handleChange}
                name="notes"
                value={formData.notes}
              />
            </>
          )}
        </form>
      </div>
      <div className="add-medical-actions">
        <Button
          variant="contained"
          color="success"
          onClick={saveAndExit}
          disabled={isSaveButtonDisabled()}
        >
          save and exit
        </Button>
      </div>
    </div>
  );
};

export default AddMedical;
