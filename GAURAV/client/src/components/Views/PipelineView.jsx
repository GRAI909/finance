import React from 'react';

const PipelineView = ({ leads, onUpdateStatus, onOpenAddLead }) => {
  const stages = [
    { id: 'New', label: 'New Inquiry', color: 'border-sky-500/50 bg-sky-950/20 text-sky-400' },
    { id: 'Contacted', label: 'Contacted', color: 'border-blue-500/50 bg-blue-950/20 text-blue-400' },
    { id: 'Docs Collected', label: 'Docs Collected', color: 'border-amber-500/50 bg-amber-950/20 text-amber-400' },
    { id: 'Login Done', label: 'Login Completed', color: 'border-indigo-500/50 bg-indigo-950/20 text-indigo-400' },
    { id: 'Sanctioned', label: 'Sanctioned', color: 'border-purple-500/50 bg-purple-950/20 text-purple-400' },
    { id: 'Disbursed', label: 'Disbursed', color: 'border-emerald-500/50 bg-emerald-950/20 text-emerald-400' },
    { id: 'Rejected', label: 'Rejected', color: 'border-rose-500/50 bg-rose-950/20 text-rose-400' }
  ];

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <i className="fa-solid fa-bars-staggered text-sky-400"></i>
            <span>Lead Pipeline Kanban</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">Visualize and update lead progress across DSA stages.</p>
        </div>

        <button
          onClick={onOpenAddLead}
          className="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold text-xs shadow-lg shadow-sky-500/20 flex items-center gap-2"
        >
          <i className="fa-solid fa-plus"></i>
          <span>Add New Lead</span>
        </button>
      </div>

      {/* Kanban Board Columns */}
      <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-thin">
        {stages.map((stage) => {
          const stageLeads = leads.filter((l) => l.status === stage.id);
          const stageTotal = stageLeads.reduce((acc, curr) => acc + (curr.loanAmount || 0), 0);

          return (
            <div
              key={stage.id}
              className="min-w-[280px] w-72 flex-shrink-0 bg-slate-900/60 rounded-2xl border border-slate-800 p-4 flex flex-col"
            >
              {/* Column Header */}
              <div className={`p-3 rounded-xl border mb-3 flex items-center justify-between ${stage.color}`}>
                <div className="flex items-center gap-2 font-bold text-xs">
                  <span>{stage.label}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-900/80 font-extrabold">
                    {stageLeads.length}
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold">
                  ₹{(stageTotal / 100000).toFixed(1)}L
                </span>
              </div>

              {/* Column Cards */}
              <div className="flex-1 space-y-3 overflow-y-auto max-h-[calc(100vh-320px)] pr-1">
                {stageLeads.length === 0 ? (
                  <div className="p-4 text-center text-slate-600 text-xs rounded-xl border border-dashed border-slate-800">
                    No leads in this stage
                  </div>
                ) : (
                  stageLeads.map((lead) => (
                    <div
                      key={lead._id}
                      className="glass-panel rounded-xl p-3.5 border border-slate-800 hover:border-slate-700 transition-all space-y-2"
                    >
                      <div className="flex items-start justify-between">
                        <h4 className="font-bold text-white text-xs truncate max-w-[150px]">
                          {lead.customerName}
                        </h4>
                        <span className="text-[11px] font-extrabold font-mono text-sky-400">
                          ₹{lead.loanAmount.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-400 flex items-center justify-between">
                        <span><i className="fa-solid fa-building-columns mr-1 text-slate-500"></i>{lead.bank}</span>
                        <span><i className="fa-solid fa-location-dot mr-1 text-slate-500"></i>{lead.city}</span>
                      </div>

                      <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800/60">
                        <a href={`tel:${lead.phone}`} className="text-slate-300 hover:text-sky-400 flex items-center gap-1 font-mono">
                          <i className="fa-solid fa-phone text-[10px]"></i> {lead.phone}
                        </a>
                        <select
                          value={lead.status}
                          onChange={(e) => onUpdateStatus(lead._id, e.target.value)}
                          className="bg-slate-950 border border-slate-700 text-[10px] text-slate-200 rounded px-1.5 py-0.5 focus:outline-none"
                        >
                          {stages.map((s) => (
                            <option key={s.id} value={s.id}>{s.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PipelineView;
