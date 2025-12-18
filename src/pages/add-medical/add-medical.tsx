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
import { BloodTest, Medication } from "../../interfaces/animal.model";

const AddMedical = () => {
  const { userData } = useAuth();
  const recordType = [
    { id: "vaccine", icon: "syringe" },
    { id: "consultation", icon: "document" },
    { id: "blood work", icon: "drop" },
  ];

  const [formData, setFormData] = useState({
    recordType: "",
    vaccineName: "",
    manufacturer: "",
    routeOfAdministration: "",
    dose: "",
    batchNumber: "",
    sideEffectsObserved: "",
    dateAdministered: "",
    nextDueDate: "",
    clinicName: "",
    vetName: "",
    medicationsPrescribed: [] as Medication[],
    treatmentPlan: "",
    diagnosis: "",
    symptoms: "",
    weight: "",
    temperature: "",
    heartRate: "",
    consultationDate: "",
    followUpDate: "",
    notes: "",
    medicationAtTimeOfBloodWork: "",
    labClinicName: "",
    resultsSummary: "",
    vetInterpretation: "",
    bloodWorkDate: "",
    bloodTests: [] as BloodTest[],
  });

  const [tempError, setTempError] = useState("");

  const handleTemperatureChange = (e: { target: { value: string } }) => {
    const rawValue = e.target.value;
    if (rawValue === "") {
      setFormData((prev) => ({ ...prev, temperature: "" }));
      setTempError("");
      return;
    }
    const pattern = /^[0-9]*[.,]?[0-9]*$/;
    if (!pattern.test(rawValue)) return;
    const normalized = rawValue.replace(",", ".");
    const num = Number(normalized);
    if (Number.isNaN(num)) return;
    setFormData((prev) => ({ ...prev, temperature: normalized }));
    if (num < 20 || num > 45)
      setTempError("Temperature must be between 20°C and 45°C");
    else setTempError("");
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleMedicationChange = (
    index: number,
    field: "name" | "dosage" | "frequency" | "duration",
    value: string
  ) => {
    setFormData((prev) => {
      const updated = [...prev.medicationsPrescribed];
      updated[index] = { ...updated[index], [field]: value };
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

  const handleBloodTestChange = (
    index: number,
    field: "testName" | "result" | "referenceRange" | "flag",
    value: string
  ) => {
    setFormData((prev) => {
      const updated = [...prev.bloodTests];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, bloodTests: updated };
    });
  };

  const addBloodTestRow = () => {
    setFormData((prev) => ({
      ...prev,
      bloodTests: [
        ...prev.bloodTests,
        { testName: "", result: "", referenceRange: "", flag: "" },
      ],
    }));
  };

  const removeBloodTestRow = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      bloodTests: prev.bloodTests.filter((_, i) => i !== index),
    }));
  };

  const getAnimalIdFromUrl = () => {
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
    if (!userData?.uid || !animalId) return;

    let data: any = {};

    if (formData.recordType === "vaccine") {
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
    }

    if (formData.recordType === "consultation") {
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
    }

    if (formData.recordType === "blood work") {
      data = {
        labClinicName: formData.labClinicName,
        resultsSummary: formData.resultsSummary,
        vetInterpretation: formData.vetInterpretation,
        medicationAtTimeOfBloodWork: formData.medicationAtTimeOfBloodWork,
        notes: formData.notes,
        bloodWorkDate: formData.bloodWorkDate,
        bloodTests: formData.bloodTests,
      };
    }

    saveAnimalData(userData.uid, animalId, formData.recordType, data).then(
      () => {
        window.location.href = "/view-animal/" + animalId;
      }
    );
  };

  const isSaveButtonDisabled = () => {
    if (formData.recordType === "vaccine")
      return (
        !formData.vaccineName ||
        !formData.manufacturer ||
        !formData.batchNumber ||
        !formData.clinicName ||
        !formData.vetName ||
        !formData.dose ||
        !formData.routeOfAdministration
      );

    if (formData.recordType === "consultation")
      return (
        !formData.symptoms ||
        !formData.diagnosis ||
        !formData.treatmentPlan ||
        !formData.clinicName ||
        !formData.vetName
      );

    if (formData.recordType === "blood work")
      return (
        !formData.labClinicName ||
        !formData.resultsSummary ||
        !formData.vetInterpretation
      );

    return true;
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
                label="Vaccine name"
                required
                fullWidth
                size="small"
                name="vaccineName"
                onChange={handleChange}
                value={formData.vaccineName}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date administered"
                  format="DD/MM/YYYY"
                  slotProps={{ textField: { size: "small" } }}
                  value={dayjs(formData.dateAdministered)}
                  name="dateAdministered"
                  onChange={(value) => {
                    handleChange({
                      target: {
                        name: "dateAdministered",
                        value: value?.format("DD/MM/YYYY"),
                      },
                    });
                  }}
                />
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Next due date"
                  format="DD/MM/YYYY"
                  slotProps={{ textField: { size: "small" } }}
                  value={dayjs(formData.nextDueDate)}
                  name="nextDueDate"
                  onChange={(value) => {
                    handleChange({
                      target: {
                        name: "nextDueDate",
                        value: value?.format("DD/MM/YYYY"),
                      },
                    });
                  }}
                />
              </LocalizationProvider>

              <TextField
                label="Manufacturer"
                required
                fullWidth
                size="small"
                name="manufacturer"
                onChange={handleChange}
                value={formData.manufacturer}
              />
              <TextField
                label="Batch number"
                required
                fullWidth
                size="small"
                name="batchNumber"
                onChange={handleChange}
                value={formData.batchNumber}
              />
              <TextField
                label="Clinic name"
                required
                fullWidth
                size="small"
                name="clinicName"
                onChange={handleChange}
                value={formData.clinicName}
              />
              <TextField
                label="Administered by (vet name)"
                required
                fullWidth
                size="small"
                name="vetName"
                onChange={handleChange}
                value={formData.vetName}
              />
              <TextField
                label="Dose"
                required
                fullWidth
                size="small"
                name="dose"
                onChange={handleChange}
                value={formData.dose}
              />

              <FormControl fullWidth size="small">
                <InputLabel>Route of administration</InputLabel>
                <Select
                  name="routeOfAdministration"
                  value={formData.routeOfAdministration}
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
                name="sideEffectsObserved"
                onChange={handleChange}
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
                  value={dayjs(formData.consultationDate)}
                  name="consultationDate"
                  onChange={(value) => {
                    handleChange({
                      target: {
                        name: "consultationDate",
                        value: value?.format("DD/MM/YYYY"),
                      },
                    });
                  }}
                />
              </LocalizationProvider>

              <TextField
                label="Reason for visit / Symptoms"
                required
                fullWidth
                size="small"
                name="symptoms"
                onChange={handleChange}
                value={formData.symptoms}
              />
              <TextField
                label="Diagnosis"
                required
                fullWidth
                size="small"
                name="diagnosis"
                onChange={handleChange}
                value={formData.diagnosis}
              />
              <TextField
                label="Treatment plan"
                required
                fullWidth
                size="small"
                name="treatmentPlan"
                onChange={handleChange}
                value={formData.treatmentPlan}
              />

              <div className="medications-table">
                {formData.medicationsPrescribed.map((med, index) => (
                  <div key={index} className="medication-row">
                    <TextField
                      size="small"
                      label="Name"
                      value={med.name}
                      onChange={(e) =>
                        handleMedicationChange(index, "name", e.target.value)
                      }
                    />
                    <TextField
                      size="small"
                      label="Dosage"
                      value={med.dosage}
                      onChange={(e) =>
                        handleMedicationChange(index, "dosage", e.target.value)
                      }
                    />
                    <TextField
                      size="small"
                      label="Frequency"
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
                      size="small"
                      label="Duration"
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
                label="Clinic name"
                required
                fullWidth
                size="small"
                name="clinicName"
                onChange={handleChange}
                value={formData.clinicName}
              />
              <TextField
                label="Administered by (vet name)"
                required
                fullWidth
                size="small"
                name="vetName"
                onChange={handleChange}
                value={formData.vetName}
              />
              <TextField
                label="Weight"
                fullWidth
                size="small"
                name="weight"
                onChange={handleChange}
                value={formData.weight}
              />

              <TextField
                label="Temperature (°C)"
                fullWidth
                size="small"
                name="temperature"
                value={formData.temperature}
                onChange={handleTemperatureChange}
                error={!!tempError}
                helperText={tempError}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">°C</InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Heart rate"
                fullWidth
                size="small"
                name="heartRate"
                onChange={handleChange}
                value={formData.heartRate}
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Follow-up date"
                  format="DD/MM/YYYY"
                  slotProps={{ textField: { size: "small" } }}
                  value={dayjs(formData.followUpDate)}
                  name="followUpDate"
                  onChange={(value) => {
                    handleChange({
                      target: {
                        name: "followUpDate",
                        value: value?.format("DD/MM/YYYY"),
                      },
                    });
                  }}
                />
              </LocalizationProvider>

              <TextField
                label="Notes"
                fullWidth
                size="small"
                name="notes"
                onChange={handleChange}
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
                  value={dayjs(formData.bloodWorkDate)}
                  name="bloodWorkDate"
                  onChange={(value) => {
                    handleChange({
                      target: {
                        name: "bloodWorkDate",
                        value: value?.format("DD/MM/YYYY"),
                      },
                    });
                  }}
                />
              </LocalizationProvider>

              <TextField
                label="Lab/Clinic name"
                required
                fullWidth
                size="small"
                name="labClinicName"
                onChange={handleChange}
                value={formData.labClinicName}
              />

              <div className="blood-tests-table">
                {formData.bloodTests.map((test, index) => (
                  <div key={index} className="blood-test-row">
                    <TextField
                      size="small"
                      label="Test name"
                      value={test.testName}
                      onChange={(e) =>
                        handleBloodTestChange(index, "testName", e.target.value)
                      }
                    />
                    <TextField
                      size="small"
                      label="Result"
                      value={test.result}
                      onChange={(e) =>
                        handleBloodTestChange(index, "result", e.target.value)
                      }
                    />
                    <TextField
                      size="small"
                      label="Reference range"
                      value={test.referenceRange}
                      onChange={(e) =>
                        handleBloodTestChange(
                          index,
                          "referenceRange",
                          e.target.value
                        )
                      }
                    />
                    <TextField
                      size="small"
                      label="Flag"
                      value={test.flag}
                      onChange={(e) =>
                        handleBloodTestChange(index, "flag", e.target.value)
                      }
                    />

                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => removeBloodTestRow(index)}
                      className="remove-blood-test-btn"
                    >
                      X
                    </Button>
                  </div>
                ))}

                <Button
                  variant="outlined"
                  size="small"
                  onClick={addBloodTestRow}
                  className="add-blood-test-btn"
                >
                  Add test
                </Button>
              </div>

              <TextField
                label="Results summary"
                required
                fullWidth
                size="small"
                name="resultsSummary"
                onChange={handleChange}
                value={formData.resultsSummary}
              />
              <TextField
                label="Vet interpretation"
                required
                fullWidth
                size="small"
                name="vetInterpretation"
                onChange={handleChange}
                value={formData.vetInterpretation}
              />
              <TextField
                label="Medication at the time of blood work"
                fullWidth
                size="small"
                name="medicationAtTimeOfBloodWork"
                onChange={handleChange}
                value={formData.medicationAtTimeOfBloodWork}
              />
              <TextField
                label="Notes"
                fullWidth
                size="small"
                name="notes"
                onChange={handleChange}
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
