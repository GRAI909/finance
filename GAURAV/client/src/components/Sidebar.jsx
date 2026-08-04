import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Sidebar = ({ activeTab, setActiveTab, activeLeadsCount = 0, dueCallbacksCount = 0, isOpen, setIsOpen }) => {
  const { user, logout, isAdmin } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fa-chart-pie' },
    { id: 'pipeline', label: 'Lead Pipeline', icon: 'fa-bars-staggered', badge: activeLeadsCount },
    { id: 'leads', label: 'All Leads', icon: 'fa-users' },
    { id: 'policies', label: '15 Bank Policies & Docs', icon: 'fa-building-columns' },
    { id: 'matcher', label: 'Bank Matcher Tool', icon: 'fa-wand-magic-sparkles' },
    { id: 'reminders', label: 'Callbacks & Schedule', icon: 'fa-clock-rotate-left', badgeWarning: dueCallbacksCount },
    { id: 'calculators', label: 'Loan Calculators', icon: 'fa-calculator' },
    { id: 'scripts', label: 'WhatsApp Scripts', icon: 'fa-whatsapp', iconBrand: true },
    { id: 'profile', label: 'My Profile', icon: 'fa-user-gear' }
  ];

  if (isAdmin) {
    navItems.push({
      id: 'admin',
      label: 'Admin Management',
      icon: 'fa-shield-halved',
      badgeAdmin: true
    });
  }

  const handleNavClick = (id) => {
    setActiveTab(id);
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
        ></div>
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 w-72 bg-slate-900/95 border-r border-slate-800 z-50 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white text-xl shadow-lg shadow-sky-500/30">
            <i className="fa-solid fa-hand-holding-dollar"></i>
          </div>
          <div>
            <h2 className="font-extrabold text-white text-base tracking-wide leading-tight">
              RAI <span className="text-sky-400">FINANCIAL</span>
            </h2>
            <p className="text-[11px] text-slate-400 font-medium">Multi-Bank DSA Desk</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all group ${
                  isActive
                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <i
                    className={`${item.iconBrand ? 'fa-brands' : 'fa-solid'} ${item.icon} text-base transition-transform group-hover:scale-110 ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-sky-400'
                    }`}
                  ></i>
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && item.badge > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-400/20 text-sky-300">
                    {item.badge}
                  </span>
                )}

                {item.badgeWarning !== undefined && item.badgeWarning > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {item.badgeWarning}
                  </span>
                )}

                {item.badgeAdmin && (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-indigo-500/30 text-indigo-300 border border-indigo-500/40">
                    Admin
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer Agent Info & Controls */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/50 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-sky-400 text-sm">
              <i className="fa-solid fa-user-tie"></i>
            </div>
            <div className="truncate">
              <div className="text-xs font-bold text-white truncate">{user?.name || 'Agent'}</div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span
                  className={`inline-block w-1.5 h-1.5 rounded-full ${
                    isAdmin ? 'bg-indigo-400' : 'bg-emerald-400'
                  }`}
                ></span>
                <span className="text-[10px] text-slate-400 font-medium">{user?.role || 'User'}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={toggleTheme}
              title="Toggle Light/Dark Mode"
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-amber-400 flex items-center justify-center transition-colors text-xs"
            >
              <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>
            <button
              onClick={logout}
              title="Sign Out"
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-rose-950/80 text-slate-400 hover:text-rose-400 flex items-center justify-center transition-colors text-xs"
            >
              <i className="fa-solid fa-right-from-bracket"></i>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
