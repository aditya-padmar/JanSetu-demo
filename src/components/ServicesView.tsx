import React, { useState, useMemo } from 'react';
import {
  Search,
  ArrowRight,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  FileCheck,
  Sparkles,
  ExternalLink,
  Mic,
  Building2,
} from 'lucide-react';
import { ServiceItem, DepartmentFilter } from '../data/demoData';
import {
  GUIDED_GOVERNMENT_SERVICES,
  Language,
} from '../data/guidedServicesData';
import { ServiceGuidanceWizard } from './ServiceGuidanceWizard';
import { startVoiceDictation } from '../utils/voiceAssistant';

interface ServicesViewProps {
  services: ServiceItem[];
  language: Language;
  onLanguageChange: (lang: Language) => void;
  initialGuidedServiceId?: string;
  onStartReportWithCategory: (category: string) => void;
}

const CATEGORIES = [
  'All services',
  'Community & Certificates',
  'Roads & Lighting',
  'Waste & Sanitation',
  'Water & Drainage',
] as const;

const DEPARTMENTS: DepartmentFilter[] = [
  'All departments',
  'Senior Citizen & Social Welfare (Seva Sindhu)',
  'Revenue Department (Nadakacheri)',
  'Food & Civil Supplies (Ahara)',
  'Urban Local Body (BBMP / Municipal)',
  'Water & Electricity Utilities (BWSSB / BESCOM)',
];

export const ServicesView: React.FC<ServicesViewProps> = ({
  services,
  language,
  onLanguageChange,
  initialGuidedServiceId = 'gov-senior-citizen-card',
  onStartReportWithCategory,
}) => {
  const [selectedGuidedId, setSelectedGuidedId] = useState<string>(initialGuidedServiceId);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All services');
  const [selectedDepartment, setSelectedDepartment] = useState<DepartmentFilter>('All departments');
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>('svc-streetlight');
  const [isListeningSearch, setIsListeningSearch] = useState<boolean>(false);
  const [voiceNote, setVoiceNote] = useState<string>('');

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesCategory =
        selectedCategory === 'All services' || service.category === selectedCategory;

      const matchesDepartment =
        selectedDepartment === 'All departments' || service.department === selectedDepartment;

      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory && matchesDepartment;

      const matchesText =
        service.name.toLowerCase().includes(query) ||
        service.nameKn.toLowerCase().includes(query) ||
        service.shortDescription.toLowerCase().includes(query) ||
        service.shortDescriptionKn.toLowerCase().includes(query) ||
        service.department.toLowerCase().includes(query) ||
        service.category.toLowerCase().includes(query) ||
        service.whoItHelps.toLowerCase().includes(query);

      return matchesCategory && matchesDepartment && matchesText;
    });
  }, [services, searchQuery, selectedCategory, selectedDepartment]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All services');
    setSelectedDepartment('All departments');
    setVoiceNote('');
  };

  const handleVoiceSearch = () => {
    if (isListeningSearch) return;
    setVoiceNote('');
    startVoiceDictation({
      language,
      fallbackText: {
        en: 'Senior Citizen',
        kn: 'ಹಿರಿಯ ನಾಗರಿಕರ',
      },
      onStart: () => setIsListeningSearch(true),
      onResult: (transcript, isSimulated) => {
        setSearchQuery(transcript);
        setSelectedCategory('All services');
        setSelectedDepartment('All departments');
        setVoiceNote(
          isSimulated
            ? language === 'en'
              ? `Voice search sample applied: "${transcript}"`
              : `ಧ್ವನಿ ಹುಡುಕಾಟ ಮಾದರಿ ಅನ್ವಯಿಸಲಾಗಿದೆ: "${transcript}"`
            : language === 'en'
            ? `Voice search heard: "${transcript}"`
            : `ಧ್ವನಿ ಹುಡುಕಾಟ: "${transcript}"`
        );
      },
      onEnd: () => setIsListeningSearch(false),
    });
  };

  const handleOpenInWizard = (guidedId: string) => {
    setSelectedGuidedId(guidedId);
    const wizardEl = document.getElementById('guided-service-wizard');
    if (wizardEl) {
      wizardEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-12 pb-12 pt-8">
      {/* Page Header */}
      <div className="space-y-3">
        <div className="text-xs text-[#687783] flex flex-wrap items-center gap-2">
          <span>
            {language === 'en'
              ? 'Unified Multi-Department Service Access · Eligibility & Document Help'
              : 'ಏಕೀಕೃತ ವಿವಿಧ ಇಲಾಖೆಗಳ ಸೇವೆಗಳು · ಅರ್ಹತೆ ಮತ್ತು ದಾಖಲೆ ಮಾರ್ಗದರ್ಶನ'}
          </span>
          <span aria-hidden="true">·</span>
          <span>{language === 'en' ? 'English, ಕನ್ನಡ & Voice Access' : 'ಇಂಗ್ಲಿಷ್, ಕನ್ನಡ ಮತ್ತು ಧ್ವನಿ ಸೌಲಭ್ಯ'}</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#1647A5]">
          {language === 'en'
            ? 'Unified Government & Civic Services Gateway'
            : 'ಏಕೀಕೃತ ಸರ್ಕಾರಿ ಮತ್ತು ನಾಗರಿಕ ಸೇವೆಗಳ ವೇದಿಕೆ'}
        </h1>
        <p className="text-base text-[#18324A]/85 max-w-[72ch] leading-relaxed">
          {language === 'en'
            ? 'Access services across Revenue, Social Welfare, Food & Civil Supplies, Municipal Corporations, and Utilities in one place. Check likely eligibility, get a tailored document checklist, and listen to instructions in English or Kannada.'
            : 'ಕಂದಾಯ, ಸಮಾಜ ಕಲ್ಯಾಣ, ಆಹಾರ ಮತ್ತು ನಾಗರಿಕ ಸರಬರಾಜು, ನಗರಸಭೆ ಹಾಗೂ ಜಲಮಂಡಳಿ/ವಿದ್ಯುತ್ ಸೇವೆಗಳನ್ನು ಒಂದೇ ಸೂರಿನಡಿ ಪಡೆಯಿರಿ. ಅರ್ಹತೆ ಪರಿಶೀಲಿಸಿ, ಅಗತ್ಯ ದಾಖಲೆಗಳ ಪಟ್ಟಿ ಪಡೆಯಿರಿ ಮತ್ತು ಧ್ವನಿ ಮೂಲಕ ಮಾಹಿತಿ ಕೇಳಿ.'}
        </p>
      </div>

      {/* Interactive Government Service Guidance Wizard */}
      <div id="guided-service-wizard">
        <ServiceGuidanceWizard
          selectedServiceId={selectedGuidedId}
          onSelectServiceId={setSelectedGuidedId}
          language={language}
          onLanguageChange={onLanguageChange}
          onStartReportWithCategory={onStartReportWithCategory}
        />
      </div>

      {/* Unified Cross-Department Service Directory */}
      <section aria-labelledby="directory-heading" className="space-y-6 pt-4 border-t border-[#18324A]/10">
        <div className="space-y-2">
          <div className="text-xs text-[#687783] flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#1647A5]" />
            <span>
              {language === 'en'
                ? 'Unified Service Access: 5 Departments in One Directory'
                : 'ಏಕೀಕೃತ ಸೇವಾ ಪ್ರವೇಶ: ಒಂದೇ ಕಡೆ 5 ಇಲಾಖೆಗಳ ಸೇವೆಗಳು'}
            </span>
          </div>
          <h2 id="directory-heading" className="font-display text-2xl sm:text-3xl font-bold text-[#1647A5]">
            {language === 'en'
              ? 'Browse services by government department or keyword'
              : 'ಇಲಾಖೆ ಅಥವಾ ಪದಗಳ ಮೂಲಕ ಸೇವೆಗಳನ್ನು ಹುಡುಕಿ'}
          </h2>
        </div>

        {/* Search (with Voice Input), Department Filter & Category Controls */}
        <div className="bg-[#FFFDF8] border border-[#18324A]/10 rounded-2xl p-5 sm:p-6 space-y-5">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label htmlFor="service-search-input" className="block text-sm font-semibold text-[#18324A] mb-1.5">
                {language === 'en'
                  ? 'Search services by keyword or voice'
                  : 'ಪದಗಳ ಮೂಲಕ ಅಥವಾ ಧ್ವನಿ ಮೂಲಕ ಸೇವೆಗಳನ್ನು ಹುಡುಕಿ'}
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-[#687783] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="service-search-input"
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={
                      language === 'en'
                        ? "Search 'streetlight', 'ration', 'income', 'senior', 'water'..."
                        : "ಹುಡುಕಿ: 'ಹಿರಿಯ ನಾಗರಿಕರ', 'ಆದಾಯ', 'ಪಡಿತರ', 'ಬೀದಿ ದೀಪ'..."
                    }
                    className="w-full pl-10 pr-4 py-2.5 bg-[#F4EFE4]/60 border border-[#18324A]/20 rounded-xl text-sm text-[#18324A] placeholder:text-[#687783] focus:outline-none focus:border-[#1647A5] focus:ring-2 focus:ring-[#1647A5]/20"
                  />
                </div>

                {/* Voice Search Button */}
                <button
                  type="button"
                  onClick={handleVoiceSearch}
                  aria-label={language === 'en' ? 'Speak to search services' : 'ಧ್ವನಿ ಮೂಲಕ ಸೇವೆಗಳನ್ನು ಹುಡುಕಿ'}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isListeningSearch
                      ? 'bg-[#F6C744] text-[#18324A] border border-[#18324A]/30'
                      : 'bg-[#1647A5] hover:bg-[#123A88] text-[#FFFDF8]'
                  }`}
                >
                  <Mic className="w-4 h-4" />
                  <span>
                    {isListeningSearch
                      ? language === 'en'
                        ? 'Listening...'
                        : 'ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದೆ...'
                      : language === 'en'
                      ? 'Voice search'
                      : 'ಧ್ವನಿ ಹುಡುಕಾಟ'}
                  </span>
                </button>
              </div>
              {voiceNote && (
                <p className="text-xs text-[#38785E] font-medium mt-1.5" aria-live="polite">
                  {voiceNote}
                </p>
              )}
            </div>

            {(searchQuery.trim() !== '' ||
              selectedCategory !== 'All services' ||
              selectedDepartment !== 'All departments') && (
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-4 py-2.5 text-sm font-semibold text-[#1647A5] bg-[#F4EFE4] hover:bg-[#e6decb] rounded-xl transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{language === 'en' ? 'Clear filters' : 'ಫಿಲ್ಟರ್ ತೆರವುಗೊಳಿಸಿ'}</span>
                </button>
              </div>
            )}
          </div>

          {/* Filter by Government Department (Unified Service Access) */}
          <div className="space-y-2">
            <span className="block text-xs font-semibold text-[#18324A]">
              {language === 'en'
                ? 'Filter by Government Department (Unified Access):'
                : 'ಸರ್ಕಾರಿ ಇಲಾಖೆಯ ಮೂಲಕ ಫಿಲ್ಟರ್ ಮಾಡಿ (ಏಕೀಕೃತ ಸೇವೆ):'}
            </span>
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Government departments">
              {DEPARTMENTS.map((dept) => {
                const isSelected = selectedDepartment === dept;
                return (
                  <button
                    key={dept}
                    type="button"
                    onClick={() => setSelectedDepartment(dept)}
                    aria-pressed={isSelected}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-[#1647A5] text-[#FFFDF8] font-semibold'
                        : 'bg-[#F4EFE4] text-[#18324A] hover:bg-[#e6decb]'
                    }`}
                  >
                    {dept}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filter by Service Category */}
          <div className="space-y-2">
            <span className="block text-xs font-medium text-[#687783]">
              {language === 'en' ? 'Filter by topic:' : 'ವಿಷಯದ ಮೂಲಕ ಫಿಲ್ಟರ್ ಮಾಡಿ:'}
            </span>
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Service categories">
              {CATEGORIES.map((category) => {
                const isSelected = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    aria-pressed={isSelected}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-[#18324A] text-[#FFFDF8] font-semibold'
                        : 'bg-[#F4EFE4]/70 text-[#18324A] hover:bg-[#e6decb]'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="text-xs text-[#687783] pt-2 border-t border-[#18324A]/10 flex flex-wrap items-center justify-between gap-2">
            <span>
              Showing <strong className="font-mono-tabular text-[#18324A]">{filteredServices.length}</strong> of{' '}
              <strong className="font-mono-tabular text-[#18324A]">{services.length}</strong> unified department
              services
            </span>
            <span>All listings are fictional demo examples</span>
          </div>
        </div>

        {/* Service Results or Helpful Empty State */}
        {filteredServices.length === 0 ? (
          <div
            aria-live="polite"
            className="bg-[#FFFDF8] border border-[#18324A]/10 rounded-2xl p-8 sm:p-12 text-center max-w-xl mx-auto space-y-4"
          >
            <h3 className="font-display text-xl font-bold text-[#18324A]">
              {language === 'en' ? 'No matching sample services found' : 'ಯಾವುದೇ ಹೊಂದಾಣಿಕೆಯ ಸೇವೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ'}
            </h3>
            <p className="text-sm text-[#687783] leading-relaxed">
              We could not find a demo service matching{' '}
              {searchQuery ? <strong>"{searchQuery}"</strong> : 'that filter'}. Try searching for everyday terms like{' '}
              <em>streetlight</em>, <em>ration</em>, <em>income</em>, <em>road</em>, or <em>water</em>, or reset the
              filters to view all unified services.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-4 py-2.5 bg-[#F6C744] hover:bg-[#eab82e] text-[#18324A] text-sm font-semibold rounded-xl transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{language === 'en' ? 'Show all unified services' : 'ಎಲ್ಲಾ ಸೇವೆಗಳನ್ನು ತೋರಿಸಿ'}</span>
              </button>
              <button
                type="button"
                onClick={() => onStartReportWithCategory('Local service information request')}
                className="px-4 py-2.5 bg-[#F4EFE4] hover:bg-[#e6decb] text-[#1647A5] text-sm font-semibold rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {language === 'en' ? 'Submit a general service question' : 'ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಯನ್ನು ಸಲ್ಲಿಸಿ'}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredServices.map((service) => {
              const isExpanded = expandedServiceId === service.id;
              const linkedGuidedId =
                service.linkedGuidedServiceId || GUIDED_GOVERNMENT_SERVICES[0].id;

              return (
                <article
                  key={service.id}
                  className="bg-[#FFFDF8] border border-[#18324A]/10 rounded-2xl p-6 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    <div className="space-y-2.5 max-w-[70ch]">
                      <div className="text-xs text-[#687783] flex flex-wrap items-center gap-2">
                        <span className="font-mono-tabular font-semibold text-[#1647A5]">{service.indexNumber}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-semibold text-[#18324A]">
                          {language === 'en' ? service.department : service.departmentKn}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{service.category}</span>
                      </div>

                      <h3 className="font-display text-xl font-bold text-[#18324A]">
                        {language === 'en' ? service.name : service.nameKn}
                      </h3>

                      <p className="text-sm sm:text-base text-[#18324A]/85 leading-relaxed">
                        {language === 'en' ? service.shortDescription : service.shortDescriptionKn}
                      </p>
                    </div>

                    <div className="flex flex-wrap lg:flex-col items-stretch sm:items-center lg:items-end justify-start gap-2.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          if (service.actionType === 'guide') {
                            handleOpenInWizard(linkedGuidedId);
                          } else {
                            onStartReportWithCategory(
                              service.linkedIssueCategory || 'Local service information request'
                            );
                          }
                        }}
                        className="px-4 py-2.5 bg-[#F6C744] hover:bg-[#eab82e] text-[#18324A] text-sm font-semibold rounded-xl transition-colors inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1647A5]"
                      >
                        <span>{language === 'en' ? service.actionLabel : service.actionLabelKn}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenInWizard(linkedGuidedId)}
                          className="px-3 py-1.5 text-xs font-semibold text-[#1647A5] bg-[#F4EFE4] hover:bg-[#e5decb] rounded-lg transition-colors inline-flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>
                            {language === 'en' ? 'Eligibility & checklist' : 'ಅರ್ಹತೆ ಮತ್ತು ದಾಖಲೆ'}
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setExpandedServiceId(isExpanded ? null : service.id)}
                          aria-expanded={isExpanded}
                          className="px-3 py-1.5 text-xs font-semibold text-[#1647A5] hover:bg-[#F4EFE4] rounded-lg transition-colors inline-flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <span>{isExpanded ? 'Hide notes' : 'Quick notes'}</span>
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="mt-6 pt-5 border-t border-[#18324A]/10 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                      <div className="space-y-2">
                        <h4 className="font-display text-sm font-bold text-[#1647A5] flex items-center gap-1.5">
                          <FileCheck className="w-4 h-4" />
                          <span>Helpful information to keep ready</span>
                        </h4>
                        <ul className="list-disc list-inside space-y-1.5 text-[#18324A]/85">
                          {service.whatToPrepare.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-display text-sm font-bold text-[#1647A5]">
                          What happens when you use this demo service
                        </h4>
                        <p className="text-[#18324A]/85 leading-relaxed">
                          {service.typicalProcess}
                        </p>
                        <div className="pt-1 flex flex-wrap items-center gap-3 text-xs text-[#687783]">
                          <span>Office: {service.sampleOffice}</span>
                          <span aria-hidden="true">·</span>
                          <a
                            href="https://sevasindhu.karnataka.gov.in/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#1647A5] font-semibold hover:underline inline-flex items-center gap-1 whitespace-nowrap shrink-0"
                          >
                            <span>Seva Sindhu Portal</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
