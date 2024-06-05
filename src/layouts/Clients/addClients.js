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

const AddClientModal = ({ onClose, onAdd, showAddModal }) => {
  const [newClient, setNewClient] = useState({
    nom: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewClient((prevClient) => ({
      ...prevClient,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log(newClient);

    axios
      .post("http://localhost:8080/admin/clients", newClient, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 201) {
          onAdd();
          onClose();
        } else {
          console.error("Error adding user:", response.statusText);
        }
      })
      .catch((error) => console.error("Error adding user:", error));
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
              Ajouter un client
            </MDTypography>
          </MDBox>
          <MDBox className="modal-body">
            <form>
              <MDBox mb={2}>
                <MDTypography variant="caption">Nom Complet :</MDTypography>
                <MDInput
                  type="text"
                  className="form-control"
                  id="addNom"
                  name="nom"
                  value={newClient.nom}
                  onChange={handleChange}
                />
              </MDBox>

              <MDBox mb={2}>
                <MDTypography variant="caption">Email :</MDTypography>
                <MDInput
                  type="email"
                  className="form-control"
                  id="addEmail"
                  name="email"
                  value={newClient.email}
                  onChange={handleChange}
                />
              </MDBox>

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

export default AddClientModal;
