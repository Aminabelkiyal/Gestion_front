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

// Ajoutez l'icône par défaut de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const AddStoreModal = ({ onClose, onAdd, showAddModal }) => {
  const [newStore, setNewStore] = useState({
    name: "",
    address: "",
    latitude: "",
    longitude: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStore((prevStore) => ({
      ...prevStore,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    axios("http://localhost:8080/admin/stores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(newStore),
    })
      .then((response) => {
        if (response.status === 200) {
          onAdd();
          onClose();
        } else {
          console.error("Error adding store:", response.statusText);
        }
      })
      .catch((error) => console.error("Error adding store:", error));
  };

  const LocationMarker = () => {
    const map = useMapEvents({
      click(e) {
        setNewStore((prevStore) => ({
          ...prevStore,
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
        }));
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    return newStore.latitude && newStore.longitude ? (
      <Marker position={[newStore.latitude, newStore.longitude]} />
    ) : null;
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
                  name="name"
                  value={newStore.name}
                  onChange={handleChange}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDTypography variant="caption">Adresse:</MDTypography>
                <MDInput
                  type="text"
                  className="form-control"
                  id="addAddress"
                  name="address"
                  value={newStore.address}
                  onChange={handleChange}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDTypography variant="caption">Géolocalisation:</MDTypography>
                <MapContainer
                  style={{ height: "300px", width: "100%" }}
                  center={[51.505, -0.09]}
                  zoom={13}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <LocationMarker />
                </MapContainer>
                {newStore.latitude && newStore.longitude && (
                  <p>
                    Latitude: {newStore.latitude}, Longitude: {newStore.longitude}
                  </p>
                )}
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
