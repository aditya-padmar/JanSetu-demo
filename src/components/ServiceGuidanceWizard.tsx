import React, { useState, useEffect, useMemo } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  FileCheck2,
  ExternalLink,
  ArrowRight,
  RotateCcw,
  Languages,
  CheckSquare,
  Square,
  Compass,
  Info,
  Volume2,
  VolumeX,
} from 'lucide-react';
import {
  GUIDED_GOVERNMENT_SERVICES,
  GuidedGovernmentService,
  Language,
  UI_TRANSLATIONS,
  OfficialSourceLink,
} from '../data/guidedServicesData';
import { speakText, stopSpeaking } from '../utils/voiceAssistant';

interface ServiceGuidanceWizardProps {
  selectedServiceId: string;
  onSelectServiceId: (id: string) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onStartReportWithCategory: (category: string) => void;
}

export const ServiceGuidanceWizard: React.FC<ServiceGuidanceWizardProps> = ({
  selectedServiceId,
  onSelectServiceId,
  language,
  onLanguageChange,
  onStartReportWithCategory,
}) => {
  const activeService: GuidedGovernmentService = useMemo(() => {
    return (
      GUIDED_GOVERNMENT_SERVICES.find((s) => s.id === selectedServiceId) ||
      GUIDED_GOVERNMENT_SERVICES[0]
    );
  }, [selectedServiceId]);

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});
  const [previewPortal, setPreviewPortal] = useState<OfficialSourceLink | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  useEffect(() => {
    const initialAnswers: Record<string, string> = {};
    activeService.questions.forEach((q) => {
      if (q.options.length > 0) {
        initialAnswers[q.id] = q.options[0].value;
      }
    });
    setAnswers(initialAnswers);
    setCheckedDocs({});
    setPreviewPortal(null);
    stopSpeaking();
    setIsSpeaking(false);
  }, [activeService]);

  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  const handleAnswerChange = (questionId: string, optionValue: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionValue,
    }));
  };

  const eligibilityResult = useMemo(() => {
    return activeService.evaluateEligibility(answers);
  }, [activeService, answers]);

  const tailoredDocuments = useMemo(() => {
    return activeService.baseDocuments.filter((doc) => {
      if (!doc.conditionQuestionId || !doc.conditionValues) {
        return true;
      }
      const userAnswer = answers[doc.conditionQuestionId];
      return doc.conditionValues.includes(userAnswer);
    });
  }, [activeService, answers]);

  const toggleDocChecked = (docId: string) => {
    setCheckedDocs((prev) => ({
      ...prev,
      [docId]: !prev[docId],
    }));
  };

  const handleReadAloudGuidance = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      return;
    }

    const docsSpeech = tailoredDocuments.map((d, i) => `${i + 1}. ${d.name[language]}`).join('. ');
    const stepsSpeech = activeService.steps
      .map((s) => `${language === 'en' ? 'Step' : 'ಹಂತ'} ${s.stepNumber}: ${s.title[language]}`)
      .join('. ');

    const fullSpeech = `${activeService.name[language]}. ${eligibilityResult.headline[language]}. ${eligibilityResult.explanation[language]}. ${
      language === 'en' ? 'Required documents:' : 'ಅಗತ್ಯವಿರುವ ದಾಖಲೆಗಳು:'
    } ${docsSpeech}. ${language === 'en' ? 'Application steps:' : 'ಅರ್ಜಿ ಸಲ್ಲಿಸುವ ಹಂತಗಳು:'} ${stepsSpeech}.`;

    speakText(
      fullSpeech,
      language,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  };

  const readyDocsCount = tailoredDocuments.filter((d) => checkedDocs[d.id]).length;

  return (
    <div className="space-y-8">
      {/* Top Bilingual, Voice Read-Aloud & Service Picker Bar */}
      <section
        aria-label="Choose a government service, language, and voice access"
        className="bg-[#FFFDF8] border border-[#18324A]/10 rounded-2xl p-6 sm:p-8 space-y-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-[#18324A]/10">
          <div className="space-y-1">
            <div className="text-xs text-[#687783] flex flex-wrap items-center gap-2">
              <span>{UI_TRANSLATIONS.demoBannerTitle[language]}</span>
              <span aria-hidden="true">·</span>
              <span>
                {language === 'en'
                  ? 'Unified Cross-Department Guidance + Voice Access'
                  : 'ಏಕೀಕೃತ ಇಲಾಖಾ ಸೇವೆಗಳು ಮತ್ತು ಧ್ವನಿ ಸೌಲಭ್ಯ'}
              </span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#1647A5]">
              {UI_TRANSLATIONS.chooseServiceHeading[language]}
            </h2>
          </div>

          {/* English / Kannada Language Switcher + Voice Read-Aloud Button */}
          <div className="flex flex-wrap items-center gap-3 self-start lg:self-auto shrink-0">
            <button
              type="button"
              onClick={handleReadAloudGuidance}
              aria-pressed={isSpeaking}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                isSpeaking
                  ? 'bg-[#F6C744] text-[#18324A] border border-[#18324A]/20'
                  : 'bg-[#F4EFE4] hover:bg-[#e5decb] text-[#1647A5] border border-[#1647A5]/20'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>
                {isSpeaking
                  ? language === 'en'
                    ? 'Stop voice playback'
                    : 'ಧ್ವನಿ ನಿಲ್ಲಿಸಿ'
                  : language === 'en'
                  ? 'Listen to guidance (Voice)'
                  : 'ಧ್ವನಿ ಮೂಲಕ ಮಾರ್ಗದರ್ಶನ ಕೇಳಿ'}
              </span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#687783] inline-flex items-center gap-1">
                <Languages className="w-4 h-4 text-[#1647A5]" />
                <span className="sr-only sm:not-sr-only">{UI_TRANSLATIONS.languageToggleLabel[language]}</span>
              </span>
              <div
                role="group"
                aria-label="Select guidance language"
                className="inline-flex items-center p-1 bg-[#F4EFE4] rounded-xl border border-[#18324A]/10"
              >
                <button
                  type="button"
                  onClick={() => {
                    stopSpeaking();
                    setIsSpeaking(false);
                    onLanguageChange('en');
                  }}
                  aria-pressed={language === 'en'}
                  className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    language === 'en'
                      ? 'bg-[#1647A5] text-[#FFFDF8]'
                      : 'text-[#18324A] hover:bg-[#e5decb]'
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => {
                    stopSpeaking();
                    setIsSpeaking(false);
                    onLanguageChange('kn');
                  }}
                  aria-pressed={language === 'kn'}
                  className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    language === 'kn'
                      ? 'bg-[#1647A5] text-[#FFFDF8]'
                      : 'text-[#18324A] hover:bg-[#e5decb]'
                  }`}
                >
                  ಕನ್ನಡ (Kannada)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Step 1: Choose a Government Service (Unified across departments) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5" role="radiogroup" aria-label="Government services">
          {GUIDED_GOVERNMENT_SERVICES.map((service) => {
            const isSelected = service.id === activeService.id;
            return (
              <button
                key={service.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => onSelectServiceId(service.id)}
                className={`text-left p-4 rounded-xl border transition-colors flex flex-col justify-between gap-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1647A5] ${
                  isSelected
                    ? 'bg-[#F4EFE4] border-[#1647A5] ring-1 ring-[#1647A5]'
                    : 'bg-[#FFFDF8] border-[#18324A]/15 hover:bg-[#F4EFE4]/50'
                }`}
              >
                <div className="space-y-1">
                  <div className="text-xs text-[#687783] flex items-center justify-between gap-2">
                    <span>
                      <strong className="font-mono-tabular text-[#1647A5]">{service.indexNumber}</strong>
                      <span className="mx-1.5" aria-hidden="true">·</span>
                      <span>{service.categoryLabel[language]}</span>
                    </span>
                    {isSelected && (
                      <span className="text-[#1647A5] font-semibold">
                        {language === 'en' ? 'Selected' : 'ಆಯ್ಕೆಮಾಡಲಾಗಿದೆ'}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-base font-bold text-[#18324A]">
                    {service.name[language]}
                  </h3>
                </div>
                <p className="text-xs text-[#687783] line-clamp-2">
                  {service.shortDescription[language]}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Service Department & Timeline Summary */}
        <div className="pt-2 border-t border-[#18324A]/10 flex flex-wrap items-center justify-between gap-3 text-xs text-[#687783]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-[#18324A]">{activeService.department[language]}</span>
            <span aria-hidden="true">·</span>
            <span>
              {language === 'en' ? 'Timeline:' : 'ಕಾಲಮಿತಿ:'} {activeService.processingTime[language]}
            </span>
            <span aria-hidden="true">·</span>
            <span>
              {language === 'en' ? 'Fee:' : 'ಶುಲ್ಕ:'} {activeService.fee[language]}
            </span>
          </div>
          <span>
            {language === 'en'
              ? 'Unified multi-department service guidance (Demo)'
              : 'ಏಕೀಕೃತ ವಿವಿಧ ಇಲಾಖೆಗಳ ಸೇವಾ ಮಾರ್ಗದರ್ಶನ (ಡೆಮೊ)'}
          </span>
        </div>
      </section>

      {/* Step 2: Answer a few questions for relevant guidance */}
      <section
        aria-labelledby="questions-heading"
        className="bg-[#FFFDF8] border border-[#18324A]/10 rounded-2xl p-6 sm:p-8 space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-[#18324A]/10">
          <div className="space-y-1">
            <p className="text-xs font-medium text-[#687783]">
              {language === 'en'
                ? 'Your answers tailor the eligibility check and document list below'
                : 'ನಿಮ್ಮ ಉತ್ತರಗಳು ಕೆಳಗಿನ ಅರ್ಹತೆ ಮತ್ತು ದಾಖಲೆಗಳ ಪಟ್ಟಿಯನ್ನು ನಿರ್ಧರಿಸುತ್ತವೆ'}
            </p>
            <h2 id="questions-heading" className="font-display text-xl sm:text-2xl font-bold text-[#1647A5]">
              {UI_TRANSLATIONS.answerQuestionsHeading[language]}
            </h2>
          </div>

          <button
            type="button"
            onClick={() => {
              const resetAnswers: Record<string, string> = {};
              activeService.questions.forEach((q) => {
                if (q.options.length > 0) resetAnswers[q.id] = q.options[0].value;
              });
              setAnswers(resetAnswers);
              setCheckedDocs({});
            }}
            className="text-xs font-semibold text-[#1647A5] hover:underline inline-flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Reset answers' : 'ಉತ್ತರಗಳನ್ನು ಮರುಹೊಂದಿಸಿ'}</span>
          </button>
        </div>

        <div className="space-y-6">
          {activeService.questions.map((q, qIndex) => {
            const currentVal = answers[q.id] || q.options[0]?.value;
            return (
              <fieldset key={q.id} className="space-y-2.5">
                <legend className="text-sm sm:text-base font-bold text-[#18324A]">
                  <span className="font-mono-tabular text-[#1647A5] mr-1.5">Q{qIndex + 1}.</span>
                  {q.question[language]}
                </legend>
                <p className="text-xs text-[#687783]">{q.helpText[language]}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
                  {q.options.map((opt) => {
                    const isChecked = currentVal === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        role="radio"
                        aria-checked={isChecked}
                        onClick={() => handleAnswerChange(q.id, opt.value)}
                        className={`text-left px-4 py-3 rounded-xl border text-xs sm:text-sm transition-colors flex items-start gap-2.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1647A5] ${
                          isChecked
                            ? 'bg-[#1647A5] text-[#FFFDF8] border-[#1647A5] font-semibold'
                            : 'bg-[#F4EFE4]/60 text-[#18324A] border-[#18324A]/15 hover:bg-[#e5decb]'
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                            isChecked ? 'border-[#F6C744] bg-[#F6C744]' : 'border-[#18324A]/40'
                          }`}
                        >
                          {isChecked && <span className="w-1.5 h-1.5 rounded-full bg-[#18324A]" />}
                        </span>
                        <span className="leading-snug">{opt.label[language]}</span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            );
          })}
        </div>
      </section>

      {/* Step 3 & Step 4: Eligibility Guidance + Tailored Document Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Step 3: See Eligibility Guidance */}
        <section
          aria-labelledby="eligibility-heading"
          aria-live="polite"
          className="lg:col-span-5 bg-[#FFFDF8] border border-[#18324A]/10 rounded-2xl p-6 sm:p-7 space-y-4"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-medium text-[#687783]">
              {language === 'en' ? 'Dynamic eligibility help' : 'ನಿಮ್ಮ ಉತ್ತರಗಳ ಆಧಾರದ ಮೇಲೆ ಅರ್ಹತಾ ಫಲಿತಾಂಶ'}
            </span>
            <button
              type="button"
              onClick={handleReadAloudGuidance}
              className="text-xs font-semibold text-[#1647A5] hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Read aloud' : 'ಧ್ವನಿ'}</span>
            </button>
          </div>
          <h2 id="eligibility-heading" className="font-display text-xl font-bold text-[#1647A5]">
            {UI_TRANSLATIONS.eligibilityHeading[language]}
          </h2>

          <div
            className={`p-5 rounded-xl border space-y-3 ${
              eligibilityResult.status === 'eligible'
                ? 'bg-[#38785E]/10 border-[#38785E]/30'
                : eligibilityResult.status === 'conditional'
                ? 'bg-[#F6C744]/20 border-[#18324A]/20'
                : 'bg-[#b91c1c]/10 border-[#b91c1c]/30'
            }`}
          >
            <div className="flex items-start gap-2.5">
              {eligibilityResult.status === 'eligible' ? (
                <CheckCircle2 className="w-6 h-6 text-[#38785E] shrink-0 mt-0.5" />
              ) : (
                <AlertCircle
                  className={`w-6 h-6 shrink-0 mt-0.5 ${
                    eligibilityResult.status === 'conditional' ? 'text-[#1647A5]' : 'text-[#b91c1c]'
                  }`}
                />
              )}
              <div className="space-y-1">
                <span className="text-xs font-semibold text-[#687783] block">
                  {eligibilityResult.status === 'eligible'
                    ? language === 'en'
                      ? 'Status: Meets standard eligibility criteria'
                      : 'ಸ್ಥಿತಿ: ಸಾಮಾನ್ಯ ಅರ್ಹತಾ ಮಾನದಂಡಗಳನ್ನು ಪೂರೈಸುತ್ತದೆ'
                    : eligibilityResult.status === 'conditional'
                    ? language === 'en'
                      ? 'Status: Eligible with additional supporting documents'
                      : 'ಸ್ಥಿತಿ: ಹೆಚ್ಚುವರಿ ಪೂರಕ ದಾಖಲೆಗಳೊಂದಿಗೆ ಅರ್ಹರು'
                    : language === 'en'
                    ? 'Status: Does not meet core requirement'
                    : 'ಸ್ಥಿತಿ: ಪ್ರಮುಖ ಅರ್ಹತಾ ಮಾನದಂಡ ಪೂರೈಸುವುದಿಲ್ಲ'}
                </span>
                <h3 className="font-display text-base sm:text-lg font-bold text-[#18324A]">
                  {eligibilityResult.headline[language]}
                </h3>
              </div>
            </div>

            <p className="text-sm text-[#18324A]/90 leading-relaxed">
              {eligibilityResult.explanation[language]}
            </p>
          </div>

          <div className="pt-2 text-xs text-[#687783] space-y-2">
            <p>
              {language === 'en'
                ? 'Tip: Try changing your answers above (for example, switching age or residence proof) to see how eligibility and required documents adjust automatically.'
                : 'ಸೂಚನೆ: ಮೇಲಿನ ಪ್ರಶ್ನೆಗಳ ಉತ್ತರಗಳನ್ನು ಬದಲಾಯಿಸುವ ಮೂಲಕ ಅರ್ಹತೆ ಮತ್ತು ದಾಖಲೆಗಳ ಪಟ್ಟಿ ಹೇಗೆ ಬದಲಾಗುತ್ತದೆ ಎಂಬುದನ್ನು ಪರೀಕ್ಷಿಸಿ.'}
            </p>
          </div>
        </section>

        {/* Step 4: Tailored Document Checklist */}
        <section
          aria-labelledby="checklist-heading"
          aria-live="polite"
          className="lg:col-span-7 bg-[#FFFDF8] border border-[#18324A]/10 rounded-2xl p-6 sm:p-7 space-y-5"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#18324A]/10">
            <div className="space-y-1">
              <div className="text-xs text-[#687783] flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-[#1647A5]" />
                <span>
                  {language === 'en'
                    ? `Tailored to your ${Object.keys(answers).length} answers`
                    : `ನಿಮ್ಮ ಉತ್ತರಗಳಿಗೆ ಅನುಗುಣವಾಗಿ ಸಿದ್ಧಪಡಿಸಲಾಗಿದೆ`}
                </span>
              </div>
              <h2 id="checklist-heading" className="font-display text-xl font-bold text-[#1647A5]">
                {UI_TRANSLATIONS.checklistHeading[language]}
              </h2>
            </div>

            <div className="text-xs font-mono-tabular font-semibold text-[#18324A] bg-[#F4EFE4] px-3 py-1.5 rounded-lg shrink-0 self-start sm:self-auto">
              {language === 'en'
                ? `${readyDocsCount} / ${tailoredDocuments.length} marked ready`
                : `${readyDocsCount} / ${tailoredDocuments.length} ದಾಖಲೆಗಳು ಸಿದ್ಧವಾಗಿವೆ`}
            </div>
          </div>

          <p className="text-xs text-[#687783]">
            {language === 'en'
              ? 'Click any document below to check it off as you prepare your application:'
              : 'ನಿಮ್ಮ ಬಳಿ ಸಿದ್ಧವಿರುವ ದಾಖಲೆಗಳನ್ನು ಗುರುತಿಸಲು ಕೆಳಗಿನ ಪಟ್ಟಿಯ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ:'}
          </p>

          <ul className="space-y-3">
            {tailoredDocuments.map((doc) => {
              const isChecked = Boolean(checkedDocs[doc.id]);
              const isTailoredAddition = Boolean(doc.conditionQuestionId);
              return (
                <li key={doc.id}>
                  <button
                    type="button"
                    onClick={() => toggleDocChecked(doc.id)}
                    aria-pressed={isChecked}
                    className={`w-full text-left p-4 rounded-xl border transition-colors flex items-start gap-3 cursor-pointer ${
                      isChecked
                        ? 'bg-[#38785E]/10 border-[#38785E]/40'
                        : 'bg-[#F4EFE4]/50 border-[#18324A]/10 hover:bg-[#F4EFE4]'
                    }`}
                  >
                    {isChecked ? (
                      <CheckSquare className="w-5 h-5 text-[#38785E] shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-5 h-5 text-[#1647A5] shrink-0 mt-0.5" />
                    )}

                    <div className="space-y-1 flex-1">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-[#687783]">
                        <span className="font-semibold text-[#1647A5]">
                          {doc.isMandatory
                            ? language === 'en'
                              ? 'Required Document'
                              : 'ಕಡ್ಡಾಯ ದಾಖಲೆ'
                            : language === 'en'
                            ? 'Recommended if available'
                            : 'ಲಭ್ಯವಿದ್ದರೆ ಸೇರಿಸಿ'}
                        </span>
                        {isTailoredAddition && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>
                              {language === 'en'
                                ? 'Added based on your answer'
                                : 'ನಿಮ್ಮ ಉತ್ತರದ ಆಧಾರದ ಮೇಲೆ ಸೇರಿಸಲಾಗಿದೆ'}
                            </span>
                          </>
                        )}
                      </div>

                      <p
                        className={`text-sm font-bold ${
                          isChecked ? 'line-through text-[#18324A]/70' : 'text-[#18324A]'
                        }`}
                      >
                        {doc.name[language]}
                      </p>

                      <p className="text-xs text-[#687783] leading-relaxed">
                        {doc.detail[language]}
                      </p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      {/* Step 5: Follow step-by-step application instructions */}
      <section
        aria-labelledby="steps-heading"
        className="bg-[#FFFDF8] border border-[#18324A]/10 rounded-2xl p-6 sm:p-8 space-y-6"
      >
        <div className="space-y-1 pb-4 border-b border-[#18324A]/10">
          <div className="text-xs text-[#687783]">
            {language === 'en'
              ? 'Clear process from login to receiving your signed certificate or resolution'
              : 'ಅರ್ಜಿ ಸಲ್ಲಿಸುವುದರಿಂದ ಹಿಡಿದು ಪ್ರಮಾಣಪತ್ರ ಪಡೆಯುವವರೆಗಿನ ಸ್ಪಷ್ಟ ಹಂತಗಳು'}
          </div>
          <h2 id="steps-heading" className="font-display text-xl sm:text-2xl font-bold text-[#1647A5]">
            {UI_TRANSLATIONS.stepsHeading[language]}
          </h2>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {activeService.steps.map((step) => (
            <li
              key={step.stepNumber}
              className="bg-[#F4EFE4]/60 border border-[#18324A]/10 rounded-xl p-5 space-y-2"
            >
              <div className="text-xs font-mono-tabular font-bold text-[#1647A5]">
                {language === 'en' ? `Step ${step.stepNumber}` : `ಹಂತ ${step.stepNumber}`}
              </div>
              <h3 className="font-display text-base font-bold text-[#18324A]">
                {step.title[language]}
              </h3>
              <p className="text-sm text-[#18324A]/85 leading-relaxed">
                {step.description[language]}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Step 6: Open links to official sources and the application portal */}
      <section
        aria-labelledby="official-links-heading"
        className="bg-[#FFFDF8] border border-[#18324A]/10 rounded-2xl p-6 sm:p-8 space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#18324A]/10">
          <div className="space-y-1">
            <div className="text-xs text-[#687783] flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#1647A5]" />
              <span>
                {language === 'en'
                  ? 'Verified Karnataka Government Portals & Demo Action'
                  : 'ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ಗಳು ಮತ್ತು ಡೆಮೊ ಆಯ್ಕೆ'}
              </span>
            </div>
            <h2 id="official-links-heading" className="font-display text-xl sm:text-2xl font-bold text-[#1647A5]">
              {UI_TRANSLATIONS.officialLinksHeading[language]}
            </h2>
          </div>

          <button
            type="button"
            onClick={() =>
              onStartReportWithCategory(activeService.linkedIssueCategory || 'Local service information request')
            }
            className="px-4 py-2.5 bg-[#F6C744] hover:bg-[#eab82e] text-[#18324A] text-xs sm:text-sm font-semibold rounded-xl transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>
              {language === 'en'
                ? 'Submit a sample request in Jan Setu Demo'
                : 'ಜನ ಸೇತು ಡೆಮೊದಲ್ಲಿ ಮಾದರಿ ಅರ್ಜಿ/ದೂರು ಸಲ್ಲಿಸಿ'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {activeService.officialLinks.map((link) => (
            <div
              key={link.id}
              className="bg-[#F4EFE4]/60 border border-[#18324A]/15 rounded-xl p-5 flex flex-col justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="text-xs text-[#687783] flex items-center gap-2">
                  <span className="font-semibold text-[#1647A5]">
                    {link.type === 'portal'
                      ? language === 'en'
                        ? 'Official Application Portal'
                        : 'ಅಧಿಕೃತ ಅರ್ಜಿ ಪೋರ್ಟಲ್'
                      : language === 'en'
                      ? 'Official Department Source'
                      : 'ಅಧಿಕೃತ ಇಲಾಖೆಯ ಮೂಲ'}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono-tabular text-[11px] truncate">{link.url}</span>
                </div>

                <h3 className="font-display text-base font-bold text-[#18324A]">
                  {link.portalName[language]}
                </h3>

                <p className="text-xs sm:text-sm text-[#18324A]/80 leading-relaxed">
                  {link.description[language]}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#1647A5] hover:bg-[#123A88] text-[#FFFDF8] text-xs sm:text-sm font-semibold rounded-lg transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
                >
                  <span>{link.label[language]}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={() =>
                    setPreviewPortal(previewPortal?.id === link.id ? null : link)
                  }
                  className="px-3 py-2 bg-[#FFFDF8] hover:bg-[#e5decb] text-[#18324A] border border-[#18324A]/15 text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Info className="w-3.5 h-3.5 text-[#1647A5]" />
                  <span>
                    {previewPortal?.id === link.id
                      ? language === 'en'
                        ? 'Hide portal summary'
                        : 'ವಿವರ ಅಡಗಿಸಿ'
                      : language === 'en'
                      ? 'Portal preview note'
                      : 'ಪೋರ್ಟಲ್ ಮಾಹಿತಿ'}
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {previewPortal && (
          <div
            aria-live="polite"
            className="bg-[#F4EFE4] border border-[#1647A5]/30 rounded-xl p-4 text-xs sm:text-sm text-[#18324A] space-y-1.5"
          >
            <div className="font-bold text-[#1647A5] flex items-center justify-between">
              <span>{previewPortal.portalName[language]}</span>
              <span className="font-mono-tabular text-xs">{previewPortal.url}</span>
            </div>
            <p className="text-[#18324A]/85">
              {language === 'en'
                ? `Clicking "${previewPortal.label.en}" opens ${previewPortal.url} in a new browser tab. Before logging in on the official portal, keep the ${tailoredDocuments.length} documents from your tailored checklist above ready as PDF or JPG files.`
                : `"${previewPortal.label.kn}" ಕ್ಲಿಕ್ ಮಾಡುವುದರಿಂದ ಹೊಸ ಟ್ಯಾಬ್‌ನಲ್ಲಿ ${previewPortal.url} ತೆರೆಯುತ್ತದೆ. ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸುವ ಮೊದಲು ಮೇಲಿನ ಪಟ್ಟಿಯಲ್ಲಿರುವ ${tailoredDocuments.length} ದಾಖಲೆಗಳನ್ನು ಸಿದ್ಧವಾಗಿಟ್ಟುಕೊಳ್ಳಿ.`}
            </p>
          </div>
        )}
      </section>
    </div>
  );
};
