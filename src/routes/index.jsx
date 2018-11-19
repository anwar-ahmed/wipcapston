// import Components from "views/Components/Components.jsx";
import LandingPage from "views/LandingPage/LandingPage.jsx";
import IncidentRegistrationPage from "views/IncidentRegistrationPage/IncidentRegistrationPage";
import ActionItemsPage from "views/ActionItemsPage/ActionItemsPage"
import IncidentDetailPage from "views/ActionItemsPage/IncidentDetail"
import NotificationPage from "views/NotificationPage/NotificationPage"
import SOSPage from "views/SOSPage/SOSPage"

// import ProfilePage from "views/ProfilePage/ProfilePage.jsx";
import LoginPage from "views/LoginPage/LoginPage.jsx";
import LoginAsAdminPage from "views/LoginPage/LoginAsAdminPage.jsx";
import SignupPage from "views/SignupPage/SignupPage.jsx";
import ViewIncidentRecord from "views/ViewIncidentRecordPage/ViewIncidentRecord"
import ProfilePage from "views/ProfilePage/ProfilePage"


var indexRoutes = [
//   { path: "/landing-page", name: "LandingPage", component: LandingPage },
  { path: "/notification-page/:type", name: "NotificationPage", component: NotificationPage },
  { path: "/signup-page", name: "SignupPage", component: SignupPage },
  { path: "/login-page", name: "LoginPage", component: LoginPage },
  { path: "/adminlogin-page", name: "LoginPage", component: LoginAsAdminPage },
  {path:"/incidentregistration-page", name: "IncidentRegistrationPage", component: IncidentRegistrationPage},
  {path:"/SOS-page", name: "SOSPage", component: SOSPage},
  {path:"/actionitems-page", name: "ActionItemsPage", component: ActionItemsPage},
  {path:"/profile-page", name: "ProfilePage", component: ProfilePage},
  {path:"/incidentdetail-page/:id" , name: "IncidentDetailPage", component: IncidentDetailPage},
  { path: "/", name: "LandingPage", component: LandingPage }
];

export default indexRoutes;
