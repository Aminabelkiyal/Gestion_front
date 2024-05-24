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
import AddCouponModal from "./addCoupons";
import MDButton from "components/MDButton";
import UpdateCouponModal from "./updateCoupons";

function Coupons() {
  const [coupons, setCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState("all");

  const handleRoleChange = (role) => {
    setSelectedRole(role);
  };

  const filteredCoupons =
    selectedRole === "all"
      ? coupons
      : coupons.filter((coupon) => coupon.role.name === selectedRole);

  const handleUpdateClick = (coupon) => {
    setSelectedCoupon(coupon);
    setShowUpdateModal(true);
  };

  const handleUpdateClose = () => {
    setShowUpdateModal(false);
    setSelectedCoupon(null);
  };

  const handleUpdate = () => {
    loadCoupons();
    handleUpdateClose();
  };

  const handleAddClick = () => {
    setShowAddModal(true);
  };

  const handleAddClose = () => {
    setShowAddModal(false);
  };

  const handleDelete = (id) => {
    axios(`http://localhost:8080/admin/coupon/${id}`, {
      // Mis à jour l'URL
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          loadCoupons();
        } else {
          console.error("Error deleting coupon:", response.statusText);
        }
      })
      .catch((error) => console.error("Error deleting coupon:", error));
  };

  const loadCoupons = async () => {
    try {
      const response = await axios.get("http://localhost:8080/admin/coupons"); // Mis à jour l'URL
      setCoupons(response.data);
    } catch (error) {
      console.error("Error fetching coupons:", error);
    }
  };

  useEffect(() => {
    loadCoupons();
  }, []);

  const CouponCard = ({ coupon }) => (
    <div>
      <MDBox display="flex" alignItems="center" lineHeight={1}>
        <MDBox ml={2} lineHeight={1}>
          <MDTypography display="block" variant="button" fontWeight="medium">
            {`${coupon.nom} ${coupon.prenom}`}
          </MDTypography>
          <MDTypography variant="caption">{coupon.email}</MDTypography>
        </MDBox>
      </MDBox>
      <MDTypography variant="caption">{`Telephone: ${coupon.telephone}`}</MDTypography>
      <MDTypography variant="caption">{`Username: ${coupon.username}`}</MDTypography>
      <MDTypography variant="caption">{`Role: ${coupon.role.name}`}</MDTypography>
    </div>
  );

  const columns = [
    { Header: "code", accessor: "code" },
    { Header: "Montant Promotion", accessor: "montant" },
    { Header: "Magasin", accessor: "magasin" },

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

  const rows = coupons.map((coupon) => ({
    name: `${coupon.nom} ${coupon.prenom}`,
    email: coupon.email,
    telephone: coupon.telephone,
    username: coupon.username,
    role: coupon.role.name === "ROLE_ADMIN" ? "Admin" : "Manager",
    actions: "",
    id: coupon.id,
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
                  Coupons
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
        <UpdateCouponModal
          coupon={selectedCoupon}
          onClose={handleUpdateClose}
          onUpdate={handleUpdate}
          showUpdateModal={showUpdateModal}
        />
      )}
      {showAddModal && (
        <AddCouponModal onClose={handleAddClose} onAdd={loadCoupons} showAddModal={showAddModal} />
      )}
    </DashboardLayout>
  );
}

export default Coupons;
