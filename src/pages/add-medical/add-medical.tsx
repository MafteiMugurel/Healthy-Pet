import { useState } from "react";
import SVGIcon from "../../components/svg-icon/svg-icon";
import { Button, styled, TextField } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./add-medical.scss";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const AddMedical = () => {
  const recordType = [
    { id: "vaccine", icon: "syringe" },
    { id: "consultation", icon: "document" },
    { id: "blood work", icon: "drop" },
  ];
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const [selectedRecordType, setSelectedRecordType] = useState({} as any);

  return (
    <div className="add-medical-container">
      <div className="add-medical-container__content">
        <div className="add-medical-container__title">Add medical records</div>
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

          {selectedRecordType.id && selectedRecordType.id !== "vaccine" && (
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput
                type="file"
                onChange={(event) => console.log(event.target.files)}
              />
            </Button>
          )}
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
