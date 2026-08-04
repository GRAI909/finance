import React, { useState } from 'react';

const AllLeadsView = ({ leads, onUpdateStatus, onDeleteLead, onOpenAddLead, searchTerm }) => {
  const [bankFilter, setBankFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      !searchTerm ||
      lead.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      lead.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.bank.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesBank = bankFilter === 'All' || lead.bank === bankFilter;
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;

    return matchesSearch && matchesBank && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <i className="fa-solid fa-users text-sky-400"></i>
            <span>All Personal Loan Leads ({filteredLeads.length})</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">Full lead management database with real-time filters.</p>
        </div>

        <button
          onClick={onOpenAddLead}
          className="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold text-xs shadow-lg shadow-sky-500/20 flex items-center gap-2"
        >
          <i className="fa-solid fa-plus"></i>
          <span>Add New Lead</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="glass-panel rounded-2xl p-4 border border-slate-800 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-400">Bank Filter:</label>
          <select
            value={bankFilter}
            onChange={(e) => setBankFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-xs text-white rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="All">All Banks</option>
            <option value="Bajaj Finance">Bajaj Finance</option>
            <option value="HDFC Bank">HDFC Bank</option>
            <option value="ICICI Bank">ICICI Bank</option>
            <option value="Axis Bank">Axis Bank</option>
            <option value="State Bank of India">State Bank of India</option>
            <option value="IDFC FIRST Bank">IDFC FIRST Bank</option>
            <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
            <option value="Tata Capital">Tata Capital</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-400">Status Filter:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-xs text-white rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="All">All Statuses</option>
            <option value="New">New Inquiry</option>
            <option value="Contacted">Contacted</option>
            <option value="Docs Collected">Docs Collected</option>
            <option value="Login Done">Login Completed</option>
            <option value="Sanctioned">Sanctioned</option>
            <option value="Disbursed">Disbursed</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-900/80 border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">City</th>
                <th className="py-3.5 px-4">Loan Amt (₹)</th>
                <th className="py-3.5 px-4">Bank</th>
                <th className="py-3.5 px-4">Income / CIBIL</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500 text-xs">
                    No leads found matching criteria.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead._id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white text-sm">{lead.customerName}</div>
                      <div className="text-[10px] text-slate-400">{lead.companyName || 'Private Sector'}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-mono text-slate-200">{lead.phone}</div>
                      <div className="text-[10px] text-slate-400">{lead.email || '—'}</div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-300">{lead.city}</td>

                    <td className="py-3.5 px-4 font-bold font-mono text-sky-400">
                      ₹{lead.loanAmount ? lead.loanAmount.toLocaleString('en-IN') : '0'}
                    </td>

                    <td className="py-3.5 px-4 text-slate-300">{lead.bank}</td>

                    <td className="py-3.5 px-4">
                      <div className="text-slate-300">₹{lead.monthlyIncome ? lead.monthlyIncome.toLocaleString('en-IN') : '—'}/mo</div>
                      <div className="text-[10px] font-semibold text-emerald-400">CIBIL: {lead.cibilScore || '750'}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <select
                        value={lead.status}
                        onChange={(e) => onUpdateStatus(lead._id, e.target.value)}
                        className={`text-[11px] font-bold rounded-lg px-2 py-1 border border-slate-700 focus:outline-none ${
                          lead.status === 'Disbursed' ? 'bg-emerald-950 text-emerald-300' :
                          lead.status === 'Sanctioned' ? 'bg-sky-950 text-sky-300' :
                          lead.status === 'Rejected' ? 'bg-rose-950 text-rose-300' : 'bg-slate-900 text-amber-300'
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Docs Collected">Docs Collected</option>
                        <option value="Login Done">Login Done</option>
                        <option value="Sanctioned">Sanctioned</option>
                        <option value="Disbursed">Disbursed</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`tel:${lead.phone}`}
                          title="Call Customer"
                          className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-sky-900/60 text-sky-400 flex items-center justify-center transition-colors"
                        >
                          <i className="fa-solid fa-phone text-xs"></i>
                        </a>

                        <a
                          href={`https://wa.me/91${lead.phone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          title="Open WhatsApp"
                          className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-emerald-900/60 text-emerald-400 flex items-center justify-center transition-colors"
                        >
                          <i className="fa-brands fa-whatsapp text-xs"></i>
                        </a>

                        <button
                          onClick={() => onDeleteLead(lead._id)}
                          title="Delete Lead"
                          className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-rose-950 text-rose-400 flex items-center justify-center transition-colors"
                        >
                          <i className="fa-solid fa-trash-can text-xs"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllLeadsView;
