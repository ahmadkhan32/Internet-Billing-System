# 🔐 Roles and Permissions Guide

This document provides a comprehensive overview of all roles and their permissions in the Internet Billing System.

## 📋 Table of Contents
1. [Role Overview](#role-overview)
2. [Detailed Permissions by Role](#detailed-permissions-by-role)
3. [Permission Matrix](#permission-matrix)
4. [Access Control Rules](#access-control-rules)

---

## 👥 Role Overview

The system supports **6 distinct roles** with different access levels:

1. **Super Admin** - System owner with full platform access
2. **Admin (ISP Owner)** - ISP owner with full access to their ISP's data
3. **Account Manager** - Handles billing and customer accounts
4. **Technical Officer** - Manages installations and technical services
5. **Recovery Officer** - Handles payment collection and recovery
6. **Customer** - End-user with access to personal portal

---

## 🔍 Detailed Permissions by Role

### 1. Super Admin (System Owner)

**Role Code:** `super_admin`  
**Description:** Platform administrator with unrestricted access to all ISPs and system-wide data.

#### User Management
- ✅ **View all users** across all ISPs
- ✅ **Create users** with any role (including other super_admins)
- ✅ **Update any user** (name, email, role, ISP assignment, status)
- ✅ **Delete any user** (except themselves)
- ✅ **Assign users** to any ISP
- ✅ **Activate/deactivate** any user account

#### ISP Management
- ✅ **View all ISPs** in the platform
- ✅ **Create new ISP** accounts
- ✅ **Update ISP** information
- ✅ **Delete ISP** accounts
- ✅ **Manage ISP subscriptions** and billing

#### Customer Management
- ✅ **View all customers** across all ISPs
- ✅ **Create customers** for any ISP
- ✅ **Update customer** information
- ✅ **Delete customers** from any ISP

#### Package Management
- ✅ **View all packages** across all ISPs
- ✅ **Create packages** for any ISP
- ✅ **Update packages** for any ISP
- ✅ **Delete packages** from any ISP

#### Billing Management
- ✅ **View all bills** across all ISPs
- ✅ **Create bills** for any customer
- ✅ **Update bills** (amount, due date, status)
- ✅ **Delete bills**
- ✅ **Auto-generate bills** for any ISP
- ✅ **Generate invoices** for any bill
- ✅ **Update bill status** (pending, paid, overdue)

#### Payment Management
- ✅ **View all payments** across all ISPs
- ✅ **Create payments** for any bill
- ✅ **View payment statistics** for all ISPs
- ✅ **Generate payment receipts** for any payment

#### Recovery Management
- ✅ **View all recoveries** across all ISPs
- ✅ **Create recovery records**
- ✅ **Update recovery records**
- ✅ **View overdue bills** for all ISPs

#### Installation Management
- ✅ **View all installations** across all ISPs
- ✅ **Create installations** for any customer
- ✅ **Update installations** (status, bandwidth, connection details)
- ✅ **Delete installations**

#### Reports & Analytics
- ✅ **View dashboard statistics** for all ISPs
- ✅ **Generate revenue reports** for all ISPs
- ✅ **Generate customer reports** for all ISPs
- ✅ **Generate billing reports** for all ISPs

#### Notifications
- ✅ **View all notifications** across all ISPs
- ✅ **Create notifications** for any user/ISP
- ✅ **Manage notification settings**

#### Settings
- ✅ **Access system-wide settings**
- ✅ **Configure global platform settings**
- ✅ **Manage system preferences**

#### Restrictions
- ❌ Cannot delete their own account
- ❌ Cannot access customer portal (separate interface)

---

### 2. Admin (ISP Owner)

**Role Code:** `admin`  
**Description:** ISP owner with full administrative access to their ISP's data and operations.

#### User Management
- ✅ **View users** from their ISP only
- ✅ **Create users** with roles: `account_manager`, `technical_officer`, `recovery_officer`, `customer`
- ✅ **Update users** from their ISP (name, email, role, status)
- ✅ **Delete users** from their ISP
- ✅ **Assign users** to their ISP only
- ✅ **Activate/deactivate** users from their ISP
- ❌ **Cannot create** `super_admin` or `admin` roles
- ❌ **Cannot access** users from other ISPs

#### Customer Management
- ✅ **View customers** from their ISP only
- ✅ **Create customers** for their ISP
- ✅ **Update customer** information (their ISP's customers)
- ✅ **Delete customers** from their ISP
- ❌ **Cannot access** customers from other ISPs

#### Package Management
- ✅ **View packages** from their ISP only
- ✅ **Create packages** for their ISP
- ✅ **Update packages** for their ISP
- ✅ **Delete packages** from their ISP
- ❌ **Cannot access** packages from other ISPs

#### Billing Management
- ✅ **View bills** for their ISP's customers only
- ✅ **Create bills** for their ISP's customers
- ✅ **Update bills** (amount, due date, status)
- ✅ **Delete bills**
- ✅ **Auto-generate bills** for their ISP
- ✅ **Generate invoices** for their ISP's bills
- ✅ **Update bill status** (pending, paid, overdue)

#### Payment Management
- ✅ **View payments** for their ISP's customers only
- ✅ **Create payments** for their ISP's bills
- ✅ **View payment statistics** for their ISP
- ✅ **Generate payment receipts** for their ISP's payments

#### Recovery Management
- ✅ **View recoveries** for their ISP only
- ✅ **Create recovery records** for their ISP
- ✅ **View overdue bills** for their ISP
- ❌ **Cannot update** recovery records (only view and create)

#### Installation Management
- ✅ **View installations** for their ISP's customers only
- ✅ **Create installations** for their ISP's customers
- ✅ **Update installations** (status, bandwidth, connection details)
- ✅ **Delete installations** from their ISP

#### Reports & Analytics
- ✅ **View dashboard statistics** for their ISP
- ✅ **Generate revenue reports** for their ISP
- ✅ **Generate customer reports** for their ISP
- ✅ **Generate billing reports** for their ISP

#### Notifications
- ✅ **View notifications** for their ISP
- ✅ **Create notifications** for their ISP's users
- ✅ **Manage notification settings** for their ISP

#### Settings
- ✅ **Access ISP settings**
- ✅ **Configure ISP preferences**
- ❌ **Cannot access** system-wide settings

#### Profile Management
- ✅ **View own profile**
- ✅ **Update own profile** (name, email, password)

---

### 3. Account Manager

**Role Code:** `account_manager`  
**Description:** Handles customer billing, invoicing, and payment processing for their ISP.

#### User Management
- ❌ **Cannot view** user management
- ❌ **Cannot create** users
- ❌ **Cannot update** other users
- ✅ **Can view** own profile
- ✅ **Can update** own profile (name, email, password)

#### Customer Management
- ✅ **View customers** from their ISP only
- ✅ **View customer details** (read-only access)
- ✅ **Create customers** for their ISP
- ✅ **Update customer** information (their ISP's customers)
- ❌ **Cannot delete** customers

#### Package Management
- ✅ **View packages** from their ISP only
- ✅ **View package details** (read-only access)
- ❌ **Cannot create** packages
- ❌ **Cannot update** packages
- ❌ **Cannot delete** packages

#### Billing Management
- ✅ **View bills** for their ISP's customers only
- ✅ **Create bills** for their ISP's customers
- ✅ **Update bills** (amount, due date, status)
- ✅ **Auto-generate bills** for their ISP
- ✅ **Generate invoices** for their ISP's bills
- ✅ **Update bill status** (pending, paid, overdue)
- ❌ **Cannot delete** bills

#### Payment Management
- ✅ **View payments** for their ISP's customers only
- ✅ **Create payments** for their ISP's bills
- ✅ **View payment statistics** for their ISP
- ✅ **Generate payment receipts** for their ISP's payments

#### Recovery Management
- ❌ **Cannot access** recovery management

#### Installation Management
- ✅ **View installations** for their ISP's customers only
- ✅ **View installation details** (read-only access)
- ✅ **Create installations** for their ISP's customers
- ✅ **Update installations** (status, bandwidth, connection details)
- ❌ **Cannot delete** installations

#### Reports & Analytics
- ✅ **View dashboard statistics** for their ISP
- ✅ **Generate revenue reports** for their ISP
- ✅ **Generate customer reports** for their ISP
- ✅ **Generate billing reports** for their ISP

#### Notifications
- ✅ **View notifications** for their ISP
- ✅ **Receive notifications** related to billing and payments

#### Settings
- ❌ **Cannot access** settings (except own profile)

#### Profile Management
- ✅ **View own profile**
- ✅ **Update own profile** (name, email, password)

---

### 4. Technical Officer

**Role Code:** `technical_officer`  
**Description:** Manages new connection installations, service status, and technical operations.

#### User Management
- ❌ **Cannot view** user management
- ❌ **Cannot create** users
- ❌ **Cannot update** other users
- ✅ **Can view** own profile
- ✅ **Can update** own profile (name, email, password)

#### Customer Management
- ✅ **View customers** from their ISP only
- ✅ **View customer details** (read-only access)
- ❌ **Cannot create** customers
- ❌ **Cannot update** customers
- ❌ **Cannot delete** customers

#### Package Management
- ❌ **Cannot access** package management

#### Billing Management
- ❌ **Cannot access** billing management

#### Payment Management
- ❌ **Cannot access** payment management

#### Recovery Management
- ❌ **Cannot access** recovery management

#### Installation Management
- ✅ **View installations** for their ISP's customers only
- ✅ **View installation details**
- ✅ **Create installations** for their ISP's customers
- ✅ **Update installations** (status, bandwidth, connection details, service status)
- ❌ **Cannot delete** installations

#### Reports & Analytics
- ❌ **Cannot access** reports (except dashboard statistics)
- ✅ **View dashboard statistics** for their ISP

#### Notifications
- ✅ **View notifications** for their ISP
- ✅ **Receive notifications** related to installations and technical issues

#### Settings
- ❌ **Cannot access** settings (except own profile)

#### Profile Management
- ✅ **View own profile**
- ✅ **Update own profile** (name, email, password)

---

### 5. Recovery Officer

**Role Code:** `recovery_officer`  
**Description:** Responsible for collecting pending bills in the field and updating recovery records.

#### User Management
- ❌ **Cannot view** user management
- ❌ **Cannot create** users
- ❌ **Cannot update** other users
- ✅ **Can view** own profile
- ✅ **Can update** own profile (name, email, password)

#### Customer Management
- ✅ **View customers** from their ISP only
- ✅ **View customer details** (read-only access)
- ❌ **Cannot create** customers
- ❌ **Cannot update** customers
- ❌ **Cannot delete** customers

#### Package Management
- ❌ **Cannot access** package management

#### Billing Management
- ❌ **Cannot access** billing management

#### Payment Management
- ✅ **View payments** for their ISP's customers only
- ✅ **Create payments** for their ISP's bills (field collection)
- ✅ **View payment receipts**
- ❌ **Cannot view** payment statistics

#### Recovery Management
- ✅ **View recoveries** assigned to them or their ISP
- ✅ **View recovery details**
- ✅ **Update recovery records** (status, remarks, collection status)
- ❌ **Cannot create** recovery records (only Admin can create)
- ❌ **Cannot view** overdue bills list (only Admin can)

#### Installation Management
- ❌ **Cannot access** installation management

#### Reports & Analytics
- ❌ **Cannot access** reports
- ✅ **View dashboard statistics** for their ISP

#### Notifications
- ✅ **View notifications** for their ISP
- ✅ **Receive notifications** related to recoveries and payments

#### Settings
- ❌ **Cannot access** settings (except own profile)

#### Profile Management
- ✅ **View own profile**
- ✅ **Update own profile** (name, email, password)

---

### 6. Customer

**Role Code:** `customer`  
**Description:** End-user with access to personal portal for viewing bills, making payments, and managing their account.

#### User Management
- ❌ **Cannot view** user management
- ❌ **Cannot create** users
- ✅ **Can view** own profile
- ✅ **Can update** own profile (name, email, password)

#### Customer Management
- ❌ **Cannot access** customer management (admin interface)
- ✅ **Can view** own customer information (via portal)

#### Package Management
- ❌ **Cannot access** package management (admin interface)
- ✅ **Can view** available packages (via portal)

#### Billing Management
- ✅ **View own bills** only
- ✅ **View bill details** and invoices
- ❌ **Cannot create** bills
- ❌ **Cannot update** bills
- ❌ **Cannot delete** bills

#### Payment Management
- ✅ **View own payments** only
- ✅ **Create payments** for own bills (online payment)
- ✅ **View payment receipts** for own payments
- ❌ **Cannot view** payment statistics

#### Recovery Management
- ❌ **Cannot access** recovery management

#### Installation Management
- ❌ **Cannot access** installation management (admin interface)
- ✅ **Can view** own installation details (via portal)

#### Reports & Analytics
- ❌ **Cannot access** reports
- ✅ **View dashboard statistics** (own data only)

#### Notifications
- ✅ **View own notifications** only
- ✅ **Receive notifications** related to bills, payments, and account

#### Settings
- ✅ **Access personal settings**
- ✅ **Update notification preferences**
- ✅ **Manage account settings**

#### Customer Portal
- ✅ **Access personal portal** (dedicated customer interface)
- ✅ **View service status**
- ✅ **View connection details**
- ✅ **View billing history**
- ✅ **Make online payments**
- ✅ **Download invoices and receipts**

---

## 📊 Permission Matrix

### Feature Access Matrix

| Feature | Super Admin | Admin | Account Manager | Technical Officer | Recovery Officer | Customer |
|---------|-------------|-------|-----------------|-------------------|------------------|----------|
| **User Management** |
| View All Users | ✅ All ISPs | ✅ Own ISP | ❌ | ❌ | ❌ | ❌ |
| Create Users | ✅ Any Role | ✅ Staff/Customer | ❌ | ❌ | ❌ | ❌ |
| Update Users | ✅ All | ✅ Own ISP | ❌ | ❌ | ❌ | ❌ |
| Delete Users | ✅ All | ✅ Own ISP | ❌ | ❌ | ❌ | ❌ |
| **Customer Management** |
| View Customers | ✅ All ISPs | ✅ Own ISP | ✅ Own ISP | ✅ Own ISP | ✅ Own ISP | ❌ |
| Create Customers | ✅ All ISPs | ✅ Own ISP | ✅ Own ISP | ❌ | ❌ | ❌ |
| Update Customers | ✅ All | ✅ Own ISP | ✅ Own ISP | ❌ | ❌ | ❌ |
| Delete Customers | ✅ All | ✅ Own ISP | ❌ | ❌ | ❌ | ❌ |
| **Package Management** |
| View Packages | ✅ All ISPs | ✅ Own ISP | ✅ Own ISP | ❌ | ❌ | ❌ |
| Create Packages | ✅ All ISPs | ✅ Own ISP | ❌ | ❌ | ❌ | ❌ |
| Update Packages | ✅ All | ✅ Own ISP | ❌ | ❌ | ❌ | ❌ |
| Delete Packages | ✅ All | ✅ Own ISP | ❌ | ❌ | ❌ | ❌ |
| **Billing Management** |
| View Bills | ✅ All ISPs | ✅ Own ISP | ✅ Own ISP | ❌ | ❌ | ✅ Own |
| Create Bills | ✅ All | ✅ Own ISP | ✅ Own ISP | ❌ | ❌ | ❌ |
| Update Bills | ✅ All | ✅ Own ISP | ✅ Own ISP | ❌ | ❌ | ❌ |
| Delete Bills | ✅ All | ✅ Own ISP | ❌ | ❌ | ❌ | ❌ |
| Auto-Generate Bills | ✅ All | ✅ Own ISP | ✅ Own ISP | ❌ | ❌ | ❌ |
| Generate Invoices | ✅ All | ✅ Own ISP | ✅ Own ISP | ❌ | ❌ | ✅ Own |
| **Payment Management** |
| View Payments | ✅ All ISPs | ✅ Own ISP | ✅ Own ISP | ❌ | ✅ Own ISP | ✅ Own |
| Create Payments | ✅ All | ✅ Own ISP | ✅ Own ISP | ❌ | ✅ Own ISP | ✅ Own |
| View Payment Stats | ✅ All | ✅ Own ISP | ✅ Own ISP | ❌ | ❌ | ❌ |
| Generate Receipts | ✅ All | ✅ Own ISP | ✅ Own ISP | ❌ | ✅ Own ISP | ✅ Own |
| **Recovery Management** |
| View Recoveries | ✅ All ISPs | ✅ Own ISP | ❌ | ❌ | ✅ Own ISP | ❌ |
| Create Recoveries | ✅ All | ✅ Own ISP | ❌ | ❌ | ❌ | ❌ |
| Update Recoveries | ✅ All | ✅ Own ISP | ❌ | ❌ | ✅ Own ISP | ❌ |
| View Overdue Bills | ✅ All | ✅ Own ISP | ❌ | ❌ | ❌ | ❌ |
| **Installation Management** |
| View Installations | ✅ All ISPs | ✅ Own ISP | ✅ Own ISP | ✅ Own ISP | ❌ | ❌ |
| Create Installations | ✅ All | ✅ Own ISP | ✅ Own ISP | ✅ Own ISP | ❌ | ❌ |
| Update Installations | ✅ All | ✅ Own ISP | ✅ Own ISP | ✅ Own ISP | ❌ | ❌ |
| Delete Installations | ✅ All | ✅ Own ISP | ❌ | ❌ | ❌ | ❌ |
| **Reports & Analytics** |
| Dashboard Stats | ✅ All ISPs | ✅ Own ISP | ✅ Own ISP | ✅ Own ISP | ✅ Own ISP | ✅ Own |
| Revenue Reports | ✅ All | ✅ Own ISP | ✅ Own ISP | ❌ | ❌ | ❌ |
| Customer Reports | ✅ All | ✅ Own ISP | ✅ Own ISP | ❌ | ❌ | ❌ |
| Billing Reports | ✅ All | ✅ Own ISP | ✅ Own ISP | ❌ | ❌ | ❌ |
| **Notifications** |
| View Notifications | ✅ All ISPs | ✅ Own ISP | ✅ Own ISP | ✅ Own ISP | ✅ Own ISP | ✅ Own |
| Create Notifications | ✅ All | ✅ Own ISP | ❌ | ❌ | ❌ | ❌ |
| **Settings** |
| System Settings | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| ISP Settings | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Personal Settings | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Customer Portal** |
| Access Portal | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |

---

## 🔒 Access Control Rules

### Multi-Tenant Isolation

1. **Super Admin Exception:**
   - Super Admin bypasses ISP filtering and can access all data
   - All other roles are restricted to their assigned ISP

2. **ISP-Based Filtering:**
   - Admin, Account Manager, Technical Officer, and Recovery Officer can only access data from their assigned ISP
   - Customers can only access their own data
   - All queries automatically filter by `isp_id` for non-super-admin users

3. **Self-Access Rules:**
   - All users can view and update their own profile
   - Customers can view their own bills, payments, and account information
   - Staff roles cannot access other users' personal data

### Role Hierarchy

```
Super Admin (Highest)
    ↓
Admin (ISP Owner)
    ↓
Account Manager / Technical Officer / Recovery Officer (Staff)
    ↓
Customer (End User)
```

### Permission Inheritance

- **Super Admin** has all permissions of all other roles
- **Admin** has all permissions of staff roles for their ISP
- **Staff roles** have specialized permissions within their domain
- **Customer** has minimal permissions for self-service

### Security Constraints

1. **User Creation Restrictions:**
   - Only Super Admin can create Super Admin or Admin roles
   - Admin can only create staff and customer roles
   - Staff roles cannot create any users

2. **Deletion Restrictions:**
   - Users cannot delete their own account
   - Only Super Admin can delete Super Admin accounts
   - Admin cannot delete users from other ISPs

3. **Update Restrictions:**
   - Only Super Admin and Admin can change user roles
   - Admin cannot assign Super Admin or Admin roles
   - Staff roles can only update their own profile

4. **Data Access Restrictions:**
   - All data access is filtered by ISP (except Super Admin)
   - Customers can only access their own data
   - Staff roles cannot access other ISPs' data

---

## 📝 Notes

- **ISP Assignment:** All users except Super Admin must be assigned to an ISP (`isp_id`)
- **Active Status:** Users can be activated/deactivated by Super Admin or Admin
- **Activity Logging:** All actions are logged with user ID, role, and timestamp
- **JWT Authentication:** All routes require valid JWT token
- **Role Middleware:** Routes are protected by role-based middleware
- **ISP Middleware:** Multi-tenant isolation is enforced by ISP middleware

---

## 🔄 Permission Updates

If you need to modify permissions:

1. **Backend Routes:** Update `roleMiddleware()` in route files (`backend/routes/*.js`)
2. **Frontend Routes:** Update `allowedRoles` in `frontend/src/App.jsx`
3. **UI Components:** Update role checks in component files
4. **Sidebar Menu:** Update `roles` array in `frontend/src/components/Sidebar.jsx`

---

**Last Updated:** Generated from codebase analysis  
**Version:** 1.0

