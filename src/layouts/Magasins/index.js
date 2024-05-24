/* eslint-disable react/prop-types */
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import axios from "axios";

import React, { useState, useEffect } from "react";
import DataTable from "examples/Tables/DataTable";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import AddMagasinModal from "./addMagasins";
import MDButton from "components/MDButton";
import UpdateMagasinModal from "./updateMagasins";

function Magasins() {
  const [magasins, setMagasins] = useState([]);
  const [selectedMagasin, setSelectedMagasin] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleUpdateClick = (magasin) => {
    setSelectedMagasin(magasin);
    setShowUpdateModal(true);
  };

  const handleUpdateClose = () => {
    setShowUpdateModal(false);
    setSelectedMagasin(null);
  };

  const handleUpdate = () => {
    loadMagasins();
    handleUpdateClose();
  };

  const handleAddClick = () => {
    setShowAddModal(true);
  };

  const handleAddClose = () => {
    setShowAddModal(false);
  };

  const handleDelete = (id) => {
    axios(`http://localhost:8080/admin/magasins/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          loadMagasins();
        } else {
          console.error("Error deleting magasin:", response.statusText);
        }
      })
      .catch((error) => console.error("Error deleting magasin:", error));
  };

  const loadMagasins = async () => {
    try {
      const response = await axios.get("http://localhost:8080/admin/magasins/{id}");
      setMagasins(response.data);
    } catch (error) {
      console.error("Error fetching magasins:", error);
    }
  };

  useEffect(() => {
    loadMagasins();
  }, []);

  const MagasinCard = ({ magasin }) => (
    <div>
      <MDBox display="flex" alignItems="center" lineHeight={1}>
        <MDBox ml={2} lineHeight={1}>
          <MDTypography display="block" variant="button" fontWeight="medium">
            {`${magasin.nom} ${magasin.prenom}`}
          </MDTypography>
          <MDTypography variant="caption">{magasin.email}</MDTypography>
        </MDBox>
      </MDBox>
    </div>
  );

  const columns = [
    { Header: "Nom ", accessor: "name" },
    { Header: "Adresse", accessor: "email" },
    { Header: "geolocalisation", accessor: "telephone" },

    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({ row }) => (
        <div>
          <IconButton onClick={() => handleUpdateClick(row.original)} color="secondary">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(row.original.id)} color="primary">
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const rows = magasins.map((client) => ({
    name: `${magasin.nom} `,
    actions: "",
    id: client.id,
  }));

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h6" color="white">
                  Magasins
                </MDTypography>
                <IconButton onClick={() => handleAddClick()}>
                  <AddIcon />
                </IconButton>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
      {showUpdateModal && (
        <UpdateMagasinModal
          magasin={selectedMagasin}
          onClose={handleUpdateClose}
          onUpdate={handleUpdate}
          showUpdateModal={showUpdateModal}
        />
      )}
      {showAddModal && (
        <AddMagasinModal
          onClose={handleAddClose}
          onAdd={loadMagasins}
          showAddModal={showAddModal}
        />
      )}
    </DashboardLayout>
  );
}

export default Magasins;
