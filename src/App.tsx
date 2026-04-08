
// import React, { useEffect, useState } from 'react';
// import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
// import MainLayout from './layouts/MainLayout';
// import Login from "./components/auth/Login";
// import ForgotPassword from "./components/auth/Forgotpassword";
// import DashboardLayout from "./components/DashboardLayout/DashboardLayout";
// import HomePage from './pages/Home';
// import Blogs from "./pages/Blog";
// import Gallery from "./pages/Gallery";
// import About from "./pages/About";
// import Help from "./pages/Help";
// import Contact from "./pages/Contact";
// import TheaterRegistration from './pages/TheaterRegistration';
// import BookingConfirmation from './pages/Legal/BookingConfirmation';
// import TermsOfService from './pages/Legal/TermsOfService';
// import PrivacyPolicy from './pages/Legal/PrivacyPolicy';
// import CookiePolicy from './pages/Legal/CookiePolicy';

// // admin Dashboard pages
// import AdminDashboard from "./pages/Admin/AdminDashboard";
// import UserManagement from './pages/Admin/users/UserManagement';
// import AddNewUser from './pages/Admin/users/AddNewUser';
// import DeactivatedUsers from './pages/Admin/users/DeactivatedUsers';
// import ActivityLogs from './pages/Admin/users/ActivityLogs';
// // Add this import
// import RolesAndPermissions from './pages/Admin/users/RolesAndPermissions';
// // Owner Dashboard pages
// import OwnerDashboard from "./pages/Owner/OwnerDashboard";
// // mananger Dashboard pages
// import ManagerDashboard from "./pages/Manager/ManagerDashboard";
// // sales Dashboard pages
// import SalesDashboard from "./pages/Salesperson/SalesDashboard";
// // scanner Dashboard pages
// import ScannerDashboard from './pages/QR Scanner/ScannerDashboard';
// // customer Dashboard pages
// import CustomerDashboard from './pages/Customer/CustomerDashboard';

// // Protected Route Component
// interface ProtectedRouteProps {
//   children: React.ReactNode;
//   allowedRoles?: string[];
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles = [] }) => {
//   const location = useLocation();

//   // Get user from storage
//   const userStr = localStorage.getItem('user') || sessionStorage.getItem('user');
//   const user = userStr ? JSON.parse(userStr) : null;

//   console.log('ProtectedRoute - Path:', location.pathname, 'User:', user?.role);

//   // If no user, redirect to login
//   if (!user) {
//     console.log('No user found, redirecting to login');
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   // Check role if specified
//   if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
//     console.log(`Role ${user.role} not allowed for path ${location.pathname}, redirecting to home`);
//     return <Navigate to="/" replace />;
//   }

//   return <>{children}</>;
// };

// // Public Route Component - prevents logged-in users from accessing login page
// const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const location = useLocation();
//   const userStr = localStorage.getItem('user') || sessionStorage.getItem('user');
//   const user = userStr ? JSON.parse(userStr) : null;

//   // If user is logged in, redirect to their dashboard
//   if (user) {
//     console.log('User already logged in, redirecting from login to dashboard');
//     const dashboardPath = getDashboardPath(user.role);
//     return <Navigate to={dashboardPath} replace />;
//   }

//   return <>{children}</>;
// };

// // Helper function to get dashboard path based on role
// const getDashboardPath = (role: string): string => {
//   switch (role) {
//     case 'admin':
//       return '/admin/dashboard';
//     case 'theater_owner':
//       return '/owner/dashboard';
//     case 'manager':
//       return '/manager/dashboard';
//     case 'salesperson':
//       return '/sales/dashboard';
//     case 'scanner':
//       return '/scanner/dashboard';
//     case 'customer':
//       return '/customer/dashboard';
//     default:
//       return '/';
//   }
// };

// function App() {
//   const location = useLocation();

//   console.log('Current path:', location.pathname);

//   return (
//     <Routes>
//       {/* Public routes - accessible to everyone */}
//       <Route path="/" element={<MainLayout />}>
//         <Route index element={<HomePage />} />
//         <Route path="blogs" element={<Blogs />} />
//         <Route path="gallery" element={<Gallery />} />
//         <Route path="about" element={<About />} />
//         <Route path="help" element={<Help />} />
//         <Route path="contact" element={<Contact />} />
//         <Route path="account" element={<TheaterRegistration />} />
//         {/* for footer information */}
//         <Route path="booking" element={<BookingConfirmation />} />
//         <Route path="terms" element={<TermsOfService />} />
//         <Route path="privacy" element={<PrivacyPolicy />} />
//         <Route path="cookies" element={<CookiePolicy />} />
//       </Route>

//       {/* Auth routes - only accessible when NOT logged in */}
//       <Route
//         path="/login"
//         element={
//           <PublicRoute>
//             <Login />
//           </PublicRoute>
//         }
//       />
//       <Route
//         path="/forgot-password"
//         element={
//           <PublicRoute>
//             <ForgotPassword />
//           </PublicRoute>
//         }
//       />

//       {/* Admin Routes - USE RELATIVE PATHS */}
//       <Route
//         path="/admin"

//         // Add these routes inside admin routes

//         element={
//           <ProtectedRoute allowedRoles={['admin']}>
//             <DashboardLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route index element={<Navigate to="/admin/dashboard" replace />} />
//         <Route path="dashboard" element={<AdminDashboard />} />
//         <Route path="users" element={<UserManagement />} />
//         <Route path="users/all" element={<UserManagement />} />
//         <Route path="users/add" element={< AddNewUser />} />
//         <Route path="users/roles" element={<RolesAndPermissions />} />
//         <Route path="users/deactivated" element={<DeactivatedUsers />} />
//         <Route path="users/activity-logs" element={<ActivityLogs />} />
//         <Route path="wallet" element={<AdminDashboard />} />
//         <Route path="wallet/balance" element={<AdminDashboard />} />
//         <Route path="wallet/transactions" element={<AdminDashboard />} />
//         <Route path="financial" element={<AdminDashboard />} />
//         <Route path="financial/revenue" element={<AdminDashboard />} />
//         <Route path="theater-accounts" element={<AdminDashboard />} />
//         <Route path="registration" element={<AdminDashboard />} />
//         <Route path="monitoring" element={<AdminDashboard />} />
//         <Route path="security" element={<AdminDashboard />} />
//       </Route>

//       {/* Theater Owner Routes */}
//       <Route
//         path="/owner"
//         element={
//           <ProtectedRoute allowedRoles={['theater_owner', 'admin']}>
//             <DashboardLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route index element={<Navigate to="/owner/dashboard" replace />} />
//         <Route path="dashboard" element={<OwnerDashboard />} />
//         <Route path="financial" element={<OwnerDashboard />} />
//         <Route path="wallet" element={<OwnerDashboard />} />
//         <Route path="events" element={<OwnerDashboard />} />
//         <Route path="halls" element={<OwnerDashboard />} />
//       </Route>

//       {/* Theater Manager Routes */}
//       <Route
//         path="/manager"
//         element={
//           <ProtectedRoute allowedRoles={['manager', 'theater_owner', 'admin']}>
//             <DashboardLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route index element={<Navigate to="/manager/dashboard" replace />} />
//         <Route path="dashboard" element={<ManagerDashboard />} />
//         <Route path="events" element={<ManagerDashboard />} />
//         <Route path="halls" element={<ManagerDashboard />} />
//         <Route path="inventory" element={<ManagerDashboard />} />
//       </Route>

//       {/* Salesperson Routes */}
//       <Route
//         path="/sales"
//         element={
//           <ProtectedRoute allowedRoles={['salesperson', 'manager', 'theater_owner', 'admin']}>
//             <DashboardLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route index element={<Navigate to="/sales/dashboard" replace />} />
//         <Route path="dashboard" element={<SalesDashboard />} />
//         <Route path="events" element={<SalesDashboard />} />
//         <Route path="seats" element={<SalesDashboard />} />
//         <Route path="payments" element={<SalesDashboard />} />
//       </Route>

//       {/* Scanner Routes */}
//       <Route
//         path="/scanner"
//         element={
//           <ProtectedRoute allowedRoles={['scanner', 'manager', 'theater_owner', 'admin']}>
//             <DashboardLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route index element={<Navigate to="/scanner/dashboard" replace />} />
//         <Route path="dashboard" element={<ScannerDashboard />} />
//         <Route path="validate" element={<ScannerDashboard />} />
//         <Route path="checkin" element={<ScannerDashboard />} />
//         <Route path="stats" element={<ScannerDashboard />} />
//         <Route path="gates" element={<ScannerDashboard />} />
//       </Route>

//       {/* Customer Routes */}
//       <Route
//         path="/customer"
//         element={
//           <ProtectedRoute allowedRoles={['customer']}>
//             <DashboardLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route index element={<Navigate to="/customer/dashboard" replace />} />
//         <Route path="dashboard" element={<CustomerDashboard />} />
//         <Route path="wallet" element={<CustomerDashboard />} />
//         <Route path="my-tickets" element={<CustomerDashboard />} />
//         <Route path="settings" element={<CustomerDashboard />} />
//       </Route>

//       {/* Redirect any unknown routes to home */}
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes >
//   );
// }

// export default App;
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Login from "./components/auth/Login";
import ForgotPassword from "./components/auth/Forgotpassword";
import DashboardLayout from "./components/DashboardLayout/DashboardLayout";
import HomePage from './pages/Home';
import Blogs from "./pages/Blog";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Help from "./pages/Help";
import Contact from "./pages/Contact";
import TheaterRegistration from './pages/TheaterRegistration';
import BookingConfirmation from './pages/Legal/BookingConfirmation';
import TermsOfService from './pages/Legal/TermsOfService';
import PrivacyPolicy from './pages/Legal/PrivacyPolicy';
import CookiePolicy from './pages/Legal/CookiePolicy';

// admin Dashboard pages
import AdminDashboard from "./pages/Admin/AdminDashboard";
import UserManagement from './pages/Admin/users/UserManagement';
// import AddNewUser from './pages/Admin/users/AddUser';
import DeactivatedUsers from './pages/Admin/users/DeactivatedUsers';
import ActivityLogs from './pages/Admin/users/ActivityLogs';
// Add this import
import RolesAndPermissions from './pages/Admin/users/RolesAndPermissions';

// Owner Dashboard pages
import OwnerDashboard from "./pages/Owner/OwnerDashboard";
// mananger Dashboard pages
import ManagerDashboard from "./pages/Manager/ManagerDashboard";
// sales Dashboard pages
import SalesDashboard from "./pages/Salesperson/SalesDashboard";
// scanner Dashboard pages
import ScannerDashboard from './pages/QR Scanner/ScannerDashboard';
// customer Dashboard pages
import CustomerDashboard from './pages/Customer/CustomerDashboard';

// Protected Route Component
interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles = [] }) => {
  const location = useLocation();

  // Get user from storage
  const userStr = localStorage.getItem('user') || sessionStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  console.log('ProtectedRoute - Path:', location.pathname, 'User:', user?.role);

  // If no user, redirect to login
  if (!user) {
    console.log('No user found, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role if specified
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    console.log(`Role ${user.role} not allowed for path ${location.pathname}, redirecting to home`);
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

// Public Route Component - prevents logged-in users from accessing login page
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const userStr = localStorage.getItem('user') || sessionStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  // If user is logged in, redirect to their dashboard
  if (user) {
    console.log('User already logged in, redirecting from login to dashboard');
    const dashboardPath = getDashboardPath(user.role);
    return <Navigate to={dashboardPath} replace />;
  }

  return <>{children}</>;
};

// Helper function to get dashboard path based on role
const getDashboardPath = (role: string): string => {
  switch (role) {
    case 'admin':
      return '/admin/dashboard';
    case 'theater_owner':
      return '/owner/dashboard';
    case 'manager':
      return '/manager/dashboard';
    case 'salesperson':
      return '/sales/dashboard';
    case 'scanner':
      return '/scanner/dashboard';
    case 'customer':
      return '/customer/dashboard';
    default:
      return '/';
  }
};

function App() {
  const location = useLocation();

  console.log('Current path:', location.pathname);

  return (
    <Routes>
      {/* Public routes - accessible to everyone */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="about" element={<About />} />
        <Route path="help" element={<Help />} />
        <Route path="contact" element={<Contact />} />
        <Route path="account" element={<TheaterRegistration />} />
        {/* for footer information */}
        <Route path="booking" element={<BookingConfirmation />} />
        <Route path="terms" element={<TermsOfService />} />
        <Route path="privacy" element={<PrivacyPolicy />} />
        <Route path="cookies" element={<CookiePolicy />} />
      </Route>

      {/* Auth routes - only accessible when NOT logged in */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin"

        // Add these routes inside admin routes

        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="users/all" element={<UserManagement />} />
        <Route path="users/add" element={< AddNewUser />} />
        <Route path="users/roles" element={<RolesAndPermissions />} />
        <Route path="users/deactivated" element={<DeactivatedUsers />} />
        <Route path="users/activity-logs" element={<ActivityLogs />} />
        {/* for syetem wallete management  */}
        <Route path="wallet" element={<AdminDashboard />} />
        <Route path="wallet/balance" element={<WalletBalance />} />
        <Route path="wallet/transactions" element={<TransactionHistory />} />
        <Route path="wallet/deposit" element={<DepositFunds />} />
        <Route path="wallet/withdraw" element={<WithdrawFunds />} />
        <Route path="wallet/payment-methods" element={<PaymentMethods />} />
        <Route path="wallet/bank-accounts" element={<BankAccounts />} />
        <Route path="wallet/commission" element={<Commission />} />
        <Route path="financial/revenue" element={<FinancialReports />} />
      // Add all routes for registration
        <Route path="registration" element={<RegistrationRequests />} />
        <Route path="theater-accounts/pending" element={<RegistrationRequests />} />
        <Route path="registration/approve" element={<RegistrationRequests />} />
        <Route path="registration/reject" element={<RegistrationRequests />} />
        <Route path="registration/documents" element={<RegistrationRequests />} />

        <Route path="monitoring" element={<AdminDashboard />} />
        <Route path="security" element={<AdminDashboard />} />
      </Route>







      {/* Theater Owner Routes */}
      <Route
        path="/owner"
        element={
          <ProtectedRoute allowedRoles={['theater_owner', 'admin']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/owner/dashboard" replace />} />
        <Route path="dashboard" element={<OwnerDashboard />} />
        <Route path="financial" element={<OwnerDashboard />} />
        <Route path="wallet" element={<OwnerDashboard />} />
        <Route path="events" element={<OwnerDashboard />} />
        <Route path="halls" element={<OwnerDashboard />} />
      </Route>

      {/* Theater Manager Routes */}
      <Route
        path="/manager"
        element={
          <ProtectedRoute allowedRoles={['manager', 'theater_owner', 'admin']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/manager/dashboard" replace />} />
        <Route path="dashboard" element={<ManagerDashboard />} />
        <Route path="events" element={<ManagerDashboard />} />
        <Route path="halls" element={<ManagerDashboard />} />
        <Route path="inventory" element={<ManagerDashboard />} />
      </Route>

      {/* Salesperson Routes */}
      <Route
        path="/sales"
        element={
          <ProtectedRoute allowedRoles={['salesperson', 'manager', 'theater_owner', 'admin']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/sales/dashboard" replace />} />
        <Route path="dashboard" element={<SalesDashboard />} />
        <Route path="events" element={<SalesDashboard />} />
        <Route path="seats" element={<SalesDashboard />} />
        <Route path="payments" element={<SalesDashboard />} />
      </Route>

      {/* Scanner Routes */}
      <Route
        path="/scanner"
        element={
          <ProtectedRoute allowedRoles={['scanner', 'manager', 'theater_owner', 'admin']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/scanner/dashboard" replace />} />
        <Route path="dashboard" element={<ScannerDashboard />} />
        <Route path="validate" element={<ScannerDashboard />} />
        <Route path="checkin" element={<ScannerDashboard />} />
        <Route path="stats" element={<ScannerDashboard />} />
        <Route path="gates" element={<ScannerDashboard />} />
      </Route>

      {/* Customer Routes */}
      <Route
        path="/customer"
        element={
          <ProtectedRoute allowedRoles={['customer']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/customer/dashboard" replace />} />
        <Route path="dashboard" element={<CustomerDashboard />} />
        <Route path="wallet" element={<CustomerDashboard />} />
        <Route path="my-tickets" element={<CustomerDashboard />} />
        <Route path="settings" element={<CustomerDashboard />} />
      </Route>

      {/* Redirect any unknown routes to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;