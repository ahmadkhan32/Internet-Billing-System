# Roles & Permissions Initialization Guide

## ✅ Automatic Initialization

The system **automatically initializes** default roles and permissions when the backend server starts.

### Default Roles Created:
1. **Super Admin** - Full system access (all permissions)
2. **Admin (ISP Admin)** - Full ISP management access
3. **Account Manager** - Billing and customer account management
4. **Technical Officer** - Installation and technical services
5. **Recovery Officer** - Payment collection and recovery
6. **Customer** - End-user portal access

### Default Permissions (75+ permissions):
- User Management (view, create, update, delete)
- Customer Management (view, create, update, delete)
- Package Management (view, create, update, delete)
- Bill Management (view, create, update, delete, generate)
- Payment Management (view, create, update, approve)
- Recovery Management (view, create, update)
- Installation Management (view, create, update, delete)
- Reports (view, generate)
- ISP Management (Super Admin only)
- Role & Permission Management (Super Admin only)
- Notifications (view, create)
- Activity Logs (view)

## 🔧 Manual Initialization

If roles are not initialized automatically, you can manually initialize them:

### Option 1: Via Frontend
1. Navigate to `/roles` page
2. Click **"Initialize/Refresh"** button
3. Roles and permissions will be initialized

### Option 2: Via API
```bash
POST /api/roles/initialize
Headers: Authorization: Bearer <super_admin_token>
```

### Option 3: Restart Backend Server
Simply restart the backend server - initialization runs automatically on startup.

## 📋 Database Tables

The following tables are created automatically:
- `roles` - Stores role definitions
- `permissions` - Stores permission definitions
- `role_permissions` - Junction table linking roles to permissions

## 🎯 Features

### View Roles & Permissions
- Navigate to `/roles` page
- See all roles with their assigned permissions
- System roles are marked with a "System" badge
- Custom roles show the business/ISP they belong to

### Create Custom Role
1. Click **"+ Add Role"** button
2. Enter role name, display name, and description
3. Select permissions from the grouped list
4. Click **"Create"**

### Edit Role
1. Click **"Edit"** on any role card
2. Modify role details and permissions
3. System roles can be edited (except name)
4. Click **"Update"**

### Delete Role
1. Click **"Delete"** on a custom role
2. System roles cannot be deleted (protected)
3. Confirm deletion

### Permission Management
- Permissions are grouped by resource (users, customers, bills, etc.)
- Each permission shows: Display Name, Resource, Action
- Use "Select All" / "Deselect All" for quick selection

## 🔐 Access Control

- **Super Admin**: Can view and manage all roles (system + custom)
- **Admin (ISP Admin)**: Can view system roles + create custom roles for their ISP
- **Other Roles**: Cannot access roles management

## 🚀 Initialization Process

When the backend server starts:
1. Database tables are synced (created if they don't exist)
2. Default permissions are created/updated
3. Default roles are created/updated
4. Permissions are assigned to roles
5. System is ready to use

## 📝 SQL Script (Optional)

If you prefer to initialize manually via SQL, you can run the initialization script:

```bash
node backend/utils/syncRBACTables.js
```

Or use the SQL script (if provided separately).

## ⚠️ Troubleshooting

### Issue: "Roles table does not exist"
**Solution**: Restart the backend server. Tables will be created automatically.

### Issue: "No roles found"
**Solution**: 
1. Click "Initialize/Refresh" button on `/roles` page
2. Or restart the backend server

### Issue: Permissions not showing
**Solution**: 
1. Check if permissions table exists
2. Click "Initialize/Refresh" to reinitialize
3. Check backend console for initialization errors

## ✅ Verification

After initialization, you should see:
- 6 default system roles
- 75+ default permissions
- All roles have permissions assigned
- System roles marked with "System" badge

## 🔄 Re-initialization

You can safely re-initialize at any time:
- Existing roles and permissions are updated (not duplicated)
- Custom roles are preserved
- System roles are refreshed with latest permissions

