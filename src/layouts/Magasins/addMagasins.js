/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

const AddStoreModal = ({ onClose, onAdd, showAddModal }) => {
  const [newStore, setNewStore] = useState({
    nom: "",
    adresse: "",
    geolocalisation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStore((prevStore) => ({
      ...prevStore,
      [name]: value,
    }));
  };
  const handleSubmit = () => {
    console.log(newStore);

    axios
      .post("http://localhost:8080/admin/magasins", newStore)
      .then((response) => {
        if (response.status === 201) {
          onAdd();
          onClose();
        } else {
          console.error("Error adding store:", response.statusText);
        }
      })
      .catch((error) => console.error("Error adding store:", error));
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
              Ajouter un magasin
            </MDTypography>
          </MDBox>
          <MDBox className="modal-body">
            <form>
              <MDBox mb={2}>
                <MDTypography variant="caption">Nom:</MDTypography>
                <MDInput
                  type="text"
                  className="form-control"
                  id="addName"
                  name="nom"
                  value={newStore.nom}
                  onChange={handleChange}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDTypography variant="caption">Adresse:</MDTypography>
                <MDInput
                  type="text"
                  className="form-control"
                  id="addAdresse"
                  name="adresse"
                  value={newStore.adresse}
                  onChange={handleChange}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDTypography variant="caption">Geolocalisation:</MDTypography>
                <MDInput
                  type="text"
                  className="form-control"
                  id="addGeolocalisation"
                  name="geolocalisation"
                  value={newStore.geolocalisation}
                  onChange={handleChange}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDTypography variant="caption"> Géolocalisation:</MDTypography>
                <MapContainer
                  style={{ height: "300px", width: "100%" }}
                  center={[51.505, -0.09]}
                  zoom={13}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href=https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                </MapContainer>
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

export default AddStoreModal;
