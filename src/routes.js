// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import Utilisateurs from "layouts/Utilisateurs";
import Produits from "layouts/Produits";
import Clients from "layouts/Clients";
import Magasins from "layouts/Magasins";
import Promotions from "layouts/Promotions";
import Coupons from "layouts/Coupons";

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
    component: <Utilisateurs />,
  },
  {
    type: "collapse",
    name: "Clients",
    key: "clients",
    icon: <Icon fontSize="small">persons</Icon>,
    route: "/clients",
    component: <Clients />,
  },
  {
    type: "collapse",
    name: "Magasins",
    key: "magasins",
    icon: <Icon fontSize="small">stores</Icon>,
    route: "/magasins",
    component: <Magasins />,
  },
  {
    type: "collapse",
    name: "Produits",
    key: "produits",
    icon: <Icon fontSize="small">category</Icon>,
    route: "/produits",
    component: <Produits />,
  },
  {
    type: "collapse",
    name: "Promotions",
    key: "promotions",
    icon: <Icon fontSize="small">local_offer</Icon>,
    route: "/promotions",
    component: <Promotions />,
  },
  {
    type: "collapse",
    name: "Coupons",
    key: "coupons",
    icon: <Icon fontSize="small">confirmation_number</Icon>,
    route: "/coupons",
    component: <Coupons />,
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
