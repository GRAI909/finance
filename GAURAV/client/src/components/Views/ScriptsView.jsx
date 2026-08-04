import React from 'react';
import { useToast } from '../../context/ToastContext';

const ScriptsView = () => {
  const { addToast } = useToast();

  const scripts = [
    {
      id: 1,
      title: 'First Contact / Inquiry Pitch',
      category: 'Introduction',
      text: `Dear Sir/Madam,\n\nGreetings from Rai Financial Services (Multi-Bank Personal Loan Desk).\n\nWe noticed your inquiry for a Personal Loan. We process instant personal loans up to ₹50 Lakhs with minimum interest rates starting from 10.49% p.a. through 15+ top partner banks (Bajaj Finance, HDFC, ICICI, Axis, SBI).\n\nKey Benefits:\n• 100% Digital Process\n• Disbursal in 24 Hours\n• Minimal Documentation\n\nMay I know your net monthly salary and current city to check your pre-approved offer?\n\nRegards,\nGaurav Rai\nRai Financial Services`
    },
    {
      id: 2,
      title: 'Document Checklist Request',
      category: 'Documentation',
      text: `Hi,\n\nTo fast-track your Personal Loan approval, please share digital copies of the following documents over WhatsApp:\n\n1. PAN Card & Aadhaar Card\n2. Last 3 Months Salary Slips\n3. Last 6 Months Bank Statement (PDF format)\n4. Company Identity Card\n\nOnce received, we will generate your official bank sanction letter within 3 hours.\n\nRegards,\nRai Financial Services Desk`
    },
    {
      id: 3,
      title: 'Sanction Approval & Offer Announcement',
      category: 'Sanction Approval',
      text: `🎉 CONGRATULATIONS!\n\nYour Personal Loan application has been PRE-APPROVED by our partner bank!\n\nSanctioned Amount: ₹5,00,000\nROI: 11.00% p.a.\nTenure: 60 Months\nMonthly EMI: ₹10,871/mo\n\nPlease confirm if we should initiate the e-sign agreement to disburse funds to your bank account today.`
    },
    {
      id: 4,
      title: 'Balance Transfer Rate Reduction Offer',
      category: 'Balance Transfer',
      text: `Hello Sir/Madam,\n\nAre you paying high EMI on your existing Personal Loan? Rai Financial can help you transfer your existing loan to HDFC / ICICI Bank at a much lower interest rate (starting 10.49%)!\n\nBenefits:\n• Save up to ₹50,000+ in interest\n• Reduce monthly EMI instantly\n• Additional Top-Up loan available\n\nReply 'BT' to calculate your exact monthly savings!`
    }
  ];

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    addToast('WhatsApp script copied to clipboard!', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
          <i className="fa-brands fa-whatsapp text-emerald-400"></i>
          <span>WhatsApp Sales Pitch Scripts</span>
        </h1>
        <p className="text-slate-400 text-xs mt-1">High-converting DSA client message templates for instant WhatsApp follow-up.</p>
      </div>

      {/* Scripts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {scripts.map((script) => (
          <div
            key={script.id}
            className="glass-panel rounded-2xl p-5 border border-slate-800 flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300">
                  {script.category}
                </span>
                <button
                  onClick={() => handleCopy(script.text)}
                  className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 transition-colors"
                >
                  <i className="fa-regular fa-copy"></i>
                  <span>Copy Script</span>
                </button>
              </div>

              <h3 className="text-base font-bold text-white mb-2">{script.title}</h3>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 font-sans text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                {script.text}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(script.text)}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-lg shadow-emerald-600/20"
              >
                <i className="fa-brands fa-whatsapp text-base"></i>
                <span>Open in WhatsApp</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScriptsView;
