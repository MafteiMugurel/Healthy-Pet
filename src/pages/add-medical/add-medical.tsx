import { useState } from "react";
import SVGIcon from "../../components/svg-icon/svg-icon";
import { Button, TextField } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./add-medical.scss";

const AddMedical = () => {
  const recordType = [
    { id: "vaccine", icon: "syringe" },
    { id: "consultation", icon: "document" },
    { id: "blood work", icon: "drop" },
  ];

  const [selectedRecordType, setSelectedRecordType] = useState({} as any);

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

  return (
    <div className="add-medical-container">
      <div className="add-medical-container__content">
        <div className="add-medical-container__title">
          {/* Id to be removed, for testing purposes only */}
          Add medical records ({animalId})
        </div>
        <p>What medical information would you like to add?</p>

        <div className="add-medical-container__medical-select">
          {recordType.map((medical) => (
            <div key={medical.id} className="medical-option-wrapper">
              <div
                key={medical.id}
                onClick={() => setSelectedRecordType(medical)}
                className={
                  "medical-option" +
                  (selectedRecordType.id === medical.id
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
          {/* TODO there should be no add file anymore because it takes too much to
          implement instead we will have fields only to fill in data */}
          {selectedRecordType.id === "vaccine" && (
            <>
              <TextField required label="Vaccine name" fullWidth size="small" />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Vaccine date"
                  slotProps={{ textField: { size: "small" } }}
                />
              </LocalizationProvider>
            </>
          )}
          {selectedRecordType.id === "consultation" && (
            <>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Document date"
                  slotProps={{ textField: { size: "small" } }}
                />
              </LocalizationProvider>
            </>
          )}
          {selectedRecordType.id === "blood work" && (
            <>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Document date"
                  slotProps={{ textField: { size: "small" } }}
                />
              </LocalizationProvider>
            </>
          )}
          {/* TODO there should be no add file anymore because it takes too much to
          implement instead we will have fields only to fill in data */}
        </form>
        <div className="add-medical-actions">
          <Button
            variant="contained"
            color="success"
            component={RouterLink}
            to="/dashboard"
          >
            save and exit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddMedical;
