import React, { useState, useEffect } from 'react';
import { 
  User, ShieldCheck, FileText, LayoutDashboard, 
  ChevronRight, CreditCard, Clock, CheckCircle2, 
  AlertCircle, ArrowUpRight, LogOut 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

const BorrowerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(null);
  const [kycStep, setKycStep] = useState(1); // 1: Aadhaar, 2: OTP, 3: Success
  const [aadhaar, setAadhaar] = useState('');
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) navigate('/login');
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    navigate('/');
  };

  const handleKycSubmit = (e) => {
    e.preventDefault();
    setIsVerifying(true);
    // Simulate API delay
    setTimeout(() => {
      setIsVerifying(false);
      setKycStep(2);
    }, 1500);
  };

  const handleOtpVerify = (e) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      if (otp === '123456') {
        setKycStep(3);
      } else {
        alert('Invalid OTP. Use 123456');
      }
    }, 1500);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold">G</div>
            <span className="font-bold text-slate-900 tracking-tight">GRAMCREDIT</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <NavItem 
            active={activeTab === 'overview'} 
            onClick={() => setActiveTab('overview')}
            icon={<LayoutDashboard size={20} />} 
            label="Overview" 
          />
          <NavItem 
            active={activeTab === 'kyc'} 
            onClick={() => setActiveTab('kyc')}
            icon={<ShieldCheck size={20} />} 
            label="eKYC Verification" 
          />
          <NavItem 
            active={activeTab === 'loans'} 
            onClick={() => setActiveTab('loans')}
            icon={<FileText size={20} />} 
            label="My Loans" 
          />
          <NavItem 
            active={activeTab === 'profile'} 
            onClick={() => setActiveTab('profile')}
            icon={<User size={20} />} 
            label="Profile" 
          />
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full p-3 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 px-8 py-4 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800 capitalize">{activeTab}</h2>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-900">{user?.full_name || 'Borrower'}</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">{user?.role}</p>
            </div>
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold border-2 border-white shadow-sm">
              {user?.full_name?.charAt(0) || 'B'}
            </div>
          </div>
        </header>

        <div className="p-8 max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div 
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                {/* KYC Alert */}
                {kycStep !== 3 && (
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 rounded-3xl p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600">
                        <AlertCircle size={28} />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">Complete your eKYC</h3>
                        <p className="text-sm text-slate-600">Verification is required to apply for a loan.</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setActiveTab('kyc')}
                      className="px-6 py-2.5 bg-amber-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-amber-200 hover:bg-amber-600 transition-all"
                    >
                      Verify Now
                    </button>
                  </div>
                )}

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <StatCard label="Available Limit" value="₹0" icon={<CreditCard className="text-blue-500" />} />
                  <StatCard label="Active Loans" value="0" icon={<Clock className="text-purple-500" />} />
                  <StatCard label="Repayment Score" value="N/A" icon={<TrendingUp className="text-green-500" />} />
                </div>

                {/* Recent Activity Placeholder */}
                <div className="bg-white rounded-3xl border border-slate-200 p-8">
                  <h3 className="text-lg font-bold text-slate-900 mb-6">Recent Activity</h3>
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4 border-2 border-dashed border-slate-200 text-slate-300">
                      <Clock size={40} />
                    </div>
                    <p className="text-slate-500 font-medium">No recent transactions or activity.</p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'kyc' && (
              <motion.div 
                key="kyc"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-2xl mx-auto"
              >
                <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-100/50 overflow-hidden">
                  <div className="bg-primary-600 p-8 text-white">
                    <h2 className="text-2xl font-bold mb-2">Aadhaar eKYC</h2>
                    <p className="text-primary-100">Secure identity verification powered by AI.</p>
                  </div>
                  
                  <div className="p-8">
                    {kycStep === 1 && (
                      <form onSubmit={handleKycSubmit} className="space-y-6">
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Aadhaar Number</label>
                          <input 
                            type="text" 
                            maxLength="12"
                            placeholder="XXXX XXXX XXXX"
                            required
                            value={aadhaar}
                            onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, ''))}
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xl font-mono tracking-widest focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none"
                          />
                          <p className="mt-2 text-xs text-slate-400">Your Aadhaar number is safe and encrypted. We only store a masked version.</p>
                        </div>
                        <button 
                          disabled={aadhaar.length !== 12 || isVerifying}
                          className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold shadow-lg shadow-primary-200 hover:bg-primary-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                        >
                          {isVerifying ? <Loader2 className="animate-spin" /> : 'Request OTP'}
                        </button>
                      </form>
                    )}

                    {kycStep === 2 && (
                      <form onSubmit={handleOtpVerify} className="space-y-6">
                        <div className="text-center mb-6">
                          <p className="text-sm text-slate-500">OTP sent to mobile linked with Aadhaar</p>
                          <p className="text-lg font-bold text-slate-900 mt-1">XXXXXXXX{aadhaar.slice(-4)}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Enter 6-Digit OTP</label>
                          <input 
                            type="text" 
                            maxLength="6"
                            placeholder="000000"
                            required
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-2xl font-mono text-center tracking-[1em] focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none"
                          />
                          <p className="mt-2 text-xs text-center text-slate-400">Use '123456' for testing</p>
                        </div>
                        <button 
                          disabled={otp.length !== 6 || isVerifying}
                          className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold shadow-lg shadow-primary-200 hover:bg-primary-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                        >
                          {isVerifying ? <Loader2 className="animate-spin" /> : 'Verify Identity'}
                        </button>
                      </form>
                    )}

                    {kycStep === 3 && (
                      <div className="text-center py-8 space-y-6">
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 border-8 border-green-50">
                          <CheckCircle2 size={48} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-slate-900">Verification Successful!</h3>
                          <p className="text-slate-500 mt-2">Your identity has been verified. You can now apply for loans.</p>
                        </div>
                        <div className="bg-slate-50 rounded-2xl p-6 text-left border border-slate-100">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-slate-400 uppercase text-[10px] font-bold">Name</p>
                              <p className="font-bold text-slate-900">Test User</p>
                            </div>
                            <div>
                              <p className="text-slate-400 uppercase text-[10px] font-bold">Aadhaar</p>
                              <p className="font-bold text-slate-900">XXXX-XXXX-{aadhaar.slice(-4)}</p>
                            </div>
                            <div className="col-span-2">
                              <p className="text-slate-400 uppercase text-[10px] font-bold">Address</p>
                              <p className="font-bold text-slate-900">123, Rural Village, Dist. Allahabad, UP</p>
                            </div>
                          </div>
                        </div>
                        <button 
                          onClick={() => setActiveTab('loans')}
                          className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold shadow-lg shadow-primary-200 hover:bg-primary-700 transition-all flex items-center justify-center gap-2"
                        >
                          Apply for Your First Loan <ArrowUpRight size={18} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-3 w-full p-3.5 rounded-2xl transition-all font-medium ${
      active 
      ? 'bg-primary-50 text-primary-700 shadow-sm shadow-primary-100/50' 
      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
    }`}
  >
    {icon}
    <span>{label}</span>
    {active && <ChevronRight size={16} className="ml-auto" />}
  </button>
);

const StatCard = ({ label, value, icon }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-white transition-colors">
        {React.cloneElement(icon, { size: 24 })}
      </div>
    </div>
    <p className="text-slate-500 text-sm font-medium">{label}</p>
    <p className="text-2xl font-extrabold text-slate-900 mt-1">{value}</p>
  </div>
);

const TrendingUp = ({ size, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);

const Loader2 = ({ className }) => (
  <svg 
    className={`animate-spin ${className}`} 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export default BorrowerDashboard;
