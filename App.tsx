import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { Planner } from './components/Planner';
import { Compatibility } from './components/Compatibility';
import { Troubleshoot } from './components/Troubleshoot';
import { PrivacyPolicy, TermsOfService } from './components/LegalPages';
import { About } from './components/About';
import { ViewState } from './types';
import { Home, ShieldCheck, Wrench, Menu, X, Info } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // SEO: Update Document Title based on view
  useEffect(() => {
    let title = "AI SmartHome Hub";
    switch(currentView) {
      case ViewState.PLANNER: title = "Smart Home Planner & Design Tool | AI SmartHome Hub"; break;
      case ViewState.COMPATIBILITY: title = "Check Device Compatibility (Matter, Zigbee) | AI SmartHome Hub"; break;
      case ViewState.TROUBLESHOOT: title = "Smart Home Troubleshooting Assistant | AI SmartHome Hub"; break;
      case ViewState.PRIVACY: title = "Privacy Policy - AI SmartHome Hub"; break;
      case ViewState.TERMS: title = "Terms of Service - AI SmartHome Hub"; break;
      case ViewState.ABOUT: title = "About Us - AI SmartHome Hub"; break;
    }
    document.title = title;
    window.scrollTo(0, 0); // Scroll to top on navigation
  }, [currentView]);

  const renderView = () => {
    switch (currentView) {
      case ViewState.PLANNER:
        return <Planner />;
      case ViewState.COMPATIBILITY:
        return <Compatibility />;
      case ViewState.TROUBLESHOOT:
        return <Troubleshoot />;
      case ViewState.PRIVACY:
        return <PrivacyPolicy />;
      case ViewState.TERMS:
        return <TermsOfService />;
      case ViewState.ABOUT:
        return <About />;
      case ViewState.HOME:
      default:
        return <Hero onNavigate={setCurrentView} />;
    }
  };

  const NavLink = ({ view, label, icon: Icon }: { view: ViewState; label: string; icon: any }) => (
    <button
      onClick={() => {
        setCurrentView(view);
        setMobileMenuOpen(false);
      }}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium ${
        currentView === view 
          ? 'bg-blue-100 text-blue-700' 
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => setCurrentView(ViewState.HOME)}
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Home className="text-white" size={20} />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">AI SmartHome<span className="text-blue-600">Hub</span></span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2">
            <NavLink view={ViewState.PLANNER} label="Planner" icon={Home} />
            <NavLink view={ViewState.COMPATIBILITY} label="Compatibility" icon={ShieldCheck} />
            <NavLink view={ViewState.TROUBLESHOOT} label="Troubleshoot" icon={Wrench} />
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 p-4 space-y-2 shadow-lg">
            <NavLink view={ViewState.PLANNER} label="Design My Home" icon={Home} />
            <NavLink view={ViewState.COMPATIBILITY} label="Check Compatibility" icon={ShieldCheck} />
            <NavLink view={ViewState.TROUBLESHOOT} label="Fix Problems" icon={Wrench} />
            <NavLink view={ViewState.ABOUT} label="About Us" icon={Info} />
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {renderView()}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">AI SmartHome Hub</h3>
            <p className="text-sm leading-relaxed">
              Simplifying the connected home experience with artificial intelligence. No biased reviews, just data-driven compatibility checks and planning.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Tools</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer" onClick={() => setCurrentView(ViewState.PLANNER)}>Ecosystem Planner</li>
              <li className="hover:text-white cursor-pointer" onClick={() => setCurrentView(ViewState.COMPATIBILITY)}>Matter Checker</li>
              <li className="hover:text-white cursor-pointer" onClick={() => setCurrentView(ViewState.TROUBLESHOOT)}>Tech Support</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Legal & Info</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer" onClick={() => setCurrentView(ViewState.ABOUT)}>About Us</li>
              <li className="hover:text-white cursor-pointer" onClick={() => setCurrentView(ViewState.PRIVACY)}>Privacy Policy</li>
              <li className="hover:text-white cursor-pointer" onClick={() => setCurrentView(ViewState.TERMS)}>Terms of Service</li>
            </ul>
            <p className="text-xs leading-relaxed mt-4 opacity-75">
              We are a participant in affiliate programs. We may earn a commission from links to products.
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-slate-800 text-center text-xs">
          © {new Date().getFullYear()} AI SmartHome Hub. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;