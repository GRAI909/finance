import React, { useState, useEffect } from 'react';

const TopHeader = ({
  onToggleSidebar,
  searchTerm,
  setSearchTerm,
  onOpenAddLeadModal,
  onExportBackup,
  dueCallbacksCount = 0
}) => {
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-4 lg:px-8 py-3.5 flex items-center justify-between gap-4">
      {/* Left side: Hamburger + Search */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden w-9 h-9 rounded-xl bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
        >
          <i className="fa-solid fa-bars text-sm"></i>
        </button>

        <div className="relative w-full">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
            <i className="fa-solid fa-magnifying-glass text-xs"></i>
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search customer name, phone, city, bank..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all"
          />
        </div>
      </div>

      {/* Right side: Clock, Bell, Actions */}
      <div className="flex items-center gap-3">
        {/* Live Clock */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs font-mono text-slate-300">
          <i className="fa-regular fa-clock text-sky-400"></i>
          <span>{timeString || '00:00:00 AM'}</span>
        </div>

        {/* Callbacks Notification Bell */}
        <button
          title="Callback Reminders"
          className="relative w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
        >
          <i className="fa-solid fa-bell text-sm"></i>
          {dueCallbacksCount > 0 && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full animate-ping"></span>
          )}
          {dueCallbacksCount > 0 && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full border-2 border-slate-900"></span>
          )}
        </button>

        {/* Backup / Export CSV */}
        <button
          onClick={onExportBackup}
          className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
        >
          <i className="fa-solid fa-file-export text-slate-400"></i>
          <span>Export / CSV</span>
        </button>

        {/* Add Lead Button */}
        <button
          onClick={onOpenAddLeadModal}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-white text-xs font-semibold shadow-lg shadow-sky-500/20 transition-all"
        >
          <i className="fa-solid fa-user-plus"></i>
          <span className="hidden sm:inline">+ Add New Lead</span>
        </button>
      </div>
    </header>
  );
};

export default TopHeader;
