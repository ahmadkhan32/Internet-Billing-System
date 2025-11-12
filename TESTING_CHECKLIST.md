# 🧪 Complete Testing Checklist - Internet Billing System

This document provides a comprehensive testing checklist to verify all CRUD operations and functionality across all modules and roles.

## 📋 Pre-Testing Setup

- [ ] MySQL database is running
- [ ] Backend server is running on port 8000
- [ ] Frontend server is running (port 3001 or 3003)
- [ ] Database `internet_billing_db` exists
- [ ] All default users are created (check backend console)

---

## 🔐 Authentication & User Management

### Login Tests

| Test Case | Steps | Expected Result | Status |
|-----------|-------|-----------------|--------|
| Super Admin Login | Login with `admin@billing.com` / `admin123` | ✅ Success, redirected to dashboard | ⬜ |
| ISP Admin Login | Login with `ispadmin@billing.com` / `admin123` | ✅ Success, redirected to dashboard | ⬜ |
| Account Manager Login | Login with `accountmanager@billing.com` / `admin123` | ✅ Success, redirected to dashboard | ⬜ |
| Technical Officer Login | Login with `technical@billing.com` / `admin123` | ✅ Success, redirected to dashboard | ⬜ |
| Recovery Officer Login | Login with `recovery@billing.com` / `admin123` | ✅ Success, redirected to dashboard | ⬜ |
| Customer Login | Login with `customer@billing.com` / `admin123` | ✅ Success, redirected to user portal | ⬜ |
| Invalid Credentials | Login with wrong password | ❌ Error message displayed | ⬜ |
| Logout | Click logout button | ✅ Redirected to login page | ⬜ |

### User Management (Super Admin & Admin Only)

| Test Case | Steps | Expected Result | Status |
|-----------|-------|-----------------|--------|
| View Users | Navigate to Users page | ✅ List of all users displayed | ⬜ |
| Create User | Click "+ Add User", fill form, submit | ✅ User created, appears in list | ⬜ |
| Edit User | Click "Edit" on user, modify, save | ✅ Changes saved and displayed | ⬜ |
| Delete User | Click "Delete" on user, confirm | ✅ User removed from list | ⬜ |
| Filter by Role | Select role filter dropdown | ✅ Only users with that role shown | ⬜ |
| Search Users | Type in search box | ✅ Filtered results displayed | ⬜ |
| Admin Cannot Create Super Admin | Admin tries to create super_admin | ❌ Error: Access denied | ⬜ |

---

## 👥 Customer Management

### Create Customer

| Test Case | Steps | Expected Result | Status |
|-----------|-------|-----------------|--------|
| Add New Customer | Navigate to Customers → "+ Add Customer" | ✅ Form opens | ⬜ |
| Fill Required Fields | Enter name, phone, address, email | ✅ Form validates correctly | ⬜ |
| Select Package | Choose package from dropdown | ✅ Package selected | ⬜ |
| Submit Customer | Click "Create" button | ✅ Customer created, appears in list | ⬜ |
| Duplicate Phone Check | Try to add customer with existing phone | ❌ Error: Customer already exists | ⬜ |
| Missing Required Fields | Submit without name/phone | ❌ Validation error shown | ⬜ |

### Read Customer

| Test Case | Steps | Expected Result | Status |
|-----------|-------|-----------------|--------|
| View Customer List | Navigate to Customers page | ✅ All customers displayed | ⬜ |
| Search Customer | Type name/email/phone in search | ✅ Filtered results shown | ⬜ |
| Filter by Status | Select status filter | ✅ Only customers with that status shown | ⬜ |
| View Customer Details | Click "View" on customer | ✅ Customer details page opens | ⬜ |
| Pagination | Navigate to page 2 | ✅ Next page of customers loaded | ⬜ |

### Update Customer

| Test Case | Steps | Expected Result | Status |
|-----------|-------|-----------------|--------|
| Edit Customer Info | Click "Edit" on customer | ✅ Edit form opens with current data | ⬜ |
| Update Name | Change customer name, save | ✅ Name updated in list | ⬜ |
| Update Package | Change customer package, save | ✅ Package updated | ⬜ |
| Update Status | Change status to suspended, save | ✅ Status updated, customer marked suspended | ⬜ |
| Update Phone | Change phone number, save | ✅ Phone updated | ⬜ |

### Delete Customer

| Test Case | Steps | Expected Result | Status |
|-----------|-------|-----------------|--------|
| Delete Customer | Click "Delete" on customer, confirm | ✅ Customer removed from list | ⬜ |
| Delete with Active Bills | Try to delete customer with pending bills | ⚠️ Warning or prevented | ⬜ |

---

## 📦 Package Management

### Create Package

| Test Case | Steps | Expected Result | Status |
|-----------|-------|-----------------|--------|
| Add New Package | Navigate to Packages → "+ Add Package" | ✅ Form opens | ⬜ |
| Fill Package Details | Enter name, speed, price, data limit | ✅ Form accepts input | ⬜ |
| Submit Package | Click "Create" | ✅ Package created, appears in grid | ⬜ |
| Validation | Submit without required fields | ❌ Validation error shown | ⬜ |
| Price Validation | Enter negative price | ❌ Error: Price must be positive | ⬜ |

### Read Package

| Test Case | Steps | Expected Result | Status |
|-----------|-------|-----------------|--------|
| View Packages | Navigate to Packages page | ✅ All packages displayed in grid | ⬜ |
| View Package Details | Click on package card | ✅ Package details visible | ⬜ |
| Search Packages | Type in search box | ✅ Filtered packages shown | ⬜ |

### Update Package

| Test Case | Steps | Expected Result | Status |
|-----------|-------|-----------------|--------|
| Edit Package | Click "Edit" on package | ✅ Edit form opens | ⬜ |
| Update Price | Change price, save | ✅ Price updated | ⬜ |
| Update Speed | Change speed, save | ✅ Speed updated | ⬜ |
| Deactivate Package | Set is_active to false | ✅ Package marked inactive | ⬜ |

### Delete Package

| Test Case | Steps | Expected Result | Status |
|-----------|-------|-----------------|--------|
| Delete Package | Click "Delete" on package, confirm | ✅ Package removed | ⬜ |
| Delete with Active Customers | Try to delete package with active customers | ❌ Error: Cannot delete, X customers using it | ⬜ |

---

## 💰 Billing Management

### Create Bill

| Test Case | Steps | Expected Result | Status |
|-----------|-------|-----------------|--------|
| Generate Bill | Navigate to Billing → "Generate Bill" | ✅ Form opens | ⬜ |
| Select Customer | Choose customer from dropdown | ✅ Customer selected | ⬜ |
| Select Package | Choose package (or use customer's package) | ✅ Package selected | ⬜ |
| Auto-calculate Amount | Package price auto-filled | ✅ Amount matches package price | ⬜ |
| Set Due Date | Select due date | ✅ Due date set | ⬜ |
| Submit Bill | Click "Create Bill" | ✅ Bill created, appears in list | ⬜ |
| Auto-generate Bills | Click "Auto Generate Bills" | ✅ Bills created for all eligible customers | ⬜ |
| Bill Number Generated | Check bill number | ✅ Unique bill number (ISP1-2024-000001) | ⬜ |

### Read Bill

| Test Case | Steps | Expected Result | Status |
|-----------|-------|-----------------|--------|
| View Bills | Navigate to Billing page | ✅ All bills displayed | ⬜ |
| Filter by Status | Select status filter | ✅ Only bills with that status shown | ⬜ |
| Filter by Customer | Select customer filter | ✅ Only that customer's bills shown | ⬜ |
| View Bill Details | Click on bill | ✅ Bill details with customer info shown | ⬜ |
| Download Invoice | Click "Download Invoice" | ✅ PDF invoice downloaded | ⬜ |

### Update Bill

| Test Case | Steps | Expected Result | Status |
|-----------|-------|-----------------|--------|
| Edit Bill | Click "Edit" on bill | ✅ Edit form opens | ⬜ |
| Update Amount | Change bill amount, save | ✅ Amount updated | ⬜ |
| Update Due Date | Change due date, save | ✅ Due date updated | ⬜ |
| Update Status | Change status to paid, save | ✅ Status updated | ⬜ |
| Update Notes | Add notes, save | ✅ Notes saved | ⬜ |

### Delete Bill

| Test Case | Steps | Expected Result | Status |
|-----------|-------|-----------------|--------|
| Delete Bill | Click "Delete" on bill, confirm | ✅ Bill removed | ⬜ |
| Delete with Payments | Try to delete bill with payments | ❌ Error: Cannot delete, has payments | ⬜ |

---

## 💳 Payment Management

### Create Payment

| Test Case | Steps | Expected Result | Status |
|-----------|-------|-----------------|--------|
| Record Payment | Navigate to Payments → "Add Payment" | ✅ Form opens | ⬜ |
| Select Bill | Choose bill from dropdown | ✅ Bill details shown | ⬜ |
| Enter Amount | Enter payment amount | ✅ Amount accepted | ⬜ |
| Select Method | Choose payment method (cash/card/online) | ✅ Method selected | ⬜ |
| Submit Payment | Click "Record Payment" | ✅ Payment created, receipt number generated | ⬜ |
| Bill Status Update | Check bill status after payment | ✅ Status updated (paid/partial) | ⬜ |
| Online Payment | Process online payment | ✅ Payment processed, receipt generated | ⬜ |

### Read Payment

| Test Case | Steps | Expected Result | Status |
|-----------|-------|-----------------|--------|
| View Payments | Navigate to Payments page | ✅ All payments displayed | ⬜ |
| Filter by Method | Select payment method filter | ✅ Only that method's payments shown | ⬜ |
| Filter by Status | Select status filter | ✅ Filtered results shown | ⬜ |
| View Payment Details | Click on payment | ✅ Payment details with bill info shown | ⬜ |
| Download Receipt | Click "Download Receipt" | ✅ PDF receipt downloaded | ⬜ |

### Update Payment

| Test Case | Steps | Expected Result | Status |
|-----------|-------|-----------------|--------|
| Edit Payment | Click "Edit" on payment | ✅ Edit form opens | ⬜ |
| Update Amount | Change amount, save | ✅ Amount updated, bill recalculated | ⬜ |
| Update Status | Change status, save | ✅ Status updated | ⬜ |

### Payment Statistics

| Test Case | Steps | Expected Result | Status |
|-----------|-------|-----------------|--------|
| View Stats | Navigate to Payments → Stats | ✅ Revenue stats displayed | ⬜ |
| Filter by Date Range | Select start/end date | ✅ Stats filtered by date | ⬜ |

---

## 🔍 Recovery Management

### Create Recovery

| Test Case | Steps | Expected Result | Status |
|-----------|-------|-----------------|--------|
| Assign Recovery | Navigate to Recoveries → "Assign Recovery" | ✅ Form opens | ⬜ |
| Select Officer | Choose recovery officer | ✅ Officer selected | ⬜ |
| Select Customer | Choose customer with overdue bill | ✅ Customer selected | ⬜ |
| Select Bill | Choose bill to recover | ✅ Bill selected | ⬜ |
| Add Remarks | Enter recovery remarks | ✅ Remarks saved | ⬜ |
| Submit | Click "Assign" | ✅ Recovery assignment created | ⬜ |

### Read Recovery

| Test Case | Steps | Expected Result | Status |
|-----------|-------|-----------------|--------|
| View Recoveries | Navigate to Recoveries page | ✅ All recoveries displayed | ⬜ |
| Filter by Status | Select status filter | ✅ Filtered results shown | ⬜ |
| View Overdue Bills | Click "View Overdue Bills" | ✅ List of overdue bills shown | ⬜ |
| View Recovery Details | Click on recovery | ✅ Recovery details with customer/bill info | ⬜ |

### Update Recovery

| Test Case | Steps | Expected Result | Status |
|-----------|-------|-----------------|--------|
| Update Status | Click "Update" on recovery | ✅ Update form opens | ⬜ |
| Mark as Collected | Set status to "paid", enter amount | ✅ Status updated, payment created | ⬜ |
| Add Visit Date | Enter visit date | ✅ Visit date saved | ⬜ |
| Update Remarks | Add/update remarks | ✅ Remarks saved | ⬜ |
| Set Next Visit | Enter next visit date | ✅ Next visit date saved | ⬜ |

---

## 🔌 Installation Management

### Create Installation

| Test Case | Steps | Expected Result | Status |
|-----------|-------|-----------------|--------|
| New Installation | Navigate to Installations → "New Installation" | ✅ Form opens | ⬜ |
| Select Customer | Choose customer | ✅ Customer selected | ⬜ |
| Assign Officer | Choose technical officer | ✅ Officer assigned | ⬜ |
| Enter Service Details | Enter IP, address, bandwidth | ✅ Details saved | ⬜ |
| Submit | Click "Create" | ✅ Installation created | ⬜ |

### Read Installation

| Test Case | Steps | Expected Result | Status |
|-----------|-------|-----------------|--------|
| View Installations | Navigate to Installations page | ✅ All installations displayed | ⬜ |
| Filter by Status | Select status filter | ✅ Filtered results shown | ⬜ |
| View Details | Click on installation | ✅ Installation details shown | ⬜ |

### Update Installation

| Test Case | Steps | Expected Result | Status |
|-----------|-------|-----------------|--------|
| Update Status | Change status (active/suspended/disconnected) | ✅ Status updated | ⬜ |
| Update Service Details | Modify IP, bandwidth | ✅ Details updated | ⬜ |
| Complete Installation | Mark as completed | ✅ Status changed to active | ⬜ |

---

## 📊 Reports & Analytics

### Dashboard

| Test Case | Steps | Expected Result | Status |
|-----------|-------|-----------------|--------|
| View Dashboard | Login and view dashboard | ✅ Statistics and charts displayed | ⬜ |
| Revenue Chart | Check revenue chart | ✅ Chart shows revenue data | ⬜ |
| Customer Stats | Check customer statistics | ✅ Active/inactive counts shown | ⬜ |
| Bill Status Chart | Check bill status chart | ✅ Chart shows pending/paid bills | ⬜ |

### Reports

| Test Case | Steps | Expected Result | Status |
|-----------|-------|-----------------|--------|
| Daily Collection Report | Generate daily report | ✅ Report with payments shown | ⬜ |
| Monthly Collection Report | Generate monthly report | ✅ Monthly totals displayed | ⬜ |
| Outstanding Bills Report | View outstanding bills | ✅ List of unpaid bills shown | ⬜ |
| Active vs Inactive Customers | View customer report | ✅ Counts and list displayed | ⬜ |
| Package Analytics | View package report | ✅ Package usage stats shown | ⬜ |

---

## 🏠 Customer Portal

### Customer Login

| Test Case | Steps | Expected Result | Status |
|-----------|-------|-----------------|--------|
| Customer Login | Login as customer | ✅ Redirected to user portal | ⬜ |
| View Own Bills | Check bills section | ✅ Only customer's bills shown | ⬜ |
| View Payment History | Check payments | ✅ Only customer's payments shown | ⬜ |
| Download Invoice | Click download on bill | ✅ PDF invoice downloaded | ⬜ |
| View Data Usage | Check data usage | ✅ Remaining data displayed | ⬜ |

### Online Payment

| Test Case | Steps | Expected Result | Status |
|-----------|-------|-----------------|--------|
| Pay Bill Online | Click "Pay Now" on bill | ✅ Payment form opens | ⬜ |
| Select Payment Method | Choose JazzCash/EasyPaisa/Stripe | ✅ Method selected | ⬜ |
| Enter Payment Details | Fill payment form | ✅ Details accepted | ⬜ |
| Process Payment | Submit payment | ✅ Payment processed, receipt generated | ⬜ |
| Payment Confirmation | Check confirmation | ✅ Email/SMS sent | ⬜ |

---

## 🔔 Notifications

### Email Notifications

| Test Case | Steps | Expected Result | Status |
|-----------|-------|-----------------|--------|
| Bill Due Notification | Create bill with due date 1 week away | ✅ Email sent to customer | ⬜ |
| Payment Confirmation | Record payment | ✅ Email sent to customer | ⬜ |
| Bill Generated | Auto-generate bills | ✅ Emails sent to all customers | ⬜ |

### SMS Notifications

| Test Case | Steps | Expected Result | Status |
|-----------|-------|-----------------|--------|
| Bill Due SMS | Create bill with due date 1 week away | ✅ SMS sent to customer | ⬜ |
| Payment Confirmation SMS | Record payment | ✅ SMS sent to customer | ⬜ |

---

## 🔒 Role-Based Access Control

### Super Admin Access

| Test Case | Steps | Expected Result | Status |
|-----------|-------|-----------------|--------|
| View All ISPs | Check dashboard | ✅ Can see all ISPs' data | ⬜ |
| Create Any User | Create user with any role | ✅ User created | ⬜ |
| Access All Modules | Navigate to all pages | ✅ All pages accessible | ⬜ |

### Admin Access

| Test Case | Steps | Expected Result | Status |
|-----------|-------|-----------------|--------|
| View Own ISP Data | Check customers/packages | ✅ Only own ISP's data shown | ⬜ |
| Create Staff Users | Create account manager/technical/recovery | ✅ Staff users created | ⬜ |
| Cannot Create Super Admin | Try to create super_admin | ❌ Access denied | ⬜ |
| Cannot Access Other ISPs | Try to view other ISP's data | ❌ Access denied | ⬜ |

### Account Manager Access

| Test Case | Steps | Expected Result | Status |
|-----------|-------|-----------------|--------|
| View Billing | Navigate to Billing | ✅ Can view and create bills | ⬜ |
| View Payments | Navigate to Payments | ✅ Can record payments | ⬜ |
| Cannot Manage Users | Try to access Users page | ❌ Access denied or hidden | ⬜ |
| Cannot Manage Packages | Try to edit packages | ❌ Access denied | ⬜ |

### Technical Officer Access

| Test Case | Steps | Expected Result | Status |
|-----------|-------|-----------------|--------|
| View Installations | Navigate to Installations | ✅ Can view and update installations | ⬜ |
| View Customers | Navigate to Customers | ✅ Can view customers | ⬜ |
| Cannot Access Billing | Try to access Billing | ❌ Access denied or hidden | ⬜ |
| Cannot Access Payments | Try to access Payments | ❌ Access denied or hidden | ⬜ |

### Recovery Officer Access

| Test Case | Steps | Expected Result | Status |
|-----------|-------|-----------------|--------|
| View Recoveries | Navigate to Recoveries | ✅ Can view own recoveries | ⬜ |
| Update Recovery Status | Update recovery | ✅ Can update own recoveries | ⬜ |
| Cannot Access Billing | Try to access Billing | ❌ Access denied or hidden | ⬜ |
| Cannot Access Installations | Try to access Installations | ❌ Access denied or hidden | ⬜ |

### Customer Access

| Test Case | Steps | Expected Result | Status |
|-----------|-------|-----------------|--------|
| View Own Portal | Login as customer | ✅ User portal displayed | ⬜ |
| View Own Bills | Check bills | ✅ Only own bills shown | ⬜ |
| Cannot Access Admin Pages | Try to access Customers/Billing | ❌ Redirected or access denied | ⬜ |
| Can Pay Bills | Click pay button | ✅ Payment form accessible | ⬜ |

---

## ⚙️ System Features

### Monthly Scheduler

| Test Case | Steps | Expected Result | Status |
|-----------|-------|-----------------|--------|
| Auto Bill Generation | Wait for scheduled time | ✅ Bills auto-generated monthly | ⬜ |
| Check Scheduler Status | Check backend logs | ✅ Scheduler initialized | ⬜ |

### Data Validation

| Test Case | Steps | Expected Result | Status |
|-----------|-------|-----------------|--------|
| Email Validation | Enter invalid email | ❌ Validation error shown | ⬜ |
| Phone Validation | Enter invalid phone | ❌ Validation error shown | ⬜ |
| Price Validation | Enter negative price | ❌ Validation error shown | ⬜ |
| Required Fields | Submit without required fields | ❌ Validation errors shown | ⬜ |

### Error Handling

| Test Case | Steps | Expected Result | Status |
|-----------|-------|-----------------|--------|
| Network Error | Disconnect backend | ✅ User-friendly error message | ⬜ |
| 404 Error | Access non-existent route | ✅ 404 page or error message | ⬜ |
| 401 Error | Access without login | ✅ Redirected to login | ⬜ |
| 403 Error | Access unauthorized resource | ✅ Access denied message | ⬜ |

---

## 📝 Notes

- Mark each test case as ✅ (Pass), ❌ (Fail), or ⬜ (Not Tested)
- Document any bugs or issues found
- Test with different roles to verify access control
- Test edge cases (empty data, large data, special characters)
- Verify data persistence after page refresh
- Check browser console for errors

---

## 🐛 Bug Report Template

If you find any issues, document them:

```
**Module:** [e.g., Customer Management]
**Test Case:** [e.g., Create Customer]
**Steps to Reproduce:**
1. Navigate to Customers page
2. Click "+ Add Customer"
3. Fill form and submit
**Expected:** Customer created successfully
**Actual:** Error message displayed
**Error Details:** [Copy error message or console log]
**Role:** [e.g., Admin]
**Browser:** [e.g., Chrome 120]
```

---

**Last Updated:** [Date]
**Tested By:** [Name]
**System Version:** [Version]

