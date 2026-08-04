import React, { useState } from 'react';

const MatcherToolView = () => {
  const [formData, setFormData] = useState({
    monthlySalary: 50000,
    cibilScore: 750,
    existingEmis: 10000,
    age: 32,
    companyType: 'Super CAT A',
    requiredLoan: 700000
  });

  const [hasCalculated, setHasCalculated] = useState(true);

  // Bank Match Database
  const bankDatabase = [
    { name: 'Bajaj Finance', minSalary: 25000, minCibil: 720, maxFoir: 0.65, rate: 0.12, maxTenure: 72, category: 'Super CAT A' },
    { name: 'HDFC Bank', minSalary: 30000, minCibil: 750, maxFoir: 0.60, rate: 0.11, maxTenure: 72, category: 'Super CAT A' },
    { name: 'ICICI Bank', minSalary: 30000, minCibil: 740, maxFoir: 0.60, rate: 0.1125, maxTenure: 72, category: 'CAT A' },
    { name: 'Axis Bank', minSalary: 25000, minCibil: 730, maxFoir: 0.55, rate: 0.115, maxTenure: 60, category: 'CAT B' },
    { name: 'IDFC FIRST Bank', minSalary: 25000, minCibil: 710, maxFoir: 0.65, rate: 0.115, maxTenure: 60, category: 'CAT C' },
    { name: 'Tata Capital', minSalary: 20000, minCibil: 720, maxFoir: 0.60, rate: 0.125, maxTenure: 72, category: 'CAT B' },
    { name: 'Poonawalla Fincorp', minSalary: 30000, minCibil: 730, maxFoir: 0.65, rate: 0.12, maxTenure: 60, category: 'CAT A' },
    { name: 'State Bank of India', minSalary: 15000, minCibil: 700, maxFoir: 0.50, rate: 0.1115, maxTenure: 72, category: 'PSU' }
  ];

  // Calculation Logic
  const salary = parseFloat(formData.monthlySalary) || 0;
  const cibil = parseInt(formData.cibilScore) || 0;
  const existingEmi = parseFloat(formData.existingEmis) || 0;

  const matches = bankDatabase.map((bank) => {
    const isSalaryEligible = salary >= bank.minSalary;
    const isCibilEligible = cibil >= bank.minCibil;

    const maxMonthlyFoirEmi = (salary * bank.maxFoir) - existingEmi;
    const eligibleEmi = Math.max(0, maxMonthlyFoirEmi);

    // Approximate Max Loan Calculation based on EMI (over 60 months tenure)
    const monthlyRate = bank.rate / 12;
    const tenureMonths = bank.maxTenure;
    const maxLoanAmount = eligibleEmi > 0
      ? (eligibleEmi * (Math.pow(1 + monthlyRate, tenureMonths) - 1)) / (monthlyRate * Math.pow(1 + monthlyRate, tenureMonths))
      : 0;

    const isEligible = isSalaryEligible && isCibilEligible && maxLoanAmount > 0;

    return {
      ...bank,
      eligibleEmi: Math.round(eligibleEmi),
      maxLoanAmount: Math.round(maxLoanAmount),
      isEligible
    };
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
          <i className="fa-solid fa-wand-magic-sparkles text-sky-400"></i>
          <span>Smart Bank Matcher Tool</span>
        </h1>
        <p className="text-slate-400 text-xs mt-1">Instantly match applicant financial profile against 15+ DSA bank policies.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Applicant Input Panel */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4 h-fit">
          <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <i className="fa-solid fa-sliders text-sky-400"></i>
            <span>Applicant Financial Profile</span>
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Monthly Net Salary (₹)</label>
            <input
              type="number"
              value={formData.monthlySalary}
              onChange={(e) => setFormData({ ...formData, monthlySalary: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">CIBIL / Credit Score</label>
            <input
              type="number"
              value={formData.cibilScore}
              onChange={(e) => setFormData({ ...formData, cibilScore: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Existing Monthly EMIs (₹)</label>
            <input
              type="number"
              value={formData.existingEmis}
              onChange={(e) => setFormData({ ...formData, existingEmis: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Required Loan Amount (₹)</label>
            <input
              type="number"
              value={formData.requiredLoan}
              onChange={(e) => setFormData({ ...formData, requiredLoan: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Company Listing Category</label>
            <select
              value={formData.companyType}
              onChange={(e) => setFormData({ ...formData, companyType: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:ring-2 focus:ring-sky-500"
            >
              <option value="Super CAT A">Super CAT A (TCS, Infosys, Reliance)</option>
              <option value="CAT A">CAT A (Listed Corporates)</option>
              <option value="CAT B">CAT B (Mid-sized Pvt Ltd)</option>
              <option value="CAT C">CAT C (Unlisted Pvt Ltd)</option>
              <option value="PSU">Government / PSU</option>
            </select>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center justify-between">
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-square-check text-emerald-400"></i>
              <span>Eligible Bank Matches ({matches.filter((m) => m.isEligible).length})</span>
            </span>
            <span className="text-xs text-slate-400">Calculated based on FOIR & CIBIL rules</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matches.map((bank) => (
              <div
                key={bank.name}
                className={`glass-panel rounded-2xl p-5 border transition-all ${
                  bank.isEligible
                    ? 'border-emerald-500/30 bg-emerald-950/10'
                    : 'border-rose-500/20 bg-rose-950/10 opacity-70'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold text-white text-base">{bank.name}</h4>
                    <span className="text-[10px] font-semibold text-slate-400">Min CIBIL: {bank.minCibil} | FOIR: {bank.maxFoir * 100}%</span>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      bank.isEligible
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    }`}
                  >
                    {bank.isEligible ? 'ELIGIBLE' : 'NOT ELIGIBLE'}
                  </span>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Max Eligible EMI:</span>
                    <span className="font-mono font-bold text-slate-200">₹{bank.eligibleEmi.toLocaleString('en-IN')}/mo</span>
                  </div>

                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Max Eligible Loan Cap:</span>
                    <span className="font-mono font-extrabold text-sky-400 text-sm">
                      ₹{(bank.maxLoanAmount / 100000).toFixed(2)} Lakhs
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatcherToolView;
