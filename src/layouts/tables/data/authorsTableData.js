/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import React, { useState, useEffect } from "react";

export default function data() {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/gestion_events/user");
      setUsers(response.data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const UserCard = ({ user }) => (
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

  return (
    <div>
      {users.map((user, index) => (
        <UserCard key={index} user={user} />
      ))}
    </div>
  );
}
