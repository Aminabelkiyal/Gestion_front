/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import RejectionModal from "./rejeterdemander";
import { useState } from "react";

const ShowDetailsModal = ({ onClose, showDetailsModal, selectedDemande }) => {
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  const accepterDemande = () => {
    const demande = {
      id: selectedDemande.id,
    };
    fetch("http://localhost:8080/gestion_events/demande/accepter", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(demande),
    })
      .then((response) => {
        if (response.ok) {
          onClose();
        } else {
          console.error("Error accepting demande:", response.statusText);
        }
      })
      .catch((error) => console.error("Error accepting demande:", error));
  };

  const rejecterDemande = () => {
    setShowRejectionModal(true);
  };

  const handleRejectionReasonChange = (event) => {
    setRejectionReason(event.target.value);
  };

  const handleRejectAndSendReason = () => {
    console.log(selectedDemande.id);
    console.log(rejectionReason);

    fetch(`http://localhost:8080/gestion_events/demande/rejeter`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        demandeId: selectedDemande.id,
        motifTexte: rejectionReason,
      }),
    })
      .then((response) => {
        if (response.ok) {
          onClose();
        } else {
          console.error("Error rejecting demande:", response.statusText);
        }
      })
      .catch((error) => console.error("Error rejecting demande:", error));
  };

  return (
    <MDBox
      className="modal"
      display={showDetailsModal ? "block" : "none"}
      position="fixed"
      zIndex="1050"
      left="0"
      top="0"
      width="100%"
      height="100%"
      overflow="hidden"
      outline="0"
      margin="auto"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <MDBox className="modal-header">
            <MDTypography variant="h5" className="modal-title">
              Details de la demande
            </MDTypography>
          </MDBox>
          <MDBox className="modal-body" display="flex">
            {/* First Column */}
            <MDBox flexBasis="60%" mb={2}>
              <MDTypography variant="h6">Etat de la demande:</MDTypography>
              <MDTypography variant="caption">{selectedDemande.etat}</MDTypography>

              <MDTypography variant="h6">Titre de la demande:</MDTypography>
              <MDTypography variant="caption">{selectedDemande.titre}</MDTypography>

              <MDTypography variant="h6">Demandeur:</MDTypography>
              <MDTypography variant="caption">{`${selectedDemande.user}`}</MDTypography>

              <MDTypography variant="h6">Description :</MDTypography>
              <MDTypography variant="caption">{selectedDemande.description}</MDTypography>
              <MDTypography variant="h6">Effectif :</MDTypography>
              <MDTypography variant="caption">{selectedDemande.effectif}</MDTypography>
            </MDBox>

            {/* Second Column */}
            <MDBox flexBasis="60%" mb={2}>
              <MDTypography variant="h6">Date de debut:</MDTypography>
              <MDTypography variant="caption">{selectedDemande.dateDebut}</MDTypography>

              <MDTypography variant="h6">Date de fin:</MDTypography>
              <MDTypography variant="caption">{selectedDemande.dateFin}</MDTypography>

              <MDTypography variant="h6">Local :</MDTypography>
              <MDTypography variant="caption">{selectedDemande.local}</MDTypography>

              <MDTypography variant="h6">Moyen de transport :</MDTypography>
              <MDTypography variant="caption">{selectedDemande.moyendetransport}</MDTypography>

              <MDTypography variant="h6">Commite d'organisation:</MDTypography>
              <MDTypography variant="caption">
                {selectedDemande.comiteOrganisation.map((userName, index) => (
                  <span key={index}>
                    {userName}
                    {index < selectedDemande.comiteOrganisation.length - 1 ? ", " : ""}
                  </span>
                ))}
              </MDTypography>
            </MDBox>
          </MDBox>

          <MDBox className="modal-footer">
            <MDButton onClick={accepterDemande} variant="contained" color="primary">
              Accepter
            </MDButton>

            <MDButton
              onClick={rejecterDemande}
              variant="outlined"
              color="secondary"
              style={{ marginLeft: "10px" }}
            >
              Rejeter
            </MDButton>
          </MDBox>
        </div>
      </div>
      <RejectionModal
        showRejectionModal={showRejectionModal}
        onClose={() => setShowRejectionModal(false)}
        onReject={handleRejectAndSendReason}
        rejectionReason={rejectionReason}
        onReasonChange={handleRejectionReasonChange}
      />
    </MDBox>
  );
};

export default ShowDetailsModal;
