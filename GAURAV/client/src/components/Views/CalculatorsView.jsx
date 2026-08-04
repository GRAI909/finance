import React, { useState } from 'react';

const CalculatorsView = () => {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(11.5);
  const [tenureYears, setTenureYears] = useState(5);

  // EMI Math Formula: P * r * (1+r)^n / ((1+r)^n - 1)
  const principal = parseFloat(loanAmount) || 0;
  const monthlyRate = (parseFloat(interestRate) || 0) / 12 / 100;
  const months = (parseFloat(tenureYears) || 0) * 12;

  const emi = months > 0 && monthlyRate > 0
    ? Math.round((principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1))
    : 0;

  const totalPayment = emi * months;
  const totalInterest = totalPayment - principal;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
          <i className="fa-solid fa-calculator text-sky-400"></i>
          <span>Personal Loan Financial Calculators</span>
        </h1>
        <p className="text-slate-400 text-xs mt-1">Interactive EMI, Interest, and FOIR eligibility calculation suite.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sliders Input Panel */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-6 lg:col-span-2">
          <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <i className="fa-solid fa-sliders text-sky-400"></i>
            <span>Loan Parameters</span>
          </h3>

          {/* Slider 1: Loan Amount */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-slate-300">Loan Amount</span>
              <span className="text-sky-400 font-mono text-sm font-bold">₹{principal.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="50000"
              max="5000000"
              step="25000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>₹50,000</span>
              <span>₹25 Lakhs</span>
              <span>₹50 Lakhs</span>
            </div>
          </div>

          {/* Slider 2: Interest Rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-slate-300">Interest Rate (% p.a.)</span>
              <span className="text-amber-400 font-mono text-sm font-bold">{interestRate}%</span>
            </div>
            <input
              type="range"
              min="9.5"
              max="24.0"
              step="0.25"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>9.5%</span>
              <span>15.0%</span>
              <span>24.0%</span>
            </div>
          </div>

          {/* Slider 3: Loan Tenure */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-slate-300">Loan Tenure</span>
              <span className="text-emerald-400 font-mono text-sm font-bold">{tenureYears} Years ({months} Months)</span>
            </div>
            <input
              type="range"
              min="1"
              max="7"
              step="1"
              value={tenureYears}
              onChange={(e) => setTenureYears(e.target.value)}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>1 Year</span>
              <span>4 Years</span>
              <span>7 Years</span>
            </div>
          </div>
        </div>

        {/* EMI Summary Card */}
        <div className="glass-panel rounded-2xl p-6 border border-sky-500/30 flex flex-col justify-between space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Monthly EMI Payable</span>
            <h2 className="text-3xl font-extrabold text-sky-400 font-mono mt-1">
              ₹{emi.toLocaleString('en-IN')}<span className="text-xs text-slate-400 font-normal">/mo</span>
            </h2>

            <div className="space-y-3 pt-6 border-t border-slate-800 mt-6 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Principal Amount:</span>
                <span className="font-bold text-slate-200">₹{principal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Interest Payable:</span>
                <span className="font-bold text-amber-400">₹{totalInterest > 0 ? totalInterest.toLocaleString('en-IN') : 0}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-800 text-sm">
                <span className="text-white font-bold">Total Amount Payable:</span>
                <span className="font-bold font-mono text-emerald-400">₹{totalPayment > 0 ? totalPayment.toLocaleString('en-IN') : 0}</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400">
            💡 Share this breakdown directly with customer over WhatsApp or call during sales pitches.
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorsView;
