import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  Upload,
  Copy,
  Check,
  ArrowRight,
  Sparkles,
  RotateCcw,
  Trash2,
  Mic,
  Languages,
} from 'lucide-react';
import {
  ISSUE_CATEGORIES,
  SAMPLE_LOCALITIES,
  SampleRequestRecord,
} from '../data/demoData';
import { Language } from '../data/guidedServicesData';
import { startVoiceDictation } from '../utils/voiceAssistant';

interface ReportIssueViewProps {
  initialCategory?: string;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onIssueSubmitted: (newRequest: SampleRequestRecord) => void;
  onTrackRequest: (requestId: string) => void;
}

interface ValidationErrors {
  category?: string;
  description?: string;
  area?: string;
}

export const ReportIssueView: React.FC<ReportIssueViewProps> = ({
  initialCategory = '',
  language,
  onLanguageChange,
  onIssueSubmitted,
  onTrackRequest,
}) => {
  const [category, setCategory] = useState<string>(initialCategory);
  const [description, setDescription] = useState<string>('');
  const [area, setArea] = useState<string>('');
  const [photoName, setPhotoName] = useState<string>('');
  const [reporterName, setReporterName] = useState<string>('');
  const [contactInfo, setContactInfo] = useState<string>('');

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submittedRecord, setSubmittedRecord] = useState<SampleRequestRecord | null>(null);
  const [copiedId, setCopiedId] = useState<boolean>(false);
  const [isDictating, setIsDictating] = useState<boolean>(false);
  const [voiceFeedback, setVoiceFeedback] = useState<string>('');

  useEffect(() => {
    if (initialCategory) {
      setCategory(initialCategory);
      setSubmittedRecord(null);
    }
  }, [initialCategory]);

  const validateForm = (): ValidationErrors => {
    const nextErrors: ValidationErrors = {};
    if (!category.trim()) {
      nextErrors.category =
        language === 'en'
          ? 'Please select an issue category so we can route your sample report.'
          : 'ದಯವಿಟ್ಟು ಸಮಸ್ಯೆಯ ವರ್ಗವನ್ನು ಆಯ್ಕೆಮಾಡಿ.';
    }
    if (!area.trim()) {
      nextErrors.area =
        language === 'en'
          ? 'Please enter the area, street, or locality where the issue is located.'
          : 'ದಯವಿಟ್ಟು ಸಮಸ್ಯೆ ಇರುವ ಪ್ರದೇಶ ಅಥವಾ ರಸ್ತೆಯ ಹೆಸರನ್ನು ನಮೂದಿಸಿ.';
    }
    if (!description.trim()) {
      nextErrors.description =
        language === 'en'
          ? 'Please provide a short description of the concern (at least 10 characters).'
          : 'ದಯವಿಟ್ಟು ಸಮಸ್ಯೆಯ ಕುರಿತು ಕಿರು ವಿವರಣೆ ನೀಡಿ (ಕನಿಷ್ಠ 10 ಅಕ್ಷರಗಳು).';
    } else if (description.trim().length < 10) {
      nextErrors.description =
        language === 'en'
          ? 'Please add a few more words (at least 10 characters) describing the issue.'
          : 'ದಯವಿಟ್ಟು ಸಮಸ್ಯೆಯ ಕುರಿತು ಇನ್ನಷ್ಟು ವಿವರಗಳನ್ನು ಸೇರಿಸಿ.';
    }
    return nextErrors;
  };

  const handleVoiceDictateDescription = () => {
    if (isDictating) return;
    setVoiceFeedback('');
    startVoiceDictation({
      language,
      fallbackText: {
        en: 'Two streetlights near MG Road Cross 4 bus stop have not been working for the past three evenings, making the pedestrian crossing dark.',
        kn: 'ಎಂ.ಜಿ ರಸ್ತೆ ಕ್ರಾಸ್ 4 ಬಸ್ ನಿಲ್ದಾಣದ ಹತ್ತಿರ ಎರಡು ಬೀದಿ ದೀಪಗಳು ಕಳೆದ ಮೂರು ದಿನಗಳಿಂದ ಉರಿಯುತ್ತಿಲ್ಲ, ಪಾದಚಾರಿಗಳಿಗೆ ತೊಂದರೆಯಾಗುತ್ತಿದೆ.',
      },
      onStart: () => setIsDictating(true),
      onResult: (transcript, isSimulated) => {
        setDescription((prev) => (prev ? `${prev} ${transcript}` : transcript));
        if (!category) setCategory('Streetlight outage');
        if (!area) setArea('Indiranagar — MG Road Cross 4');
        setErrors({});
        setVoiceFeedback(
          isSimulated
            ? language === 'en'
              ? 'Voice input transcribed (Sample voice dictation applied).'
              : 'ಧ್ವನಿ ಇನ್‌ಪುಟ್ ಸೇರಿಸಲಾಗಿದೆ (ಮಾದರಿ ಧ್ವನಿ ಪಠ್ಯ).'
            : language === 'en'
            ? 'Voice input transcribed from your microphone.'
            : 'ಮೈಕ್ರೊಫೋನ್ ಮೂಲಕ ಧ್ವನಿ ಪಠ್ಯ ಸೇರಿಸಲಾಗಿದೆ.'
        );
      },
      onEnd: () => setIsDictating(false),
    });
  };

  const handleFillSampleData = () => {
    setCategory('Streetlight outage');
    setArea('Indiranagar — MG Road Cross 4');
    setDescription(
      language === 'en'
        ? 'Streetlight pole #IN-18 near the corner community park has been out for two nights, leaving the footpath dark.'
        : 'ಸಮುದಾಯ ಉದ್ಯಾನದ ಹತ್ತಿರದ ಬೀದಿ ದೀಪ ಕಂಬ #IN-18 ಕಳೆದ ಎರಡು ರಾತ್ರಿಗಳಿಂದ ಉರಿಯುತ್ತಿಲ್ಲ.'
    );
    setReporterName('Priya Sharma (Demo Resident)');
    setContactInfo('priya.demo@example.org');
    setPhotoName('sample_streetlight_pole_in18.jpg');
    setErrors({});
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoName(file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateForm();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    setErrors({});

    const randomDigits = Math.floor(4200 + Math.random() * 500);
    const sampleId = `JS-2026-${randomDigits}`;
    const trimmedDesc = description.trim();
    const shortTitle =
      trimmedDesc.length > 64 ? `${trimmedDesc.slice(0, 61)}...` : trimmedDesc;

    const assignedDept =
      category === 'Streetlight outage' || category === 'Water supply or drainage issue'
        ? 'Water & Electricity Utilities (BWSSB / BESCOM)'
        : category === 'Local service information request'
        ? 'Senior Citizen & Social Welfare (Seva Sindhu)'
        : 'Urban Local Body (BBMP / Municipal)';

    const newRecord: SampleRequestRecord = {
      id: sampleId,
      category: category.trim(),
      department: assignedDept,
      title: shortTitle,
      description: trimmedDesc,
      area: area.trim(),
      submittedDate: '10 Nov 2026',
      status: 'Received',
      reporterName: reporterName.trim() ? `${reporterName.trim()} (Demo)` : 'Anonymous Resident (Demo)',
      contactInfo: contactInfo.trim() ? `${contactInfo.trim()} (Not stored)` : 'Not provided (Demo)',
      photoName: photoName || undefined,
      isUserCreated: true,
      nextStepNote:
        'Sample status: Your demo grievance has been logged as Received and routed to the department desk.',
      timeline: [
        {
          stage: 'Received',
          date: '10 Nov 2026 · Just now',
          summary: `Sample grievance created in this browser session with ID ${sampleId} and routed to ${assignedDept}.`,
          completed: false,
          current: true,
        },
        {
          stage: 'Under review',
          date: 'Upcoming step (Demo)',
          summary: 'Sample ward desk verifies the locality details and assigns an inspection team.',
          completed: false,
          current: false,
        },
        {
          stage: 'Resolved',
          date: 'Upcoming step (Demo)',
          summary: 'Sample closing note posted once the neighborhood concern is addressed.',
          completed: false,
          current: false,
        },
      ],
    };

    onIssueSubmitted(newRecord);
    setSubmittedRecord(newRecord);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyId = async (id: string) => {
    try {
      await navigator.clipboard.writeText(id);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    } catch {
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  const handleStartAnother = () => {
    setSubmittedRecord(null);
    setCategory('');
    setDescription('');
    setArea('');
    setPhotoName('');
    setReporterName('');
    setContactInfo('');
    setErrors({});
    setVoiceFeedback('');
  };

  if (submittedRecord) {
    return (
      <div className="max-w-2xl mx-auto pt-8 pb-12 space-y-6" aria-live="polite">
        <section className="bg-[#FFFDF8] border border-[#18324A]/15 rounded-2xl p-6 sm:p-10 space-y-6">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-7 h-7 text-[#38785E] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="text-xs text-[#38785E] font-semibold">
                {language === 'en'
                  ? 'Sample Grievance Confirmation · Demo Only'
                  : 'ಮಾದರಿ ದೂರು ಸ್ವೀಕೃತಿ · ಡೆಮೊ ಮಾತ್ರ'}
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#18324A]">
                {language === 'en'
                  ? 'Your sample issue report has been recorded'
                  : 'ನಿಮ್ಮ ಮಾದರಿ ದೂರನ್ನು ಯಶಸ್ವಿಯಾಗಿ ದಾಖಲಿಸಲಾಗಿದೆ'}
              </h1>
              <p className="text-sm sm:text-base text-[#687783]">
                {language === 'en'
                  ? 'We generated a sample tracking ID for this session so you can test the grievance tracker right away.'
                  : 'ಈ ದೂರಿನ ಸ್ಥಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಲು ನಿಮಗಾಗಿ ಮಾದರಿ ಟ್ರ್ಯಾಕಿಂಗ್ ಐಡಿ ಸಿದ್ಧಪಡಿಸಲಾಗಿದೆ.'}
              </p>
            </div>
          </div>

          <div className="bg-[#F4EFE4] border border-[#18324A]/10 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-medium text-[#687783] block">
                {language === 'en' ? 'Sample Request Tracking ID' : 'ಮಾದರಿ ಟ್ರ್ಯಾಕಿಂಗ್ ಐಡಿ'}
              </span>
              <span className="font-mono-tabular text-2xl font-bold text-[#1647A5] tracking-tight">
                {submittedRecord.id}
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => handleCopyId(submittedRecord.id)}
                className="px-3.5 py-2 bg-[#FFFDF8] hover:bg-[#e9e1d2] text-[#18324A] border border-[#18324A]/15 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {copiedId ? (
                  <>
                    <Check className="w-4 h-4 text-[#38785E]" />
                    <span>Copied ID</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#1647A5]" />
                    <span>Copy ID</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => onTrackRequest(submittedRecord.id)}
                className="px-4 py-2 bg-[#F6C744] hover:bg-[#eab82e] text-[#18324A] rounded-lg text-xs sm:text-sm font-semibold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>{language === 'en' ? 'Track this request' : 'ಅರ್ಜಿ ಸ್ಥಿತಿ ನೋಡಿ'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <h2 className="font-display text-base font-bold text-[#18324A]">
              {language === 'en' ? 'Summary of sample submission' : 'ಸಲ್ಲಿಸಿದ ಮಾದರಿ ವಿವರಗಳ ಸಾರಾಂಶ'}
            </h2>
            <dl className="divide-y divide-[#18324A]/10 text-sm border-t border-b border-[#18324A]/10">
              <div className="py-2.5 grid grid-cols-1 sm:grid-cols-3 gap-1">
                <dt className="text-[#687783] font-medium">Category</dt>
                <dd className="sm:col-span-2 font-semibold text-[#18324A]">{submittedRecord.category}</dd>
              </div>
              <div className="py-2.5 grid grid-cols-1 sm:grid-cols-3 gap-1">
                <dt className="text-[#687783] font-medium">Department</dt>
                <dd className="sm:col-span-2 text-[#18324A]">{submittedRecord.department}</dd>
              </div>
              <div className="py-2.5 grid grid-cols-1 sm:grid-cols-3 gap-1">
                <dt className="text-[#687783] font-medium">Area / Locality</dt>
                <dd className="sm:col-span-2 text-[#18324A]">{submittedRecord.area}</dd>
              </div>
              <div className="py-2.5 grid grid-cols-1 sm:grid-cols-3 gap-1">
                <dt className="text-[#687783] font-medium">Description</dt>
                <dd className="sm:col-span-2 text-[#18324A]">{submittedRecord.description}</dd>
              </div>
            </dl>
          </div>

          <div className="bg-[#F4EFE4]/70 rounded-xl p-4 space-y-2 text-sm">
            <h3 className="font-display font-bold text-[#1647A5]">
              What happens next in this demo?
            </h3>
            <p className="text-[#18324A]/85 leading-relaxed">
              1. Click <strong>Track this request</strong> above (or open <strong>Track a request</strong> in the top menu)
              and enter <span className="font-mono-tabular font-semibold text-[#1647A5]">{submittedRecord.id}</span>.
            </p>
            <p className="text-[#18324A]/85 leading-relaxed">
              2. You will see your request in the <strong>Received</strong> stage and can preview how status updates move
              through <strong>Under review</strong> and <strong>Resolved</strong>.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={handleStartAnother}
              className="px-4 py-2.5 text-sm font-semibold text-[#1647A5] hover:bg-[#F4EFE4] rounded-xl transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Submit another sample report</span>
            </button>

            <button
              type="button"
              onClick={() => onTrackRequest(submittedRecord.id)}
              className="px-5 py-2.5 bg-[#1647A5] hover:bg-[#123A88] text-[#FFFDF8] text-sm font-semibold rounded-xl transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Open Track a request ({submittedRecord.id})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto pt-8 pb-12 space-y-8">
      {/* Page Header with Language & Voice Dictation Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="text-xs text-[#687783] flex flex-wrap items-center gap-2">
            <span>Grievance Filing &amp; Voice Input</span>
            <span aria-hidden="true">·</span>
            <span>Simulated Demo Submission</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#1647A5]">
            {language === 'en'
              ? 'Report a neighborhood issue (File a grievance)'
              : 'ಸ್ಥಳೀಯ ಸಮಸ್ಯೆ ವರದಿ ಮಾಡಿ (ದೂರು ನೋಂದಣಿ)'}
          </h1>
          <p className="text-base text-[#18324A]/85 max-w-[62ch] leading-relaxed">
            {language === 'en'
              ? 'File a complaint about streetlights, roads, water, or waste by typing or using Voice Dictation in English or Kannada. Submitting generates a sample tracking ID.'
              : 'ಬೀದಿ ದೀಪ, ರಸ್ತೆ, ನೀರು ಅಥವಾ ಸ್ವಚ್ಛತೆ ಕುರಿತು ಟೈಪ್ ಮಾಡುವ ಮೂಲಕ ಅಥವಾ ಧ್ವನಿ ಮೂಲಕ (Voice) ದೂರು ಸಲ್ಲಿಸಿ ಮತ್ತು ಟ್ರ್ಯಾಕಿಂಗ್ ಐಡಿ ಪಡೆಯಿರಿ.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto shrink-0">
          <div className="inline-flex items-center gap-1 bg-[#FFFDF8] p-1 rounded-xl border border-[#18324A]/15">
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

          <button
            type="button"
            onClick={handleFillSampleData}
            className="px-3.5 py-2 bg-[#FFFDF8] hover:bg-[#e8dfd0] text-[#1647A5] border border-[#1647A5]/25 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Fill sample report' : 'ಮಾದರಿ ವಿವರ ತುಂಬಿಸಿ'}</span>
          </button>
        </div>
      </div>

      {Object.keys(errors).length > 0 && (
        <div
          role="alert"
          className="bg-[#FFFDF8] border border-[#b91c1c] rounded-xl p-4 flex items-start gap-3 text-sm text-[#991b1b]"
        >
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold">
              {language === 'en'
                ? 'Please check the required fields below before submitting:'
                : 'ದಯವಿಟ್ಟು ಕೆಳಗಿನ ಕಡ್ಡಾಯ ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ:'}
            </p>
            <ul className="list-disc list-inside space-y-0.5 text-xs">
              {errors.category && <li>{errors.category}</li>}
              {errors.area && <li>{errors.area}</li>}
              {errors.description && <li>{errors.description}</li>}
            </ul>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        noValidate
        className="bg-[#FFFDF8] border border-[#18324A]/10 rounded-2xl p-6 sm:p-8 space-y-6"
      >
        {/* 1. Issue Category */}
        <div className="space-y-1.5">
          <label htmlFor="issue-category" className="block text-sm font-semibold text-[#18324A]">
            {language === 'en' ? '1. Issue category' : '1. ಸಮಸ್ಯೆಯ ವರ್ಗ'} <span className="text-[#b91c1c]">*</span>
          </label>
          <select
            id="issue-category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              if (errors.category) setErrors({ ...errors, category: undefined });
            }}
            aria-required="true"
            aria-invalid={Boolean(errors.category)}
            className={`w-full px-3.5 py-2.5 bg-[#F4EFE4]/60 border rounded-xl text-sm text-[#18324A] focus:outline-none focus:ring-2 ${
              errors.category
                ? 'border-[#b91c1c] focus:ring-[#b91c1c]/20'
                : 'border-[#18324A]/20 focus:border-[#1647A5] focus:ring-[#1647A5]/20'
            }`}
          >
            <option value="">{language === 'en' ? 'Select a category...' : 'ವರ್ಗವನ್ನು ಆಯ್ಕೆಮಾಡಿ...'}</option>
            {ISSUE_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-xs font-medium text-[#b91c1c] pt-1">{errors.category}</p>
          )}
        </div>

        {/* 2. Area or Locality */}
        <div className="space-y-2">
          <label htmlFor="issue-area" className="block text-sm font-semibold text-[#18324A]">
            {language === 'en' ? '2. Area or locality' : '2. ಪ್ರದೇಶ ಅಥವಾ ಬಡಾವಣೆ'}{' '}
            <span className="text-[#b91c1c]">*</span>
          </label>
          <input
            id="issue-area"
            type="text"
            value={area}
            onChange={(e) => {
              setArea(e.target.value);
              if (errors.area) setErrors({ ...errors, area: undefined });
            }}
            placeholder="e.g., Indiranagar — MG Road Cross 4"
            aria-required="true"
            aria-invalid={Boolean(errors.area)}
            className={`w-full px-3.5 py-2.5 bg-[#F4EFE4]/60 border rounded-xl text-sm text-[#18324A] placeholder:text-[#687783] focus:outline-none focus:ring-2 ${
              errors.area
                ? 'border-[#b91c1c] focus:ring-[#b91c1c]/20'
                : 'border-[#18324A]/20 focus:border-[#1647A5] focus:ring-[#1647A5]/20'
            }`}
          />
          {errors.area && <p className="text-xs font-medium text-[#b91c1c]">{errors.area}</p>}

          <div className="pt-1">
            <span className="text-xs text-[#687783] block mb-1.5">
              {language === 'en' ? 'Quick-fill a sample locality:' : 'ಮಾದರಿ ಪ್ರದೇಶವನ್ನು ಆಯ್ಕೆಮಾಡಿ:'}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {SAMPLE_LOCALITIES.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => {
                    setArea(loc);
                    if (errors.area) setErrors({ ...errors, area: undefined });
                  }}
                  className={`px-2.5 py-1 text-xs rounded-lg border transition-colors cursor-pointer ${
                    area === loc
                      ? 'bg-[#1647A5] text-[#FFFDF8] border-[#1647A5] font-medium'
                      : 'bg-[#F4EFE4] text-[#18324A] border-[#18324A]/10 hover:bg-[#e5decb]'
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Short Description + Voice Dictation */}
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <label htmlFor="issue-description" className="block text-sm font-semibold text-[#18324A]">
              {language === 'en' ? '3. Short description (Type or Speak)' : '3. ಸಮಸ್ಯೆಯ ವಿವರಣೆ (ಟೈಪ್ ಮಾಡಿ ಅಥವಾ ಮಾತನಾಡಿ)'}{' '}
              <span className="text-[#b91c1c]">*</span>
            </label>

            <button
              type="button"
              onClick={handleVoiceDictateDescription}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition-colors self-start sm:self-auto cursor-pointer ${
                isDictating
                  ? 'bg-[#F6C744] text-[#18324A]'
                  : 'bg-[#1647A5] hover:bg-[#123A88] text-[#FFFDF8]'
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
              <span>
                {isDictating
                  ? language === 'en'
                    ? 'Listening to voice...'
                    : 'ಧ್ವನಿ ಆಲಿಸಲಾಗುತ್ತಿದೆ...'
                  : language === 'en'
                  ? 'Speak in English / ಕನ್ನಡ (Voice Input)'
                  : 'ಧ್ವನಿ ಮೂಲಕ ವಿವರಿಸಿ (Voice Input)'}
              </span>
            </button>
          </div>

          {voiceFeedback && (
            <p className="text-xs text-[#38785E] font-medium" aria-live="polite">
              {voiceFeedback}
            </p>
          )}

          <textarea
            id="issue-description"
            rows={4}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (errors.description) setErrors({ ...errors, description: undefined });
            }}
            placeholder={
              language === 'en'
                ? 'Describe the concern in plain language, or click "Speak" above...'
                : 'ಸಮಸ್ಯೆಯನ್ನು ಸರಳ ಭಾಷೆಯಲ್ಲಿ ವಿವರಿಸಿ ಅಥವಾ ಮೇಲಿನ ಧ್ವನಿ ಬಟನ್ ಬಳಸಿ...'
            }
            aria-required="true"
            aria-invalid={Boolean(errors.description)}
            className={`w-full px-3.5 py-2.5 bg-[#F4EFE4]/60 border rounded-xl text-sm text-[#18324A] placeholder:text-[#687783] focus:outline-none focus:ring-2 ${
              errors.description
                ? 'border-[#b91c1c] focus:ring-[#b91c1c]/20'
                : 'border-[#18324A]/20 focus:border-[#1647A5] focus:ring-[#1647A5]/20'
            }`}
          />
          {errors.description && (
            <p className="text-xs font-medium text-[#b91c1c] pt-1">{errors.description}</p>
          )}
        </div>

        {/* 4. Optional Photo Upload Control */}
        <div className="space-y-2 pt-2 border-t border-[#18324A]/10">
          <label htmlFor="issue-photo" className="block text-sm font-semibold text-[#18324A]">
            {language === 'en' ? '4. Photo of the issue' : '4. ಸಮಸ್ಯೆಯ ಭಾವಚಿತ್ರ'}{' '}
            <span className="text-xs font-normal text-[#687783]">(Optional · Demo control)</span>
          </label>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <label
              htmlFor="issue-photo"
              className="px-4 py-2 bg-[#F4EFE4] hover:bg-[#e5decb] text-[#18324A] border border-[#18324A]/15 rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Upload className="w-4 h-4 text-[#1647A5]" />
              <span>{photoName ? 'Change selected photo' : 'Choose a photo file'}</span>
              <input
                id="issue-photo"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="sr-only"
              />
            </label>

            {photoName && (
              <div className="flex items-center gap-2 text-xs text-[#18324A] bg-[#F4EFE4]/60 px-3 py-1.5 rounded-lg">
                <span className="font-mono-tabular truncate max-w-[220px]">{photoName}</span>
                <button
                  type="button"
                  onClick={() => setPhotoName('')}
                  aria-label="Remove selected photo"
                  className="text-[#687783] hover:text-[#b91c1c] cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 5. Demo Name & Contact Fields */}
        <fieldset className="space-y-4 pt-4 border-t border-[#18324A]/10">
          <legend className="text-sm font-semibold text-[#18324A]">
            {language === 'en' ? '5. Your name & contact details' : '5. ನಿಮ್ಮ ಹೆಸರು ಮತ್ತು ಸಂಪರ್ಕ ವಿವರ'}{' '}
            <span className="text-xs font-normal text-[#687783]">
              (Optional demo fields — not stored or transmitted)
            </span>
          </legend>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="reporter-name" className="block text-xs font-semibold text-[#18324A]">
                Your name (Demo field — not stored)
              </label>
              <input
                id="reporter-name"
                type="text"
                value={reporterName}
                onChange={(e) => setReporterName(e.target.value)}
                placeholder="e.g., Priya Sharma (Sample)"
                className="w-full px-3.5 py-2 bg-[#F4EFE4]/60 border border-[#18324A]/20 rounded-xl text-sm text-[#18324A] placeholder:text-[#687783] focus:outline-none focus:border-[#1647A5] focus:ring-2 focus:ring-[#1647A5]/20"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="reporter-contact" className="block text-xs font-semibold text-[#18324A]">
                Phone or email (Demo field — not stored)
              </label>
              <input
                id="reporter-contact"
                type="text"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                placeholder="e.g., priya.sample@example.org"
                className="w-full px-3.5 py-2 bg-[#F4EFE4]/60 border border-[#18324A]/20 rounded-xl text-sm text-[#18324A] placeholder:text-[#687783] focus:outline-none focus:border-[#1647A5] focus:ring-2 focus:ring-[#1647A5]/20"
              />
            </div>
          </div>
        </fieldset>

        <div className="pt-4 border-t border-[#18324A]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-xs text-[#687783] max-w-[46ch]">
            {language === 'en'
              ? 'Submitting creates a sample grievance record in your browser session and gives you a tracking ID.'
              : 'ಅರ್ಜಿ ಸಲ್ಲಿಸುವುದರಿಂದ ನಿಮ್ಮ ಬ್ರೌಸರ್ ಸೆಷನ್‌ನಲ್ಲಿ ಮಾದರಿ ಟ್ರ್ಯಾಕಿಂಗ್ ಐಡಿ ರಚನೆಯಾಗುತ್ತದೆ.'}
          </p>

          <button
            type="submit"
            className="px-6 py-3 bg-[#F6C744] hover:bg-[#eab82e] text-[#18324A] font-semibold text-sm sm:text-base rounded-xl transition-colors inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1647A5]"
          >
            <span>{language === 'en' ? 'Submit sample grievance' : 'ಮಾದರಿ ದೂರು ಸಲ್ಲಿಸಿ'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
