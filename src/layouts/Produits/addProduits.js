/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import FormControl from "@mui/material/FormControl"; // Import FormControl
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const AddProductModal = ({ onClose, onAdd, showAddModal }) => {
  const [newProduct, setNewProduct] = useState({
    nom: "",
    prenom: "",
    username: "",
    email: "",
    roleName: "",
    telephone: "",
    password: "",
    image: null,
    imageUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageUpload = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      image: file,
    }));
  };

  const handleSubmit = () => {
    const formData = new FormData();
    for (const key in newProduct) {
      if (key === "image" && newProduct[key]) {
        formData.append(key, newProduct[key]);
      } else {
        formData.append(key, newProduct[key]);
      }
    }

    axios("http://localhost:8080/admin/produits", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    })
      .then((response) => {
        if (response.status === 200) {
          onAdd();
          onClose();
        } else {
          console.error("Error adding product:", response.statusText);
        }
      })
      .catch((error) => console.error("Error adding product:", error));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleImageUpload,
    accept: "image/*",
  });

  const rootProps = getRootProps();
  const inputProps = getInputProps();

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
              Ajouter un produit
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
                  value={newProduct.nom}
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
                  value={newProduct.prenom}
                  onChange={handleChange}
                />
              </MDBox>
              <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
                <InputLabel id="role-select-label">Categories</InputLabel>
                <Select
                  labelId="role-select-label"
                  id="addRole"
                  name="roleName"
                  value={newProduct.roleName}
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
                  <MenuItem value="zara">Homme</MenuItem>
                  <MenuItem value="h&m">Femme</MenuItem>
                  <MenuItem value="miniso">Enfants</MenuItem>
                </Select>
              </FormControl>
              <MDBox mb={2}>
                <MDTypography variant="caption">Image:</MDTypography>
                <div
                  style={{
                    border: "1px dashed #ccc",
                    padding: "10px",
                    textAlign: "center",
                  }}
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...rootProps}
                >
                  <input {...inputProps} />
                  <p>Faites glisser une image ici, ou cliquez pour sélectionner une image</p>
                </div>
                {newProduct.image && <p>Image sélectionnée : {newProduct.image.name}</p>}
                <MDBox mb={2}>
                  <MDTypography variant="caption">ou URL de l'image:</MDTypography>
                  <MDInput
                    type="text"
                    className="form-control"
                    id="addImageUrl"
                    name="imageUrl"
                    value={newProduct.imageUrl}
                    onChange={handleChange}
                  />
                </MDBox>
              </MDBox>
              <MDBox mb={2}>
                <MDTypography variant="caption">Prix:</MDTypography>
                <MDInput
                  type="tel"
                  className="form-control"
                  id="addTelephone"
                  name="telephone"
                  value={newProduct.telephone}
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

export default AddProductModal;
