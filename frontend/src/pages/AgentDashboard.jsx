import React, { useState, useEffect } from 'react';
import { 
  Users, MapPin, CheckCircle, Clock, 
  ChevronRight, LogOut, Search, Filter,
  Navigation, Camera, Send, Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

const AgentDashboard = () => {
  const [activeTab, setActiveTab] = useState('tasks');
  const [user, setUser] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
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

  const tasks = [
    { id: 1, name: 'Ramesh Kumar', village: 'Phulpur', status: 'Pending', type: 'Physical Verification' },
    { id: 2, name: 'Sita Devi', village: 'Saidabad', status: 'Pending', type: 'Document Validation' },
    { id: 3, name: 'Amit Singh', village: 'Handia', status: 'Completed', type: 'Physical Verification' },
  ];

  const handleVerify = (e) => {
    e.preventDefault();
    setIsVerifying(true);
    // Simulate geo-tagging and submission
    setTimeout(() => {
      setIsVerifying(false);
      setVerificationSuccess(true);
      setTimeout(() => {
        setVerificationSuccess(false);
        setSelectedTask(null);
      }, 2000);
    }, 2000);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Mobile-first: Sidebar could be a bottom nav or drawer, keeping it simple sidebar for now */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col hidden lg:flex">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold">G</div>
            <span className="font-bold text-white tracking-tight">AGENT PRO</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <NavItem 
            active={activeTab === 'tasks'} 
            onClick={() => setActiveTab('tasks')}
            icon={<Clock size={20} />} 
            label="Pending Tasks" 
          />
          <NavItem 
            active={activeTab === 'map'} 
            onClick={() => setActiveTab('map')}
            icon={<MapPin size={20} />} 
            label="Area Map" 
          />
          <NavItem 
            active={activeTab === 'history'} 
            onClick={() => setActiveTab('history')}
            icon={<CheckCircle size={20} />} 
            label="History" 
          />
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full p-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all"
          >
            <LogOut size={20} />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-white px-6 py-4 border-b border-slate-200 flex justify-between items-center shadow-sm">
          <div>
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Field Agent</p>
            <h2 className="text-lg font-bold text-slate-800">{user?.full_name || 'Agent'}</h2>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-bold border border-green-100">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Online
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <AnimatePresence mode="wait">
            {!selectedTask ? (
              <motion.div 
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6 max-w-4xl mx-auto"
              >
                {/* Search & Filter */}
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      placeholder="Search borrower or village..." 
                      className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                    />
                  </div>
                  <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:bg-slate-50">
                    <Filter size={20} />
                  </button>
                </div>

                {/* Task List */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider ml-1">Assigned Tasks</h3>
                  {tasks.map(task => (
                    <motion.div 
                      key={task.id}
                      whileHover={{ scale: 1.01 }}
                      onClick={() => task.status === 'Pending' && setSelectedTask(task)}
                      className={`p-5 bg-white rounded-3xl border border-slate-200 flex items-center justify-between cursor-pointer transition-all ${task.status === 'Completed' ? 'opacity-60 grayscale' : 'hover:shadow-lg hover:shadow-slate-200/50'}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${task.status === 'Pending' ? 'bg-amber-50 text-amber-600' : 'bg-green-50 text-green-600'}`}>
                          <Users size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900">{task.name}</h4>
                          <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                            <MapPin size={12} /> {task.village}
                            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                            {task.type}
                          </div>
                        </div>
                      </div>
                      <ChevronRight size={20} className="text-slate-300" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="details"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                className="max-w-2xl mx-auto"
              >
                <button 
                  onClick={() => setSelectedTask(null)}
                  className="mb-6 flex items-center text-sm font-bold text-slate-500 hover:text-primary-600 transition-colors"
                >
                  <ChevronRight size={16} className="rotate-180 mr-1" /> Back to Tasks
                </button>

                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl shadow-slate-200/50">
                  <div className="p-8 border-b border-slate-100 flex justify-between items-start">
                    <div>
                      <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 inline-block">Physical Verification</span>
                      <h3 className="text-2xl font-bold text-slate-900">{selectedTask.name}</h3>
                      <p className="text-slate-500 flex items-center gap-1 mt-1"><MapPin size={14} /> Village: {selectedTask.village}</p>
                    </div>
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300">
                      <Camera size={32} />
                    </div>
                  </div>

                  <div className="p-8 space-y-6">
                    <div className="bg-primary-50 p-6 rounded-2xl border border-primary-100 flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white">
                        <Navigation size={20} />
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-bold text-primary-600 uppercase tracking-widest">Geo-Tagging</p>
                        <p className="text-sm font-medium text-primary-900">Coordinates: 25.4358° N, 81.8463° E</p>
                      </div>
                      <div className="text-[10px] bg-white px-2 py-1 rounded-md text-primary-700 font-bold shadow-sm">ACCURATE</div>
                    </div>

                    <div className="space-y-4">
                      <label className="block text-sm font-bold text-slate-700">Agent Remarks</label>
                      <textarea 
                        rows="4" 
                        placeholder="Enter your observations..."
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm"
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 gap-2 hover:border-primary-300 hover:text-primary-500 cursor-pointer transition-all">
                        <Camera size={24} />
                        <span className="text-[10px] font-bold">House Photo</span>
                      </div>
                      <div className="p-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 gap-2 hover:border-primary-300 hover:text-primary-500 cursor-pointer transition-all">
                        <Camera size={24} />
                        <span className="text-[10px] font-bold">Utility Bill</span>
                      </div>
                    </div>

                    <button 
                      onClick={handleVerify}
                      disabled={isVerifying || verificationSuccess}
                      className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
                        verificationSuccess 
                        ? 'bg-green-500 text-white shadow-green-200' 
                        : 'bg-slate-900 text-white shadow-slate-300 hover:bg-black active:scale-95'
                      }`}
                    >
                      {isVerifying ? <Loader2 className="animate-spin" /> : verificationSuccess ? <><CheckCircle size={20} /> Verified</> : <><Send size={18} /> Submit Verification</>}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3 flex justify-between items-center z-50">
        <MobileNavItem active={activeTab === 'tasks'} onClick={() => setActiveTab('tasks')} icon={<Clock size={20} />} />
        <MobileNavItem active={activeTab === 'map'} onClick={() => setActiveTab('map')} icon={<MapPin size={20} />} />
        <MobileNavItem active={activeTab === 'history'} onClick={() => setActiveTab('history')} icon={<CheckCircle size={20} />} />
        <MobileNavItem active={false} onClick={handleLogout} icon={<LogOut size={20} />} />
      </nav>
    </div>
  );
};

const NavItem = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-3 w-full p-3.5 rounded-2xl transition-all font-medium ${
      active 
      ? 'bg-primary-600 text-white shadow-lg shadow-primary-900/50' 
      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const MobileNavItem = ({ icon, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`p-3 rounded-2xl transition-all ${active ? 'bg-primary-50 text-primary-600' : 'text-slate-400'}`}
  >
    {icon}
  </button>
);

export default AgentDashboard;
