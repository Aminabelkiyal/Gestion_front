import React, { useState, useEffect } from "react";

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

function Dashboard() {
  const [clientStats, setClientStats] = useState({
    totalRequests: 0,
    pendingRequests: 0,
    acceptedRequests: 0,
    rejectedRequests: 0,
  });

  const [productStats, setProductStats] = useState({
    totalRequests: 0,
    pendingRequests: 0,
    acceptedRequests: 0,
    rejectedRequests: 0,
  });

  const [storeStats, setStoreStats] = useState({
    totalRequests: 0,
    pendingRequests: 0,
    acceptedRequests: 0,
    rejectedRequests: 0,
  });

  const [clientChartData, setClientChartData] = useState({
    labels: [],
    datasets: { label: "Demandes", data: [] },
  });

  const [productChartData, setProductChartData] = useState({
    labels: [],
    datasets: { label: "Demandes", data: [] },
  });

  const [storeChartData, setStoreChartData] = useState({
    labels: [],
    datasets: { label: "Demandes", data: [] },
  });

  const [promoChartData, setPromoChartData] = useState({
    labels: [],
    datasets: { label: "Demandes", data: [] },
  });

  useEffect(() => {
    const fetchClientData = async () => {
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

        setClientChartData({
          labels: Object.keys(monthlyTotals),
          datasets: {
            label: "Total clients",
            data: Object.values(monthlyTotals),
          },
        });

        const pendingRequests = data.filter((demande) => demande.etat === "pending").length;
        const acceptedRequests = data.filter((demande) => demande.etat === "Acceptée").length;
        const rejectedRequests = data.filter((demande) => demande.etat === "Rejetée").length;

        setClientStats({
          totalRequests: data.length,
          pendingRequests,
          acceptedRequests,
          rejectedRequests,
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des données clients :", error);
      }
    };

    fetchClientData();
  }, []);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch("http://localhost:8080/admin/produits");
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

        setProductChartData({
          labels: Object.keys(monthlyTotals),
          datasets: {
            label: "Total produits",
            data: Object.values(monthlyTotals),
          },
        });

        const pendingRequests = data.filter((demande) => demande.etat === "pending").length;
        const acceptedRequests = data.filter((demande) => demande.etat === "Acceptée").length;
        const rejectedRequests = data.filter((demande) => demande.etat === "Rejetée").length;

        setProductStats({
          totalRequests: data.length,
          pendingRequests,
          acceptedRequests,
          rejectedRequests,
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des données produits :", error);
      }
    };

    fetchProductData();
  }, []);

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const response = await fetch("http://localhost:8080/admin/magasins");
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

        setStoreChartData({
          labels: Object.keys(monthlyTotals),
          datasets: {
            label: "Total magasins",
            data: Object.values(monthlyTotals),
          },
        });

        const pendingRequests = data.filter((demande) => demande.etat === "pending").length;
        const acceptedRequests = data.filter((demande) => demande.etat === "Acceptée").length;
        const rejectedRequests = data.filter((demande) => demande.etat === "Rejetée").length;

        setStoreStats({
          totalRequests: data.length,
          pendingRequests,
          acceptedRequests,
          rejectedRequests,
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des données produits :", error);
      }
    };

    fetchStoreData();
  }, []);
  useEffect(() => {
    const fetchPromoData = async () => {
      try {
        const response = await fetch("http://localhost:8080/admin/promotions");
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

        setPromoChartData({
          labels: Object.keys(monthlyTotals),
          datasets: {
            label: "Total promotions",
            data: Object.values(monthlyTotals),
          },
        });

        const pendingRequests = data.filter((demande) => demande.etat === "pending").length;
        const acceptedRequests = data.filter((demande) => demande.etat === "Acceptée").length;
        const rejectedRequests = data.filter((demande) => demande.etat === "Rejetée").length;

        setPromoStats({
          totalRequests: data.length,
          pendingRequests,
          acceptedRequests,
          rejectedRequests,
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des données promotions :", error);
      }
    };

    fetchPromoData();
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
                count={clientStats.totalRequests}
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
                count={clientStats.pendingRequests}
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
                count={productStats.totalRequests}
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
                count={productStats.rejectedRequests}
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
                  title="Statistiques des clients par mois"
                  description="Statistiques mensuelles du nombre de clients"
                  date="Mise à jour récente"
                  chart={clientChartData}
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
