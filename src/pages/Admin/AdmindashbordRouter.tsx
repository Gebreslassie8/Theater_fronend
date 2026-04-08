// src/pages/Admin/AdminDashboardRouter.tsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
import AdminDashboard from './AdminDashboard';
import UserManagement from './users/UserManagement';
import AddNewUser from './users/AddNewUser';
import DeactivatedUsers from './users/DeactivatedUsers';
import ActivityLogs from './users/ActivityLogs';
import RolesAndPermissions from './users/RolesAndPermissions';

// Protected Route Component
interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles = [] }) => {
  const userStr = localStorage.getItem('user') || sessionStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

// Admin Dashboard Routes Component
const AdminDashboardRoutes = () => {
  return (
    <Route
      path="/admin"
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
      <Route path="users/add" element={<AddNewUser />} />
      <Route path="users/roles" element={<RolesAndPermissions />} />
      <Route path="users/deactivated" element={<DeactivatedUsers />} />
      <Route path="users/activity-logs" element={<ActivityLogs />} />
      <Route path="wallet" element={<AdminDashboard />} />
      <Route path="wallet/balance" element={<AdminDashboard />} />
      <Route path="wallet/transactions" element={<AdminDashboard />} />
      <Route path="financial" element={<AdminDashboard />} />
      <Route path="financial/revenue" element={<AdminDashboard />} />
      <Route path="theater-accounts" element={<AdminDashboard />} />
      <Route path="registration" element={<AdminDashboard />} />
      <Route path="monitoring" element={<AdminDashboard />} />
      <Route path="security" element={<AdminDashboard />} />
    </Route>
  );
};

export default AdminDashboardRoutes;