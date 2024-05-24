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
import AddPromotionModal from "./addPromotions";
import MDButton from "components/MDButton";
import UpdatePromotionModal from "./updatePromotions";

function Promotions() {
  const [promotions, setPromotions] = useState([]);
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState("all");

  const handleRoleChange = (role) => {
    setSelectedRole(role);
  };

  const handleUpdateClick = (promotion) => {
    setSelectedPromotion(promotion);
    setShowUpdateModal(true);
  };

  const handleUpdateClose = () => {
    setShowUpdateModal(false);
    setSelectedPromotion(null);
  };

  const handleUpdate = () => {
    loadPromotions();
    handleUpdateClose();
  };

  const handleAddClick = () => {
    setShowAddModal(true);
  };

  const handleAddClose = () => {
    setShowAddModal(false);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/admin/promotions/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          loadPromotions();
        } else {
          console.error("Error deleting promotion:", response.statusText);
        }
      })
      .catch((error) => console.error("Error deleting promotion:", error));
  };

  const loadPromotions = async () => {
    try {
      const response = await axios.get("http://localhost:8080/admin/promotions/{id}");
      setPromotions(response.data);
      console.log(response.data); // Utiliser `response.data` au lieu de `data`
    } catch (error) {
      console.error("Error fetching promotions:", error);
    }
  };

  useEffect(() => {
    loadPromotions();
  }, []);

  const PromotionCard = ({ promotion }) => (
    <div>
      <MDBox display="flex" alignItems="center" lineHeight={1}>
        <MDBox ml={2} lineHeight={1}>
          <MDTypography display="block" variant="button" fontWeight="medium">
            {`${promotion.nom} ${promotion.prenom}`}
          </MDTypography>
          <MDTypography variant="caption">{promotion.email}</MDTypography>
        </MDBox>
      </MDBox>
      <MDTypography variant="caption">{`Telephone: ${promotion.telephone}`}</MDTypography>
      <MDTypography variant="caption">{`Username: ${promotion.username}`}</MDTypography>
      <MDTypography variant="caption">{`Role: ${promotion.role.name}`}</MDTypography>
    </div>
  );

  const columns = [
    { Header: "Pourcentage", accessor: "pourcentage" },
    { Header: "Description", accessor: "description" },
    { Header: "Date debut", accessor: "dateDebut" },
    { Header: "Date fin", accessor: "dateFin" },
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

  const rows = promotions.map((promotion) => ({
    pourcentage: promotion.pourcentage,
    description: promotion.description,
    dateDebut: promotion.dateDebut,
    dateFin: promotion.dateFin,
    actions: "",
    id: promotion.id,
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
                  Promotions
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
        <UpdatePromotionModal
          promotion={selectedPromotion}
          onClose={handleUpdateClose}
          onUpdate={handleUpdate}
          showUpdateModal={showUpdateModal}
        />
      )}
      {showAddModal && (
        <AddPromotionModal
          onClose={handleAddClose}
          onAdd={loadPromotions}
          showAddModal={showAddModal}
        />
      )}
    </DashboardLayout>
  );
}

export default Promotions;
