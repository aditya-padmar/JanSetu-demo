import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { PageId } from '../data/demoData';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

const NAV_LINKS: { id: PageId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'report', label: 'Report an issue' },
  { id: 'track', label: 'Track a request' },
  { id: 'help', label: 'Help' },
];

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelect = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="bg-[#1647A5] text-[#FFFDF8] border-b border-[#123A88]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Title (single text element wordmark) */}
        <button
          type="button"
          onClick={() => handleSelect('home')}
          className="font-display text-xl font-bold tracking-tight text-[#FFFDF8] hover:opacity-90 transition-opacity whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F6C744] cursor-pointer"
        >
          Jan Setu
        </button>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`text-sm font-medium whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F6C744] ${
                  isActive
                    ? 'border-[#F6C744] text-[#FFFDF8] font-semibold'
                    : 'border-transparent text-[#FFFDF8]/85 hover:text-[#FFFDF8] hover:border-[#FFFDF8]/40'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action on desktop, plus mobile menu trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleSelect('report')}
            className="px-4 py-2 text-sm font-semibold text-[#18324A] bg-[#F6C744] hover:bg-[#eab82e] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFFDF8]"
          >
            Report an issue
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden p-2 rounded-lg text-[#FFFDF8] hover:bg-[#123A88] transition-colors focus-visible:outline-2 focus-visible:outline-[#F6C744]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile always-visible quick action strip so main actions stay accessible even when menu is collapsed */}
      <div className="md:hidden bg-[#123A88] border-t border-[#FFFDF8]/10 px-4 py-2 flex items-center justify-between gap-2 overflow-x-auto">
        <button
          type="button"
          onClick={() => handleSelect('services')}
          className={`text-xs font-medium px-2.5 py-1.5 rounded whitespace-nowrap shrink-0 transition-colors ${
            currentPage === 'services' ? 'bg-[#FFFDF8]/20 text-[#FFFDF8] font-semibold' : 'text-[#FFFDF8]/85'
          }`}
        >
          Find services
        </button>
        <button
          type="button"
          onClick={() => handleSelect('report')}
          className={`text-xs font-medium px-2.5 py-1.5 rounded whitespace-nowrap shrink-0 transition-colors ${
            currentPage === 'report' ? 'bg-[#FFFDF8]/20 text-[#FFFDF8] font-semibold' : 'text-[#FFFDF8]/85'
          }`}
        >
          Report an issue
        </button>
        <button
          type="button"
          onClick={() => handleSelect('track')}
          className={`text-xs font-medium px-2.5 py-1.5 rounded whitespace-nowrap shrink-0 transition-colors ${
            currentPage === 'track' ? 'bg-[#FFFDF8]/20 text-[#FFFDF8] font-semibold' : 'text-[#FFFDF8]/85'
          }`}
        >
          Track a request
        </button>
        <button
          type="button"
          onClick={() => handleSelect('help')}
          className={`text-xs font-medium px-2.5 py-1.5 rounded whitespace-nowrap shrink-0 transition-colors ${
            currentPage === 'help' ? 'bg-[#FFFDF8]/20 text-[#FFFDF8] font-semibold' : 'text-[#FFFDF8]/85'
          }`}
        >
          Help
        </button>
      </div>

      {/* Collapsible full mobile navigation menu */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="md:hidden bg-[#1647A5] border-t border-[#FFFDF8]/15 px-4 pt-2 pb-4 space-y-1"
        >
          {NAV_LINKS.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                  isActive
                    ? 'bg-[#FFFDF8] text-[#1647A5] font-semibold'
                    : 'text-[#FFFDF8] hover:bg-[#123A88]'
                }`}
              >
                <span>{item.label}</span>
                {isActive && <span className="text-xs font-normal">Current page</span>}
              </button>
            );
          })}
        </nav>
      )}
    </header>
  );
};
