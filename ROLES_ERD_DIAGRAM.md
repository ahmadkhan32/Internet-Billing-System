# 🔐 Roles & Responsibilities ERD Diagram

## Entity Relationship Diagram (ERD)

This document provides a comprehensive ERD showing the roles, permissions, and relationships in the Internet Billing System.

---

## 📊 Database Schema ERD

```mermaid
erDiagram
    USERS ||--o{ ISPS : "belongs_to"
    USERS {
        int id PK
        string name
        string email UK
        string password
        enum role "super_admin|admin|account_manager|technical_officer|recovery_officer|customer"
        int isp_id FK "NULL for super_admin"
        boolean is_active
        datetime last_login
        datetime createdAt
        datetime updatedAt
    }
    
    ISPS ||--o{ USERS : "has_many"
    ISPS ||--o{ CUSTOMERS : "has_many"
    ISPS ||--o{ PACKAGES : "has_many"
    ISPS ||--o{ ROLES : "has_many"
    ISPS {
        int id PK
        string business_id UK
        string name
        string address
        string contact
        string email
        enum subscription_plan "basic|premium|enterprise"
        enum subscription_status "active|suspended|cancelled|pending|expired"
        int saas_package_id FK
        datetime subscription_start_date
        datetime subscription_end_date
        datetime createdAt
        datetime updatedAt
    }
    
    ROLES ||--o{ ROLE_PERMISSIONS : "has_many"
    ROLES {
        int id PK
        string name UK
        string display_name
        text description
        int business_id FK "NULL for system roles"
        boolean is_system_role
        boolean is_active
        datetime createdAt
        datetime updatedAt
    }
    
    PERMISSIONS ||--o{ ROLE_PERMISSIONS : "has_many"
    PERMISSIONS {
        int id PK
        string name UK
        string display_name
        string resource "bills|payments|customers|packages|users|isps|reports|installations|recoveries|notifications|roles|permissions|activity_logs"
        string action "create|read|update|delete|generate|approve|view|manage"
        text description
        datetime createdAt
        datetime updatedAt
    }
    
    ROLE_PERMISSIONS {
        int id PK
        int role_id FK
        int permission_id FK
        datetime createdAt
        datetime updatedAt
    }
    
    CUSTOMERS ||--o{ BILLS : "has_many"
    CUSTOMERS ||--o{ PAYMENTS : "has_many"
    CUSTOMERS ||--o{ INSTALLATIONS : "has_one"
    CUSTOMERS {
        int id PK
        int isp_id FK
        string customer_id UK
        string name
        string email
        string phone
        string address
        enum status "active|inactive|suspended|disconnected"
        datetime createdAt
        datetime updatedAt
    }
    
    BILLS ||--o{ PAYMENTS : "has_many"
    BILLS {
        int id PK
        int customer_id FK
        int package_id FK
        decimal amount
        enum status "pending|paid|partial|overdue|cancelled"
        date due_date
        datetime createdAt
        datetime updatedAt
    }
    
    PAYMENTS {
        int id PK
        int bill_id FK
        int customer_id FK
        decimal amount
        enum payment_method "cash|card|online|bank_transfer|jazzcash|easypaisa|stripe"
        enum status "pending|approved|rejected"
        datetime payment_date
        datetime createdAt
        datetime updatedAt
    }
    
    INSTALLATIONS {
        int id PK
        int customer_id FK
        int isp_id FK
        enum status "pending|active|suspended|disconnected"
        string connection_type
        decimal bandwidth
        datetime installation_date
        datetime createdAt
        datetime updatedAt
    }
    
    PACKAGES {
        int id PK
        int isp_id FK "NULL for SaaS packages"
        string name
        decimal price
        int duration_months
        decimal bandwidth
        enum status "active|inactive"
        datetime createdAt
        datetime updatedAt
    }
    
    SAAS_PACKAGES ||--o{ ISPS : "subscribed_by"
    SAAS_PACKAGES {
        int id PK
        string name
        decimal price
        int duration_months
        string features
        enum status "active|inactive"
        datetime createdAt
        datetime updatedAt
    }
```

---

## 🏗️ Role Hierarchy & Access Control

```mermaid
graph TD
    SA[Super Admin<br/>👑 System Owner] -->|Full Access| ALL[All ISPs & Data]
    
    SA -->|Creates & Manages| ISP1[ISP 1]
    SA -->|Creates & Manages| ISP2[ISP 2]
    SA -->|Creates & Manages| ISP3[ISP N...]
    
    ISP1 -->|Has| ADMIN1[Admin/ISP Owner<br/>🏢 Business Admin]
    ISP2 -->|Has| ADMIN2[Admin/ISP Owner<br/>🏢 Business Admin]
    
    ADMIN1 -->|Manages| STAFF1[Staff Roles]
    ADMIN2 -->|Manages| STAFF2[Staff Roles]
    
    STAFF1 -->|Includes| AM1[Account Manager<br/>💰 Billing]
    STAFF1 -->|Includes| TO1[Technical Officer<br/>🔧 Installations]
    STAFF1 -->|Includes| RO1[Recovery Officer<br/>💵 Collections]
    
    ISP1 -->|Has| CUST1[Customers<br/>👤 End Users]
    ISP2 -->|Has| CUST2[Customers<br/>👤 End Users]
    
    CUST1 -->|Can Access| PORTAL1[Customer Portal<br/>📱 Self-Service]
    CUST2 -->|Can Access| PORTAL2[Customer Portal<br/>📱 Self-Service]
    
    style SA fill:#ff6b6b,stroke:#c92a2a,stroke-width:3px,color:#fff
    style ADMIN1 fill:#4dabf7,stroke:#1971c2,stroke-width:2px,color:#fff
    style ADMIN2 fill:#4dabf7,stroke:#1971c2,stroke-width:2px,color:#fff
    style AM1 fill:#51cf66,stroke:#2f9e44,stroke-width:2px,color:#fff
    style TO1 fill:#ffd43b,stroke:#f59f00,stroke-width:2px,color:#000
    style RO1 fill:#ff922b,stroke:#d9480f,stroke-width:2px,color:#fff
    style CUST1 fill:#ae3ec9,stroke:#862e9c,stroke-width:2px,color:#fff
    style CUST2 fill:#ae3ec9,stroke:#862e9c,stroke-width:2px,color:#fff
```

---

## 🔐 Permission Flow Diagram

```mermaid
flowchart LR
    USER[User Login] -->|Has Role| ROLE{User Role}
    
    ROLE -->|super_admin| SA_PERM[All Permissions<br/>*]
    ROLE -->|admin| ADMIN_PERM[ISP Management<br/>+ Staff Permissions]
    ROLE -->|account_manager| AM_PERM[Billing & Payments<br/>+ Customer Management]
    ROLE -->|technical_officer| TO_PERM[Installations Only]
    ROLE -->|recovery_officer| RO_PERM[Recovery & Payments]
    ROLE -->|customer| CUST_PERM[Self-Service Portal]
    
    SA_PERM -->|Can Access| ALL_RESOURCES[All Resources<br/>All ISPs]
    ADMIN_PERM -->|Can Access| ISP_RESOURCES[Own ISP Resources]
    AM_PERM -->|Can Access| BILLING_RESOURCES[Billing Resources]
    TO_PERM -->|Can Access| INSTALL_RESOURCES[Installation Resources]
    RO_PERM -->|Can Access| RECOVERY_RESOURCES[Recovery Resources]
    CUST_PERM -->|Can Access| OWN_DATA[Own Data Only]
    
    ALL_RESOURCES -->|Filtered By| TENANT[Tenant Middleware]
    ISP_RESOURCES -->|Filtered By| TENANT
    BILLING_RESOURCES -->|Filtered By| TENANT
    INSTALL_RESOURCES -->|Filtered By| TENANT
    RECOVERY_RESOURCES -->|Filtered By| TENANT
    OWN_DATA -->|Filtered By| TENANT
    
    TENANT -->|Super Admin| NO_FILTER[No Filter<br/>Access All]
    TENANT -->|Other Roles| ISP_FILTER[Filter by isp_id]
    TENANT -->|Customer| SELF_FILTER[Filter by user_id]
```

---

## 📋 Role-Permission Matrix

```mermaid
graph TB
    subgraph "System Roles"
        SA[Super Admin<br/>All Permissions: *]
    end
    
    subgraph "Business Roles"
        ADMIN[Admin/ISP Owner<br/>Full ISP Management]
    end
    
    subgraph "Staff Roles"
        AM[Account Manager<br/>Billing & Accounts]
        TO[Technical Officer<br/>Installations]
        RO[Recovery Officer<br/>Collections]
    end
    
    subgraph "End User"
        CUST[Customer<br/>Self-Service]
    end
    
    subgraph "Permissions"
        P1[Users: CRUD]
        P2[Customers: CRUD]
        P3[Packages: CRUD]
        P4[Bills: CRUD + Generate]
        P5[Payments: CRUD + Approve]
        P6[Recoveries: CRUD]
        P7[Installations: CRUD]
        P8[Reports: View + Generate]
        P9[ISPs: CRUD]
        P10[Roles: CRUD]
        P11[Permissions: CRUD]
        P12[Notifications: CRUD]
        P13[Activity Logs: View]
    end
    
    SA -->|Has| P1
    SA -->|Has| P2
    SA -->|Has| P3
    SA -->|Has| P4
    SA -->|Has| P5
    SA -->|Has| P6
    SA -->|Has| P7
    SA -->|Has| P8
    SA -->|Has| P9
    SA -->|Has| P10
    SA -->|Has| P11
    SA -->|Has| P12
    SA -->|Has| P13
    
    ADMIN -->|Has| P1
    ADMIN -->|Has| P2
    ADMIN -->|Has| P3
    ADMIN -->|Has| P4
    ADMIN -->|Has| P5
    ADMIN -->|Has| P6
    ADMIN -->|Has| P7
    ADMIN -->|Has| P8
    ADMIN -->|Has| P12
    
    AM -->|Has| P2
    AM -->|Has| P3
    AM -->|Has| P4
    AM -->|Has| P5
    AM -->|Has| P8
    
    TO -->|Has| P2
    TO -->|Has| P7
    
    RO -->|Has| P2
    RO -->|Has| P5
    RO -->|Has| P6
    
    CUST -->|Has| P2
    CUST -->|Has| P4
    CUST -->|Has| P5
```

---

## 🔄 Data Access Flow

```mermaid
sequenceDiagram
    participant User
    participant Auth as Auth Middleware
    participant Role as Role Middleware
    participant Tenant as Tenant Middleware
    participant Permission as Permission Check
    participant DB as Database
    
    User->>Auth: Request with JWT Token
    Auth->>Auth: Verify Token
    Auth->>Auth: Extract User Info
    Auth->>Role: Check User Role
    Role->>Role: Validate Role Access
    Role->>Tenant: Apply Tenant Isolation
    alt Super Admin
        Tenant->>Tenant: Skip Filter (Access All)
    else Admin/Staff
        Tenant->>Tenant: Filter by isp_id
    else Customer
        Tenant->>Tenant: Filter by user_id
    end
    Tenant->>Permission: Check Permissions
    Permission->>Permission: Verify Permission
    Permission->>DB: Execute Query with Filters
    DB->>Permission: Return Filtered Data
    Permission->>Tenant: Return Results
    Tenant->>Role: Return Results
    Role->>Auth: Return Results
    Auth->>User: Return Response
```

---

## 📊 Role Responsibilities Summary Table

| Role | Level | Primary Responsibility | Data Access | Can Create Users | Can Manage ISPs |
|------|-------|----------------------|-------------|------------------|-----------------|
| **Super Admin** | 1 | Platform owner, manages all ISPs | All ISPs | ✅ All roles | ✅ Yes |
| **Admin (ISP Owner)** | 2 | Business owner, manages ISP operations | Own ISP only | ✅ Staff & Customer | ❌ No |
| **Account Manager** | 3 | Billing & customer accounts | Own ISP only | ❌ No | ❌ No |
| **Technical Officer** | 3 | Installations & technical services | Own ISP only | ❌ No | ❌ No |
| **Recovery Officer** | 3 | Payment collection & recovery | Own ISP only | ❌ No | ❌ No |
| **Customer** | 4 | Self-service portal access | Own data only | ❌ No | ❌ No |

---

## 🎯 Key Relationships

### 1. User → ISP Relationship
- **Super Admin**: `isp_id = NULL` (can access all ISPs)
- **All Other Roles**: `isp_id = <ISP_ID>` (restricted to one ISP)
- **Multi-tenant Isolation**: All queries filtered by `isp_id` except Super Admin

### 2. Role → Permission Relationship
- **Many-to-Many**: One role can have many permissions, one permission can belong to many roles
- **Junction Table**: `role_permissions` links roles and permissions
- **System Roles**: Cannot be deleted (`is_system_role = true`)

### 3. Role → Business Relationship
- **System Roles**: `business_id = NULL` (available to all ISPs)
- **Business Roles**: `business_id = <ISP_ID>` (custom roles for specific ISP)
- **Super Admin Role**: Always system-wide

### 4. Permission Structure
- **Resource**: The entity being accessed (bills, payments, customers, etc.)
- **Action**: The operation (create, read, update, delete, generate, approve, etc.)
- **Granular Control**: Each permission is specific to resource + action

---

## 🔒 Security Constraints

1. **Super Admin Exception**: Bypasses all tenant filters
2. **ISP Isolation**: All non-Super Admin users filtered by `isp_id`
3. **Customer Isolation**: Customers can only access their own data
4. **Role Creation**: Only Super Admin can create Super Admin or Admin roles
5. **System Role Protection**: System roles cannot be deleted
6. **Permission Inheritance**: Higher roles inherit permissions of lower roles

---

## 📝 Notes

- **Dynamic RBAC**: Roles and permissions can be managed through the UI (Super Admin)
- **Tenant Middleware**: Automatically applies ISP filtering to all queries
- **Activity Logging**: All actions are logged with user ID, role, and timestamp
- **JWT Authentication**: All routes require valid JWT token
- **Role Middleware**: Routes are protected by role-based middleware
- **Permission Middleware**: Granular access control using permission checks

---

**Last Updated**: Based on current codebase structure  
**Version**: 1.0

