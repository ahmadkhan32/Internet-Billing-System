# 🔍 Where DNS Queries Happen in Your Project

## 📍 DNS Query Locations

DNS queries occur in **multiple places** in your project. Here's where:

---

## 1. **Automatic DNS Queries (Main Connection)**

### Location: `backend/config/db-postgres.js`

**When**: Every time Sequelize tries to connect to the database

**Code Flow**:
```javascript
// Line 97-102: Sequelize instance creation
const sequelize = new Sequelize(
  dbName,      // 'postgres'
  dbUser,      // 'postgres'
  dbPassword,  // 'your-password'
  {
    host: dbHost,  // 'db.qppdkzzmijjyoihzfdxw.supabase.co' ← DNS QUERY HAPPENS HERE
    port: dbPort,  // 6543
    dialect: 'postgres',
    // ...
  }
);

// Line 148: When authenticate() is called
await sequelize.authenticate();  // ← DNS QUERY HAPPENS HERE
```

**What Happens**:
1. Sequelize receives `host: 'db.qppdkzzmijjyoihzfdxw.supabase.co'`
2. **Node.js automatically performs DNS lookup** to resolve hostname to IP
3. If DNS fails → `ENOTFOUND` error
4. If DNS succeeds → Connection attempt proceeds

**This is the MAIN place where DNS queries fail!**

---

## 2. **Explicit DNS Checks (Test Scripts)**

### Location 1: `backend/test-supabase-connection-complete.js`

**Line 57**: Explicit DNS check
```javascript
const dns = require('dns');
const { promisify } = require('util');
const dnsResolve = promisify(dns.resolve4);

// Line 57: Explicit DNS query
const addresses = await dnsResolve(dbHost);
```

**Purpose**: Test if hostname can be resolved before attempting connection

---

### Location 2: `backend/check-firewall-and-status.js`

**Line 124**: DNS resolution check
```javascript
const dns = require('dns').promises;

// Line 124: DNS query
const addresses = await dns.resolve4(dbHost);
```

**Purpose**: Verify database is not paused (if DNS fails, project is paused)

---

### Location 3: `backend/check-internet-accessibility.js`

**Line 80**: DNS resolution test
```javascript
const dns = require('dns').promises;

// Line 80: DNS query
dns.resolve4(dbHost)
  .then(async (addresses) => {
    // DNS succeeded
  })
  .catch((error) => {
    // DNS failed - ENOTFOUND
  });
```

**Purpose**: Check if database hostname is accessible from internet

---

### Location 4: `backend/auto-check-supabase.js`

**Line 35**: DNS check in auto-monitor
```javascript
const dns = require('dns').promises;

// Line 35: DNS query
const addresses = await dns.resolve4(dbHost);
```

**Purpose**: Continuously check if Supabase is restored

---

### Location 5: `backend/pre-start-check.js`

**Line 26**: Pre-start DNS check
```javascript
const dns = require('dns').promises;

// Line 26: DNS query before starting server
const addresses = await dns.resolve4(dbHost);
```

**Purpose**: Verify database is accessible before starting backend

---

## 3. **Underlying Node.js Network Stack**

### Location: Node.js Core (Automatic)

**When**: Any network operation that uses a hostname

**What Happens**:
```javascript
// When you do this:
sequelize.authenticate();

// Node.js internally does:
// 1. DNS lookup: getaddrinfo('db.qppdkzzmijjyoihzfdxw.supabase.co')
// 2. Resolve to IP: e.g., 54.123.45.67
// 3. Create TCP connection to IP:6543
```

**This happens automatically** - you don't see it in your code, but it's happening!

---

## 📊 DNS Query Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│ Your Application Code                                   │
│                                                          │
│  sequelize.authenticate()                               │
│         ↓                                                │
│  Sequelize ORM                                           │
│         ↓                                                │
│  Node.js pg (PostgreSQL driver)                         │
│         ↓                                                │
│  Node.js net module (TCP connection)                   │
│         ↓                                                │
│  🔍 DNS QUERY HAPPENS HERE (getaddrinfo)                │
│         ↓                                                │
│  ┌──────────────────────────────────────┐                │
│  │ DNS Resolution:                     │                │
│  │ db.xxxxx.supabase.co → IP address  │                │
│  └──────────────────────────────────────┘                │
│         ↓                                                │
│  ✅ Success: Connect to IP:PORT                         │
│  ❌ Failure: ENOTFOUND error                           │
└─────────────────────────────────────────────────────────┘
```

---

## 🎯 Where ENOTFOUND Error Comes From

### Error Source: Node.js `getaddrinfo` system call

**Location**: Node.js core (C++ binding to OS DNS resolver)

**When it fails**:
1. **Supabase project is paused** → Hostname doesn't exist in DNS
2. **Wrong hostname** → Hostname doesn't exist
3. **Network issue** → DNS server unreachable

**Error Message**:
```
getaddrinfo ENOTFOUND db.qppdkzzmijjyoihzfdxw.supabase.co
```

**This means**: DNS lookup failed - hostname cannot be resolved to an IP address

---

## 🔍 How to See DNS Queries

### Option 1: Add DNS Logging

Add this to see DNS queries in real-time:

```javascript
const dns = require('dns');
const originalLookup = dns.lookup;

dns.lookup = function(hostname, options, callback) {
  console.log('🔍 DNS Query:', hostname);
  return originalLookup.call(this, hostname, options, (err, address, family) => {
    if (err) {
      console.log('❌ DNS Failed:', err.message);
    } else {
      console.log('✅ DNS Resolved:', hostname, '→', address);
    }
    callback(err, address, family);
  });
};
```

### Option 2: Use Test Scripts

Run explicit DNS checks:
```bash
# Check DNS resolution
npm run test-supabase

# Check firewall and DNS
npm run check-firewall

# Auto-check until DNS resolves
npm run auto-check
```

---

## 📋 Summary

| Location | Type | When | Purpose |
|----------|------|------|---------|
| **Sequelize connection** | Automatic | Every DB operation | Resolve hostname to IP |
| **test-supabase-connection-complete.js** | Explicit | Manual test | Verify DNS before connection |
| **check-firewall-and-status.js** | Explicit | Manual check | Verify database status |
| **check-internet-accessibility.js** | Explicit | Manual check | Verify internet accessibility |
| **auto-check-supabase.js** | Explicit | Auto-monitor | Wait for Supabase restore |
| **pre-start-check.js** | Explicit | Before server start | Verify DB before starting |

---

## 💡 Key Points

1. **DNS queries happen AUTOMATICALLY** when Sequelize connects
2. **You don't need to write DNS code** - Node.js does it for you
3. **ENOTFOUND means** DNS lookup failed (hostname doesn't resolve)
4. **Most common cause**: Supabase project is paused
5. **Test scripts** explicitly check DNS to diagnose issues

---

## 🚀 Quick Test

To see DNS queries in action:

```bash
# This will show DNS resolution
cd backend
node test-supabase-connection-complete.js
```

You'll see:
- ✅ DNS Resolution: SUCCESS (if project is active)
- ❌ DNS Resolution: FAILED (if project is paused)

---

**DNS queries are happening automatically in the background when your code tries to connect to the database!** 🔍

