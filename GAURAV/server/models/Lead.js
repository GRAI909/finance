const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true
    },
    email: {
      type: String,
      trim: true,
      default: ''
    },
    city: {
      type: String,
      trim: true,
      default: 'Mumbai'
    },
    loanAmount: {
      type: Number,
      required: [true, 'Loan amount is required'],
      min: 0
    },
    bank: {
      type: String,
      default: 'Bajaj Finance'
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Docs Collected', 'Login Done', 'Sanctioned', 'Disbursed', 'Rejected'],
      default: 'New'
    },
    cibilScore: {
      type: Number,
      default: 750
    },
    monthlyIncome: {
      type: Number,
      default: 45000
    },
    companyName: {
      type: String,
      default: 'Private Ltd'
    },
    callbackDate: {
      type: String,
      default: ''
    },
    callbackTime: {
      type: String,
      default: ''
    },
    remarks: {
      type: String,
      default: ''
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Lead', leadSchema);
