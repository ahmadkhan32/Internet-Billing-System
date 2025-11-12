# 🔐 Login Credentials - Internet Billing System

## Default Login Accounts

All default users use the same password: **`admin123`**

### 👑 Super Admin
- **Email:** `admin@billing.com`
- **Password:** `admin123`
- **Role:** Super Admin
- **Access:** Full system access, manages all ISPs, approves new ISPs

### 🏢 ISP Admin
- **Email:** `ispadmin@billing.com`
- **Password:** `admin123`
- **Role:** Admin (ISP Owner)
- **Access:** Manages customers, staff, packages, and reports for their ISP

### 💼 Account Manager
- **Email:** `accountmanager@billing.com`
- **Password:** `admin123`
- **Role:** Account Manager
- **Access:** Handles billing, generates invoices, approves payments

### 🔧 Technical Officer
- **Email:** `technical@billing.com`
- **Password:** `admin123`
- **Role:** Technical Officer
- **Access:** Manages installations, service status, connection details

### 🔍 Recovery Officer
- **Email:** `recovery@billing.com`
- **Password:** `admin123`
- **Role:** Recovery Officer
- **Access:** Manages bill recovery, field collections, recovery reports

### 👤 Customer
- **Email:** `customer@billing.com`
- **Password:** `admin123`
- **Role:** Customer
- **Access:** Customer portal - view bills, make payments, download invoices

### 🏢 ISP/Business Admin Accounts
When a new ISP/Business is created, an admin user is automatically created using the ISP's email:

**For ISP 1:**
- **Email:** `isp1@example.com`
- **Password:** `admin123`
- **Role:** Admin (ISP Owner)
- **Access:** Manages customers, staff, packages, and reports for ISP 1

**For ISP 2:**
- **Email:** `isp2@example.com`
- **Password:** `admin123`
- **Role:** Admin (ISP Owner)
- **Access:** Manages customers, staff, packages, and reports for ISP 2

**Note:** When you create a new business via the Super Admin panel, an admin user is automatically created using the business email address with password `admin123`.

---

## Quick Reference Table

| Role | Email | Password | Access Level |
|------|-------|----------|--------------|
| Super Admin | `admin@billing.com` | `admin123` | Full System |
| ISP Admin (Generic) | `ispadmin@billing.com` | `admin123` | ISP Management |
| ISP 1 Admin | `isp1@example.com` | `admin123` | ISP 1 Management |
| ISP 2 Admin | `isp2@example.com` | `admin123` | ISP 2 Management |
| Account Manager | `accountmanager@billing.com` | `admin123` | Billing & Payments |
| Technical Officer | `technical@billing.com` | `admin123` | Installations |
| Recovery Officer | `recovery@billing.com` | `admin123` | Bill Recovery |
| Customer | `customer@billing.com` | `admin123` | Customer Portal |

---

## 🎯 Recommended First Login

**Start with Super Admin:**
- Email: `admin@billing.com`
- Password: `admin123`

This account has full access to:
- Create and manage ISPs
- View all system data
- Manage all users
- Access all features

---

## 📝 Notes

1. **All passwords are:** `admin123`
2. **Default users are created automatically** when the server starts for the first time
3. **Passwords are hashed** using bcrypt (not stored in plain text)
4. **Change passwords** after first login for security
5. **ISP IDs** for non-super-admin users may need to be assigned after ISP creation

---

## 🔒 Security Reminder

⚠️ **Important:** These are default development credentials. In production:
- Change all default passwords immediately
- Use strong, unique passwords
- Enable two-factor authentication if available
- Regularly audit user accounts

---

## 🆘 Troubleshooting

**Can't login?**
1. Check if backend server is running
2. Verify database connection
3. Check browser console for errors
4. Ensure JWT_SECRET is set in `.env`

**User doesn't exist?**
- Restart the backend server - it will create default users
- Or manually create users through the admin panel

**Forgot password?**
- Super Admin can reset passwords through the admin panel
- Or delete user from database and restart server to recreate

---

## 📧 Email Format

All default emails follow the pattern:
- `{role}@billing.com` or `{role}@billing.com`

You can create additional users with any email format through the admin panel.
