import React from 'react';

const UrgentBanner = ({ lead, onSnooze, onMarkDone }) => {
  if (!lead) return null;

  return (
    <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-amber-950/80 via-amber-900/60 to-slate-900 border border-amber-500/40 shadow-xl backdrop-blur-md">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center text-lg animate-bounce">
            <i className="fa-solid fa-phone-volume"></i>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-amber-500 text-slate-950">
                CALLBACK DUE NOW!
              </span>
              <span className="text-xs font-semibold text-amber-200">{lead.callbackTime || 'Today'}</span>
            </div>
            <div className="text-sm font-bold text-white mt-0.5">
              {lead.customerName} ({lead.phone}) — <span className="text-sky-400">₹{(lead.loanAmount / 100000).toFixed(2)} Lakhs {lead.bank} Inquiry</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <a
            href={`tel:${lead.phone}`}
            className="flex-1 md:flex-none px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <i className="fa-solid fa-phone"></i>
            <span>Call Now</span>
          </a>
          <a
            href={`https://wa.me/91${lead.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(lead.customerName)},%20this%20is%20Gaurav%20from%20Rai%20Financial%20Services%20regarding%20your%20Personal%20Loan%20application.`}
            target="_blank"
            rel="noreferrer"
            className="flex-1 md:flex-none px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <i className="fa-brands fa-whatsapp text-sm"></i>
            <span>WhatsApp</span>
          </a>
          <button
            onClick={() => onSnooze(lead._id)}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
          >
            <i className="fa-solid fa-hourglass-half text-amber-400"></i>
            <span className="hidden sm:inline ml-1">Snooze 15m</span>
          </button>
          <button
            onClick={() => onMarkDone(lead._id)}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-medium border border-slate-700 transition-colors"
          >
            <i className="fa-solid fa-check"></i>
            <span className="hidden sm:inline ml-1">Mark Called</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UrgentBanner;
