import React from 'react';
import { ArrowRight, HelpCircle, Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';
import { PageId } from '../data/demoData';

interface HelpViewProps {
  onNavigate: (page: PageId) => void;
  onTrackSpecificId: (id: string) => void;
}

export const HelpView: React.FC<HelpViewProps> = ({
  onNavigate,
  onTrackSpecificId,
}) => {
  return (
    <div className="max-w-3xl mx-auto pt-8 pb-12 space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="text-xs text-[#687783] flex flex-wrap items-center gap-2">
          <span>Demo Guide & Sample Contact Details</span>
          <span aria-hidden="true">·</span>
          <span>For Residents & Evaluators</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#1647A5]">
          Help & demo guide
        </h1>
        <p className="text-base text-[#18324A]/85 leading-relaxed max-w-[65ch]">
          Learn how to explore the Jan Setu prototype in under two minutes, what happens when you submit a sample form,
          and how sample tracking works.
        </p>
      </div>

      {/* Primary Walkthrough for Reviewers */}
      <section
        aria-labelledby="walkthrough-heading"
        className="bg-[#FFFDF8] border border-[#18324A]/10 rounded-2xl p-6 sm:p-8 space-y-5"
      >
        <div className="space-y-1">
          <p className="text-xs font-medium text-[#687783]">Recommended 2-minute walkthrough</p>
          <h2 id="walkthrough-heading" className="font-display text-xl sm:text-2xl font-bold text-[#1647A5]">
            How to test the primary resident journey
          </h2>
        </div>

        <ol className="divide-y divide-[#18324A]/10 text-sm">
          <li className="py-3.5 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="font-mono-tabular text-xs font-bold text-[#1647A5]">Step 01</span>
              <p className="font-semibold text-[#18324A]">
                Browse or search local public services
              </p>
              <p className="text-[#687783]">
                Try searching for &ldquo;streetlight&rdquo; or filtering by &ldquo;Waste &amp; Sanitation&rdquo; on the
                Services page.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('services')}
              className="px-3.5 py-2 bg-[#F4EFE4] hover:bg-[#e5decb] text-[#1647A5] text-xs font-semibold rounded-xl whitespace-nowrap shrink-0 self-start sm:self-center cursor-pointer"
            >
              Open Services →
            </button>
          </li>

          <li className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="font-mono-tabular text-xs font-bold text-[#1647A5]">Step 02</span>
              <p className="font-semibold text-[#18324A]">
                Submit a sample community issue report
              </p>
              <p className="text-[#687783]">
                Choose a category, enter a locality, or click &ldquo;Fill with sample report&rdquo; to receive a sample
                request ID.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('report')}
              className="px-3.5 py-2 bg-[#F6C744] hover:bg-[#eab82e] text-[#18324A] text-xs font-semibold rounded-xl whitespace-nowrap shrink-0 self-start sm:self-center cursor-pointer"
            >
              Open Report an issue →
            </button>
          </li>

          <li className="py-3.5 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="font-mono-tabular text-xs font-bold text-[#1647A5]">Step 03</span>
              <p className="font-semibold text-[#18324A]">
                Track the sample request timeline
              </p>
              <p className="text-[#687783]">
                Inspect pre-loaded sample ID <span className="font-mono-tabular font-semibold">JS-2026-4082</span> or the
                new ID from your submission.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onTrackSpecificId('JS-2026-4082')}
              className="px-3.5 py-2 bg-[#1647A5] hover:bg-[#123A88] text-[#FFFDF8] text-xs font-semibold rounded-xl whitespace-nowrap shrink-0 self-start sm:self-center cursor-pointer"
            >
              Track JS-2026-4082 →
            </button>
          </li>
        </ol>
      </section>

      {/* Common Questions about the Demo */}
      <section
        aria-labelledby="faq-heading"
        className="bg-[#FFFDF8] border border-[#18324A]/10 rounded-2xl p-6 sm:p-8 space-y-5"
      >
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[#1647A5]" />
          <h2 id="faq-heading" className="font-display text-xl font-bold text-[#1647A5]">
            Frequently asked questions about this demo
          </h2>
        </div>

        <div className="space-y-5 text-sm">
          <div className="space-y-1">
            <h3 className="font-display font-bold text-[#18324A]">
              What happens after I submit an issue form here?
            </h3>
            <p className="text-[#18324A]/85 leading-relaxed">
              When you submit the form, Jan Setu validates the required fields and immediately creates a sample record in
              your current browser session with a reference ID (such as <span className="font-mono-tabular">JS-2026-4410</span>).
              You can then open <strong>Track a request</strong> to view its status timeline.
            </p>
          </div>

          <div className="space-y-1 pt-4 border-t border-[#18324A]/10">
            <h3 className="font-display font-bold text-[#18324A]">
              Are my name, contact details, or photos stored anywhere?
            </h3>
            <p className="text-[#18324A]/85 leading-relaxed">
              No. All fields are local to your browser tab and reset when you refresh the page. Photos are never uploaded
              to a server, and no data is sent to any municipal or government authority.
            </p>
          </div>

          <div className="space-y-1 pt-4 border-t border-[#18324A]/10">
            <h3 className="font-display font-bold text-[#18324A]">
              Does this demo promise real-world municipal response times?
            </h3>
            <p className="text-[#18324A]/85 leading-relaxed">
              No. All status notes, inspection dates, and resolution timelines shown in Jan Setu are fictional examples
              created to illustrate a calm, transparent resident communication flow.
            </p>
          </div>
        </div>
      </section>

      {/* Clearly Labelled Placeholder Sample Contact Information */}
      <section
        aria-labelledby="sample-contact-heading"
        className="bg-[#FFFDF8] border border-[#18324A]/10 rounded-2xl p-6 sm:p-8 space-y-5"
      >
        <div className="space-y-1">
          <div className="text-xs font-semibold text-[#1647A5] flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>Sample Contact Information (Placeholder Demo Content Only)</span>
          </div>
          <h2 id="sample-contact-heading" className="font-display text-xl font-bold text-[#18324A]">
            Sample Neighborhood Citizen Facilitation Desk
          </h2>
          <p className="text-xs text-[#687783]">
            The phone numbers, email addresses, and office hours below are fictional placeholders illustrating how a
            local civic center would display offline support options for residents who prefer in-person or phone help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm pt-2">
          <div className="bg-[#F4EFE4]/60 rounded-xl p-4 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1647A5]">
              <Phone className="w-4 h-4" />
              <span>Sample Helpline (Fictional)</span>
            </div>
            <p className="font-mono-tabular font-bold text-[#18324A]">1800-000-0123 (Demo)</p>
            <p className="text-xs text-[#687783]">Mon – Sat · 8:00 AM to 6:00 PM (Sample hours)</p>
          </div>

          <div className="bg-[#F4EFE4]/60 rounded-xl p-4 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1647A5]">
              <Mail className="w-4 h-4" />
              <span>Sample Support Desk (Fictional)</span>
            </div>
            <p className="font-mono-tabular font-bold text-[#18324A]">helpdesk.demo@jansetu.example</p>
            <p className="text-xs text-[#687783]">Placeholder address — do not send real mail</p>
          </div>

          <div className="bg-[#F4EFE4]/60 rounded-xl p-4 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1647A5]">
              <MapPin className="w-4 h-4" />
              <span>Sample Walk-In Center (Fictional)</span>
            </div>
            <p className="font-semibold text-[#18324A]">Ward 12 Civic Service Courtyard</p>
            <p className="text-xs text-[#687783]">Gandhi Nagar Main Road (Fictional demo location)</p>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="px-4 py-2 text-sm font-semibold text-[#1647A5] hover:underline inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span>Return to Home page</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
