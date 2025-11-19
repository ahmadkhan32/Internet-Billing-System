# ⚡ Quick Fix: Supabase CLI Commands

## ❌ **Your Commands (Need Fixing)**

```bash
supabase link --project-ref @https://qppdkzzmijjyoihzfdxw.supabase.co  # ❌ Wrong
supabase db push                                                         # ✅ Correct
supabase start                                                           # ⚠️ For local dev only
```

---

## ✅ **Corrected Commands**

### **Step 1: Install Supabase CLI** (If not installed)

```powershell
npm install -g supabase
```

**Verify**:
```bash
supabase --version
```

---

### **Step 2: Restore Your Project First** (CRITICAL)

**Before using CLI, restore your paused project**:

1. Go to: https://supabase.com/dashboard
2. Click your project
3. Click "Restore"
4. Wait 3-5 minutes

**CLI can't connect to a paused project!**

---

### **Step 3: Login to Supabase**

```bash
supabase login
```

**This will open your browser** to authenticate.

---

### **Step 4: Link to Your Project** (Fixed Command)

**❌ Wrong**:
```bash
supabase link --project-ref @https://qppdkzzmijjyoihzfdxw.supabase.co
```

**✅ Correct**:
```bash
supabase link --project-ref qppdkzzmijjyoihzfdxw
```

**Project ref is just the ID**, not the full URL!

---

### **Step 5: Push Database Schema**

```bash
supabase db push
```

**This pushes migrations from `supabase/migrations/` folder to your remote database.**

---

### **Step 6: About `supabase start`**

**⚠️ Important**: `supabase start` is for **LOCAL development only**!

**What it does**:
- Starts a **local** Supabase instance on your computer
- **Does NOT** restore your paused remote project
- **Does NOT** fix DNS errors

**To restore your remote project**: Use the dashboard (not `supabase start`)

---

## 🎯 **Complete Correct Workflow**

```bash
# 1. Install CLI (if not installed)
npm install -g supabase

# 2. Restore project in dashboard first!
#    Go to: https://supabase.com/dashboard → Restore

# 3. Login
supabase login

# 4. Link (correct format)
supabase link --project-ref qppdkzzmijjyoihzfdxw

# 5. Push migrations
supabase db push
```

---

## 💡 **Easier Alternative (No CLI Needed)**

**Instead of CLI, use Supabase Dashboard**:

1. **Go to**: Supabase Dashboard → **SQL Editor**
2. **Click "New query"**
3. **Open**: `supabase/migrations/001_initial_schema.sql`
4. **Copy** entire content
5. **Paste** into SQL Editor
6. **Click "Run"**

**This is easier and doesn't require CLI installation!**

---

## ✅ **Summary**

**Fixed commands**:
- ✅ `supabase link --project-ref qppdkzzmijjyoihzfdxw` (not the full URL)
- ✅ `supabase db push` (correct)
- ⚠️ `supabase start` (for local dev only, not for restoring remote)

**Before using CLI**:
- ✅ Restore project in dashboard first!

**Easier option**:
- ✅ Use SQL Editor (no CLI needed)

---

**Use corrected commands above!** ✅

