import React, { useState } from 'react';

const CallbacksView = ({ leads, onSnooze, onMarkDone }) => {
  const [filter, setFilter] = useState('All');

  const callbacksList = leads.filter((l) => l.callbackDate || l.callbackTime);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
          <i className="fa-solid fa-clock-rotate-left text-amber-400"></i>
          <span>Callbacks & Follow-up Schedule ({callbacksList.length})</span>
        </h1>
        <p className="text-slate-400 text-xs mt-1">Scheduled client call reminders with 1-tap call and WhatsApp integration.</p>
      </div>

      {/* Callbacks List */}
      <div className="glass-panel rounded-2xl border border-slate-800 p-6">
        {callbacksList.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-xs">
            <i className="fa-solid fa-calendar-check text-4xl mb-3 text-slate-600"></i>
            <p>No callbacks currently scheduled. Add callback date when creating/editing leads!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {callbacksList.map((lead) => (
              <div
                key={lead._id}
                className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl bg-slate-900/80 border border-slate-800 gap-4 hover:border-slate-700 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center text-lg mt-0.5">
                    <i className="fa-solid fa-phone"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">{lead.customerName}</h4>
                    <p className="text-xs text-slate-400">
                      Loan Req: <strong className="text-sky-400">₹{lead.loanAmount?.toLocaleString('en-IN')} ({lead.bank})</strong>
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-mono text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                        Scheduled: {lead.callbackDate || 'Today'} {lead.callbackTime}
                      </span>
                      <span className="text-[10px] text-slate-400">{lead.remarks || 'No specific notes'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${lead.phone}`}
                    className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5"
                  >
                    <i className="fa-solid fa-phone"></i>
                    <span>Call ({lead.phone})</span>
                  </a>
                  <a
                    href={`https://wa.me/91${lead.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5"
                  >
                    <i className="fa-brands fa-whatsapp"></i>
                    <span>WhatsApp</span>
                  </a>
                  <button
                    onClick={() => onMarkDone(lead._id)}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-semibold border border-slate-700"
                  >
                    <i className="fa-solid fa-check mr-1"></i> Done
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CallbacksView;
