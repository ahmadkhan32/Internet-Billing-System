# 🔐 ISP Login Credentials - Implementation Guide

## 📍 Where ISP Login Credentials Are Implemented

### 1. **ISP Creation & Admin User Auto-Creation**

**Location:** `backend/controllers/superAdminController.js` - `createISP()` function

When a new business/ISP is created via `POST /api/super-admin/isps`, the system automatically:
1. Creates the ISP with a unique `business_id` (e.g., `BIZ-2025-0001`)
2. Creates an admin user account using the ISP's email address
3. Sets the default password to `admin123`
4. Links the admin user to the ISP via `isp_id`

**Code Location:** Lines 249-342 in `superAdminController.js`

```javascript
// Automatically create admin user for this ISP
const adminEmail = email; // Use ISP email as admin email
const adminPassword = 'admin123'; // Default password

// Create admin user for this ISP
adminUser = await User.create({
  name: owner_name || name || 'ISP Admin',
  email: adminEmail,
  password: hashedPassword,
  role: 'admin',
  isp_id: isp.id,
  is_active: true
});
```

---

### 2. **Default ISP Creation on Server Startup**

**Location:** `backend/server.js` - `startServer()` function

When the server starts, it creates default ISPs:
- **ISP 1:** `isp1@example.com`
- **ISP 2:** `isp2@example.com`

For each ISP, an admin user is automatically created:
- **Email:** Same as ISP email (`isp1@example.com`, `isp2@example.com`)
- **Password:** `admin123`
- **Role:** `admin`
- **Linked to:** ISP via `isp_id`

**Code Location:** Lines 257-372 in `server.js`

---

### 3. **Login Credentials for Existing ISPs**

**Location:** `backend/utils/createISPAdminUsers.js`

This script ensures all existing ISPs have admin users. Run it manually if needed:

```bash
cd backend
node utils/createISPAdminUsers.js
```

**What it does:**
- Finds all ISPs in the database
- Creates admin users for ISPs that don't have one
- Uses ISP email as admin email
- Sets password to `admin123`
- Links user to ISP via `isp_id`

---

## 🔑 Current ISP Login Credentials

### **ISP 1 (BIZ-2025-0001)**
- **Email:** `isp1@example.com`
- **Password:** `admin123`
- **Role:** Admin
- **Business ID:** `BIZ-2025-0001`
- **Access:** Full management of ISP 1's customers, packages, bills, payments

### **ISP 2 (BIZ-2025-0002)**
- **Email:** `isp2@example.com`
- **Password:** `admin123`
- **Role:** Admin
- **Business ID:** `BIZ-2025-0002`
- **Access:** Full management of ISP 2's customers, packages, bills, payments

---

## 📝 How It Works

### **When Creating a New Business:**

1. **Super Admin creates business** via UI or API:
   ```json
   POST /api/super-admin/isps
   {
     "name": "TechWave Internet Services",
     "email": "admin@techwave.com",
     "owner_name": "John Doe",
     "contact": "+1234567890",
     "address": "123 Main St",
     "status": "active"
   }
   ```

2. **System automatically:**
   - Generates unique `business_id` (e.g., `BIZ-2025-0003`)
   - Creates ISP record
   - Creates admin user with:
     - Email: `admin@techwave.com` (same as ISP email)
     - Password: `admin123`
     - Role: `admin`
     - Linked to ISP via `isp_id`

3. **Response includes admin credentials:**
   ```json
   {
     "success": true,
     "message": "Business created successfully",
     "business": { ... },
     "admin_user": {
       "email": "admin@techwave.com",
       "password": "admin123",
       "note": "Admin user created. Please change password after first login."
     }
   }
   ```

---

## 🔍 Verification

### **Check if ISP has admin user:**

```sql
SELECT u.email, u.role, u.isp_id, i.name as isp_name, i.business_id
FROM users u
JOIN isps i ON u.isp_id = i.id
WHERE u.role = 'admin' AND i.email = 'isp1@example.com';
```

### **List all ISP admin users:**

```sql
SELECT i.business_id, i.name as isp_name, i.email as isp_email, 
       u.email as admin_email, u.role, u.is_active
FROM isps i
LEFT JOIN users u ON u.isp_id = i.id AND u.role = 'admin'
ORDER BY i.id;
```

---

## 🛠️ Manual Creation (If Needed)

If you need to manually create an admin user for an ISP:

```bash
# Via API (as Super Admin)
POST /api/users
{
  "name": "ISP 1 Admin",
  "email": "isp1@example.com",
  "password": "admin123",
  "role": "admin",
  "isp_id": 1
}
```

Or use the script:
```bash
cd backend
node utils/createISPAdminUsers.js
```

---

## 📋 Summary

| ISP Email | Admin Email | Password | Business ID | Implementation |
|-----------|-------------|----------|-------------|----------------|
| `isp1@example.com` | `isp1@example.com` | `admin123` | `BIZ-2025-0001` | Auto-created in `server.js` |
| `isp2@example.com` | `isp2@example.com` | `admin123` | `BIZ-2025-0002` | Auto-created in `server.js` |
| Any new ISP email | Same as ISP email | `admin123` | Auto-generated | Auto-created in `superAdminController.js` |

---

## ⚠️ Important Notes

1. **Password Security:** All default passwords are `admin123`. Change them after first login.

2. **Email Uniqueness:** The ISP email is used as the admin email. Ensure ISP emails are unique.

3. **Auto-Creation:** Admin users are automatically created when:
   - Server starts (for default ISPs)
   - New business is created via Super Admin panel
   - New business is created via API

4. **Manual Creation:** Use `backend/utils/createISPAdminUsers.js` to create admin users for existing ISPs that don't have one.

---

## 🔐 Login Flow

1. User enters ISP email (e.g., `isp1@example.com`) and password (`admin123`)
2. System authenticates via `backend/controllers/authController.js`
3. JWT token is generated with user info including `isp_id`
4. `tenantMiddleware` enforces data isolation based on `isp_id`
5. User can only access data for their ISP

---

## 📚 Related Files

- **ISP Creation:** `backend/controllers/superAdminController.js`
- **Default ISPs:** `backend/server.js` (lines 257-372)
- **Admin User Creation Script:** `backend/utils/createISPAdminUsers.js`
- **Authentication:** `backend/controllers/authController.js`
- **Tenant Isolation:** `backend/middlewares/tenantMiddleware.js`
- **User Model:** `backend/models/User.js`
- **ISP Model:** `backend/models/ISP.js`

