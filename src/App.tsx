/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  PageId,
  SAMPLE_SERVICES,
  INITIAL_SAMPLE_REQUESTS,
  SampleRequestRecord,
  RequestStatus,
} from './data/demoData';
import { Language } from './data/guidedServicesData';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { ServicesView } from './components/ServicesView';
import { ReportIssueView } from './components/ReportIssueView';
import { TrackRequestView } from './components/TrackRequestView';
import { HelpView } from './components/HelpView';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [language, setLanguage] = useState<Language>('en');
  const [guidedServiceId, setGuidedServiceId] = useState<string>('gov-senior-citizen-card');
  const [requests, setRequests] = useState<SampleRequestRecord[]>(INITIAL_SAMPLE_REQUESTS);
  const [preselectedCategory, setPreselectedCategory] = useState<string>('');
  const [selectedTrackingId, setSelectedTrackingId] = useState<string>('JS-2026-4082');

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
  };

  const handleOpenGuidedService = (serviceId: string) => {
    setGuidedServiceId(serviceId);
    setCurrentPage('services');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartReportWithCategory = (category: string) => {
    setPreselectedCategory(category);
    setCurrentPage('report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleIssueSubmitted = (newRequest: SampleRequestRecord) => {
    setRequests((prev) => [newRequest, ...prev]);
    setSelectedTrackingId(newRequest.id);
  };

  const handleTrackSpecificId = (requestId: string) => {
    setSelectedTrackingId(requestId);
    setCurrentPage('track');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateRequestStatus = (requestId: string, newStatus: RequestStatus) => {
    setRequests((prev) =>
      prev.map((req) => {
        if (req.id !== requestId) return req;

        const updatedTimeline = req.timeline.map((step) => {
          if (newStatus === 'Received') {
            return {
              ...step,
              completed: false,
              current: step.stage === 'Received',
            };
          }
          if (newStatus === 'Under review') {
            return {
              ...step,
              completed: step.stage === 'Received',
              current: step.stage === 'Under review',
              date:
                step.stage === 'Under review' && step.date.includes('Upcoming')
                  ? '10 Nov 2026 · Simulated review'
                  : step.date,
            };
          }
          // Resolved
          return {
            ...step,
            completed: true,
            current: step.stage === 'Resolved',
            date:
              step.date.includes('Upcoming') || step.date.includes('Pending')
                ? '10 Nov 2026 · Simulated completion'
                : step.date,
          };
        });

        const nextStepNote =
          newStatus === 'Received'
            ? 'Sample status: Request has been recorded and awaits initial review by the sample ward desk.'
            : newStatus === 'Under review'
            ? 'Sample status: Assigned to the neighborhood field unit for inspection (simulated demo update).'
            : 'Sample status: Marked as Resolved in this demo preview.';

        return {
          ...req,
          status: newStatus,
          nextStepNote,
          timeline: updatedTimeline,
        };
      })
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4EFE4] text-[#18324A]">
      {/* Skip to main content link for keyboard and screen-reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#F6C744] focus:text-[#18324A] focus:font-semibold focus:rounded-lg"
      >
        Skip to main content
      </a>

      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      <main id="main-content" className="flex-1 max-w-[1200px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        {currentPage === 'home' && (
          <HomeView
            services={SAMPLE_SERVICES}
            recentRequests={requests}
            language={language}
            onLanguageChange={setLanguage}
            onNavigate={handleNavigate}
            onOpenGuidedService={handleOpenGuidedService}
            onStartReportWithCategory={handleStartReportWithCategory}
            onTrackSpecificId={handleTrackSpecificId}
          />
        )}

        {currentPage === 'services' && (
          <ServicesView
            services={SAMPLE_SERVICES}
            language={language}
            onLanguageChange={setLanguage}
            initialGuidedServiceId={guidedServiceId}
            onStartReportWithCategory={handleStartReportWithCategory}
          />
        )}

        {currentPage === 'report' && (
          <ReportIssueView
            initialCategory={preselectedCategory}
            language={language}
            onLanguageChange={setLanguage}
            onIssueSubmitted={handleIssueSubmitted}
            onTrackRequest={handleTrackSpecificId}
          />
        )}

        {currentPage === 'track' && (
          <TrackRequestView
            requests={requests}
            initialTrackingId={selectedTrackingId}
            language={language}
            onLanguageChange={setLanguage}
            onUpdateRequestStatus={handleUpdateRequestStatus}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'help' && (
          <HelpView
            onNavigate={handleNavigate}
            onTrackSpecificId={handleTrackSpecificId}
          />
        )}
      </main>

      {/* Quiet Civic Demo Footer */}
      <footer className="bg-[#FFFDF8] border-t border-[#18324A]/10 mt-auto">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <div className="font-display text-base font-bold text-[#1647A5]">
              Jan Setu — Local Civic Gateway Demo (English &amp; ಕನ್ನಡ)
            </div>
            <p className="text-xs text-[#687783] leading-relaxed">
              This is an interactive demonstration website using fictional sample services, locations, and request IDs,
              along with links to official Karnataka government portals for reference. No personal information is stored.
            </p>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-5 text-xs font-semibold text-[#1647A5]">
            <button
              type="button"
              onClick={() => {
                handleNavigate('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:underline cursor-pointer"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => {
                handleNavigate('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:underline cursor-pointer"
            >
              Services &amp; Guidance
            </button>
            <button
              type="button"
              onClick={() => {
                handleNavigate('report');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:underline cursor-pointer"
            >
              Report an issue
            </button>
            <button
              type="button"
              onClick={() => {
                handleNavigate('track');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:underline cursor-pointer"
            >
              Track a request
            </button>
            <button
              type="button"
              onClick={() => {
                handleNavigate('help');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:underline cursor-pointer"
            >
              Help &amp; Demo Info
            </button>
          </nav>
        </div>
      </footer>
    </div>
  );
}
