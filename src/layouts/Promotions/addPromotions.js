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
    nom: "",
    prenom: "",
    username: "",
    email: "",
    roleName: "",
    telephone: "",
    password: "",
    dateDebut: null,
    dateFin: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPromotion((prevPromotion) => ({
      ...prevPromotion,
      [name]: value,
    }));
  };

  const handleDateChange = (name, date) => {
    setNewPromotion((prevPromotion) => ({
      ...prevPromotion,
      [name]: date,
    }));
  };

  const handleSubmit = () => {
    console.log(newPromotion);

    axios("http://localhost:8080/admin/promotions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(newPromotion),
    })
      .then((response) => {
        if (response.status === 200) {
          onAdd();
          onClose();
        } else {
          console.error("Error adding promotion:", response.statusText);
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
                  name="nom"
                  value={newPromotion.nom}
                  onChange={handleChange}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDTypography variant="caption">Description:</MDTypography>
                <MDInput
                  type="text"
                  className="form-control"
                  id="addPrenom"
                  name="prenom"
                  value={newPromotion.prenom}
                  onChange={handleChange}
                />
              </MDBox>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MDBox mb={2}>
                  <MDTypography variant="caption">Date debut:</MDTypography>
                  <DatePicker
                    value={newPromotion.dateDebut}
                    onChange={(date) => handleDateChange("dateDebut", date)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDTypography variant="caption">Date fin:</MDTypography>
                  <DatePicker
                    value={newPromotion.dateFin}
                    onChange={(date) => handleDateChange("dateFin", date)}
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
