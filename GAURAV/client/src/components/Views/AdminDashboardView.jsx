import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { useToast } from '../../context/ToastContext';
import UserModal from '../Modals/UserModal';
import ResetPasswordModal from '../Modals/ResetPasswordModal';
import ViewUserModal from '../Modals/ViewUserModal';

const AdminDashboardView = () => {
  const { addToast } = useToast();
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    disabledUsers: 0,
    adminCount: 0,
    totalActivities: 0,
    activeSessionsCount: 0
  });
  const [recentlyLoggedIn, setRecentlyLoggedIn] = useState([]);
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);

  const [loading, setLoading] = useState(true);
  const [activeSubTab, setActiveSubTab] = useState('users'); // 'users' | 'logs'

  // User Management Filters
  const [userSearch, setUserSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modals state
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [resettingUser, setResettingUser] = useState(null);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingUser, setViewingUser] = useState(null);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      // Fetch Dashboard stats
      const statsRes = await api.get('/admin/dashboard');
      if (statsRes.data.success) {
        setStats(statsRes.data.stats);
        setRecentlyLoggedIn(statsRes.data.recentlyLoggedIn || []);
      }

      // Fetch Users List
      const usersRes = await api.get(`/users?search=${userSearch}&role=${roleFilter}&status=${statusFilter}`);
      if (usersRes.data.success) {
        setUsers(usersRes.data.users);
      }

      // Fetch Activity Logs
      const logsRes = await api.get('/admin/logs?limit=30');
      if (logsRes.data.success) {
        setLogs(logsRes.data.logs);
      }
    } catch (error) {
      addToast(error.response?.data?.message || 'Failed to fetch admin data', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, [userSearch, roleFilter, statusFilter]);

  // User CRUD Operations
  const handleSaveUser = async (formData, userId) => {
    try {
      if (userId) {
        // Edit User
        const res = await api.put(`/users/${userId}`, formData);
        if (res.data.success) {
          addToast('User details updated successfully!', 'success');
          fetchAdminData();
        }
      } else {
        // Add User
        const res = await api.post('/users', formData);
        if (res.data.success) {
          addToast('New user account created successfully!', 'success');
          fetchAdminData();
        }
      }
    } catch (error) {
      addToast(error.response?.data?.message || 'Failed to save user', 'error');
    }
  };

  const handleToggleStatus = async (user) => {
    const newStatus = user.status === 'Active' ? 'Disabled' : 'Active';
    try {
      const res = await api.put(`/users/${user._id}`, { status: newStatus });
      if (res.data.success) {
        addToast(`User ${user.username} status set to ${newStatus}`, 'info');
        fetchAdminData();
      }
    } catch (error) {
      addToast('Failed to toggle status', 'error');
    }
  };

  const handleDeleteUser = async (user) => {
    if (!window.confirm(`Are you sure you want to permanently delete user @${user.username}?`)) return;

    try {
      const res = await api.delete(`/users/${user._id}`);
      if (res.data.success) {
        addToast(`User @${user.username} deleted successfully`, 'success');
        fetchAdminData();
      }
    } catch (error) {
      addToast(error.response?.data?.message || 'Failed to delete user', 'error');
    }
  };

  const handleResetPassword = async (userId, newPassword) => {
    try {
      const res = await api.put(`/users/${userId}/reset-password`, { newPassword });
      if (res.data.success) {
        addToast(res.data.message, 'success');
      }
    } catch (error) {
      addToast(error.response?.data?.message || 'Failed to reset password', 'error');
    }
  };

  const handleExportCsv = async () => {
    try {
      const response = await api.get('/users?exportCsv=true', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'users_export.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
      addToast('Users CSV downloaded successfully!', 'success');
    } catch (error) {
      addToast('Failed to export CSV', 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <i className="fa-solid fa-shield-halved text-indigo-400"></i>
            <span>Administrator Control Center</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">Manage users, access controls, system logs, and security policies.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCsv}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <i className="fa-solid fa-file-csv text-emerald-400"></i>
            <span>Export Users CSV</span>
          </button>
          <button
            onClick={() => { setEditingUser(null); setIsUserModalOpen(true); }}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/20 flex items-center gap-2"
          >
            <i className="fa-solid fa-user-plus"></i>
            <span>Add New User</span>
          </button>
        </div>
      </div>

      {/* Admin Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel rounded-2xl p-4 border border-indigo-500/20 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-xl">
            <i className="fa-solid fa-users"></i>
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400">Total Users</span>
            <h3 className="text-xl font-bold text-white">{stats.totalUsers}</h3>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-emerald-500/20 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xl">
            <i className="fa-solid fa-user-check"></i>
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400">Active Accounts</span>
            <h3 className="text-xl font-bold text-white">{stats.activeUsers}</h3>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-amber-500/20 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-xl">
            <i className="fa-solid fa-user-clock"></i>
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400">Active Sessions</span>
            <h3 className="text-xl font-bold text-white">{stats.activeSessionsCount}</h3>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-rose-500/20 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center text-xl">
            <i className="fa-solid fa-user-slash"></i>
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400">Disabled Users</span>
            <h3 className="text-xl font-bold text-white">{stats.disabledUsers}</h3>
          </div>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex border-b border-slate-800 gap-4">
        <button
          onClick={() => setActiveSubTab('users')}
          className={`pb-3 text-xs font-bold transition-all relative ${
            activeSubTab === 'users' ? 'text-indigo-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          User Accounts Directory ({users.length})
          {activeSubTab === 'users' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full"></span>
          )}
        </button>

        <button
          onClick={() => setActiveSubTab('logs')}
          className={`pb-3 text-xs font-bold transition-all relative ${
            activeSubTab === 'logs' ? 'text-indigo-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          System Activity & Audit Logs ({logs.length})
          {activeSubTab === 'logs' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full"></span>
          )}
        </button>
      </div>

      {/* TAB 1: User Management Table */}
      {activeSubTab === 'users' && (
        <div className="space-y-4">
          {/* User Filters */}
          <div className="glass-panel rounded-2xl p-4 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="relative max-w-xs w-full">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                <i className="fa-solid fa-magnifying-glass text-xs"></i>
              </span>
              <input
                type="text"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder="Search name, username, email..."
                className="w-full pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex items-center gap-3">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="bg-slate-900 border border-slate-700 text-xs text-white rounded-xl px-3 py-1.5 focus:outline-none"
              >
                <option value="All">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-900 border border-slate-700 text-xs text-white rounded-xl px-3 py-1.5 focus:outline-none"
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Disabled">Disabled</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-900/80 border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                    <th className="py-3.5 px-4">User</th>
                    <th className="py-3.5 px-4">Email</th>
                    <th className="py-3.5 px-4">Role</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Last Login</th>
                    <th className="py-3.5 px-4 text-right">Admin Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {users.map((u) => (
                    <tr key={u._id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white text-sm">{u.name}</div>
                        <div className="text-[10px] text-indigo-400 font-mono">@{u.username}</div>
                      </td>

                      <td className="py-3.5 px-4 text-slate-300">{u.email}</td>

                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                          u.role === 'Admin' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40' : 'bg-slate-800 text-slate-300'
                        }`}>
                          {u.role}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => handleToggleStatus(u)}
                          title="Click to toggle status"
                          className={`px-2.5 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-transform active:scale-95 ${
                            u.status === 'Active' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          }`}
                        >
                          {u.status}
                        </button>
                      </td>

                      <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                        {u.lastLogin ? new Date(u.lastLogin).toLocaleString('en-IN') : 'Never'}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => { setViewingUser(u); setIsViewModalOpen(true); }}
                            title="View Full Profile"
                            className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 flex items-center justify-center transition-colors"
                          >
                            <i className="fa-solid fa-eye text-xs"></i>
                          </button>

                          <button
                            onClick={() => { setEditingUser(u); setIsUserModalOpen(true); }}
                            title="Edit User"
                            className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-400 flex items-center justify-center transition-colors"
                          >
                            <i className="fa-solid fa-pen text-xs"></i>
                          </button>

                          <button
                            onClick={() => { setResettingUser(u); setIsResetModalOpen(true); }}
                            title="Reset Password"
                            className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 flex items-center justify-center transition-colors"
                          >
                            <i className="fa-solid fa-key text-xs"></i>
                          </button>

                          <button
                            onClick={() => handleDeleteUser(u)}
                            title="Delete User"
                            className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-rose-950 text-rose-400 flex items-center justify-center transition-colors"
                          >
                            <i className="fa-solid fa-trash-can text-xs"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Activity Logs */}
      {activeSubTab === 'logs' && (
        <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-900/80 border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-4">Timestamp</th>
                  <th className="py-3.5 px-4">User</th>
                  <th className="py-3.5 px-4">Action</th>
                  <th className="py-3.5 px-4">Details</th>
                  <th className="py-3.5 px-4">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {logs.map((log) => (
                  <tr key={log._id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-mono text-slate-400 text-[11px]">
                      {new Date(log.createdAt).toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 font-bold text-indigo-400">@{log.username}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-200">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-300">{log.details || '—'}</td>
                    <td className="py-3 px-4 text-slate-500 font-mono text-[10px]">{log.ipAddress || '127.0.0.1'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Render Modals */}
      <UserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        onSave={handleSaveUser}
        user={editingUser}
      />

      <ResetPasswordModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onReset={handleResetPassword}
        user={resettingUser}
      />

      <ViewUserModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        user={viewingUser}
      />
    </div>
  );
};

export default AdminDashboardView;
