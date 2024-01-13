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
const UpdateUserModal = ({ user, onClose, onUpdate, showUpdateModal }) => {
  const [updatedUser, setUpdatedUser] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log(updatedUser);
    fetch(`http://localhost:8080/gestion_events/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => {
        if (response.ok) {
          onClose();
          onUpdate();
        } else {
          console.error("Error updating user:", response.statusText);
        }
      })
      .catch((error) => console.error("Error updating user:", error));
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
              Modifier un utilisateur
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
                  value={updatedUser.nom}
                  onChange={handleChange}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDTypography variant="caption">Prenom:</MDTypography>
                <MDInput
                  type="text"
                  className="form-control"
                  id="updatePrenom"
                  name="prenom"
                  value={updatedUser.prenom}
                  onChange={handleChange}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDTypography variant="caption">Nom d'utilisateur:</MDTypography>
                <MDInput
                  type="text"
                  className="form-control"
                  id="updateUsername"
                  name="username"
                  value={updatedUser.username}
                  onChange={handleChange}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDTypography variant="caption">Email:</MDTypography>
                <MDInput
                  type="email"
                  className="form-control"
                  id="updateEmail"
                  name="email"
                  value={updatedUser.email}
                  onChange={handleChange}
                />
              </MDBox>
              <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
                <InputLabel id="role-select-label">Role</InputLabel>
                <Select
                  labelId="role-select-label"
                  id="addRole"
                  name="roleName"
                  value={updatedUser.roleName}
                  label="Role"
                  onChange={handleChange}
                  sx={{
                    height: "45px", // Custom height
                    "& .MuiSelect-select": {
                      paddingTop: "10px",
                      paddingBottom: "10px",
                    },
                  }}
                >
                  <MenuItem value="">
                    <em>Select</em>
                  </MenuItem>
                  <MenuItem value="etudiant">Étudiant</MenuItem>
                  <MenuItem value="manager">Manager</MenuItem>
                </Select>
              </FormControl>

              <MDBox mb={2}>
                <MDTypography variant="caption">Telephone:</MDTypography>
                <MDInput
                  type="tel"
                  className="form-control"
                  id="updateTelephone"
                  name="telephone"
                  value={updatedUser.telephone}
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

export default UpdateUserModal;
