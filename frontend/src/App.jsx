import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Billing from './pages/Billing';
import Payments from './pages/Payments';
import Recoveries from './pages/Recoveries';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Packages from './pages/Packages';
import Installations from './pages/Installations';
import Notifications from './pages/Notifications';
import UserPortal from './pages/UserPortal';
import Users from './pages/Users';
import CustomerForm from './pages/CustomerForm';
import CustomerDetail from './pages/CustomerDetail';
import BillForm from './pages/BillForm';
import PaymentForm from './pages/PaymentForm';

import { ROLES } from './utils/constants';

const Layout = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/customers"
            element={
              <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ACCOUNT_MANAGER, ROLES.TECHNICAL_OFFICER, ROLES.RECOVERY_OFFICER]}>
                <Layout>
                  <Customers />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/customers/new"
            element={
              <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ACCOUNT_MANAGER]}>
                <Layout>
                  <CustomerForm />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/customers/:id"
            element={
              <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ACCOUNT_MANAGER, ROLES.TECHNICAL_OFFICER, ROLES.RECOVERY_OFFICER]}>
                <Layout>
                  <CustomerDetail />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/customers/:id/edit"
            element={
              <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ACCOUNT_MANAGER]}>
                <Layout>
                  <CustomerForm />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/billing"
            element={
              <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ACCOUNT_MANAGER, ROLES.CUSTOMER]}>
                <Layout>
                  <Billing />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/billing/new"
            element={
              <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ACCOUNT_MANAGER]}>
                <Layout>
                  <BillForm />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/payments"
            element={
              <ProtectedRoute>
                <Layout>
                  <Payments />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/payments/new"
            element={
              <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ACCOUNT_MANAGER]}>
                <Layout>
                  <PaymentForm />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/recoveries"
            element={
              <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.RECOVERY_OFFICER]}>
                <Layout>
                  <Recoveries />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/reports"
            element={
              <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ACCOUNT_MANAGER]}>
                <Layout>
                  <Reports />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Layout>
                  <Settings />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/users"
            element={
              <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN, ROLES.ADMIN]}>
                <Layout>
                  <Users />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/packages"
            element={
              <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ACCOUNT_MANAGER]}>
                <Layout>
                  <Packages />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/installations"
            element={
              <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ACCOUNT_MANAGER, ROLES.TECHNICAL_OFFICER]}>
                <Layout>
                  <Installations />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <Layout>
                  <Notifications />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/portal"
            element={
              <ProtectedRoute allowedRoles={[ROLES.CUSTOMER]}>
                <Layout>
                  <UserPortal />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

