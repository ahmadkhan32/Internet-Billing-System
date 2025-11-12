# Multi-Tenant SaaS Architecture Implementation

## Overview
This document describes the multi-tenant SaaS architecture implementation for the Internet Billing System. The system now supports complete data isolation per business (tenant), where each business operates independently with its own users, customers, roles, and billing data.

## Key Changes

### 1. Database Schema Updates

#### Role Model (`backend/models/Role.js`)
- **Added `business_id` field**: Roles are now business-specific
  - `NULL` = System-wide roles (Super Admin only)
  - `INTEGER` = Business-specific roles
- **Unique constraint**: `(name, business_id)` ensures role names are unique per business
- **Association**: `Role.belongsTo(ISP)` via `business_id`

#### All Other Models
- Already have `isp_id` field which serves as `business_id`
- All queries filter by `isp_id` for tenant isolation

### 2. Tenant Isolation Middleware

**File**: `backend/middlewares/tenantMiddleware.js`

#### Features:
- **`tenantMiddleware`**: Enforces tenant isolation on all requests
  - Super Admin: Can access all businesses (optional `business_id` filter)
  - Business Admin: Automatically filtered to their `isp_id`
  - Validates business subscription status
- **`buildTenantWhere`**: Helper to build WHERE clauses with tenant isolation
- **`verifyBusinessAccess`**: Verifies user can access requested business

### 3. Role Controller Updates

**File**: `backend/controllers/roleController.js`

#### Changes:
- **`getRoles`**: 
  - Super Admin sees all roles (system + all businesses)
  - Business Admin sees only their business roles
  - Optional `business_id` query param for Super Admin filtering
- **`createRole`**:
  - Super Admin can create system roles (`business_id = null`) or business roles
  - Business Admin can only create roles for their business
  - Validates unique role name per business
- **`updateRole`** / **`deleteRole`**:
  - Business Admin can only modify roles for their business
  - Super Admin can modify any role

### 4. Route Updates

**File**: `backend/routes/roleRoutes.js`

#### Changes:
- Added `tenantMiddleware` to all routes
- Changed access control: Super Admin **OR** Business Admin (admin role) can manage roles
- Business Admin can now create/edit/delete roles for their business

## Architecture

### Data Isolation Strategy

```
┌─────────────────────────────────────────────────────────┐
│                    Super Admin                            │
│              (No business_id / isp_id)                   │
│              Can access ALL businesses                    │
└─────────────────────────────────────────────────────────┘
                          │
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
        ▼                 ▼                 ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  Business 1  │  │  Business 2  │  │  Business 3  │
│  (isp_id=1)  │  │  (isp_id=2)  │  │  (isp_id=3)  │
│              │  │              │  │              │
│ • Users      │  │ • Users      │  │ • Users      │
│ • Customers  │  │ • Customers  │  │ • Customers  │
│ • Roles      │  │ • Roles      │  │ • Roles      │
│ • Bills      │  │ • Bills      │  │ • Bills      │
│ • Payments   │  │ • Payments   │  │ • Payments   │
└──────────────┘  └──────────────┘  └──────────────┘
     │                 │                 │
     └─────────────────┼─────────────────┘
                       │
        Complete Data Isolation
        (No cross-tenant access)
```

### Role Management

#### System Roles (Super Admin)
- `business_id = NULL`
- Created by Super Admin
- Examples: "Super Admin", "System Manager"

#### Business Roles (Business Admin)
- `business_id = <business_id>`
- Created by Business Admin for their business
- Examples: "Manager", "Accountant", "Support Staff"
- Each business can have roles with the same name (isolated)

### Query Examples

#### Super Admin Query (All Businesses)
```javascript
// No filter - sees all
const roles = await Role.findAll();
```

#### Business Admin Query (Filtered)
```javascript
// Automatically filtered by middleware
const roles = await Role.findAll({
  where: { business_id: req.user.isp_id }
});
```

#### Super Admin Query (Specific Business)
```javascript
// Optional filter for specific business
const roles = await Role.findAll({
  where: { business_id: req.query.business_id }
});
```

## Security Features

### 1. Tenant Isolation
- All queries automatically filter by `business_id` (via `isp_id`)
- Business Admin cannot access other businesses' data
- Super Admin can access all businesses (with optional filtering)

### 2. Role-Based Access Control
- Business Admin can create custom roles with checkbox permissions
- Roles are isolated per business
- System roles (Super Admin) are global

### 3. Subscription Validation
- Middleware checks business subscription status
- Inactive businesses cannot access the system
- Super Admin can override (for support)

## Frontend Updates Needed

### 1. Business Context
- Add business selector for Super Admin
- Show current business name in header
- Filter all API calls by business context

### 2. Role Management UI
- Show business name for each role (Super Admin view)
- Hide business selector for Business Admin
- Display "System Role" badge for global roles

### 3. Terminology
- Update "ISP" to "Business" in UI
- Keep database fields as `isp_id` for backward compatibility

## Migration Notes

### Database Migration
The `business_id` column needs to be added to the `roles` table:

```sql
ALTER TABLE roles 
ADD COLUMN business_id INT NULL,
ADD FOREIGN KEY (business_id) REFERENCES isps(id),
ADD UNIQUE INDEX unique_role_per_business (name, business_id);
```

### Existing Roles
- System roles (Super Admin, Admin, etc.) should have `business_id = NULL`
- Business-specific roles should be migrated to have appropriate `business_id`

## Testing Checklist

- [ ] Super Admin can see all roles from all businesses
- [ ] Business Admin can only see roles for their business
- [ ] Business Admin can create roles for their business
- [ ] Business Admin cannot access other businesses' roles
- [ ] Role names can be duplicated across businesses
- [ ] System roles are accessible to Super Admin only
- [ ] Tenant isolation works for all other models (Customers, Bills, etc.)

## Next Steps

1. Update frontend to use "Business" terminology
2. Add business selector for Super Admin
3. Update all controllers to use `tenantMiddleware`
4. Add business context to JWT token
5. Implement business switching/impersonation for Super Admin
6. Update initializeRBAC to create business-specific default roles

