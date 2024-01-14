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
const AddUserModal = ({ onClose, onAdd, showAddModal }) => {
  const [newUser, setNewUser] = useState({
    nom: "",
    prenom: "",
    username: "",
    email: "",
    roleName: "",
    telephone: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log(newUser);

    fetch("http://localhost:8080/gestion_events/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => {
        if (response.ok) {
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
              Ajouter un utilisateur
            </MDTypography>
          </MDBox>
          <MDBox className="modal-body">
            <form>
              <MDBox mb={2}>
                <MDTypography variant="caption">Nom:</MDTypography>
                <MDInput
                  type="text"
                  className="form-control"
                  id="addNom"
                  name="nom"
                  value={newUser.nom}
                  onChange={handleChange}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDTypography variant="caption">Prenom:</MDTypography>
                <MDInput
                  type="text"
                  className="form-control"
                  id="addPrenom"
                  name="prenom"
                  value={newUser.prenom}
                  onChange={handleChange}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDTypography variant="caption">Nom d'utilisateur:</MDTypography>
                <MDInput
                  type="text"
                  className="form-control"
                  id="addUsername"
                  name="username"
                  value={newUser.username}
                  onChange={handleChange}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDTypography variant="caption">Email:</MDTypography>
                <MDInput
                  type="email"
                  className="form-control"
                  id="addEmail"
                  name="email"
                  value={newUser.email}
                  onChange={handleChange}
                />
              </MDBox>
              <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
                <InputLabel id="role-select-label">Role</InputLabel>
                <Select
                  labelId="role-select-label"
                  id="addRole"
                  name="roleName"
                  value={newUser.roleName}
                  label="Role"
                  onChange={handleChange}
                  sx={{
                    height: "45px",
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
                  id="addTelephone"
                  name="telephone"
                  value={newUser.telephone}
                  onChange={handleChange}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDTypography variant="caption">Mot de passe:</MDTypography>
                <MDInput
                  type="password"
                  className="form-control"
                  id="addPassword"
                  name="password"
                  value={newUser.password}
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

export default AddUserModal;
