# 🔐 Complete Login Credentials List

## 📋 All User Accounts

**⚠️ IMPORTANT:** All default users use the same password: **`admin123`**

---

## 👑 Super Admin

| Field | Value |
|-------|-------|
| **Name** | Super Admin |
| **Email** | `admin@billing.com` |
| **Password** | `admin123` |
| **Role** | `super_admin` |
| **ISP ID** | `null` (No ISP assigned) |
| **Access** | Full system access - manages all ISPs, users, roles, permissions |

**Capabilities:**
- ✅ Manage all ISPs (create, edit, delete)
- ✅ Manage all users across all ISPs
- ✅ Manage roles and permissions (RBAC)
- ✅ View all system data
- ✅ Access all features and reports
- ✅ System-wide settings

---

## 🏢 ISP Admin

| Field | Value |
|-------|-------|
| **Name** | ISP Admin |
| **Email** | `ispadmin@billing.com` |
| **Password** | `admin123` |
| **Role** | `admin` |
| **ISP ID** | `null` (Assign after ISP creation) |
| **Access** | Full ISP management - manages their ISP's operations |

**Capabilities:**
- ✅ Manage customers for their ISP
- ✅ Manage packages for their ISP
- ✅ Manage staff (Account Manager, Technical Officer, Recovery Officer)
- ✅ Generate bills and invoices
- ✅ View reports for their ISP
- ✅ Manage installations

---

## 💼 Account Manager

| Field | Value |
|-------|-------|
| **Name** | Account Manager |
| **Email** | `accountmanager@billing.com` |
| **Password** | `admin123` |
| **Role** | `account_manager` |
| **ISP ID** | `null` (Assign after ISP creation) |
| **Access** | Billing and payment management |

**Capabilities:**
- ✅ View and create customers
- ✅ Generate bills
- ✅ Process payments
- ✅ Approve payments
- ✅ Generate invoices
- ✅ View billing reports

---

## 🔧 Technical Officer

| Field | Value |
|-------|-------|
| **Name** | Technical Officer |
| **Email** | `technical@billing.com` |
| **Password** | `admin123` |
| **Role** | `technical_officer` |
| **ISP ID** | `null` (Assign after ISP creation) |
| **Access** | Installation and technical services |

**Capabilities:**
- ✅ View customers
- ✅ Manage installations
- ✅ Update installation status
- ✅ Manage connection details
- ✅ View service status

---

## 🔍 Recovery Officer

| Field | Value |
|-------|-------|
| **Name** | Recovery Officer |
| **Email** | `recovery@billing.com` |
| **Password** | `admin123` |
| **Role** | `recovery_officer` |
| **ISP ID** | `null` (Assign after ISP creation) |
| **Access** | Bill recovery and field collection |

**Capabilities:**
- ✅ View customers
- ✅ View bills (especially overdue)
- ✅ Create recovery records
- ✅ Update recovery status
- ✅ Record field collections
- ✅ Submit payment details

---

## 👤 Customer (Test Customer)

| Field | Value |
|-------|-------|
| **Name** | Test Customer |
| **Email** | `customer@billing.com` |
| **Password** | `admin123` |
| **Role** | `customer` |
| **ISP ID** | `null` (Assign after ISP creation) |
| **Access** | Customer self-service portal |

**Capabilities:**
- ✅ View own bills
- ✅ View payment history
- ✅ Make online payments
- ✅ Download invoices
- ✅ View data usage
- ✅ View account information

---

## 📊 Quick Copy-Paste Reference

### Super Admin
```
Email: admin@billing.com
Password: admin123
```

### ISP Admin
```
Email: ispadmin@billing.com
Password: admin123
```

### Account Manager
```
Email: accountmanager@billing.com
Password: admin123
```

### Technical Officer
```
Email: technical@billing.com
Password: admin123
```

### Recovery Officer
```
Email: recovery@billing.com
Password: admin123
```

### Customer
```
Email: customer@billing.com
Password: admin123
```

---

## 🎯 Login URL

**Frontend:** `http://localhost:3001` (or the port shown in your terminal)

**Backend API:** `http://localhost:8000/api`

---

## 📝 Important Notes

1. **All passwords are:** `admin123`
2. **Default users are created automatically** when the server starts
3. **ISP IDs are null initially** - Assign them after creating ISPs
4. **Passwords are hashed** using bcrypt (not stored in plain text)
5. **Change passwords** after first login for security

---

## 🔄 Assigning ISP IDs

After creating ISPs, you can assign users to ISPs:

1. Login as **Super Admin** (`admin@billing.com`)
2. Go to **Users** page
3. Edit each user and assign them to an ISP
4. Or use the API:
   ```bash
   PUT /api/users/:id
   {
     "isp_id": 1
   }
   ```

---

## 🆘 Troubleshooting

**Can't login?**
- Check if backend server is running on port 8000
- Check if frontend is running
- Verify database connection
- Check browser console for errors
- Ensure JWT_SECRET is set in `.env`

**User doesn't exist?**
- Restart the backend server - it will create default users
- Check server console for user creation messages

**Forgot password?**
- Super Admin can reset passwords through admin panel
- Or delete user from database and restart server to recreate

---

## 🔒 Security Reminder

⚠️ **These are development credentials!**

For production:
- ✅ Change all default passwords immediately
- ✅ Use strong, unique passwords (min 12 characters)
- ✅ Enable two-factor authentication if available
- ✅ Regularly audit user accounts
- ✅ Implement password expiration policies
- ✅ Use secure password storage

---

## 📧 Email Pattern

All default emails follow this pattern:
- `{role_name}@billing.com`

You can create additional users with any email format through the admin panel.

---

**Last Updated:** Generated from server configuration  
**System Version:** Internet Billing System v1.0

