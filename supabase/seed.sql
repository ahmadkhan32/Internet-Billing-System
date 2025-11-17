-- Internet Billing System - Seed Data for Supabase
-- Run this after migrations to populate initial data

-- Insert SaaS Packages (use DO UPDATE to ensure they exist and get IDs)
INSERT INTO saas_packages (name, description, price, duration, max_customers, max_users, features_json, status, is_featured)
VALUES
  ('Starter', 'Perfect for small ISPs getting started', 99.00, 1, 100, 5, 
   '{"max_customers": 100, "max_users": 5, "analytics": true, "email_support": true}', 'active', false),
  ('Professional', 'For growing ISPs with more customers', 299.00, 1, 500, 15, 
   '{"max_customers": 500, "max_users": 15, "analytics": true, "advanced_reports": true, "email_support": true, "priority_support": true}', 'active', true),
  ('Enterprise', 'For large ISPs with unlimited scale', 999.00, 1, NULL, NULL, 
   '{"max_customers": null, "max_users": null, "analytics": true, "advanced_reports": true, "api_access": true, "custom_integrations": true, "dedicated_support": true}', 'active', false)
ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  duration = EXCLUDED.duration,
  max_customers = EXCLUDED.max_customers,
  max_users = EXCLUDED.max_users,
  features_json = EXCLUDED.features_json,
  status = EXCLUDED.status,
  is_featured = EXCLUDED.is_featured;

-- Insert default ISP (for testing) - Use subquery to get the Professional package ID
INSERT INTO isps (business_id, name, address, contact, email, subscription_plan, subscription_status, saas_package_id, registration_date)
VALUES
  ('BIZ-2024-0001', 'Demo ISP', '123 Main Street, City, Country', '+1234567890', 'demo@isp.com', 'premium', 'active', 
   (SELECT id FROM saas_packages WHERE name = 'Professional' LIMIT 1), 
   CURRENT_TIMESTAMP)
ON CONFLICT (business_id) DO UPDATE SET
  name = EXCLUDED.name,
  address = EXCLUDED.address,
  contact = EXCLUDED.contact,
  email = EXCLUDED.email,
  subscription_plan = EXCLUDED.subscription_plan,
  subscription_status = EXCLUDED.subscription_status,
  saas_package_id = EXCLUDED.saas_package_id;

-- Insert Super Admin User (password: admin123)
-- Note: This will be hashed by the User model hook, but we'll create it with a placeholder
-- The actual password hash will be generated when the user logs in or updates password
-- For now, we'll let the application create the user on first run, or you can generate the hash:
-- const bcrypt = require('bcryptjs');
-- const hash = await bcrypt.hash('admin123', 10);
-- Use that hash value here
INSERT INTO users (name, email, password, role, isp_id, is_active)
VALUES
  ('Super Admin', 'admin@billing.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'super_admin', NULL, true)
ON CONFLICT (email) DO UPDATE SET 
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  is_active = EXCLUDED.is_active;

-- Insert default packages for the demo ISP - Use subquery to get the ISP ID
INSERT INTO packages (name, speed, price, data_limit, duration, description, isp_id, is_active)
VALUES
  ('Basic Plan', '10 Mbps', 29.99, 100, 1, 'Basic internet plan for home users', 
   (SELECT id FROM isps WHERE business_id = 'BIZ-2024-0001' LIMIT 1), true),
  ('Standard Plan', '20 Mbps', 49.99, 200, 1, 'Standard plan for regular users', 
   (SELECT id FROM isps WHERE business_id = 'BIZ-2024-0001' LIMIT 1), true),
  ('Premium Plan', '50 Mbps', 79.99, NULL, 1, 'Premium unlimited plan', 
   (SELECT id FROM isps WHERE business_id = 'BIZ-2024-0001' LIMIT 1), true),
  ('Business Plan', '100 Mbps', 149.99, NULL, 1, 'Business plan with priority support', 
   (SELECT id FROM isps WHERE business_id = 'BIZ-2024-0001' LIMIT 1), true)
ON CONFLICT DO NOTHING;

-- Insert Permissions (from initializeRBAC.js)
INSERT INTO permissions (name, display_name, resource, action, description)
VALUES
  -- User Management
  ('view_users', 'View Users', 'users', 'read', 'View list of users'),
  ('create_users', 'Create Users', 'users', 'create', 'Create new users'),
  ('update_users', 'Update Users', 'users', 'update', 'Update existing users'),
  ('delete_users', 'Delete Users', 'users', 'delete', 'Delete users'),
  
  -- Customer Management
  ('view_customers', 'View Customers', 'customers', 'read', 'View list of customers'),
  ('create_customers', 'Create Customers', 'customers', 'create', 'Create new customers'),
  ('update_customers', 'Update Customers', 'customers', 'update', 'Update existing customers'),
  ('delete_customers', 'Delete Customers', 'customers', 'delete', 'Delete customers'),
  
  -- Package Management
  ('view_packages', 'View Packages', 'packages', 'read', 'View list of packages'),
  ('create_packages', 'Create Packages', 'packages', 'create', 'Create new packages'),
  ('update_packages', 'Update Packages', 'packages', 'update', 'Update existing packages'),
  ('delete_packages', 'Delete Packages', 'packages', 'delete', 'Delete packages'),
  
  -- Bill Management
  ('view_bills', 'View Bills', 'bills', 'read', 'View list of bills'),
  ('create_bills', 'Create Bills', 'bills', 'create', 'Create new bills'),
  ('update_bills', 'Update Bills', 'bills', 'update', 'Update existing bills'),
  ('delete_bills', 'Delete Bills', 'bills', 'delete', 'Delete bills'),
  ('generate_bills', 'Generate Bills', 'bills', 'generate', 'Auto-generate bills'),
  
  -- Payment Management
  ('view_payments', 'View Payments', 'payments', 'read', 'View list of payments'),
  ('create_payments', 'Create Payments', 'payments', 'create', 'Create new payments'),
  ('update_payments', 'Update Payments', 'payments', 'update', 'Update existing payments'),
  ('approve_payments', 'Approve Payments', 'payments', 'approve', 'Approve pending payments'),
  
  -- Recovery Management
  ('view_recoveries', 'View Recoveries', 'recoveries', 'read', 'View list of recoveries'),
  ('create_recoveries', 'Create Recoveries', 'recoveries', 'create', 'Create new recoveries'),
  ('update_recoveries', 'Update Recoveries', 'recoveries', 'update', 'Update existing recoveries'),
  
  -- Installation Management
  ('view_installations', 'View Installations', 'installations', 'read', 'View list of installations'),
  ('create_installations', 'Create Installations', 'installations', 'create', 'Create new installations'),
  ('update_installations', 'Update Installations', 'installations', 'update', 'Update existing installations'),
  ('delete_installations', 'Delete Installations', 'installations', 'delete', 'Delete installations'),
  
  -- Reports
  ('view_reports', 'View Reports', 'reports', 'read', 'View reports'),
  ('generate_reports', 'Generate Reports', 'reports', 'generate', 'Generate new reports'),
  
  -- ISP Management
  ('view_isps', 'View ISPs', 'isps', 'read', 'View list of ISPs'),
  ('create_isps', 'Create ISPs', 'isps', 'create', 'Create new ISPs'),
  ('update_isps', 'Update ISPs', 'isps', 'update', 'Update existing ISPs'),
  ('delete_isps', 'Delete ISPs', 'isps', 'delete', 'Delete ISPs'),
  
  -- Role & Permission Management
  ('view_roles', 'View Roles', 'roles', 'read', 'View list of roles'),
  ('create_roles', 'Create Roles', 'roles', 'create', 'Create new roles'),
  ('update_roles', 'Update Roles', 'roles', 'update', 'Update existing roles'),
  ('delete_roles', 'Delete Roles', 'roles', 'delete', 'Delete roles'),
  ('manage_permissions', 'Manage Permissions', 'permissions', 'manage', 'Manage permissions'),
  
  -- Notifications
  ('view_notifications', 'View Notifications', 'notifications', 'read', 'View notifications'),
  ('create_notifications', 'Create Notifications', 'notifications', 'create', 'Create new notifications'),
  
  -- Activity Logs
  ('view_activity_logs', 'View Activity Logs', 'activity_logs', 'read', 'View activity logs'),
  
  -- Marketing & Promotions
  ('view_promotions', 'View Promotions', 'promotions', 'read', 'View promotions'),
  ('create_promotions', 'Create Promotions', 'promotions', 'create', 'Create new promotions'),
  ('update_promotions', 'Update Promotions', 'promotions', 'update', 'Update existing promotions'),
  ('delete_promotions', 'Delete Promotions', 'promotions', 'delete', 'Delete promotions'),
  ('manage_campaigns', 'Manage Campaigns', 'campaigns', 'manage', 'Manage marketing campaigns'),
  
  -- Automation & AI
  ('view_automation', 'View Automation', 'automation', 'read', 'View automation settings'),
  ('manage_automation', 'Manage Automation', 'automation', 'manage', 'Manage automation settings'),
  ('view_ai_insights', 'View AI Insights', 'ai_insights', 'read', 'View AI-generated insights')
ON CONFLICT (name) DO NOTHING;

-- Insert Roles
INSERT INTO roles (name, display_name, description, business_id, is_system_role, is_active)
VALUES
  ('super_admin', 'Super Admin', 'System owner with full access to all features', NULL, true, true),
  ('admin', 'ISP Admin', 'ISP owner with full access to their ISP operations', NULL, true, true),
  ('account_manager', 'Account Manager', 'Handles billing and customer accounts', NULL, true, true),
  ('technical_officer', 'Technical Officer', 'Manages installations and technical services', NULL, true, true),
  ('recovery_officer', 'Recovery Officer', 'Handles payment collection and recovery', NULL, true, true),
  ('marketing_officer', 'Marketing / Promotion Officer', 'Manages customer engagement, campaigns, and promotions', NULL, true, true),
  ('customer', 'Customer', 'End-user with access to personal portal', NULL, true, true)
ON CONFLICT (name, business_id) DO NOTHING;

-- Assign all permissions to super_admin
INSERT INTO role_permissions (role_id, permission_id)
SELECT 
  (SELECT id FROM roles WHERE name = 'super_admin'),
  id
FROM permissions
ON CONFLICT (role_id, permission_id) DO NOTHING;

-- Assign permissions to admin role
INSERT INTO role_permissions (role_id, permission_id)
SELECT 
  (SELECT id FROM roles WHERE name = 'admin'),
  id
FROM permissions
WHERE name IN (
  'view_users', 'create_users', 'update_users', 'delete_users',
  'view_customers', 'create_customers', 'update_customers', 'delete_customers',
  'view_packages', 'create_packages', 'update_packages', 'delete_packages',
  'view_bills', 'create_bills', 'update_bills', 'delete_bills', 'generate_bills',
  'view_payments', 'create_payments', 'update_payments', 'approve_payments',
  'view_recoveries', 'create_recoveries', 'update_recoveries',
  'view_installations', 'create_installations', 'update_installations', 'delete_installations',
  'view_reports', 'generate_reports',
  'view_notifications', 'create_notifications'
)
ON CONFLICT (role_id, permission_id) DO NOTHING;

-- Assign permissions to account_manager role
INSERT INTO role_permissions (role_id, permission_id)
SELECT 
  (SELECT id FROM roles WHERE name = 'account_manager'),
  id
FROM permissions
WHERE name IN (
  'view_customers', 'create_customers', 'update_customers',
  'view_bills', 'create_bills', 'update_bills', 'generate_bills',
  'view_payments', 'create_payments', 'update_payments', 'approve_payments',
  'view_reports', 'generate_reports',
  'view_notifications'
)
ON CONFLICT (role_id, permission_id) DO NOTHING;

-- Assign permissions to technical_officer role
INSERT INTO role_permissions (role_id, permission_id)
SELECT 
  (SELECT id FROM roles WHERE name = 'technical_officer'),
  id
FROM permissions
WHERE name IN (
  'view_customers',
  'view_installations', 'create_installations', 'update_installations',
  'view_notifications'
)
ON CONFLICT (role_id, permission_id) DO NOTHING;

-- Assign permissions to recovery_officer role
INSERT INTO role_permissions (role_id, permission_id)
SELECT 
  (SELECT id FROM roles WHERE name = 'recovery_officer'),
  id
FROM permissions
WHERE name IN (
  'view_customers',
  'view_bills',
  'view_recoveries', 'create_recoveries', 'update_recoveries',
  'view_payments', 'create_payments',
  'view_notifications'
)
ON CONFLICT (role_id, permission_id) DO NOTHING;

-- Assign permissions to marketing_officer role
INSERT INTO role_permissions (role_id, permission_id)
SELECT 
  (SELECT id FROM roles WHERE name = 'marketing_officer'),
  id
FROM permissions
WHERE name IN (
  'view_customers',
  'view_promotions', 'create_promotions', 'update_promotions', 'delete_promotions',
  'manage_campaigns',
  'view_notifications', 'create_notifications',
  'view_reports'
)
ON CONFLICT (role_id, permission_id) DO NOTHING;

-- Assign permissions to customer role
INSERT INTO role_permissions (role_id, permission_id)
SELECT 
  (SELECT id FROM roles WHERE name = 'customer'),
  id
FROM permissions
WHERE name IN (
  'view_bills',
  'view_payments',
  'view_notifications',
  'view_promotions'
)
ON CONFLICT (role_id, permission_id) DO NOTHING;

