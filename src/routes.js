// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

const routes = [
  {
    type: "collapse",
    name: "Tableau de board",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Utilisateurs",
    key: "utilisateurs",
    icon: <Icon fontSize="small">persons</Icon>,
    route: "/utilisateurs",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Demande en attente",
    key: "billing",
    icon: <HourglassEmptyIcon fontSize="small" />,
    route: "/billing",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Historique de demandes",
    key: "notifications",
    icon: <Icon fontSize="small">history</Icon>,
    route: "/notifications",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "singin",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
    sidebarVisible: false,
  },
  {
    type: "collapse",
    name: "sigup",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
    sidebarVisible: false,
  },
];

export default routes;
