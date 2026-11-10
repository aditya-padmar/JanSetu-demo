import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  FileText,
  Search,
  CheckCircle2,
  Compass,
  ExternalLink,
  Languages,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { PageId, ServiceItem, SampleRequestRecord } from '../data/demoData';
import { GUIDED_GOVERNMENT_SERVICES, Language } from '../data/guidedServicesData';
import { speakText, stopSpeaking } from '../utils/voiceAssistant';

interface HomeViewProps {
  services: ServiceItem[];
  recentRequests: SampleRequestRecord[];
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onNavigate: (page: PageId) => void;
  onOpenGuidedService: (guidedServiceId: string) => void;
  onStartReportWithCategory: (category: string) => void;
  onTrackSpecificId: (requestId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  services,
  recentRequests,
  language,
  onLanguageChange,
  onNavigate,
  onOpenGuidedService,
  onStartReportWithCategory,
  onTrackSpecificId,
}) => {
  const [imageError, setImageError] = useState(false);
  const [isSpeakingHero, setIsSpeakingHero] = useState(false);

  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  const handleReadHeroAloud = () => {
    if (isSpeakingHero) {
      stopSpeaking();
      setIsSpeakingHero(false);
      return;
    }

    const introText =
      language === 'en'
        ? 'Welcome to Jan Setu. One digital gateway for unified government service access across departments, eligibility and tailored document checklists, multilingual English and Kannada voice access, and community grievance tracking.'
        : 'ಜನ ಸೇತು ಜಾಲತಾಣಕ್ಕೆ ಸ್ವಾಗತ. ವಿವಿಧ ಸರ್ಕಾರಿ ಇಲಾಖೆಗಳ ಸೇವೆಗಳು, ಅರ್ಹತೆ ಮತ್ತು ದಾಖಲೆಗಳ ಪಟ್ಟಿ, ಕನ್ನಡ ಮತ್ತು ಇಂಗ್ಲಿಷ್ ಧ್ವನಿ ಸೌಲಭ್ಯ ಹಾಗೂ ಸ್ಥಳೀಯ ದೂರುಗಳ ಸ್ಥಿತಿ ಪರಿಶೀಲನೆಗೆ ಒಂದೇ ವೇದಿಕೆ.';

    speakText(
      introText,
      language,
      () => setIsSpeakingHero(true),
      () => setIsSpeakingHero(false)
    );
  };

  return (
    <div className="space-y-14 pb-12">
      {/* Hero Section */}
      <section className="pt-8 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Plain-language purpose + primary actions */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-[#FFFDF8] border border-[#18324A]/10 rounded-2xl p-6 sm:p-10">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-xs font-medium text-[#687783] flex flex-wrap items-center gap-2">
                  <span>Interactive Product Demo</span>
                  <span aria-hidden="true">·</span>
                  <span>English, ಕನ್ನಡ &amp; Voice Access</span>
                </div>

                {/* Quick Bilingual & Voice Toggle */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleReadHeroAloud}
                    aria-pressed={isSpeakingHero}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                      isSpeakingHero
                        ? 'bg-[#F6C744] text-[#18324A]'
                        : 'bg-[#F4EFE4] hover:bg-[#e5decb] text-[#1647A5]'
                    }`}
                  >
                    {isSpeakingHero ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    <span>
                      {isSpeakingHero
                        ? language === 'en'
                          ? 'Stop voice'
                          : 'ನಿಲ್ಲಿಸಿ'
                        : language === 'en'
                        ? 'Listen (Voice)'
                        : 'ಧ್ವನಿ ಕೇಳಿ'}
                    </span>
                  </button>

                  <div className="inline-flex items-center gap-1 bg-[#F4EFE4] p-1 rounded-lg border border-[#18324A]/10">
                    <Languages className="w-3.5 h-3.5 text-[#1647A5] ml-1" />
                    <button
                      type="button"
                      onClick={() => {
                        stopSpeaking();
                        setIsSpeakingHero(false);
                        onLanguageChange('en');
                      }}
                      aria-pressed={language === 'en'}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                        language === 'en' ? 'bg-[#1647A5] text-[#FFFDF8]' : 'text-[#18324A]'
                      }`}
                    >
                      English
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        stopSpeaking();
                        setIsSpeakingHero(false);
                        onLanguageChange('kn');
                      }}
                      aria-pressed={language === 'kn'}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                        language === 'kn' ? 'bg-[#1647A5] text-[#FFFDF8]' : 'text-[#18324A]'
                      }`}
                    >
                      ಕನ್ನಡ
                    </button>
                  </div>
                </div>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-[#18324A] leading-[1.15] tracking-tight">
                {language === 'en'
                  ? 'One clear place to find government services, report a local issue, and follow its progress.'
                  : 'ಸರ್ಕಾರಿ ಸೇವೆಗಳನ್ನು ಹುಡುಕಲು, ಸ್ಥಳೀಯ ಸಮಸ್ಯೆ ವರದಿ ಮಾಡಲು ಮತ್ತು ಅರ್ಜಿ ಸ್ಥಿತಿ ತಿಳಿಯಲು ಸರಳ ವೇದಿಕೆ.'}
              </h1>

              <p className="text-base sm:text-lg text-[#18324A]/85 leading-relaxed max-w-[65ch]">
                {language === 'en' ? (
                  <>
                    <strong>Jan Setu</strong> brings services from multiple departments into one place, explains likely
                    eligibility and required documents, supports English and Kannada with voice read-aloud and voice
                    input, and lets residents file and track grievances.
                  </>
                ) : (
                  <>
                    <strong>ಜನ ಸೇತು (Jan Setu)</strong> ವಿವಿಧ ಇಲಾಖೆಗಳ ಸೇವೆಗಳನ್ನು ಒಂದೇ ಕಡೆ ತರುತ್ತದೆ, ಅರ್ಹತೆ ಮತ್ತು ಅಗತ್ಯ
                    ದಾಖಲೆಗಳ ಪಟ್ಟಿ ನೀಡುತ್ತದೆ, ಕನ್ನಡ ಮತ್ತು ಇಂಗ್ಲಿಷ್ ಧ್ವನಿ ಸೌಲಭ್ಯ ಹೊಂದಿದೆ ಹಾಗೂ ದೂರುಗಳ ಸ್ಥಿತಿಯನ್ನು ಟ್ರ್ಯಾಕ್
                    ಮಾಡಲು ನೆರವಾಗುತ್ತದೆ.
                  </>
                )}
              </p>
            </div>

            <div className="pt-8 space-y-5">
              {/* Primary CTA + Secondary main actions */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate('services')}
                  className="px-5 py-3 bg-[#F6C744] hover:bg-[#eab82e] text-[#18324A] font-semibold text-sm sm:text-base rounded-xl transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1647A5]"
                >
                  <Compass className="w-4 h-4" />
                  <span>{language === 'en' ? 'Find services & check eligibility' : 'ಸೇವೆಗಳು ಮತ್ತು ಅರ್ಹತೆ ಪರಿಶೀಲಿಸಿ'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('report')}
                  className="px-5 py-3 bg-[#1647A5] hover:bg-[#123A88] text-[#FFFDF8] font-semibold text-sm sm:text-base rounded-xl transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1647A5]"
                >
                  <span>{language === 'en' ? 'Report an issue' : 'ದೂರು ಸಲ್ಲಿಸಿ'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('track')}
                  className="px-5 py-3 bg-[#F4EFE4] hover:bg-[#e8e0cf] text-[#1647A5] font-semibold text-sm sm:text-base rounded-xl border border-[#1647A5]/20 transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1647A5]"
                >
                  <Search className="w-4 h-4" />
                  <span>{language === 'en' ? 'Track a request' : 'ಅರ್ಜಿ ಸ್ಥಿತಿ ನೋಡಿ'}</span>
                </button>
              </div>

              <p className="text-xs text-[#687783] leading-relaxed">
                {language === 'en'
                  ? 'Demo note: This site uses realistic fictional data to demonstrate the resident journey, alongside verified links to official Karnataka portals (Seva Sindhu, Nadakacheri, Ahara).'
                  : 'ಸೂಚನೆ: ಇದು ನಾಗರಿಕ ಸೇವೆಗಳ ಪರಿಕಲ್ಪನೆಯನ್ನು ತೋರಿಸುವ ಮಾದರಿ (ಡೆಮೊ) ಜಾಲತಾಣವಾಗಿದೆ.'}
              </p>
            </div>
          </div>

          {/* Right Column: Warm civic image with resilient fallback */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative flex-1 min-h-[280px] sm:min-h-[340px] lg:h-full rounded-2xl overflow-hidden border border-[#18324A]/10 bg-[#FFFDF8] flex flex-col justify-between">
              {!imageError ? (
                <img
                  src="/src/assets/images/hero_civic_neighborhood_1794316636373.jpg"
                  alt="Warm sunlit neighborhood civic service center courtyard with trees and residents walking"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover min-h-[260px] flex-1"
                />
              ) : (
                <div className="flex-1 p-8 bg-gradient-to-br from-[#FFFDF8] to-[#F4EFE4] flex flex-col justify-center items-start space-y-3">
                  <Compass className="w-10 h-10 text-[#1647A5]" />
                  <p className="font-display text-lg font-semibold text-[#18324A]">
                    Neighborhood Civic Service Courtyard
                  </p>
                  <p className="text-sm text-[#687783]">
                    Connecting residents with government certificates, welfare schemes, and neighborhood maintenance.
                  </p>
                </div>
              )}

              <div className="p-4 sm:p-5 bg-[#FFFDF8] border-t border-[#18324A]/10">
                <div className="text-xs text-[#687783] flex items-center gap-2 mb-1">
                  <span>Try a sample tracking ID right away</span>
                  <span aria-hidden="true">·</span>
                  <span>Fictional demo record</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-medium text-[#18324A]">
                    <span className="font-mono-tabular font-semibold text-[#1647A5]">JS-2026-4082</span>
                    <span className="mx-2 text-[#687783]" aria-hidden="true">—</span>
                    <span>Streetlight outage on MG Road Cross 4</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onTrackSpecificId('JS-2026-4082')}
                    className="text-xs font-semibold text-[#1647A5] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    View timeline →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Four Core Pillars of Jan Setu */}
      <section aria-labelledby="how-it-works-heading" className="bg-[#FFFDF8] border border-[#18324A]/10 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#18324A]/10">
          <div>
            <p className="text-xs font-medium text-[#687783] mb-1">
              {language === 'en' ? 'Core platform capabilities' : 'ಜನ ಸೇತು ಪ್ರಮುಖ ಸೌಲಭ್ಯಗಳು'}
            </p>
            <h2 id="how-it-works-heading" className="font-display text-xl sm:text-2xl font-bold text-[#1647A5]">
              {language === 'en'
                ? 'Four pillars of accessible citizen service delivery'
                : 'ನಾಗರಿಕ ಸೇವಾ ವೇದಿಕೆಯ ನಾಲ್ಕು ಪ್ರಮುಖ ಆಧಾರಸ್ತಂಭಗಳು'}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('help')}
            className="text-sm font-semibold text-[#1647A5] hover:underline whitespace-nowrap shrink-0 self-start sm:self-auto cursor-pointer"
          >
            {language === 'en' ? 'Read evaluator guide →' : 'ಡೆಮೊ ಮಾರ್ಗದರ್ಶಿ ಓದಿ →'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
          <div className="space-y-2">
            <div className="text-xs font-mono-tabular font-semibold text-[#1647A5]">
              01. {language === 'en' ? 'Unified service access' : 'ಏಕೀಕೃತ ಸೇವಾ ಪ್ರವೇಶ'}
            </div>
            <h3 className="font-display text-base font-bold text-[#18324A]">
              {language === 'en'
                ? 'All departments in one place'
                : 'ವಿವಿಧ ಇಲಾಖೆಗಳ ಸೇವೆಗಳು ಒಂದೇ ಕಡೆ'}
            </h3>
            <p className="text-sm text-[#687783] leading-relaxed">
              {language === 'en'
                ? 'Brings Revenue (Nadakacheri), Food & Civil Supplies (Ahara), Social Welfare (Seva Sindhu), Municipal (BBMP), and Utilities into one directory.'
                : 'ಕಂದಾಯ, ಆಹಾರ, ಸಮಾಜ ಕಲ್ಯಾಣ, ನಗರಸಭೆ ಮತ್ತು ವಿದ್ಯುತ್/ಜಲಮಂಡಳಿ ಸೇವೆಗಳನ್ನು ಒಂದೇ ಸೂರಿನಡಿ ತರುತ್ತದೆ.'}
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-mono-tabular font-semibold text-[#1647A5]">
              02. {language === 'en' ? 'Document & eligibility help' : 'ಅರ್ಹತೆ ಮತ್ತು ದಾಖಲೆ ಸಹಾಯ'}
            </div>
            <h3 className="font-display text-base font-bold text-[#18324A]">
              {language === 'en'
                ? 'Likely eligibility & tailored checklist'
                : 'ಅರ್ಹತೆ ಮತ್ತು ಅಗತ್ಯ ದಾಖಲೆಗಳ ಪಟ್ಟಿ'}
            </h3>
            <p className="text-sm text-[#687783] leading-relaxed">
              {language === 'en'
                ? 'Answer 2–3 quick questions to check likely eligibility and generate a customized checklist of required documents.'
                : '2–3 ಸರಳ ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಿಸಿ ಅರ್ಹತೆ ಪರಿಶೀಲಿಸಿ ಮತ್ತು ನಿಮಗೆ ಬೇಕಾದ ದಾಖಲೆಗಳ ಪಟ್ಟಿ ಪಡೆಯಿರಿ.'}
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-mono-tabular font-semibold text-[#1647A5]">
              03. {language === 'en' ? 'Multilingual & voice access' : 'ಬಹುಭಾಷಾ ಮತ್ತು ಧ್ವನಿ ಸೌಲಭ್ಯ'}
            </div>
            <h3 className="font-display text-base font-bold text-[#18324A]">
              {language === 'en'
                ? 'English, ಕನ್ನಡ & Voice assistant'
                : 'ಇಂಗ್ಲಿಷ್, ಕನ್ನಡ ಮತ್ತು ಧ್ವನಿ ಸಹಾಯಕ'}
            </h3>
            <p className="text-sm text-[#687783] leading-relaxed">
              {language === 'en'
                ? 'Switch seamlessly between English and Kannada, listen to guidance read aloud, or use voice input to search and file complaints.'
                : 'ಕನ್ನಡ ಅಥವಾ ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಓದಿ, ಧ್ವನಿ ಮೂಲಕ ಮಾಹಿತಿ ಆಲಿಸಿ ಅಥವಾ ಮಾತನಾಡುವ ಮೂಲಕ ದೂರು ದಾಖಲಿಸಿ.'}
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-mono-tabular font-semibold text-[#1647A5]">
              04. {language === 'en' ? 'Grievance tracking' : 'ದೂರು ಮತ್ತು ಅರ್ಜಿ ಟ್ರ್ಯಾಕಿಂಗ್'}
            </div>
            <h3 className="font-display text-base font-bold text-[#18324A]">
              {language === 'en' ? 'File complaints & follow status' : 'ದೂರು ಸಲ್ಲಿಸಿ ಮತ್ತು ಸ್ಥಿತಿ ಗಮನಿಸಿ'}
            </h3>
            <p className="text-sm text-[#687783] leading-relaxed">
              {language === 'en'
                ? 'Submit neighborhood complaints to receive a tracking ID and follow stage-by-stage progress from Received to Resolved.'
                : 'ಸ್ಥಳೀಯ ಸಮಸ್ಯೆಗಳನ್ನು ವರದಿ ಮಾಡಿ ಟ್ರ್ಯಾಕಿಂಗ್ ಐಡಿ ಪಡೆಯಿರಿ ಮತ್ತು ಪರಿಹಾರದವರೆಗೆ ಪ್ರಗತಿಯನ್ನು ಗಮನಿಸಿ.'}
            </p>
          </div>
        </div>
      </section>

      {/* Guided Government Services */}
      <section aria-labelledby="guided-services-heading" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs text-[#687783] flex flex-wrap items-center gap-2">
              <span>Unified Multi-Department Services</span>
              <span aria-hidden="true">·</span>
              <span>Available in English, ಕನ್ನಡ &amp; Voice</span>
            </div>
            <h2 id="guided-services-heading" className="font-display text-2xl sm:text-3xl font-bold text-[#1647A5]">
              {language === 'en'
                ? 'Choose a government service for tailored guidance'
                : 'ವೈಯಕ್ತಿಕ ಮಾರ್ಗದರ್ಶನಕ್ಕಾಗಿ ಸರ್ಕಾರಿ ಸೇವೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ'}
            </h2>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('services')}
            className="text-sm font-semibold text-[#1647A5] hover:underline inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>
              {language === 'en'
                ? `Explore all ${services.length} unified department services`
                : 'ಎಲ್ಲಾ ಇಲಾಖೆಗಳ ಸೇವೆಗಳು ಮತ್ತು ಅರ್ಹತಾ ಮಾರ್ಗದರ್ಶನ ನೋಡಿ'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {GUIDED_GOVERNMENT_SERVICES.map((govService) => (
            <article
              key={govService.id}
              className="bg-[#FFFDF8] border border-[#18324A]/10 rounded-2xl p-6 flex flex-col justify-between gap-5"
            >
              <div className="space-y-2.5">
                <div className="text-xs text-[#687783] flex flex-wrap items-center gap-2">
                  <span className="font-mono-tabular font-semibold text-[#1647A5]">{govService.indexNumber}</span>
                  <span aria-hidden="true">·</span>
                  <span>{govService.categoryLabel[language]}</span>
                  <span aria-hidden="true">·</span>
                  <span>{govService.fee[language]}</span>
                </div>

                <h3 className="font-display text-lg font-bold text-[#18324A]">
                  {govService.name[language]}
                </h3>

                <p className="text-sm text-[#18324A]/80 leading-relaxed">
                  {govService.shortDescription[language]}
                </p>
              </div>

              <div className="pt-4 border-t border-[#18324A]/10 flex flex-wrap items-center justify-between gap-3">
                <a
                  href={govService.officialLinks[0]?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-[#687783] hover:text-[#1647A5] inline-flex items-center gap-1 truncate"
                >
                  <span>{govService.officialLinks[0]?.portalName[language]}</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>

                <button
                  type="button"
                  onClick={() => onOpenGuidedService(govService.id)}
                  className="px-3.5 py-2 bg-[#F4EFE4] hover:bg-[#e5decb] text-[#1647A5] text-xs sm:text-sm font-semibold rounded-xl inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>
                    {language === 'en'
                      ? 'Check eligibility & checklist'
                      : 'ಅರ್ಹತೆ ಮತ್ತು ದಾಖಲೆ ಪರಿಶೀಲಿಸಿ'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Sample Requests Preview Section */}
      <section aria-labelledby="sample-requests-heading" className="bg-[#FFFDF8] border border-[#18324A]/10 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs text-[#687783] flex items-center gap-2">
              <span>Grievance Tracking · Live session &amp; pre-loaded sample records</span>
              <span aria-hidden="true">·</span>
              <span>Not live government data</span>
            </div>
            <h2 id="sample-requests-heading" className="font-display text-xl sm:text-2xl font-bold text-[#1647A5]">
              {language === 'en'
                ? 'Sample community grievances you can track'
                : 'ನೀವು ಪರಿಶೀಲಿಸಬಹುದಾದ ಮಾದರಿ ದೂರುಗಳು'}
            </h2>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('track')}
            className="text-sm font-semibold text-[#1647A5] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
          >
            {language === 'en' ? 'Open grievance tracker →' : 'ಟ್ರ್ಯಾಕಿಂಗ್ ಪುಟ ತೆರೆಯಿರಿ →'}
          </button>
        </div>

        <div className="divide-y divide-[#18324A]/10">
          {recentRequests.slice(0, 3).map((req) => (
            <div
              key={req.id}
              className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="text-xs text-[#687783] flex flex-wrap items-center gap-2">
                  <span className="font-mono-tabular font-semibold text-[#1647A5]">{req.id}</span>
                  <span aria-hidden="true">·</span>
                  <span>{req.department}</span>
                  <span aria-hidden="true">·</span>
                  <span>{req.area}</span>
                  <span aria-hidden="true">·</span>
                  <span>Submitted {req.submittedDate}</span>
                </div>
                <p className="text-sm font-semibold text-[#18324A]">
                  {req.title}
                </p>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="text-xs font-medium text-[#18324A] flex items-center gap-1.5">
                  {req.status === 'Resolved' ? (
                    <CheckCircle2 className="w-4 h-4 text-[#38785E]" />
                  ) : (
                    <FileText className="w-4 h-4 text-[#1647A5]" />
                  )}
                  <span className={req.status === 'Resolved' ? 'text-[#38785E] font-semibold' : 'text-[#18324A]'}>
                    Status: {req.status}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onTrackSpecificId(req.id)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-[#1647A5] bg-[#F4EFE4] hover:bg-[#e7decb] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Track status
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
