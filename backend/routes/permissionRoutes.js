const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  getPermissions,
  getPermission,
  createPermission,
  updatePermission,
  deletePermission
} = require('../controllers/permissionController');
const authMiddleware = require('../middlewares/authMiddleware');
const { roleMiddleware } = require('../middlewares/roleMiddleware');

// Validation rules
const permissionValidation = [
  body('name').notEmpty().withMessage('Permission name is required'),
  body('display_name').notEmpty().withMessage('Display name is required'),
  body('resource').notEmpty().withMessage('Resource is required'),
  body('action').notEmpty().withMessage('Action is required')
];

router.use(authMiddleware);
router.use(roleMiddleware('super_admin')); // Only Super Admin can manage permissions

router.get('/', getPermissions);
router.get('/:id', getPermission);
router.post('/', permissionValidation, createPermission);
router.put('/:id', permissionValidation, updatePermission);
router.delete('/:id', deletePermission);

module.exports = router;

