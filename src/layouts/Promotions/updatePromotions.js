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

const UpdatePromotionModal = ({ promotion, onClose, onUpdate, showUpdateModal }) => {
  const [updatedPromotion, setUpdatedPromotion] = useState({ ...promotion });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPromotion((prevPromotion) => ({
      ...prevPromotion,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const { id } = updatedPromotion;
    console.log(id);
    axios
      .put(`http://localhost:8080/admin/promotions/${id}`, updatedPromotion, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          onClose();
          onUpdate();
        } else {
          console.error("Error updating promotion:", response.statusText);
        }
      })
      .catch((error) => console.error("Error updating promotion:", error));
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
              Modifier une promotion
            </MDTypography>
          </MDBox>
          <MDBox className="modal-body">
            <form>
              <MDBox mb={2}>
                <MDTypography variant="caption">Pourcentage:</MDTypography>
                <MDInput
                  type="text"
                  className="form-control"
                  id="updateNom"
                  name="nom"
                  value={updatedPromotion.pourcentagereduction}
                  onChange={handleChange}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDTypography variant="caption">Description:</MDTypography>
                <MDInput
                  type="text"
                  className="form-control"
                  id="updateDescription"
                  name="description"
                  value={updatedPromotion.description}
                  onChange={handleChange}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDTypography variant="caption">Date debut:</MDTypography>
                <MDInput
                  type="text"
                  className="form-control"
                  id="updateUsername"
                  name="username"
                  value={updatedPromotion.datedebut}
                  onChange={handleChange}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDTypography variant="caption">Date fin:</MDTypography>
                <MDInput
                  type="email"
                  className="form-control"
                  id="updateEmail"
                  name="email"
                  value={updatedPromotion.datefin}
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

export default UpdatePromotionModal;
