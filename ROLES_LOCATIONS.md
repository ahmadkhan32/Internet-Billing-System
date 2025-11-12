# 📍 Roles and Responsibilities - Location Guide

This document shows **where** roles and responsibilities are defined in the codebase.

---

## 📚 Documentation Files

### 1. **`ROLES_AND_PERMISSIONS.md`** ⭐ PRIMARY DOCUMENTATION
**Location:** Root directory  
**Content:** Complete guide with:
- All 6 roles and their detailed permissions
- Permission matrix table
- Access control rules
- Security constraints
- Role hierarchy

**Key Sections:**
- Role Overview (lines 13-22)
- Detailed Permissions by Role (lines 26-429)
- Permission Matrix (lines 432-488)
- Access Control Rules (lines 492-550)

---

### 2. **`RBAC_GUIDE.md`**
**Location:** Root directory  
**Content:** RBAC system guide with:
- Database schema for roles and permissions
- Default roles and permissions
- API endpoints
- How to use permission middleware
- Frontend usage examples

**Key Sections:**
- Default Roles & Permissions (lines 43-91)
- API Endpoints (lines 94-112)
- Using Permission Middleware (lines 116-150)

---

## 💻 Backend Code Files

### 3. **`backend/utils/initializeRBAC.js`** ⭐ CODE DEFINITION
**Location:** `backend/utils/initializeRBAC.js`  
**Purpose:** Initializes roles and permissions in the database

**Key Content:**
- **Default Permissions** (lines 9-75): All available permissions
- **Default Roles** (lines 78-151): All 6 system roles with their permissions:
  - `super_admin` (lines 79-85)
  - `admin` (lines 86-102)
  - `account_manager` (lines 103-115)
  - `technical_officer` (lines 116-126)
  - `recovery_officer` (lines 127-139)
  - `customer` (lines 140-150)

**This is where roles are PROGRAMMATICALLY defined!**

---

### 4. **`backend/models/Role.js`**
**Location:** `backend/models/Role.js`  
**Purpose:** Database model for roles table

**Key Fields:**
- `name` - Role name (e.g., 'super_admin', 'admin')
- `display_name` - Human-readable name
- `description` - Role description
- `is_system_role` - Whether it's a system role
- `is_active` - Whether the role is active

---

### 5. **`backend/models/Permission.js`**
**Location:** `backend/models/Permission.js`  
**Purpose:** Database model for permissions table

**Key Fields:**
- `name` - Permission name (e.g., 'create_bill', 'view_payment')
- `display_name` - Human-readable name
- `resource` - Resource type (e.g., 'bills', 'payments')
- `action` - Action type (e.g., 'create', 'read', 'update', 'delete')

---

### 6. **`backend/middlewares/roleMiddleware.js`**
**Location:** `backend/middlewares/roleMiddleware.js`  
**Purpose:** Middleware for role-based and permission-based access control

**Functions:**
- `roleMiddleware()` - Check if user has required role
- `permissionMiddleware()` - Check if user has required permission
- `anyPermissionMiddleware()` - Check if user has any of the permissions

---

### 7. **`backend/routes/*.js`**
**Location:** Various route files in `backend/routes/`  
**Purpose:** Routes use role/permission middleware to enforce access

**Example:**
```javascript
// backend/routes/billingRoutes.js
router.get('/bills', 
  authMiddleware, 
  permissionMiddleware('view_bills'), 
  getBills
);
```

---

## 🎨 Frontend Code Files

### 8. **`frontend/src/utils/constants.js`** ⭐ FRONTEND DEFINITIONS
**Location:** `frontend/src/utils/constants.js`  
**Purpose:** Frontend constants for roles

**Key Content:**
- **ROLES** object (lines 3-10): Role codes
- **ROLE_LABELS** object (lines 12-19): Display names
- **ROLE_OPTIONS** array (lines 22-30): For dropdowns

```javascript
export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  ACCOUNT_MANAGER: 'account_manager',
  TECHNICAL_OFFICER: 'technical_officer',
  RECOVERY_OFFICER: 'recovery_officer',
  CUSTOMER: 'customer'
};
```

---

### 9. **`frontend/src/components/RoleBasedAccess.jsx`**
**Location:** `frontend/src/components/RoleBasedAccess.jsx`  
**Purpose:** React component for role-based UI access control

**Usage:**
```jsx
<RoleBasedAccess allowedRoles={['admin', 'account_manager']}>
  <button>Create Bill</button>
</RoleBasedAccess>
```

---

### 10. **`frontend/src/components/ProtectedRoute.jsx`**
**Location:** `frontend/src/components/ProtectedRoute.jsx`  
**Purpose:** Route protection based on roles

---

### 11. **`frontend/src/components/Sidebar.jsx`**
**Location:** `frontend/src/components/Sidebar.jsx`  
**Purpose:** Sidebar menu items filtered by role

**Shows different menu items based on user role**

---

### 12. **`frontend/src/App.jsx`**
**Location:** `frontend/src/App.jsx`  
**Purpose:** Main app routing with role-based access

**Contains route definitions with `allowedRoles` for each route**

---

## 🗄️ Database

### 13. **Database Tables**
**Location:** MySQL database  
**Tables:**
- `roles` - Stores role definitions
- `permissions` - Stores permission definitions
- `role_permissions` - Junction table (many-to-many)
- `users` - Has `role` field referencing role name

**Initialization:**
- Roles and permissions are auto-created by `initializeRBAC.js` on first run
- Or manually via `npm run init-db` in backend

---

## 📋 Quick Reference

### To View Roles & Permissions:
1. **Read Documentation:** `ROLES_AND_PERMISSIONS.md`
2. **Check Code:** `backend/utils/initializeRBAC.js` (lines 78-151)
3. **Frontend Constants:** `frontend/src/utils/constants.js` (lines 3-30)

### To Modify Roles:
1. **Add New Role:** Edit `backend/utils/initializeRBAC.js` → `defaultRoles` array
2. **Add New Permission:** Edit `backend/utils/initializeRBAC.js` → `defaultPermissions` array
3. **Update Frontend:** Edit `frontend/src/utils/constants.js`

### To Check Role Enforcement:
1. **Backend Routes:** Check `backend/routes/*.js` files
2. **Frontend Routes:** Check `frontend/src/App.jsx`
3. **UI Components:** Check `frontend/src/components/RoleBasedAccess.jsx`

---

## 🎯 Summary

| Location | Type | Purpose |
|----------|------|---------|
| `ROLES_AND_PERMISSIONS.md` | 📄 Documentation | Complete role & permission guide |
| `RBAC_GUIDE.md` | 📄 Documentation | RBAC system guide |
| `backend/utils/initializeRBAC.js` | 💻 Code | **Role definitions (source of truth)** |
| `backend/models/Role.js` | 💻 Code | Role database model |
| `backend/models/Permission.js` | 💻 Code | Permission database model |
| `backend/middlewares/roleMiddleware.js` | 💻 Code | Access control middleware |
| `frontend/src/utils/constants.js` | 💻 Code | **Frontend role constants** |
| `frontend/src/components/RoleBasedAccess.jsx` | 💻 Code | UI access control component |
| Database tables | 🗄️ Data | Stored roles and permissions |

---

## 🔍 Most Important Files

1. **`ROLES_AND_PERMISSIONS.md`** - Read this for complete documentation
2. **`backend/utils/initializeRBAC.js`** - Edit this to modify roles/permissions
3. **`frontend/src/utils/constants.js`** - Edit this for frontend role names

---

**Last Updated:** Based on current codebase structure

