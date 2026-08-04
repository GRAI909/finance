const Lead = require('../models/Lead');
const logActivity = require('../utils/activityLogger');

// @desc    Get all leads (with search & filter)
// @route   GET /api/leads
// @access  Private
exports.getLeads = async (req, res) => {
  try {
    const { search, status, bank } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { customerName: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } }
      ];
    }

    if (status && status !== 'All') {
      query.status = status;
    }

    if (bank && bank !== 'All') {
      query.bank = bank;
    }

    const leads = await Lead.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: leads.length,
      leads
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new lead
// @route   POST /api/leads
// @access  Private
exports.createLead = async (req, res) => {
  try {
    const { customerName, phone, email, city, loanAmount, bank, status, cibilScore, monthlyIncome, companyName, callbackDate, callbackTime, remarks } = req.body;

    if (!customerName || !phone || !loanAmount) {
      return res.status(400).json({ success: false, message: 'Customer name, phone, and loan amount are required' });
    }

    const lead = await Lead.create({
      customerName,
      phone,
      email: email || '',
      city: city || 'Mumbai',
      loanAmount: parseFloat(loanAmount),
      bank: bank || 'Bajaj Finance',
      status: status || 'New',
      cibilScore: cibilScore ? parseInt(cibilScore) : 750,
      monthlyIncome: monthlyIncome ? parseFloat(monthlyIncome) : 45000,
      companyName: companyName || 'Private Ltd',
      callbackDate: callbackDate || '',
      callbackTime: callbackTime || '',
      remarks: remarks || '',
      createdBy: req.user._id
    });

    await logActivity({
      userId: req.user._id,
      username: req.user.username,
      action: 'CREATE_LEAD',
      details: `Added new lead: ${lead.customerName} (₹${lead.loanAmount})`,
      req
    });

    res.status(201).json({
      success: true,
      message: 'Lead created successfully',
      lead
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update lead
// @route   PUT /api/leads/:id
// @access  Private
exports.updateLead = async (req, res) => {
  try {
    let lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }

    const updatedLead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    await logActivity({
      userId: req.user._id,
      username: req.user.username,
      action: 'UPDATE_LEAD',
      details: `Updated lead ${updatedLead.customerName} status to ${updatedLead.status}`,
      req
    });

    res.json({
      success: true,
      message: 'Lead updated successfully',
      lead: updatedLead
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete lead
// @route   DELETE /api/leads/:id
// @access  Private
exports.deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }

    const leadName = lead.customerName;
    await Lead.findByIdAndDelete(req.params.id);

    await logActivity({
      userId: req.user._id,
      username: req.user.username,
      action: 'DELETE_LEAD',
      details: `Deleted lead ${leadName}`,
      req
    });

    res.json({ success: true, message: 'Lead deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
