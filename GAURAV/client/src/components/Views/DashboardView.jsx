import React from 'react';

const DashboardView = ({ leads, onOpenAddLead, setActiveTab }) => {
  const totalLeadsCount = leads.length;
  const totalLoanRequested = leads.reduce((acc, curr) => acc + (curr.loanAmount || 0), 0);
  const disbursedLeads = leads.filter((l) => l.status === 'Disbursed');
  const totalDisbursed = disbursedLeads.reduce((acc, curr) => acc + (curr.loanAmount || 0), 0);
  const callbacksToday = leads.filter((l) => l.callbackDate);

  // Target: ₹50 Lakhs = 50,00,000
  const targetAmount = 5000000;
  const targetPercentage = Math.min(100, Math.round((totalDisbursed / targetAmount) * 100));

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Bajaj PL Sales Overview</h1>
          <p className="text-slate-400 text-xs mt-1">Track your daily targets, follow-ups, and personal loan disbursements.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-semibold text-slate-300">
            Monthly Target: <strong className="text-sky-400 font-extrabold ml-1">₹50.00 Lakhs</strong>
          </div>
        </div>
      </div>

      {/* Monthly Target Progress Bar */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Target Progress</span>
          <span className="text-xs font-extrabold text-sky-400">{targetPercentage}% Completed</span>
        </div>
        <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5">
          <div
            className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full transition-all duration-500"
            style={{ width: `${targetPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* KPI 1 */}
        <div className="glass-panel glass-card-hover rounded-2xl p-5 border border-sky-500/20 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center text-2xl">
            <i className="fa-solid fa-users"></i>
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400">Active Lead Pipeline</span>
            <h2 className="text-2xl font-extrabold text-white mt-0.5">{totalLeadsCount}</h2>
            <span className="text-xs font-medium text-sky-400">Req: ₹{(totalLoanRequested / 100000).toFixed(2)} Lakhs</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="glass-panel glass-card-hover rounded-2xl p-5 border border-amber-500/20 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center text-2xl">
            <i className="fa-solid fa-phone-flip"></i>
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400">Callbacks Scheduled</span>
            <h2 className="text-2xl font-extrabold text-white mt-0.5">{callbacksToday.length}</h2>
            <span className="text-xs font-medium text-amber-400">Follow-up due</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="glass-panel glass-card-hover rounded-2xl p-5 border border-emerald-500/20 flex items-center gap-4 sm:col-span-2 lg:col-span-1">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center text-2xl">
            <i className="fa-solid fa-indian-rupee-sign"></i>
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400">Disbursed Amount</span>
            <h2 className="text-2xl font-extrabold text-white mt-0.5">₹{(totalDisbursed / 100000).toFixed(2)} L</h2>
            <span className="text-xs font-medium text-emerald-400">{disbursedLeads.length} Loans Closed</span>
          </div>
        </div>
      </div>

      {/* Quick Recent Leads Section */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <i className="fa-solid fa-bars-staggered text-sky-400"></i>
            <span>Recent Lead Pipeline Activity</span>
          </h3>
          <button
            onClick={() => setActiveTab('leads')}
            className="text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors"
          >
            View All Leads →
          </button>
        </div>

        {leads.length === 0 ? (
          <div className="text-center py-10 text-slate-500 text-xs">
            <i className="fa-solid fa-folder-open text-3xl mb-2"></i>
            <p>No leads added yet. Click "+ Add New Lead" to get started!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-3">Customer</th>
                  <th className="py-3 px-3">Phone</th>
                  <th className="py-3 px-3">Loan Amount</th>
                  <th className="py-3 px-3">Target Bank</th>
                  <th className="py-3 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {leads.slice(0, 5).map((lead) => (
                  <tr key={lead._id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-3 text-white font-bold">{lead.customerName}</td>
                    <td className="py-3 px-3 text-slate-300">{lead.phone}</td>
                    <td className="py-3 px-3 font-semibold text-sky-400">₹{lead.loanAmount.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-3 text-slate-300">{lead.bank}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        lead.status === 'Disbursed' ? 'bg-emerald-500/20 text-emerald-300' :
                        lead.status === 'Sanctioned' ? 'bg-sky-500/20 text-sky-300' :
                        lead.status === 'Rejected' ? 'bg-rose-500/20 text-rose-300' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardView;
