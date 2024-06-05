/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import axios from "axios";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";

const AddPromotionModal = ({ onClose, onAdd, showAddModal }) => {
  const [newPromotion, setNewPromotion] = useState({
    pourcentagereduction: "",
    description: "",
    datedebut: "",
    datefin: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPromotion((prevPromotion) => ({
      ...prevPromotion,
      [name]: value,
    }));

    console.log(newPromotion);
  };

  const handleDateChange = (name, date) => {
    setNewPromotion((prevPromotion) => ({
      ...prevPromotion,
      [name]: date,
    }));
  };

  const handleSubmit = () => {
    console.log(newPromotion);

    axios
      .post("http://localhost:8080/admin/promotions", newPromotion, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 201) {
          onAdd();
          onClose();
        } else {
          console.error("Error adding promotion:", response);
        }
      })
      .catch((error) => console.error("Error adding promotion:", error));
  };

  return (
    <MDBox
      className="modal"
      display={showAddModal ? "block" : "none"}
      position="fixed"
      zIndex="1050"
      left="0"
      top="0"
      width="100%"
      height="100%"
      overflow="hidden"
      outline="0"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <MDBox className="modal-header">
            <MDTypography variant="h5" className="modal-title">
              Ajouter une promotion
            </MDTypography>
          </MDBox>
          <MDBox className="modal-body">
            <form>
              <MDBox mb={2}>
                <MDTypography variant="caption">Pourcentage:</MDTypography>
                <MDInput
                  type="text"
                  className="form-control"
                  id="addNom"
                  name="pourcentagereduction"
                  value={newPromotion.pourcentagereduction}
                  onChange={handleChange}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDTypography variant="caption">Description:</MDTypography>
                <MDInput
                  type="text"
                  className="form-control"
                  id="addPrenom"
                  name="description"
                  value={newPromotion.description}
                  onChange={handleChange}
                />
              </MDBox>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MDBox mb={2}>
                  <MDTypography variant="caption">Date debut:</MDTypography>
                  <DatePicker
                    value={newPromotion.dateDebut}
                    onChange={(date) => handleDateChange("datedebut", date)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDTypography variant="caption">Date fin:</MDTypography>
                  <DatePicker
                    value={newPromotion.dateFin}
                    onChange={(date) => handleDateChange("datefin", date)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </MDBox>
              </LocalizationProvider>
              <MDBox mt={2}>
                <MDButton variant="gradient" color="info" onClick={handleSubmit}>
                  Ajouter
                </MDButton>
              </MDBox>
            </form>
          </MDBox>
          <MDBox className="modal-footer">
            <MDButton onClick={onClose} variant="outlined" color="secondary">
              Annuler
            </MDButton>
          </MDBox>
        </div>
      </div>
    </MDBox>
  );
};

export default AddPromotionModal;
