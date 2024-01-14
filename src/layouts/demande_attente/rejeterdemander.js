/* eslint-disable react/prop-types */
import React from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

const RejectionModal = ({
  showRejectionModal,
  onClose,
  onReject,
  rejectionReason,
  onReasonChange,
}) => {
  return (
    <MDBox
      className="modal"
      display={showRejectionModal ? "block" : "none"}
      position="fixed"
      zIndex="1051"
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
              Motif de Rejet
            </MDTypography>
          </MDBox>
          <MDBox className="modal-body">
            <MDInput
              type="text"
              label="Raison de rejet"
              value={rejectionReason}
              onChange={onReasonChange}
            />
          </MDBox>
          <MDBox className="modal-footer">
            <MDButton onClick={onReject} variant="contained" color="secondary">
              Rejeter
            </MDButton>
            <MDButton
              onClick={onClose}
              variant="outlined"
              color="primary"
              style={{ marginLeft: "10px" }}
            >
              Annuler
            </MDButton>
          </MDBox>
        </div>
      </div>
    </MDBox>
  );
};

export default RejectionModal;
