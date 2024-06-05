/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import axios from "axios";

const UpdateMagasinModal = ({ magasin, onClose, onUpdate, showUpdateModal }) => {
  const [updatedMagasin, setUpdatedMagasin] = useState({ ...magasin });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedMagasin((prevMagasin) => ({
      ...prevMagasin,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const { id } = updatedMagasin;
    console.log(id);
    axios
      .put(`http://localhost:8080/admin/magasins/${id}`, updatedMagasin, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          onClose();
          onUpdate();
        } else {
          console.error("Error updating magasin:", response.statusText);
        }
      })
      .catch((error) => console.error("Error updating magasin:", error));
    onUpdate();
  };

  return (
    <MDBox
      className="modal"
      position="fixed"
      zIndex="1050"
      left="0"
      top="0"
      width="100%"
      height="100%"
      overflow="hidden"
      outline="0"
      style={{ display: showUpdateModal ? "block" : "none" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <MDBox className="modal-header">
            <MDTypography variant="h5" className="modal-title">
              Modifier un magasin
            </MDTypography>
          </MDBox>
          <MDBox className="modal-body">
            <form>
              <MDBox mb={2}>
                <MDTypography variant="caption">Nom:</MDTypography>
                <MDInput
                  type="text"
                  className="form-control"
                  id="updateNom"
                  name="nom"
                  value={updatedMagasin.nom}
                  onChange={handleChange}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDTypography variant="caption">Adresse:</MDTypography>
                <MDInput
                  type="text"
                  className="form-control"
                  id="updateAdresse"
                  name="adresse"
                  value={updatedMagasin.adresse}
                  onChange={handleChange}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDTypography variant="caption">Geolocalisation:</MDTypography>
                <MDInput
                  type="text"
                  className="form-control"
                  id="updateGeolocalisation"
                  name="geolocalisation"
                  value={updatedMagasin.geolocalisation}
                  onChange={handleChange}
                />
              </MDBox>

              <MDBox mt={2}>
                <MDButton variant="gradient" color="info" onClick={handleSubmit}>
                  Modifier
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

export default UpdateMagasinModal;
