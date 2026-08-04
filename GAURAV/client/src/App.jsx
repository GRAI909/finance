import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { useToast } from './context/ToastContext';
import api from './utils/api';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import TopHeader from './components/TopHeader';
import UrgentBanner from './components/UrgentBanner';
import AddLeadModal from './components/Modals/AddLeadModal';

// Views
import DashboardView from './components/Views/DashboardView';
import PipelineView from './components/Views/PipelineView';
import AllLeadsView from './components/Views/AllLeadsView';
import PoliciesView from './components/Views/PoliciesView';
import MatcherToolView from './components/Views/MatcherToolView';
import CallbacksView from './components/Views/CallbacksView';
import CalculatorsView from './components/Views/CalculatorsView';
import ScriptsView from './components/Views/ScriptsView';
import ProfileView from './components/Views/ProfileView';
import AdminDashboardView from './components/Views/AdminDashboardView';

const MainApp = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [leads, setLeads] = useState([]);
  const [loadingLeads, setLoadingLeads] = useState(true);

  const { addToast } = useToast();

  const fetchLeads = async () => {
    try {
      const res = await api.get('/leads');
      if (res.data.success) {
        setLeads(res.data.leads);
      }
    } catch (error) {
      console.error('Failed to fetch leads:', error);
    } finally {
      setLoadingLeads(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Lead Actions
  const handleSaveLead = async (formData) => {
    try {
      const res = await api.post('/leads', formData);
      if (res.data.success) {
        addToast('New Personal Loan lead added successfully!', 'success');
        fetchLeads();
      }
    } catch (error) {
      addToast(error.response?.data?.message || 'Failed to save lead', 'error');
    }
  };

  const handleUpdateStatus = async (leadId, newStatus) => {
    try {
      const res = await api.put(`/leads/${leadId}`, { status: newStatus });
      if (res.data.success) {
        addToast(`Lead status updated to ${newStatus}`, 'info');
        fetchLeads();
      }
    } catch (error) {
      addToast('Failed to update lead status', 'error');
    }
  };

  const handleDeleteLead = async (leadId) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;
    try {
      const res = await api.delete(`/leads/${leadId}`);
      if (res.data.success) {
        addToast('Lead deleted successfully', 'success');
        fetchLeads();
      }
    } catch (error) {
      addToast('Failed to delete lead', 'error');
    }
  };

  const handleMarkCallbackDone = async (leadId) => {
    try {
      const res = await api.put(`/leads/${leadId}`, { callbackDate: '', callbackTime: '' });
      if (res.data.success) {
        addToast('Callback marked as completed!', 'success');
        fetchLeads();
      }
    } catch (error) {
      addToast('Failed to clear callback', 'error');
    }
  };

  const handleSnoozeCallback = (leadId) => {
    addToast('Callback snoozed for 15 minutes', 'info');
  };

  const handleExportBackup = () => {
    let csv = 'Customer Name,Phone,Email,City,Loan Amount,Bank,Status,CIBIL,Monthly Income\n';
    leads.forEach((l) => {
      csv += `"${l.customerName}","${l.phone}","${l.email || ''}","${l.city}","${l.loanAmount}","${l.bank}","${l.status}","${l.cibilScore}","${l.monthlyIncome}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads_backup_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    addToast('Leads backup CSV exported successfully!', 'success');
  };

  const urgentCallbackLead = leads.find((l) => l.callbackDate || l.callbackTime);
  const dueCallbacksCount = leads.filter((l) => l.callbackDate || l.callbackTime).length;
  const activeLeadsCount = leads.filter((l) => l.status !== 'Disbursed' && l.status !== 'Rejected').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeLeadsCount={activeLeadsCount}
        dueCallbacksCount={dueCallbacksCount}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Main Content Body */}
      <div className="flex-1 flex flex-col lg:pl-72 min-w-0">
        {/* Top Header */}
        <TopHeader
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onOpenAddLeadModal={() => setIsAddLeadModalOpen(true)}
          onExportBackup={handleExportBackup}
          dueCallbacksCount={dueCallbacksCount}
        />

        {/* Dynamic Main View */}
        <main className="flex-1 p-4 lg:p-8 max-w-7xl w-full mx-auto">
          {/* Urgent Banner for Due Callbacks */}
          <UrgentBanner
            lead={urgentCallbackLead}
            onSnooze={handleSnoozeCallback}
            onMarkDone={handleMarkCallbackDone}
          />

          {activeTab === 'dashboard' && (
            <DashboardView
              leads={leads}
              onOpenAddLead={() => setIsAddLeadModalOpen(true)}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'pipeline' && (
            <PipelineView
              leads={leads}
              onUpdateStatus={handleUpdateStatus}
              onOpenAddLead={() => setIsAddLeadModalOpen(true)}
            />
          )}

          {activeTab === 'leads' && (
            <AllLeadsView
              leads={leads}
              onUpdateStatus={handleUpdateStatus}
              onDeleteLead={handleDeleteLead}
              onOpenAddLead={() => setIsAddLeadModalOpen(true)}
              searchTerm={searchTerm}
            />
          )}

          {activeTab === 'policies' && <PoliciesView />}

          {activeTab === 'matcher' && <MatcherToolView />}

          {activeTab === 'reminders' && (
            <CallbacksView
              leads={leads}
              onSnooze={handleSnoozeCallback}
              onMarkDone={handleMarkCallbackDone}
            />
          )}

          {activeTab === 'calculators' && <CalculatorsView />}

          {activeTab === 'scripts' && <ScriptsView />}

          {activeTab === 'profile' && <ProfileView />}

          {activeTab === 'admin' && (
            <ProtectedRoute adminOnly={true}>
              <AdminDashboardView />
            </ProtectedRoute>
          )}
        </main>
      </div>

      {/* Add Lead Modal */}
      <AddLeadModal
        isOpen={isAddLeadModalOpen}
        onClose={() => setIsAddLeadModalOpen(false)}
        onSave={handleSaveLead}
      />
    </div>
  );
};

const App = () => {
  return (
    <ProtectedRoute>
      <MainApp />
    </ProtectedRoute>
  );
};

export default App;
