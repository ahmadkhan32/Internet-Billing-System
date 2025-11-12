# 👥 Roles & Responsibilities - Quick Reference

## Role Hierarchy (Top to Bottom)

```
┌─────────────────────────────────────────────────────────────┐
│                    SUPER ADMIN (Level 1)                     │
│  👑 Platform Owner - Full System Access                      │
│  • Manages all ISPs                                         │
│  • Creates users with any role                              │
│  • System-wide settings                                     │
│  • No data restrictions                                      │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ Creates & Manages
                            ▼
        ┌───────────────────────────────────────┐
        │         ISP 1, ISP 2, ISP N...        │
        └───────────────────────────────────────┘
                            │
                            │ Has
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              ADMIN / ISP OWNER (Level 2)                     │
│  🏢 Business Owner - Full ISP Management                     │
│  • Manages their ISP's data                                 │
│  • Creates staff & customer users                           │
│  • Full access to ISP operations                            │
│  • Restricted to own ISP only                               │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ Manages
                            ▼
        ┌───────────────────────────────────────┐
        │            STAFF ROLES (Level 3)      │
        └───────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│   ACCOUNT    │  │  TECHNICAL   │  │   RECOVERY   │
│   MANAGER    │  │   OFFICER    │  │   OFFICER    │
│              │  │              │  │              │
│ 💰 Billing   │  │ 🔧 Install   │  │ 💵 Collect   │
│ & Accounts   │  │ & Technical  │  │ & Recovery   │
└──────────────┘  └──────────────┘  └──────────────┘
                            │
                            │ Serves
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    CUSTOMER (Level 4)                        │
│  👤 End User - Self-Service Portal                          │
│  • Views own bills & payments                               │
│  • Makes online payments                                    │
│  • Downloads invoices                                       │
│  • Own data only                                            │
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 Permission Matrix (Simplified)

| Feature | Super Admin | Admin | Account Manager | Technical Officer | Recovery Officer | Customer |
|---------|:-----------:|:-----:|:---------------:|:-----------------:|:----------------:|:--------:|
| **Users** |
| View All Users | ✅ | ✅ (Own ISP) | ❌ | ❌ | ❌ | ❌ |
| Create Users | ✅ (Any) | ✅ (Staff/Customer) | ❌ | ❌ | ❌ | ❌ |
| **ISPs** |
| View ISPs | ✅ (All) | ❌ | ❌ | ❌ | ❌ | ❌ |
| Create ISPs | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Customers** |
| View Customers | ✅ (All) | ✅ (Own ISP) | ✅ (Own ISP) | ✅ (Own ISP) | ✅ (Own ISP) | ❌ |
| Create Customers | ✅ (All) | ✅ (Own ISP) | ✅ (Own ISP) | ❌ | ❌ | ❌ |
| **Packages** |
| View Packages | ✅ (All) | ✅ (Own ISP) | ✅ (Own ISP) | ❌ | ❌ | ❌ |
| Create Packages | ✅ (All) | ✅ (Own ISP) | ❌ | ❌ | ❌ | ❌ |
| **Bills** |
| View Bills | ✅ (All) | ✅ (Own ISP) | ✅ (Own ISP) | ❌ | ❌ | ✅ (Own) |
| Create Bills | ✅ (All) | ✅ (Own ISP) | ✅ (Own ISP) | ❌ | ❌ | ❌ |
| Generate Bills | ✅ (All) | ✅ (Own ISP) | ✅ (Own ISP) | ❌ | ❌ | ❌ |
| **Payments** |
| View Payments | ✅ (All) | ✅ (Own ISP) | ✅ (Own ISP) | ❌ | ✅ (Own ISP) | ✅ (Own) |
| Create Payments | ✅ (All) | ✅ (Own ISP) | ✅ (Own ISP) | ❌ | ✅ (Own ISP) | ✅ (Own) |
| **Recoveries** |
| View Recoveries | ✅ (All) | ✅ (Own ISP) | ❌ | ❌ | ✅ (Own ISP) | ❌ |
| Create Recoveries | ✅ (All) | ✅ (Own ISP) | ❌ | ❌ | ❌ | ❌ |
| **Installations** |
| View Installations | ✅ (All) | ✅ (Own ISP) | ✅ (Own ISP) | ✅ (Own ISP) | ❌ | ❌ |
| Create Installations | ✅ (All) | ✅ (Own ISP) | ✅ (Own ISP) | ✅ (Own ISP) | ❌ | ❌ |
| **Reports** |
| View Reports | ✅ (All) | ✅ (Own ISP) | ✅ (Own ISP) | ❌ | ❌ | ❌ |
| Generate Reports | ✅ (All) | ✅ (Own ISP) | ✅ (Own ISP) | ❌ | ❌ | ❌ |
| **Roles & Permissions** |
| Manage Roles | ✅ | ✅ (Own ISP) | ❌ | ❌ | ❌ | ❌ |
| Manage Permissions | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **SaaS Packages** |
| Manage SaaS Packages | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |

---

## 🔐 Access Control Rules

### 1. **Super Admin**
- ✅ **No Restrictions**: Can access all data across all ISPs
- ✅ **Bypasses Filters**: Tenant middleware skips filtering
- ✅ **Full Control**: Can create any role, manage any ISP

### 2. **Admin (ISP Owner)**
- ⚠️ **ISP Restricted**: Can only access data from their assigned ISP
- ✅ **Full ISP Control**: Manages all aspects of their ISP
- ✅ **Staff Management**: Can create and manage staff roles
- ❌ **No Cross-ISP Access**: Cannot see other ISPs' data

### 3. **Staff Roles** (Account Manager, Technical Officer, Recovery Officer)
- ⚠️ **ISP Restricted**: Can only access data from their assigned ISP
- ✅ **Specialized Access**: Limited to their domain of responsibility
- ❌ **No User Management**: Cannot create or manage users
- ❌ **No ISP Management**: Cannot manage ISP settings

### 4. **Customer**
- ⚠️ **Self-Only**: Can only access their own data
- ✅ **Portal Access**: Dedicated customer portal interface
- ✅ **Self-Service**: View bills, make payments, download invoices
- ❌ **No Admin Access**: Cannot access admin interface

---

## 🎯 Key Responsibilities by Role

### Super Admin 👑
- Platform administration
- ISP onboarding and management
- SaaS package management
- System-wide configuration
- User management (all roles)
- Global analytics and reports

### Admin (ISP Owner) 🏢
- ISP business management
- Staff hiring and management
- Customer onboarding
- Package creation and pricing
- Business analytics
- ISP settings configuration

### Account Manager 💰
- Customer account management
- Bill generation and management
- Payment processing and verification
- Invoice generation
- Revenue reporting
- Customer communication

### Technical Officer 🔧
- New connection installations
- Service activation/deactivation
- Connection troubleshooting
- Bandwidth management
- Installation scheduling
- Technical support

### Recovery Officer 💵
- Overdue bill collection
- Field payment collection
- Recovery record updates
- Customer follow-ups
- Payment verification
- Collection reporting

### Customer 👤
- View billing history
- Make online payments
- Download invoices and receipts
- View service status
- Update personal information
- Contact support

---

## 🔄 Data Flow Example

```
Super Admin Request:
  User → Auth → Role Check → Tenant (Skip Filter) → Permission → Database (All Data)
  
Admin Request:
  User → Auth → Role Check → Tenant (Filter by isp_id) → Permission → Database (ISP Data Only)
  
Customer Request:
  User → Auth → Role Check → Tenant (Filter by user_id) → Permission → Database (Own Data Only)
```

---

## 📝 Quick Reference

| Role | Code | ISP Assignment | Can Create Users | Data Scope |
|------|------|----------------|------------------|------------|
| Super Admin | `super_admin` | ❌ No (`isp_id = NULL`) | ✅ All roles | All ISPs |
| Admin | `admin` | ✅ Yes | ✅ Staff & Customer | Own ISP |
| Account Manager | `account_manager` | ✅ Yes | ❌ No | Own ISP |
| Technical Officer | `technical_officer` | ✅ Yes | ❌ No | Own ISP |
| Recovery Officer | `recovery_officer` | ✅ Yes | ❌ No | Own ISP |
| Customer | `customer` | ✅ Yes | ❌ No | Own Data |

---

**For detailed ERD diagrams, see `ROLES_ERD_DIAGRAM.md`**

