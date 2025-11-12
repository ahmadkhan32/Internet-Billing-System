# 🔐 RBAC (Role-Based Access Control) System Guide

## Overview

The system now includes a **dynamic Role-Based Access Control (RBAC)** system that allows Super Admin to manage roles and permissions dynamically without changing code.

## Features

✅ **Dynamic Role Management** - Create, edit, and delete custom roles  
✅ **Permission-Based Access** - Assign granular permissions to roles  
✅ **System Roles Protection** - System roles cannot be deleted or modified  
✅ **Permission Middleware** - Use permission checks in routes  
✅ **Default Permissions** - Pre-configured permissions for all resources  

---

## Database Schema

### Tables

1. **`roles`** - Stores role definitions
   - `id` - Primary key
   - `name` - Unique role name (e.g., 'admin', 'account_manager')
   - `display_name` - Human-readable name
   - `description` - Role description
   - `is_system_role` - Whether it's a system role (cannot be deleted)
   - `is_active` - Whether the role is active

2. **`permissions`** - Stores permission definitions
   - `id` - Primary key
   - `name` - Unique permission name (e.g., 'create_bill', 'view_payment')
   - `display_name` - Human-readable name
   - `resource` - Resource type (e.g., 'bills', 'payments', 'customers')
   - `action` - Action type (e.g., 'create', 'read', 'update', 'delete')
   - `description` - Permission description

3. **`role_permissions`** - Junction table (Many-to-Many)
   - `role_id` - Foreign key to roles
   - `permission_id` - Foreign key to permissions

---

## Default Roles & Permissions

### System Roles (Auto-created)

1. **Super Admin** - All permissions
2. **Admin (ISP Owner)** - Full ISP management
3. **Account Manager** - Billing and payments
4. **Technical Officer** - Installations
5. **Recovery Officer** - Bill recovery
6. **Customer** - Self-service portal

### Default Permissions (Organized by Resource)

#### Users
- `view_users`, `create_users`, `update_users`, `delete_users`

#### Customers
- `view_customers`, `create_customers`, `update_customers`, `delete_customers`

#### Packages
- `view_packages`, `create_packages`, `update_packages`, `delete_packages`

#### Bills
- `view_bills`, `create_bills`, `update_bills`, `delete_bills`, `generate_bills`

#### Payments
- `view_payments`, `create_payments`, `update_payments`, `approve_payments`

#### Recoveries
- `view_recoveries`, `create_recoveries`, `update_recoveries`

#### Installations
- `view_installations`, `create_installations`, `update_installations`, `delete_installations`

#### Reports
- `view_reports`, `generate_reports`

#### ISPs (Super Admin only)
- `view_isps`, `create_isps`, `update_isps`, `delete_isps`

#### Roles & Permissions (Super Admin only)
- `view_roles`, `create_roles`, `update_roles`, `delete_roles`, `manage_permissions`

#### Notifications
- `view_notifications`, `create_notifications`

#### Activity Logs
- `view_activity_logs`

---

## API Endpoints

### Roles

- `GET /api/roles` - Get all roles with permissions
- `GET /api/roles/:id` - Get single role with permissions
- `POST /api/roles` - Create new role
- `PUT /api/roles/:id` - Update role
- `DELETE /api/roles/:id` - Delete role (if not system role)
- `POST /api/roles/:id/permissions` - Assign permissions to role
- `GET /api/roles/:id/permissions` - Get role permissions

### Permissions

- `GET /api/permissions` - Get all permissions (grouped by resource)
- `GET /api/permissions/:id` - Get single permission
- `POST /api/permissions` - Create new permission
- `PUT /api/permissions/:id` - Update permission
- `DELETE /api/permissions/:id` - Delete permission (if not assigned to any role)

---

## Using Permission Middleware

### In Routes

Replace role-based checks with permission-based checks:

```javascript
// Old way (role-based)
const { roleMiddleware } = require('../middlewares/roleMiddleware');
router.get('/bills', authMiddleware, roleMiddleware('admin', 'account_manager'), getBills);

// New way (permission-based)
const { permissionMiddleware } = require('../middlewares/roleMiddleware');
router.get('/bills', authMiddleware, permissionMiddleware('view_bills'), getBills);
```

### Multiple Permissions (OR logic)

```javascript
const { anyPermissionMiddleware } = require('../middlewares/roleMiddleware');
router.post('/bills', authMiddleware, anyPermissionMiddleware('create_bills', 'generate_bills'), createBill);
```

### Combining Role and Permission Checks

```javascript
// Use role check for Super Admin access
// Use permission check for granular access
router.get('/bills', 
  authMiddleware, 
  roleMiddleware('super_admin'), // Super admin bypasses permission check
  permissionMiddleware('view_bills'), // Other roles need permission
  getBills
);
```

---

## Frontend Usage

### Accessing Roles & Permissions

1. **Navigate to Roles & Permissions** (Super Admin only)
   - Go to `/roles` to manage roles
   - Go to `/permissions` to manage permissions

2. **Creating a Custom Role**
   - Click "Add Role"
   - Enter role name, display name, and description
   - Select permissions from the grouped list
   - Click "Create"

3. **Editing a Role**
   - Click "Edit" on any role card
   - Modify role details
   - Add/remove permissions
   - Click "Update"

4. **Assigning Permissions**
   - Edit a role
   - Check/uncheck permissions in the grouped list
   - Permissions are organized by resource (bills, payments, etc.)

---

## Example: Creating a Custom Role

### Scenario: "Billing Assistant"

**Steps:**

1. **Create Role:**
   - Name: `billing_assistant`
   - Display Name: `Billing Assistant`
   - Description: `Assists with billing operations`

2. **Assign Permissions:**
   - `view_customers`
   - `view_bills`
   - `create_bills`
   - `update_bills`
   - `view_payments`
   - `create_payments`
   - `view_reports`

3. **Use in Code:**
   ```javascript
   // In routes
   router.get('/bills', 
     authMiddleware, 
     permissionMiddleware('view_bills'), 
     getBills
   );
   ```

4. **Assign to User:**
   - Create user with role: `billing_assistant`
   - User will have only the assigned permissions

---

## Migration from Role-Based to Permission-Based

### Step 1: Update Routes

Replace role checks with permission checks:

```javascript
// Before
router.get('/customers', authMiddleware, roleMiddleware('admin', 'account_manager'), getCustomers);

// After
router.get('/customers', authMiddleware, permissionMiddleware('view_customers'), getCustomers);
```

### Step 2: Update Frontend

Check permissions instead of roles:

```javascript
// Before
{user.role === 'admin' && <button>Create Bill</button>}

// After (if you add permission checking to frontend)
{hasPermission('create_bills') && <button>Create Bill</button>}
```

### Step 3: Test

- Test each role's access
- Verify permissions are enforced
- Check activity logs

---

## Best Practices

1. **Use Permission Checks** - Always use permission middleware for granular control
2. **Keep System Roles** - Don't modify system roles; create custom roles instead
3. **Document Permissions** - Document what each permission allows
4. **Test Thoroughly** - Test each role's access after changes
5. **Activity Logging** - All role/permission changes are logged automatically

---

## Troubleshooting

### Permission Not Working

1. **Check Role Assignment:**
   ```sql
   SELECT r.name, p.name 
   FROM roles r
   JOIN role_permissions rp ON r.id = rp.role_id
   JOIN permissions p ON rp.permission_id = p.id
   WHERE r.name = 'your_role';
   ```

2. **Verify User Role:**
   ```sql
   SELECT id, name, email, role FROM users WHERE email = 'user@example.com';
   ```

3. **Check Permission Name:**
   - Ensure permission name matches exactly (case-sensitive)
   - Check in `/permissions` page

### Role Not Found Error

- Ensure role exists in database
- Check `is_active` status
- Verify role name matches user's role field

### System Role Modification Error

- System roles (`is_system_role = true`) cannot be deleted
- Create custom roles for modifications
- System roles can have permissions updated

---

## API Examples

### Create Custom Role

```bash
POST /api/roles
{
  "name": "billing_assistant",
  "display_name": "Billing Assistant",
  "description": "Assists with billing operations",
  "permission_ids": [1, 2, 3, 4, 5]
}
```

### Assign Permissions to Role

```bash
POST /api/roles/5/permissions
{
  "permission_ids": [1, 2, 3, 4, 5, 6, 7]
}
```

### Create Custom Permission

```bash
POST /api/permissions
{
  "name": "export_reports",
  "display_name": "Export Reports",
  "resource": "reports",
  "action": "export",
  "description": "Export reports to Excel/PDF"
}
```

---

## Summary

✅ **RBAC System** - Fully functional dynamic role and permission management  
✅ **Super Admin Control** - Super Admin can manage all roles and permissions  
✅ **Permission Middleware** - Use `permissionMiddleware()` in routes  
✅ **Frontend UI** - Complete UI for managing roles and permissions  
✅ **Default Setup** - System initializes with default roles and permissions  
✅ **Activity Logging** - All changes are logged automatically  

The system is now ready for dynamic role and permission management! 🎉

