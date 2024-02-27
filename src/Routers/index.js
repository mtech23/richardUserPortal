import { Route, Routes, BrowserRouter } from "react-router-dom";

import AdminLogin from "../Screens/Auth/Login";
import ForgetPassword from "../Screens/Auth/ForgetPassword";
import ForgetPassword2 from "../Screens/Auth/ForgetPassword2";
import ForgetPassword3 from "../Screens/Auth/ForgetPassword3";
import { Dashboard } from "../Screens/Dashboard";

// import { UserManagement } from "../Screens/UserManagement";
import UserManagementDetail from "../Screens/UserManagement/"
import { EditUserDetails } from "../Screens/UserManagement/editUser";

import { MedicalReport } from '../Screens/MedicalReport'
import { MedicalDetails } from "../Screens/MedicalReport/medicalDetails";

import { Subscription } from "../Screens/Subscription";
import { SubscriptionDetails } from "../Screens/Subscription/subscriptionDetails";
import { AddSubscription } from "../Screens/Subscription/AddSubscription";
import { EditSubscription } from "../Screens/Subscription/EditSubscription";

import { UserReport } from "../Screens/UserReport";
import { AddUserReport } from "../Screens/UserReport/AddUserReport";
import { EditReport } from "../Screens/UserReport/EditReport";
import { ReportDetails } from "../Screens/UserReport/ReportDetails";



import { SafeManagement } from "../Screens/safeAdministartion/";
import { SafeDetails } from "../Screens/safeAdministartion/safeDetails";
import { AddSafe } from "../Screens/safeAdministartion/addSafe";

import Profile from "../Screens/Profile";
import EditProfile from "../Screens/Profile/EditProfile";
import ChangePassword from "../Screens/Profile/ChangePassword";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { CategoryManagement } from "../Screens/CategoryManagement";
import Register from "../Screens/Auth/Register";

import ScanData from "../Screens/ScanData";




// user routes 


import UserLogin from '../Screens/UserAccount/Auth/Login'




import Error from "../Screens/Error";


export default function AdminRouter() {
  return (
    <BrowserRouter basename="/medical-customer-portal">
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/forget-password2" element={<ForgetPassword2 />} />
        <Route path="/forget-password3" element={<ForgetPassword3 />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/user-detail/:id" element={<ScanData />} />

        <Route path="/dashboard" element={<ProtectedRoutes Components={Dashboard} />} />

        {/* <Route path="/user-management" element={<ProtectedRoutes Components={UserManagement} />} /> */}
        <Route path="/user-management/" element={<ProtectedRoutes Components={UserManagementDetail} />} />
        <Route path="/user-management/edit-detail/" element={<ProtectedRoutes Components={EditUserDetails} />} />

        <Route path="/medical-management" element={<ProtectedRoutes Components={MedicalReport} />} />
        <Route path="/medical-management/report-detail/:id" element={<ProtectedRoutes Components={MedicalDetails} />} />

        <Route path="/subscription" element={<ProtectedRoutes Components={Subscription} />} />
        <Route path="/subscription/subscription-detail/:id" element={<ProtectedRoutes Components={SubscriptionDetails} />} />
        <Route path="/add-subscription" element={<ProtectedRoutes Components={AddSubscription} />} />
        <Route path="/subscription/edit-subscription/:id" element={<ProtectedRoutes Components={EditSubscription} />} />


        <Route path="/user-reports" element={<ProtectedRoutes Components={UserReport} />} />
        <Route path="/user-reports/report-detail/:id" element={<ProtectedRoutes Components={ReportDetails} />} />
        <Route path="/add-user-report" element={<ProtectedRoutes Components={AddUserReport} />} />
        <Route path="/user-reports/edit-report/:id" element={<ProtectedRoutes Components={EditReport} />} />


        <Route path="/category-management/" element={<ProtectedRoutes Components={CategoryManagement} />} />

        <Route path="/safe-administration" element={<ProtectedRoutes Components={SafeManagement} />} />
        <Route path="/safe-administration/safe-detail/:id" element={<ProtectedRoutes Components={SafeDetails} />} />

        <Route path="/add-safe/" element={<ProtectedRoutes Components={AddSafe} />} />

        <Route path="/profile" element={<ProtectedRoutes Components={Profile} />} />
        <Route path="/profile/edit-profile" element={<ProtectedRoutes Components={EditProfile} />} />
        <Route path="/profile/change-password" element={<ChangePassword />} />

        {/* user link */}

        <Route
          name="user"
          path="user/login"
          element={<UserLogin />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}
