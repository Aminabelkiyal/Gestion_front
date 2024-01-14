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
import InfoIcon from "@mui/icons-material/Info";
import ShowDetailsModal from "./showDetails";

const Demandes_Attente = () => {
  const [demandes, setDemandes] = useState([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedDemande, setSelectedDemande] = useState(null);

  const loadDemandes = async () => {
    const state = "pending";
    try {
      const response = await axios.get(
        `http://localhost:8080/gestion_events/demande/getByState/${state}`
      );

      setDemandes(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching demandes:", error);
    }
  };

  useEffect(() => {
    loadDemandes();
  }, []);

  const handleInfoClick = (demande) => {
    setSelectedDemande(demande);
    setShowDetailsModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailsModal(false);
    loadDemandes();
  };

  const DemandesCard = ({ demande }) => (
    <div>
      <MDBox display="flex" alignItems="center" lineHeight={1}>
        <MDBox ml={2} lineHeight={1}>
          <MDTypography display="block" variant="button" fontWeight="medium">
            {`${demande.user.nom} ${demande.user.prenom}`}
          </MDTypography>
          <MDTypography variant="caption">{demande.titre}</MDTypography>
        </MDBox>
      </MDBox>
      <MDTypography variant="caption">{`Description: ${demande.description}`}</MDTypography>
      <MDTypography variant="caption">{`Date de debut: ${demande.dateFin}`}</MDTypography>
      <MDTypography variant="caption">{`Date de fin: ${demande.dateFin}`}</MDTypography>
      <MDTypography variant="caption">{`Type: ${demande.type}`}</MDTypography>
    </div>
  );

  const columns = [
    { Header: "Titre de la demande", accessor: "titre" },
    { Header: "Demandeur", accessor: "user" },
    { Header: "Description", accessor: "description" },
    { Header: "Date de debut", accessor: "dateDebut" },
    { Header: "Date de fin", accessor: "dateFin" },
    { Header: "Type", accessor: "type" },
    {
      Header: "Details",
      accessor: "actions",
      Cell: ({ row }) => (
        <div>
          <IconButton color="default" onClick={() => handleInfoClick(row.original)}>
            <InfoIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const rows = demandes.map((demande) => ({
    user: `${demande.user.nom} ${demande.user.prenom}`,
    comiteOrganisation: demande.comiteOrganisation.users.map(
      (user) => `${user.nom} ${user.prenom}`
    ),
    titre: demande.titre,
    description: demande.description,
    dateDebut: demande.dateDebut,
    dateFin: demande.dateFin,
    type: demande.type,
    etat: demande.etat,
    local: demande.local,
    moyendetransport: demande.moyendetransport ? false : "Pas de transport",
    effectif: demande.effectif,
    id: demande.id,
    actions: (
      <IconButton color="default" onClick={() => handleInfoClick(demande)}>
        <InfoIcon />
      </IconButton>
    ),
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
                  Demande en attente
                </MDTypography>
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
      {showDetailsModal && (
        <ShowDetailsModal
          onClose={handleCloseModal}
          showDetailsModal={showDetailsModal}
          selectedDemande={selectedDemande}
        />
      )}
    </DashboardLayout>
  );
};

export default Demandes_Attente;
