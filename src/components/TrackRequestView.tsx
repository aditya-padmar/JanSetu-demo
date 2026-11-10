import React, { useState, useEffect } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  FileText,
  AlertCircle,
  ArrowRight,
  SlidersHorizontal,
  Volume2,
  VolumeX,
  Languages,
} from 'lucide-react';
import { SampleRequestRecord, RequestStatus, PageId } from '../data/demoData';
import { Language } from '../data/guidedServicesData';
import { speakText, stopSpeaking } from '../utils/voiceAssistant';

interface TrackRequestViewProps {
  requests: SampleRequestRecord[];
  initialTrackingId?: string;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onUpdateRequestStatus: (requestId: string, newStatus: RequestStatus) => void;
  onNavigate: (page: PageId) => void;
}

export const TrackRequestView: React.FC<TrackRequestViewProps> = ({
  requests,
  initialTrackingId = 'JS-2026-4082',
  language,
  onLanguageChange,
  onUpdateRequestStatus,
  onNavigate,
}) => {
  const [inputValue, setInputValue] = useState<string>(initialTrackingId);
  const [searchedId, setSearchedId] = useState<string>(initialTrackingId);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  useEffect(() => {
    if (initialTrackingId) {
      setInputValue(initialTrackingId);
      setSearchedId(initialTrackingId);
    }
  }, [initialTrackingId]);

  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  const matchedRequest = requests.find(
    (req) => req.id.toLowerCase() === searchedId.trim().toLowerCase()
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    stopSpeaking();
    setIsSpeaking(false);
    setSearchedId(inputValue.trim());
  };

  const handleSelectSampleId = (id: string) => {
    stopSpeaking();
    setIsSpeaking(false);
    setInputValue(id);
    setSearchedId(id);
  };

  const handleReadStatusAloud = () => {
    if (!matchedRequest) return;
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      return;
    }

    const speechText =
      language === 'en'
        ? `Grievance ID ${matchedRequest.id}. Category: ${matchedRequest.category}. Department: ${matchedRequest.department}. Locality: ${matchedRequest.area}. Current status: ${matchedRequest.status}. ${matchedRequest.nextStepNote}`
        : `ದೂರು ಸಂಖ್ಯೆ ${matchedRequest.id}. ವರ್ಗ: ${matchedRequest.category}. ಪ್ರದೇಶ: ${matchedRequest.area}. ಪ್ರಸ್ತುತ ಸ್ಥಿತಿ: ${matchedRequest.status}. ${matchedRequest.nextStepNote}`;

    speakText(
      speechText,
      language,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  };

  return (
    <div className="max-w-3xl mx-auto pt-8 pb-12 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="text-xs text-[#687783] flex flex-wrap items-center gap-2">
            <span>Grievance &amp; Request Status Tracker</span>
            <span aria-hidden="true">·</span>
            <span>Fictional Demo Records + Voice Read-Aloud</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#1647A5]">
            {language === 'en' ? 'Track a grievance or request' : 'ದೂರು ಅಥವಾ ಅರ್ಜಿಯ ಸ್ಥಿತಿ ಪರಿಶೀಲಿಸಿ'}
          </h1>
          <p className="text-base text-[#18324A]/85 max-w-[65ch] leading-relaxed">
            {language === 'en'
              ? 'Enter a sample request ID below—or pick one of the demo records—to view its assigned department, locality, submission date, and status timeline.'
              : 'ಕೆಳಗೆ ನಿಮ್ಮ ಮಾದರಿ ಟ್ರ್ಯಾಕಿಂಗ್ ಐಡಿ ನಮೂದಿಸಿ ಅಥವಾ ಪಟ್ಟಿಯಿಂದ ಆಯ್ಕೆಮಾಡಿ ಅರ್ಜಿಯ ಪ್ರಸ್ತುತ ಹಂತವನ್ನು ತಿಳಿಯಿರಿ ಮತ್ತು ಧ್ವನಿ ಮೂಲಕ ಕೇಳಿ.'}
          </p>
        </div>

        <div className="inline-flex items-center gap-1 bg-[#FFFDF8] p-1 rounded-xl border border-[#18324A]/15 self-start sm:self-auto shrink-0">
          <Languages className="w-3.5 h-3.5 text-[#1647A5] ml-1.5" />
          <button
            type="button"
            onClick={() => onLanguageChange('en')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg cursor-pointer ${
              language === 'en' ? 'bg-[#1647A5] text-[#FFFDF8]' : 'text-[#18324A]'
            }`}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => onLanguageChange('kn')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg cursor-pointer ${
              language === 'kn' ? 'bg-[#1647A5] text-[#FFFDF8]' : 'text-[#18324A]'
            }`}
          >
            ಕನ್ನಡ
          </button>
        </div>
      </div>

      {/* Search Form & Quick-Pick Sample IDs */}
      <section
        aria-label="Request ID lookup"
        className="bg-[#FFFDF8] border border-[#18324A]/10 rounded-2xl p-5 sm:p-6 space-y-5"
      >
        <form onSubmit={handleSearchSubmit} className="space-y-2">
          <label htmlFor="tracking-id-input" className="block text-sm font-semibold text-[#18324A]">
            {language === 'en' ? 'Enter sample request ID' : 'ಮಾದರಿ ಟ್ರ್ಯಾಕಿಂಗ್ ಐಡಿ ನಮೂದಿಸಿ'}
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#687783] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="tracking-id-input"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="e.g., JS-2026-4082"
                className="w-full pl-10 pr-4 py-2.5 bg-[#F4EFE4]/60 border border-[#18324A]/20 rounded-xl font-mono-tabular text-sm text-[#18324A] placeholder:text-[#687783] focus:outline-none focus:border-[#1647A5] focus:ring-2 focus:ring-[#1647A5]/20"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-[#1647A5] hover:bg-[#123A88] text-[#FFFDF8] font-semibold text-sm rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F6C744]"
            >
              {language === 'en' ? 'Show status' : 'ಸ್ಥಿತಿ ತೋರಿಸಿ'}
            </button>
          </div>
        </form>

        {/* Available Sample IDs */}
        <div className="space-y-2 pt-2 border-t border-[#18324A]/10">
          <span className="block text-xs font-medium text-[#687783]">
            {language === 'en'
              ? 'Available sample request IDs (click any ID to inspect):'
              : 'ಲಭ್ಯವಿರುವ ಮಾದರಿ ಟ್ರ್ಯಾಕಿಂಗ್ ಐಡಿಗಳು (ಪರಿಶೀಲಿಸಲು ಕ್ಲಿಕ್ ಮಾಡಿ):'}
          </span>
          <div className="flex flex-wrap gap-2">
            {requests.map((req) => {
              const isSelected = searchedId.trim().toLowerCase() === req.id.toLowerCase();
              return (
                <button
                  key={req.id}
                  type="button"
                  onClick={() => handleSelectSampleId(req.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-[#1647A5] text-[#FFFDF8] font-semibold'
                      : 'bg-[#F4EFE4] text-[#18324A] hover:bg-[#e5decb]'
                  }`}
                >
                  <span className="font-mono-tabular">{req.id}</span>
                  <span aria-hidden="true">·</span>
                  <span>{req.status}</span>
                  {req.isUserCreated && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="underline">Your submission</span>
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Request Result or Unknown ID State */}
      {!searchedId.trim() || !matchedRequest ? (
        <section
          aria-live="polite"
          className="bg-[#FFFDF8] border border-[#18324A]/10 rounded-2xl p-6 sm:p-10 space-y-4"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-[#1647A5] shrink-0 mt-0.5" />
            <div className="space-y-2">
              <h2 className="font-display text-xl font-bold text-[#18324A]">
                {searchedId.trim()
                  ? `No sample request found for "${searchedId}"`
                  : 'Enter a sample request ID above'}
              </h2>
              <p className="text-sm text-[#687783] leading-relaxed">
                This demo only recognizes the fictional sample IDs listed above and any sample report you submit during
                your current browser session. Try selecting one of these sample IDs or submit a new issue report:
              </p>

              <div className="pt-2 flex flex-wrap gap-2.5">
                {requests.slice(0, 3).map((req) => (
                  <button
                    key={req.id}
                    type="button"
                    onClick={() => handleSelectSampleId(req.id)}
                    className="px-3.5 py-2 bg-[#F4EFE4] hover:bg-[#e5decb] text-[#1647A5] text-xs font-semibold rounded-xl transition-colors font-mono-tabular cursor-pointer"
                  >
                    Try {req.id} ({req.category})
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => onNavigate('report')}
                  className="px-3.5 py-2 bg-[#F6C744] hover:bg-[#eab82e] text-[#18324A] text-xs font-semibold rounded-xl transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Create a new sample report</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <article
          aria-live="polite"
          className="bg-[#FFFDF8] border border-[#18324A]/10 rounded-2xl p-6 sm:p-8 space-y-8"
        >
          {/* Top Summary Header + Voice Read-Aloud */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-[#18324A]/10">
            <div className="space-y-2">
              <div className="text-xs text-[#687783] flex flex-wrap items-center gap-2">
                <span className="font-mono-tabular font-bold text-[#1647A5] text-sm">
                  {matchedRequest.id}
                </span>
                <span aria-hidden="true">·</span>
                <span>{matchedRequest.department}</span>
                <span aria-hidden="true">·</span>
                <span>Submitted {matchedRequest.submittedDate}</span>
              </div>

              <h2 className="font-display text-2xl font-bold text-[#18324A]">
                {matchedRequest.title}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start">
              <button
                type="button"
                onClick={handleReadStatusAloud}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isSpeaking
                    ? 'bg-[#F6C744] text-[#18324A]'
                    : 'bg-[#F4EFE4] hover:bg-[#e5decb] text-[#1647A5]'
                }`}
              >
                {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span>
                  {isSpeaking
                    ? language === 'en'
                      ? 'Stop voice'
                      : 'ಧ್ವನಿ ನಿಲ್ಲಿಸಿ'
                    : language === 'en'
                    ? 'Listen to status (Voice)'
                    : 'ಧ್ವನಿ ಮೂಲಕ ಕೇಳಿ'}
                </span>
              </button>

              <div className="bg-[#F4EFE4] border border-[#18324A]/10 rounded-xl px-4 py-2 shrink-0">
                <span className="block text-[11px] text-[#687783] font-medium">
                  Current sample status
                </span>
                <div className="flex items-center gap-1.5 pt-0.5">
                  {matchedRequest.status === 'Resolved' ? (
                    <CheckCircle2 className="w-4 h-4 text-[#38785E]" />
                  ) : matchedRequest.status === 'Under review' ? (
                    <Clock className="w-4 h-4 text-[#1647A5]" />
                  ) : (
                    <FileText className="w-4 h-4 text-[#18324A]" />
                  )}
                  <span
                    className={`font-display text-sm font-bold ${
                      matchedRequest.status === 'Resolved'
                        ? 'text-[#38785E]'
                        : matchedRequest.status === 'Under review'
                        ? 'text-[#1647A5]'
                        : 'text-[#18324A]'
                    }`}
                  >
                    {matchedRequest.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Request Key Details Grid */}
          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#F4EFE4]/60 rounded-xl p-4 text-sm">
            <div>
              <dt className="text-xs text-[#687783] font-medium">Category &amp; Department</dt>
              <dd className="font-semibold text-[#18324A] mt-0.5">{matchedRequest.category}</dd>
              <dd className="text-xs text-[#687783] mt-0.5">{matchedRequest.department}</dd>
            </div>
            <div>
              <dt className="text-xs text-[#687783] font-medium">Area / Locality</dt>
              <dd className="font-semibold text-[#18324A] mt-0.5">{matchedRequest.area}</dd>
            </div>
            <div>
              <dt className="text-xs text-[#687783] font-medium">Date Submitted</dt>
              <dd className="font-mono-tabular font-semibold text-[#18324A] mt-0.5">
                {matchedRequest.submittedDate}
              </dd>
            </div>
          </dl>

          {/* Description & Next Step Note */}
          <div className="space-y-3 text-sm">
            <div>
              <h3 className="text-xs font-semibold text-[#687783] mb-1">Reported concern</h3>
              <p className="text-[#18324A] leading-relaxed">{matchedRequest.description}</p>
            </div>
            <div className="pt-2">
              <h3 className="text-xs font-semibold text-[#687783] mb-1">Latest sample update</h3>
              <p className="text-[#1647A5] font-medium leading-relaxed">{matchedRequest.nextStepNote}</p>
            </div>
          </div>

          {/* 3-Stage Status Timeline */}
          <div className="space-y-4 pt-2 border-t border-[#18324A]/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="font-display text-lg font-bold text-[#18324A]">
                {language === 'en'
                  ? 'Grievance progress timeline (Sample)'
                  : 'ದೂರು ಪ್ರಗತಿಯ ಹಂತಗಳು (ಮಾದರಿ)'}
              </h3>
              <span className="text-xs text-[#687783]">
                Stages: Received → Under review → Resolved
              </span>
            </div>

            <ol className="space-y-4">
              {matchedRequest.timeline.map((step, index) => {
                const isDone = step.completed;
                const isCurrent = step.current;

                return (
                  <li
                    key={step.stage}
                    className={`p-4 rounded-xl border transition-colors ${
                      isCurrent
                        ? 'bg-[#F4EFE4] border-[#1647A5]'
                        : isDone
                        ? 'bg-[#FFFDF8] border-[#38785E]/30'
                        : 'bg-[#FFFDF8] border-[#18324A]/10 opacity-75'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono-tabular text-xs font-bold text-[#1647A5]">
                          0{index + 1}.
                        </span>
                        <span className="font-display text-base font-bold text-[#18324A]">
                          {step.stage}
                        </span>
                        <span aria-hidden="true" className="text-[#687783]">·</span>
                        <span
                          className={`text-xs font-semibold ${
                            step.stage === 'Resolved' && (isDone || isCurrent)
                              ? 'text-[#38785E]'
                              : isCurrent
                              ? 'text-[#1647A5]'
                              : isDone
                              ? 'text-[#38785E]'
                              : 'text-[#687783]'
                          }`}
                        >
                          {isCurrent ? 'Current stage' : isDone ? 'Completed' : 'Pending stage'}
                        </span>
                      </div>

                      <span className="font-mono-tabular text-xs text-[#687783]">
                        {step.date}
                      </span>
                    </div>

                    <p className="text-sm text-[#18324A]/85 leading-relaxed pl-6">
                      {step.summary}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Interactive Demo Stage Simulator for Reviewers */}
          <div className="pt-4 border-t border-[#18324A]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#F4EFE4]/50 rounded-xl p-4">
            <div className="space-y-0.5">
              <div className="text-xs font-semibold text-[#18324A] flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#1647A5]" />
                <span>Interactive Demo Control: Preview status stages</span>
              </div>
              <p className="text-xs text-[#687783]">
                Switch the sample status of <strong>{matchedRequest.id}</strong> to see how the timeline updates at each stage.
              </p>
            </div>

            <div className="flex items-center gap-1.5 shrink-0" role="group" aria-label="Simulate request status">
              {(['Received', 'Under review', 'Resolved'] as RequestStatus[]).map((statusOption) => {
                const active = matchedRequest.status === statusOption;
                return (
                  <button
                    key={statusOption}
                    type="button"
                    onClick={() => onUpdateRequestStatus(matchedRequest.id, statusOption)}
                    aria-pressed={active}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-[#1647A5] text-[#FFFDF8]'
                        : 'bg-[#FFFDF8] text-[#18324A] border border-[#18324A]/15 hover:bg-[#e5decb]'
                    }`}
                  >
                    {statusOption}
                  </button>
                );
              })}
            </div>
          </div>
        </article>
      )}
    </div>
  );
};
