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
const UpdateProductModal = ({ product, onClose, onUpdate, showUpdateModal }) => {
  const [updatedProduct, setUpdatedProduct] = useState({ ...product });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const { id } = updatedProduct;
    console.log(id);
    axios
      .put(`http://localhost:8080/admin/produits/${id}`, updatedProduct, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          onClose();
          onUpdate();
        } else {
          console.error("Error updating product:", response.statusText);
        }
      })
      .catch((error) => console.error("Error updating product:", error));
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
              Modifier un produit
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
                  value={updatedProduct.nom}
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
                  value={updatedProduct.description}
                  onChange={handleChange}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDTypography variant="caption">Categories:</MDTypography>
                <MDInput
                  type="text"
                  className="form-control"
                  id="updateCategories"
                  name="categorie"
                  value={updatedProduct.categorie}
                  onChange={handleChange}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDTypography variant="caption">Image:</MDTypography>
                <MDInput
                  type="email"
                  className="form-control"
                  id="updateImage"
                  name="image"
                  value={updatedProduct.image}
                  onChange={handleChange}
                />
              </MDBox>

              <MDBox mb={2}>
                <MDTypography variant="caption">Prix:</MDTypography>
                <MDInput
                  type="tel"
                  className="form-control"
                  id="updatePrix"
                  name="prix"
                  value={updatedProduct.prix}
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

export default UpdateProductModal;
