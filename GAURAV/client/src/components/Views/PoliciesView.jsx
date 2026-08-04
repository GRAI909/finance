import React, { useState } from 'react';

const PoliciesView = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const bankPolicies = [
    {
      id: 1,
      bank: 'Bajaj Finance',
      category: 'NBFC',
      minSalary: '₹25,000 / mo',
      minCibil: 720,
      foir: '65%',
      maxTenure: '84 Months',
      interestRate: '11.00% - 16.00%',
      docs: ['PAN & Aadhaar', '3 Months Salary Slip', '6 Months Bank Statement', 'Company ID Card'],
      highlights: 'Instant digital sanction, 24h disbursement, soft CIBIL check for pre-approved.'
    },
    {
      id: 2,
      bank: 'HDFC Bank',
      category: 'Private Bank',
      minSalary: '₹30,000 / mo',
      minCibil: 750,
      foir: '60%',
      maxTenure: '72 Months',
      interestRate: '10.50% - 14.50%',
      docs: ['PAN & Aadhaar', '3 Months Payslips', '6 Months Bank Statement', 'Form 16 / ITR'],
      highlights: '10-second loan for pre-approved account holders, top-tier corporate discounts.'
    },
    {
      id: 3,
      bank: 'ICICI Bank',
      category: 'Private Bank',
      minSalary: '₹30,000 / mo',
      minCibil: 740,
      foir: '60%',
      maxTenure: '72 Months',
      interestRate: '10.75% - 15.00%',
      docs: ['PAN Card', 'Aadhaar Card', '3 Salary Slips', '6 Months Salary Account Statement'],
      highlights: 'Digital end-to-end processing, flexible tenure, pre-approved top-ups.'
    },
    {
      id: 4,
      bank: 'Axis Bank',
      category: 'Private Bank',
      minSalary: '₹25,000 / mo',
      minCibil: 730,
      foir: '55%',
      maxTenure: '60 Months',
      interestRate: '10.75% - 15.50%',
      docs: ['Identity Proof', 'Address Proof', '3 Months Slips', '6 Months Bank Statement'],
      highlights: 'No hidden charges, balance transfer facility available with zero processing fee offers.'
    },
    {
      id: 5,
      bank: 'State Bank of India',
      category: 'PSU Bank',
      minSalary: '₹15,000 / mo',
      minCibil: 700,
      foir: '50%',
      maxTenure: '72 Months',
      interestRate: '11.15% - 14.30%',
      docs: ['PAN Card', 'Identity & Address Proof', '6 Months Salary Slip', '12 Months Bank Statement'],
      highlights: 'Lowest interest rates for PSU and defense personnel, zero foreclosure after 12 EMIs.'
    },
    {
      id: 6,
      bank: 'IDFC FIRST Bank',
      category: 'Private Bank',
      minSalary: '₹25,000 / mo',
      minCibil: 710,
      foir: '65%',
      maxTenure: '60 Months',
      interestRate: '10.49% - 18.00%',
      docs: ['PAN & Aadhaar', '3 Months Payslips', '6 Months Statement'],
      highlights: 'Paperless digital onboarding, quick approval, high loan eligibility multiplier.'
    },
    {
      id: 7,
      bank: 'Kotak Mahindra Bank',
      category: 'Private Bank',
      minSalary: '₹25,000 / mo',
      minCibil: 740,
      foir: '60%',
      maxTenure: '60 Months',
      interestRate: '10.99% - 16.00%',
      docs: ['PAN Card', 'Aadhaar', '3 Months Salary Slips', '3 Months Statement'],
      highlights: 'Pre-approved loans in 3 seconds for existing Kotak account holders.'
    },
    {
      id: 8,
      bank: 'Tata Capital',
      category: 'NBFC',
      minSalary: '₹20,000 / mo',
      minCibil: 720,
      foir: '65%',
      maxTenure: '72 Months',
      interestRate: '11.25% - 17.00%',
      docs: ['PAN & Aadhaar', '2 Months Salary Slip', '6 Months Bank Statement'],
      highlights: 'Overdraft loan option, flexible EMI step-up/step-down programs.'
    },
    {
      id: 9,
      bank: 'L&T Finance',
      category: 'NBFC',
      minSalary: '₹20,000 / mo',
      minCibil: 700,
      foir: '60%',
      maxTenure: '48 Months',
      interestRate: '12.00% - 18.00%',
      docs: ['PAN Card', 'Address Proof', '3 Months Bank Statement'],
      highlights: 'Minimal documentation, excellent coverage for Category C companies.'
    },
    {
      id: 10,
      bank: 'Poonawalla Fincorp',
      category: 'NBFC',
      minSalary: '₹30,000 / mo',
      minCibil: 730,
      foir: '65%',
      maxTenure: '60 Months',
      interestRate: '11.50% - 16.50%',
      docs: ['PAN & Aadhaar', '3 Salary Slips', '6 Months Statement'],
      highlights: 'Zero hidden fees, 100% digital journey, loan amount up to ₹30 Lakhs.'
    },
    {
      id: 11,
      bank: 'Aditya Birla Capital',
      category: 'NBFC',
      minSalary: '₹25,000 / mo',
      minCibil: 715,
      foir: '60%',
      maxTenure: '84 Months',
      interestRate: '11.50% - 17.50%',
      docs: ['PAN & Aadhaar', '3 Salary Slips', '6 Months Statement'],
      highlights: 'High loan amount eligibility multiplier for MNC and Listed IT employees.'
    },
    {
      id: 12,
      bank: 'Fullerton India (SMFG)',
      category: 'NBFC',
      minSalary: '₹20,000 / mo',
      minCibil: 700,
      foir: '65%',
      maxTenure: '60 Months',
      interestRate: '11.99% - 20.00%',
      docs: ['PAN & Aadhaar', '3 Months Slips', '6 Months Statement'],
      highlights: 'Higher FOIR tolerance for self-employed and non-listed corporate profiles.'
    },
    {
      id: 13,
      bank: 'IndusInd Bank',
      category: 'Private Bank',
      minSalary: '₹25,000 / mo',
      minCibil: 730,
      foir: '60%',
      maxTenure: '60 Months',
      interestRate: '10.49% - 15.50%',
      docs: ['PAN Card', 'Aadhaar', '3 Salary Slips', '6 Months Statement'],
      highlights: 'Special rates for doctor and professional profiles, fast track approval desk.'
    },
    {
      id: 14,
      bank: 'Standard Chartered',
      category: 'Foreign Bank',
      minSalary: '₹40,000 / mo',
      minCibil: 750,
      foir: '55%',
      maxTenure: '60 Months',
      interestRate: '10.75% - 14.50%',
      docs: ['PAN & Passport/Aadhaar', '3 Salary Slips', '6 Months Bank Statement', 'Form 16'],
      highlights: 'High loan cap up to ₹50 Lakhs, premium relationship desk benefits.'
    },
    {
      id: 15,
      bank: 'HSBC India',
      category: 'Foreign Bank',
      minSalary: '₹50,000 / mo',
      minCibil: 760,
      foir: '50%',
      maxTenure: '60 Months',
      interestRate: '10.25% - 13.99%',
      docs: ['PAN & Aadhaar', '3 Salary Slips', '6 Months Salary Account Statement'],
      highlights: 'Lowest interest rates for Super-Prime corporate profiles and MNC executives.'
    }
  ];

  const filteredPolicies = bankPolicies.filter((p) => {
    const matchesSearch =
      !searchTerm ||
      p.bank.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.highlights.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
          <i className="fa-solid fa-building-columns text-sky-400"></i>
          <span>15 Bank Policies & Eligibility Criteria</span>
        </h1>
        <p className="text-slate-400 text-xs mt-1">Official DSA credit policy matrix for top partner banks and NBFCs.</p>
      </div>

      {/* Filter and Search */}
      <div className="glass-panel rounded-2xl p-4 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {['All', 'Private Bank', 'NBFC', 'PSU Bank', 'Foreign Bank'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative max-w-xs w-full">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
            <i className="fa-solid fa-magnifying-glass text-xs"></i>
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search bank name or criteria..."
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
      </div>

      {/* Policies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPolicies.map((policy) => (
          <div
            key={policy.id}
            className="glass-panel glass-card-hover rounded-2xl p-5 border border-slate-800 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-sky-500/20 text-sky-300">
                    {policy.category}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1">{policy.bank}</h3>
                </div>
                <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-sky-400 text-sm">
                  <i className="fa-solid fa-[#fa-building-columns] fa-building-columns"></i>
                </div>
              </div>

              {/* Policy Metrics Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 mb-4">
                <div>
                  <span className="text-[10px] text-slate-400 block">Min Salary</span>
                  <strong className="text-slate-200 font-semibold">{policy.minSalary}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Min CIBIL</span>
                  <strong className="text-emerald-400 font-bold">{policy.minCibil}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Max FOIR</span>
                  <strong className="text-amber-400 font-bold">{policy.foir}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Interest Rate</span>
                  <strong className="text-sky-400 font-bold">{policy.interestRate}</strong>
                </div>
              </div>

              {/* Required Documents */}
              <div className="space-y-1 mb-4">
                <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Required Checklist</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {policy.docs.map((doc, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">
                      ✓ {doc}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Highlights Footer */}
            <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 italic">
              💡 {policy.highlights}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PoliciesView;
