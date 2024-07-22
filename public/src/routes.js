import React from "react";
import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdOutlineShoppingCart,
  MdGroup,
  MdRoomService,
  MdHandshake,
  MdAssignment,
  MdMonetizationOn,
  MdStar,
  MdExitToApp,
} from "react-icons/md";

// Admin Imports
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";
import RTL from "views/admin/rtl";

// Auth Imports
import SignInCentered from "views/auth/signIn";
import Register from "views/auth/register"; // Import the new Register component

// New Component Imports (assume these components are created for respective pages)
import Users from "views/admin/users";
import Services from "views/admin/services";
import ServiceProviders from "views/admin/serviceProviders";
import ServiceRequests from "views/admin/serviceRequests";
import Payments from "views/admin/payments";
import Reviews from "views/admin/reviews";
import Logout from "views/admin/logout";

const routes = [
  {
    layout: "/auth",
    path: "/sign-in",
    component: SignInCentered,
  },
  {
    layout: "/auth",
    path: "/register",
    component: Register, // Add the new route
  },
  {
    name: "لوحة التحكم",
    layout: "/rtl",
    path: "/rtl-default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: RTL,
  },
  {
    name: "المستخدمين",
    layout: "/rtl",
    path: "/users",
    icon: <Icon as={MdGroup} width='20px' height='20px' color='inherit' />,
    component: Users,
  },
  {
    name: "الخدمات",
    layout: "/rtl",
    path: "/services",
    icon: <Icon as={MdRoomService} width='20px' height='20px' color='inherit' />,
    component: Services,
  },
  {
    name: "مقدمين الخدمات",
    layout: "/rtl",
    path: "/service-providers",
    icon: <Icon as={MdHandshake} width='20px' height='20px' color='inherit' />,
    component: ServiceProviders,
  },
  {
    name: "طلبات الخدمات",
    layout: "/rtl",
    path: "/service-requests",
    icon: <Icon as={MdAssignment} width='20px' height='20px' color='inherit' />,
    component: ServiceRequests,
  },
  {
    name: "الدفع",
    layout: "/rtl",
    path: "/payments",
    icon: <Icon as={MdMonetizationOn} width='20px' height='20px' color='inherit' />,
    component: Payments,
  },
  {
    name: "الآراء",
    layout: "/rtl",
    path: "/reviews",
    icon: <Icon as={MdStar} width='20px' height='20px' color='inherit' />,
    component: Reviews,
  },
  {
    name: "تسجيل الخروج",
    layout: "/rtl",
    path: "/logout",
    icon: <Icon as={MdExitToApp} width='20px' height='20px' color='inherit' />,
    component: Logout,
  }
];

const sidebarRoutes = routes.filter(route => route.name); // Filter out routes without a name (e.g., Sign In)

export { routes, sidebarRoutes };
export default routes;
