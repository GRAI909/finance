import React from 'react';

const ViewUserModal = ({ isOpen, onClose, user }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-md w-full glass-panel rounded-3xl p-6 border border-slate-700 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors"
        >
          <i className="fa-solid fa-xmark text-lg"></i>
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 to-sky-500 flex items-center justify-center text-white text-2xl shadow-lg">
            <i className="fa-solid fa-user-tie"></i>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{user.name}</h2>
            <p className="text-xs text-sky-400 font-mono">@{user.username}</p>
            <div className="flex items-center gap-2 mt-1.5">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                user.role === 'Admin' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40' : 'bg-slate-800 text-slate-300'
              }`}>
                {user.role}
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                user.status === 'Active' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
              }`}>
                {user.status}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3 bg-slate-900/80 rounded-2xl p-4 border border-slate-800 text-xs">
          <div className="flex justify-between py-1.5 border-b border-slate-800">
            <span className="text-slate-400">User ID:</span>
            <span className="font-mono text-slate-200">{user._id}</span>
          </div>

          <div className="flex justify-between py-1.5 border-b border-slate-800">
            <span className="text-slate-400">Email Address:</span>
            <span className="text-slate-200">{user.email}</span>
          </div>

          <div className="flex justify-between py-1.5 border-b border-slate-800">
            <span className="text-slate-400">Account Created:</span>
            <span className="text-slate-200">
              {new Date(user.createdAt).toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
              })}
            </span>
          </div>

          <div className="flex justify-between py-1.5">
            <span className="text-slate-400">Last Login:</span>
            <span className="text-slate-200">
              {user.lastLogin
                ? new Date(user.lastLogin).toLocaleString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })
                : 'Never'}
            </span>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewUserModal;
