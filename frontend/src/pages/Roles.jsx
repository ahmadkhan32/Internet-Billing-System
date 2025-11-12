import { useEffect, useState } from 'react';
import apiClient from '../api/apiClient';
import { useBusiness } from '../context/BusinessContext';

const Roles = () => {
  const { getBusinessId, isSuperAdmin } = useBusiness();
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    display_name: '',
    description: '',
    permission_ids: []
  });

  useEffect(() => {
    fetchRoles();
    fetchPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Initial load only - will re-fetch when business changes via manual refresh

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const businessId = getBusinessId();
      const params = businessId && isSuperAdmin ? { business_id: businessId } : {};
      const response = await apiClient.get('/roles', { params });
      setRoles(response.data.roles || []);
    } catch (error) {
      console.error('Error fetching roles:', error);
      const errorMessage = error.response?.data?.message || 
                           error.response?.data?.error || 
                           'Error fetching roles. Please check if you are logged in as Super Admin or Business Admin.';
      alert(errorMessage);
      setRoles([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const fetchPermissions = async () => {
    try {
      const response = await apiClient.get('/permissions');
      setPermissions(response.data.permissions || []);
    } catch (error) {
      console.error('Error fetching permissions:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = { ...formData };
      // For Business Admin, automatically set business_id
      if (!isSuperAdmin) {
        const businessId = getBusinessId();
        if (businessId) {
          submitData.business_id = businessId;
        }
      }
      
      if (editingRole) {
        await apiClient.put(`/roles/${editingRole.id}`, submitData);
      } else {
        await apiClient.post('/roles', submitData);
      }
      setShowModal(false);
      setEditingRole(null);
      setFormData({ name: '', display_name: '', description: '', permission_ids: [] });
      fetchRoles();
    } catch (error) {
      console.error('Error saving role:', error);
      alert(error.response?.data?.message || 'Error saving role');
    }
  };

  const handleEdit = (role) => {
    setEditingRole(role);
    setFormData({
      name: role.name,
      display_name: role.display_name,
      description: role.description || '',
      permission_ids: role.permissions?.map(p => p.id) || []
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this role?')) return;
    try {
      await apiClient.delete(`/roles/${id}`);
      fetchRoles();
    } catch (error) {
      console.error('Error deleting role:', error);
      alert('Error deleting role');
    }
  };

  const togglePermission = (permissionId) => {
    setFormData(prev => {
      const ids = prev.permission_ids || [];
      if (ids.includes(permissionId)) {
        return { ...prev, permission_ids: ids.filter(id => id !== permissionId) };
      } else {
        return { ...prev, permission_ids: [...ids, permissionId] };
      }
    });
  };

  // Group permissions by resource
  const groupedPermissions = permissions.reduce((acc, perm) => {
    if (!acc[perm.resource]) {
      acc[perm.resource] = [];
    }
    acc[perm.resource].push(perm);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Roles & Permissions</h1>
        <button
          onClick={() => {
            setEditingRole(null);
            setFormData({ name: '', display_name: '', description: '', permission_ids: [] });
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Role
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => (
          <div key={role.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-800">{role.display_name}</h3>
                <p className="text-sm text-gray-500">{role.name}</p>
                {role.business && (
                  <p className="text-xs text-gray-400 mt-1">Business: {role.business.name}</p>
                )}
                {!role.business && role.is_system_role && (
                  <p className="text-xs text-gray-400 mt-1">System Role</p>
                )}
              </div>
              {role.is_system_role && (
                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">System</span>
              )}
            </div>
            {role.description && (
              <p className="text-gray-600 text-sm mb-4">{role.description}</p>
            )}
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">
                Permissions ({role.permissions?.length || 0})
              </p>
              <div className="flex flex-wrap gap-1">
                {role.permissions?.slice(0, 5).map((perm) => (
                  <span key={perm.id} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    {perm.display_name}
                  </span>
                ))}
                {role.permissions?.length > 5 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                    +{role.permissions.length - 5} more
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(role)}
                className="flex-1 bg-blue-100 text-blue-700 px-3 py-2 rounded hover:bg-blue-200"
              >
                Edit
              </button>
              {!role.is_system_role && (
                <button
                  onClick={() => handleDelete(role.id)}
                  className="flex-1 bg-red-100 text-red-700 px-3 py-2 rounded hover:bg-red-200"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {editingRole ? 'Edit Role' : 'Add Role'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., custom_role"
                    disabled={editingRole?.is_system_role}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                  <input
                    type="text"
                    required
                    value={formData.display_name}
                    onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Custom Role"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Permissions ({formData.permission_ids?.length || 0} selected)
                </label>
                <div className="border border-gray-300 rounded-lg p-4 max-h-96 overflow-y-auto bg-gray-50">
                  {Object.entries(groupedPermissions).map(([resource, perms]) => (
                    <div key={resource} className="mb-4 pb-4 border-b border-gray-200 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-800 capitalize">{resource}</h4>
                        <span className="text-xs text-gray-500">
                          {perms.filter(p => formData.permission_ids?.includes(p.id)).length} / {perms.length}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {perms.map((perm) => (
                          <label
                            key={perm.id}
                            className="flex items-center space-x-2 cursor-pointer hover:bg-white p-2 rounded border border-gray-200 bg-white transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={formData.permission_ids?.includes(perm.id) || false}
                              onChange={() => togglePermission(perm.id)}
                              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2 cursor-pointer"
                            />
                            <span className="text-sm text-gray-700 flex-1">{perm.display_name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                  {Object.keys(groupedPermissions).length === 0 && (
                    <p className="text-center text-gray-500 py-4">No permissions available</p>
                  )}
                </div>
                <div className="mt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      // Select all permissions
                      const allIds = permissions.map(p => p.id);
                      setFormData({ ...formData, permission_ids: allIds });
                    }}
                    className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                  >
                    Select All
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      // Deselect all permissions
                      setFormData({ ...formData, permission_ids: [] });
                    }}
                    className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                  >
                    Deselect All
                  </button>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  {editingRole ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingRole(null);
                  }}
                  className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Roles;

