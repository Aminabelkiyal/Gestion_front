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

const UpdateCouponModal = ({ coupon, onClose, onUpdate, showUpdateModal }) => {
  const [updatedCoupon, setUpdatedCoupon] = useState({ ...coupon });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCoupon((prevCoupon) => ({
      ...prevCoupon,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const { id } = updatedCoupon;
    console.log(id);
    axios
      .put(`http://localhost:8080/admin/coupons/${id}`, updatedCoupon, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          onClose();
          onUpdate();
        } else {
          console.error("Error updating coupon:", response.statusText);
        }
      })
      .catch((error) => console.error("Error updating coupon:", error));
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
              Modifier un coupon
            </MDTypography>
          </MDBox>
          <MDBox className="modal-body">
            <form>
              <MDBox mb={2}>
                <MDTypography variant="caption">Code:</MDTypography>
                <MDInput
                  type="text"
                  className="form-control"
                  id="updateCode"
                  name="code"
                  value={updatedCoupon.code}
                  onChange={handleChange}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDTypography variant="caption">Montant promotion:</MDTypography>
                <MDInput
                  type="text"
                  className="form-control"
                  id="updateMontantpromo"
                  name="montantpromo"
                  value={updatedCoupon.montantpromo}
                  onChange={handleChange}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDTypography variant="caption">Magasin:</MDTypography>
                <MDInput
                  type="text"
                  className="form-control"
                  id="updateMagasin"
                  name="magasin"
                  value={updatedCoupon.magasin}
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

export default UpdateCouponModal;
