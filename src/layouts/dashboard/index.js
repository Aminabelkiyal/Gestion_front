// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

import React, { useState, useEffect } from "react";

function Dashboard() {
  const [statsData, setStatsData] = useState({
    totalRequests: 0,
    pendingRequests: 0,
    acceptedRequests: 0,
    rejectedRequests: 0,
  });

  const [monthlyChartData, setMonthlyChartData] = useState({
    labels: [],
    datasets: { label: "Demandes", data: [] },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/admin/clients");
        const data = await response.json();

        const monthlyTotals = {};
        const allMonths = Array.from({ length: 12 }, (_, i) => i);
        allMonths.forEach((month) => {
          const monthLabel = new Date(`${month + 1}-01-2000`).toLocaleString("en-US", {
            month: "short",
          });
          monthlyTotals[monthLabel] = data.filter(
            (demande) => new Date(demande.dateDebut).getMonth() === month
          ).length;
        });

        setMonthlyChartData({
          labels: Object.keys(monthlyTotals),
          datasets: {
            label: "Total clients",
            data: Object.values(monthlyTotals),
          },
        });
        // Filtrer les demandes en fonction de leur état
        const pendingRequests = data.filter((demande) => demande.etat === "pending").length;
        const acceptedRequests = data.filter((demande) => demande.etat === "Acceptée").length;
        const rejectedRequests = data.filter((demande) => demande.etat === "Rejetée").length;

        setStatsData({
          totalRequests: data.length,
          pendingRequests,
          acceptedRequests,
          rejectedRequests,
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchData();
  }, []);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="assessment"
                title="Total des clients"
                count={statsData.totalRequests}
                percentage={{
                  color: "success",
                  label: "Mis à jour maintenant",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="assessment"
                title="Total des magasins"
                count={statsData.pendingRequests}
                percentage={{
                  color: "success",
                  label: "Mis à jour maintenant",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="assessment"
                title="Total des produits"
                count={statsData.acceptedRequests}
                percentage={{
                  color: "success",
                  label: "Mis à jour maintenant",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="assessment"
                title="Total des promotions"
                count={statsData.rejectedRequests}
                percentage={{
                  color: "success",
                  label: "Mis à jour maintenant",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={12}>
          <Grid container>
            <Grid item xs={8}>
              <MDBox mb={8}>
                <ReportsBarChart
                  color="info"
                  title="Statistiques des promotions par mois"
                  description="Statistiques mensuelles du nombre de promotions"
                  date="Mise à jour récente"
                  chart={monthlyChartData}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
