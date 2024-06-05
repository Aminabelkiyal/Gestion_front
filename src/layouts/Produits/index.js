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
import AddProductModal from "./addProduits";
import MDButton from "components/MDButton";
import UpdateProductModal from "./updateProduits";

function Produits() {
  const [produits, setProduits] = useState([]); // Changer `users` en `produits`
  const [selectedProduit, setSelectedProduit] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleUpdateClick = (produit) => {
    setSelectedProduit(produit);
    setShowUpdateModal(true);
  };

  const handleUpdateClose = () => {
    setShowUpdateModal(false);
    setSelectedProduit(null);
  };

  const handleUpdate = () => {
    loadProduits();
    handleUpdateClose();
  };

  const handleAddClick = () => {
    setShowAddModal(true);
  };

  const handleAddClose = () => {
    setShowAddModal(false);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/admin/produits/${id}`)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          loadProduits(); // Changer `loadUsers` en `loadProduits`
        } else {
          console.error("Error deleting user:", response.statusText);
        }
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  const loadProduits = async () => {
    // Changer `loadUsers` en `loadProduits`
    try {
      const response = await axios.get("http://localhost:8080/admin/produits/");
      setProduits(response.data); // Changer `setUsers` en `setProduits`
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    loadProduits(); // Changer `loadUsers` en `loadProduits`
  }, []);

  const ProductCard = ({ product }) => (
    <div>
      <MDBox display="flex" alignItems="center" lineHeight={1}>
        <MDBox ml={2} lineHeight={1}>
          <MDTypography display="block" variant="button" fontWeight="medium">
            {`${user.nom} ${user.prenom}`}
          </MDTypography>
          <MDTypography variant="caption">{user.email}</MDTypography>
        </MDBox>
      </MDBox>
      <MDTypography variant="caption">{`Telephone: ${user.telephone}`}</MDTypography>
      <MDTypography variant="caption">{`Username: ${user.username}`}</MDTypography>
      <MDTypography variant="caption">{`Role: ${user.role.name}`}</MDTypography>
    </div>
  );

  const columns = [
    { Header: "Nom ", accessor: "nom" },
    { Header: "Description", accessor: "description" },
    { Header: "Categorie", accessor: "categorie" },
    { Header: "Image", accessor: "image" },
    { Header: "Prix", accessor: "prix" },
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
  const rows = produits.map((produit) => ({
    nom: produit.nom,
    description: produit.description,
    categorie: produit.categorie,
    image: produit.image,
    prix: produit.prix,
    actions: "",
    id: produit.id,
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
                  Produits
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
        <UpdateProductModal
          product={selectedProduit}
          onClose={handleUpdateClose}
          onUpdate={handleUpdate}
          showUpdateModal={showUpdateModal}
        />
      )}
      {showAddModal && (
        <AddProductModal
          onClose={handleAddClose}
          onAdd={loadProduits}
          showAddModal={showAddModal}
        />
      )}
    </DashboardLayout>
  );
}

export default Produits;
