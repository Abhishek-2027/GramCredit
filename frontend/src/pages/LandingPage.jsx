import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, TrendingUp, Users, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">G</div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-800">GRAMCREDIT</span>
        </div>
        <div className="flex gap-4">
          <Link to="/login" className="px-5 py-2 text-slate-600 font-medium hover:text-primary-600 transition-colors">Login</Link>
          <Link to="/register" className="px-5 py-2 bg-primary-600 text-white rounded-full font-medium hover:bg-primary-700 shadow-lg shadow-primary-200 transition-all active:scale-95">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-20 pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-l from-primary-50 to-transparent rounded-full blur-3xl opacity-50 transform translate-x-1/4 -translate-y-1/4"></div>
        
        <div className="max-w-6xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold text-primary-700 bg-primary-50 rounded-full border border-primary-100">
              AI-Powered Financial Inclusion
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-8 tracking-tight">
              Empowering Rural India with <br />
              <span className="text-primary-600">Smart Credit Solutions</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              GRAMCREDIT uses AI and behavioral analytics to provide fair, fast, and accessible loans to underserved rural communities. No credit history? No problem.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register" className="w-full sm:w-auto px-8 py-4 bg-primary-600 text-white rounded-2xl font-bold text-lg hover:bg-primary-700 shadow-xl shadow-primary-200 flex items-center justify-center gap-2 transition-all hover:-translate-y-1">
                Apply for Loan <ArrowRight size={20} />
              </Link>
              <Link to="/about" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 rounded-2xl font-bold text-lg border border-slate-200 hover:border-primary-300 hover:bg-slate-50 transition-all">
                Learn How it Works
              </Link>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Features */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Shield className="text-primary-600" />}
              title="Secure & Private"
              description="Aadhaar-based eKYC and secure encryption keep your personal data safe and private."
            />
            <FeatureCard 
              icon={<TrendingUp className="text-primary-600" />}
              title="AI Credit Scoring"
              description="We look beyond CIBIL scores, using alternative data to understand your true repayment potential."
            />
            <FeatureCard 
              icon={<Users className="text-primary-600" />}
              title="Community Trust"
              description="Built on the strength of social trust networks and SHG groups for inclusive growth."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-12 px-6 border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold">G</div>
            <span className="font-bold text-slate-900">GRAMCREDIT</span>
          </div>
          <p className="text-slate-500 text-sm">© 2026 TOEHO AI Technology Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-primary-600 transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-400 hover:text-primary-600 transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="p-8 bg-white rounded-3xl border border-slate-100 hover:border-primary-200 hover:shadow-2xl hover:shadow-primary-100 transition-all group">
    <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      {React.cloneElement(icon, { size: 28 })}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{description}</p>
  </div>
);

export default LandingPage;
