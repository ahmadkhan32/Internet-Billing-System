const User = require('../models/User');
const ISP = require('../models/ISP');
const generateToken = require('../utils/generateToken');
const { validationResult } = require('express-validator');
const ensureDefaultUsers = require('../utils/ensureDefaultUsers');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public (for customers only) / Private (for admin creating staff via /api/users)
const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, role, isp_id, phone, address } = req.body;

    // Public registration is only for customers
    // Staff accounts must be created by admin via /api/users endpoint
    const requestedRole = role || 'customer';
    if (requestedRole !== 'customer') {
      return res.status(403).json({ 
        message: 'Staff accounts must be created by admin. Please use /api/users endpoint or contact your administrator.' 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // For customer registration, ISP ID is required
    if (!isp_id) {
      return res.status(400).json({ message: 'ISP ID is required for customer registration' });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role: 'customer',
      isp_id: isp_id
    });

    // Create customer record
    if (phone && address) {
      const Customer = require('../models/Customer');
      await Customer.create({
        name,
        email,
        phone,
        address,
        isp_id,
        connection_date: new Date()
      });
    }

    const token = generateToken(user.id);

    res.status(201).json({
      success: true,
      message: 'Customer registered successfully',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isp_id: user.isp_id
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration', error: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, business_id } = req.body;

    // Ensure default users exist (important for serverless/Vercel deployments)
    // Check if any users exist, if not, create default users
    const userCount = await User.count();
    if (userCount === 0) {
      console.log('⚠️  No users found in database. Creating default users...');
      await ensureDefaultUsers();
    }

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      // Try to ensure default users exist one more time (in case of race condition)
      await ensureDefaultUsers();
      const retryUser = await User.findOne({ where: { email } });
      if (!retryUser) {
        return res.status(401).json({ 
          message: 'Invalid credentials. Default users: admin@billing.com / admin123' 
        });
      }
      // Use the retry user
      const isMatch = await retryUser.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      // Continue with retryUser
      retryUser.last_login = new Date();
      await retryUser.save();
      const token = generateToken(retryUser.id);
      let ispInfo = null;
      if (retryUser.isp_id) {
        ispInfo = await ISP.findByPk(retryUser.isp_id);
      }
      return res.json({
        success: true,
        message: 'Login successful',
        token,
        user: {
          id: retryUser.id,
          name: retryUser.name,
          email: retryUser.email,
          role: retryUser.role,
          isp_id: retryUser.isp_id,
          isp: ispInfo
        }
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.error(`Login failed for ${email}: Invalid password`);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if user is active
    if (!user.is_active) {
      return res.status(401).json({ message: 'Account is inactive' });
    }

    // Validate Business ID if provided (for Business Admin login)
    if (business_id) {
      if (user.role !== 'admin') {
        return res.status(403).json({ 
          message: 'Business ID login is only available for Business Admin accounts' 
        });
      }

      if (!user.isp_id) {
        return res.status(400).json({ 
          message: 'Your account is not associated with a business. Please contact support.' 
        });
      }

      // Verify Business ID matches user's ISP
      const isp = await ISP.findByPk(user.isp_id);
      if (!isp) {
        return res.status(400).json({ 
          message: 'Business not found. Please contact support.' 
        });
      }

      // Check if Business ID matches
      if (isp.business_id && isp.business_id !== business_id) {
        return res.status(401).json({ 
          message: 'Invalid Business ID. Please check and try again.' 
        });
      }

      // If ISP doesn't have business_id set, allow login but log warning
      if (!isp.business_id) {
        console.warn(`⚠️  Business Admin ${email} logged in but ISP ${isp.id} has no business_id set`);
      }
    }

    // Update last login
    user.last_login = new Date();
    await user.save();

    // Generate token
    let token;
    try {
      token = generateToken(user.id);
    } catch (error) {
      console.error('Token generation error:', error);
      return res.status(500).json({ message: 'Server error: JWT_SECRET not configured', error: error.message });
    }

    // Include ISP info if user belongs to an ISP
    let ispInfo = null;
    if (user.isp_id) {
      ispInfo = await ISP.findByPk(user.isp_id);
    }

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isp_id: user.isp_id,
        isp: ispInfo
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    console.error('Error stack:', error.stack);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      code: error.code,
      errno: error.errno,
      sqlState: error.sqlState,
      sqlMessage: error.sqlMessage
    });
    
    // Always show error message in Vercel for debugging
    const isDev = process.env.NODE_ENV === 'development' || 
                  process.env.VERCEL_ENV === 'development' || 
                  process.env.VERCEL_ENV === 'preview' ||
                  process.env.VERCEL;
    
    // Provide more helpful error messages
    let errorMessage = 'Server error during login';
    let statusCode = 500;
    
    if (error.name === 'SequelizeConnectionError' || error.name === 'SequelizeConnectionRefusedError') {
      // Check if it's a missing environment variable issue
      // Check for undefined (not set), not just falsy values
      const missingVars = [];
      if (process.env.DB_HOST === undefined || process.env.DB_HOST.trim() === '') {
        missingVars.push('DB_HOST');
      }
      if (process.env.DB_USER === undefined || process.env.DB_USER.trim() === '') {
        missingVars.push('DB_USER');
      }
      if (process.env.DB_NAME === undefined || process.env.DB_NAME.trim() === '') {
        missingVars.push('DB_NAME');
      }
      // In production/Vercel, DB_PASSWORD must be set and non-empty
      if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
        if (process.env.DB_PASSWORD === undefined || process.env.DB_PASSWORD.trim() === '') {
          missingVars.push('DB_PASSWORD');
        }
      } else {
        // In local dev, just check if it's undefined (empty string is OK)
        if (process.env.DB_PASSWORD === undefined) {
          missingVars.push('DB_PASSWORD');
        }
      }
      
      if (missingVars.length > 0) {
        errorMessage = `Missing environment variables: ${missingVars.join(', ')}. Please set these in Vercel project settings.`;
      } else {
        errorMessage = 'Database connection failed. Please check your database configuration and ensure database is accessible from Vercel.';
      }
      statusCode = 503;
    } else if (error.name === 'SequelizeDatabaseError') {
      errorMessage = 'Database error. Please check your database configuration.';
      statusCode = 503;
    } else if (error.name === 'SequelizeValidationError') {
      errorMessage = 'Validation error: ' + (error.message || 'Invalid data');
      statusCode = 400;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    const errorResponse = {
      message: errorMessage,
      error: isDev ? error.message : errorMessage,
      name: error.name || 'Error'
    };
    
    // Add more details in development/Vercel
    if (isDev) {
      errorResponse.stack = error.stack;
      errorResponse.code = error.code;
      errorResponse.details = {
        errno: error.errno,
        sqlState: error.sqlState,
        sqlMessage: error.sqlMessage
      };
    }
    
    res.status(statusCode).json(errorResponse);
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] },
      include: [{
        model: ISP,
        as: 'isp',
        attributes: ['id', 'name', 'email', 'contact']
      }]
    });

    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { register, login, getMe };

