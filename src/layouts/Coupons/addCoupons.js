/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import axios from "axios";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const AddCouponModal = ({ onClose, onAdd, showAddModal }) => {
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    montantpromo: "",
    magasinId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "magasin" ? parseInt(value, 10) : value;
    setNewCoupon((prevCoupon) => ({
      ...prevCoupon,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const { code, montantpromo, magasin } = newCoupon;
    const couponData = {
      code,
      montantpromo: parseFloat(montantpromo),
      magasinId: magasin,
    };
    //console.log(newCoupon);

    axios
      .post("http://localhost:8080/admin/coupons/", newCoupon)
      .then((response) => {
        if (response.status === 201) {
          onAdd();
          onClose();
        } else {
          console.error("Error adding coupon:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error adding coupon:", error.response?.data || error.message);
      });
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
              Ajouter un coupon
            </MDTypography>
          </MDBox>
          <MDBox className="modal-body">
            <form>
              <MDBox mb={2}>
                <MDTypography variant="caption">Code :</MDTypography>
                <MDInput
                  type="text"
                  className="form-control"
                  id="addCode"
                  name="code"
                  value={newCoupon.code}
                  onChange={handleChange}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDTypography variant="caption">Montant Promotion :</MDTypography>
                <MDInput
                  type="text"
                  className="form-control"
                  id="addMontantpromo"
                  name="montantpromo"
                  value={newCoupon.montantpromo}
                  onChange={handleChange}
                />
              </MDBox>
              <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
                <InputLabel id="role-select-label">Magasins</InputLabel>
                <Select
                  labelId="role-select-label"
                  id="addMagasin"
                  name="magasin"
                  value={newCoupon.magasin}
                  label="Magasin"
                  onChange={handleChange}
                  sx={{
                    height: "45px",
                    "& .MuiSelect-select": {
                      paddingTop: "10px",
                      paddingBottom: "10px",
                    },
                  }}
                >
                  <MenuItem value="">
                    <em>Select</em>
                  </MenuItem>
                  <MenuItem value="1">Zara</MenuItem>
                  <MenuItem value="2">H&M</MenuItem>
                  <MenuItem value="3">Miniso</MenuItem>
                  <MenuItem value="4">Koton</MenuItem>
                </Select>
              </FormControl>
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

export default AddCouponModal;
