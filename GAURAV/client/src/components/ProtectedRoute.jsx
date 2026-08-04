import React from 'react';
import { useAuth } from '../context/AuthContext';
import Login from './Login';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="flex flex-col items-center gap-3">
          <i className="fa-solid fa-circle-notch fa-spin text-4xl text-sky-500"></i>
          <p className="text-slate-400 text-sm">Loading Rai Financial DSA Desk...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  if (adminOnly && !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-6">
        <div className="max-w-md w-full glass-panel rounded-2xl p-8 text-center border border-rose-500/30">
          <div className="w-16 h-16 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto mb-4 text-2xl">
            <i className="fa-solid fa-shield-halved"></i>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Access Restricted</h2>
          <p className="text-slate-400 text-sm mb-6">
            You do not have Administrator permissions to access the Admin Management system.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="py-2.5 px-5 bg-sky-600 hover:bg-sky-500 text-white font-medium rounded-xl text-sm transition-colors"
          >
            Return to User Dashboard
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
