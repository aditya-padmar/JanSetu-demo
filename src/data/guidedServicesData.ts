export type Language = 'en' | 'kn';

export interface BilingualText {
  en: string;
  kn: string;
}

export interface ServiceQuestionOption {
  value: string;
  label: BilingualText;
}

export interface ServiceQuestion {
  id: string;
  question: BilingualText;
  helpText: BilingualText;
  options: ServiceQuestionOption[];
}

export interface TailoredDocument {
  id: string;
  name: BilingualText;
  detail: BilingualText;
  /** Optional condition function description: if questionId === value, include this extra document */
  conditionQuestionId?: string;
  conditionValues?: string[];
  isMandatory: boolean;
}

export interface ApplicationStep {
  stepNumber: string;
  title: BilingualText;
  description: BilingualText;
}

export interface OfficialSourceLink {
  id: string;
  label: BilingualText;
  portalName: BilingualText;
  url: string;
  type: 'portal' | 'source';
  description: BilingualText;
}

export interface GuidedGovernmentService {
  id: string;
  indexNumber: string;
  category: 'Certificates & Welfare' | 'Identity & Ration' | 'Roads & Lighting' | 'Water & Sanitation';
  categoryLabel: BilingualText;
  name: BilingualText;
  shortDescription: BilingualText;
  department: BilingualText;
  processingTime: BilingualText;
  fee: BilingualText;
  questions: ServiceQuestion[];
  evaluateEligibility: (answers: Record<string, string>) => {
    status: 'eligible' | 'conditional' | 'not_eligible';
    headline: BilingualText;
    explanation: BilingualText;
  };
  baseDocuments: TailoredDocument[];
  steps: ApplicationStep[];
  officialLinks: OfficialSourceLink[];
  linkedIssueCategory?: string;
}

export const UI_TRANSLATIONS = {
  demoBannerTitle: {
    en: 'Bilingual Citizen Service Guidance & Issue Reporting Demo',
    kn: 'ದ್ವಿಭಾಷಾ ನಾಗರಿಕ ಸೇವಾ ಮಾರ್ಗದರ್ಶನ ಮತ್ತು ದೂರು ನೋಂದಣಿ ಡೆಮೊ',
  },
  languageToggleLabel: {
    en: 'Read guidance in:',
    kn: 'ಮಾರ್ಗದರ್ಶನ ಭಾಷೆ:',
  },
  chooseServiceHeading: {
    en: '1. Choose a government or civic service',
    kn: '1. ಸರ್ಕಾರಿ ಅಥವಾ ನಾಗರಿಕ ಸೇವೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
  },
  answerQuestionsHeading: {
    en: '2. Answer a few questions for relevant guidance',
    kn: '2. ಸೂಕ್ತ ಮಾರ್ಗದರ್ಶನಕ್ಕಾಗಿ ಕೆಲವು ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಿಸಿ',
  },
  eligibilityHeading: {
    en: '3. Eligibility guidance',
    kn: '3. ಅರ್ಹತಾ ಮಾರ್ಗದರ್ಶನ',
  },
  checklistHeading: {
    en: '4. Your tailored document checklist',
    kn: '4. ನಿಮಗಾಗಿ ಸಿದ್ಧಪಡಿಸಲಾದ ದಾಖಲೆಗಳ ಪಟ್ಟಿ',
  },
  stepsHeading: {
    en: '5. Step-by-step application instructions',
    kn: '5. ಹಂತ-ಹಂತದ ಅರ್ಜಿ ಸಲ್ಲಿಕೆ ಸೂಚನೆಗಳು',
  },
  officialLinksHeading: {
    en: '6. Official sources & application portal',
    kn: '6. ಅಧಿಕೃತ ಮೂಲಗಳು ಮತ್ತು ಅರ್ಜಿ ಪೋರ್ಟಲ್ ಲಿಂಕ್‌ಗಳು',
  },
};

export const GUIDED_GOVERNMENT_SERVICES: GuidedGovernmentService[] = [
  {
    id: 'gov-senior-citizen-card',
    indexNumber: '01',
    category: 'Identity & Ration',
    categoryLabel: {
      en: 'Identity & Senior Welfare',
      kn: 'ಗುರುತಿನ ಚೀಟಿ ಮತ್ತು ಹಿರಿಯ ನಾಗರಿಕರ ಕಲ್ಯಾಣ',
    },
    name: {
      en: 'Senior Citizen Identity Card & Bus Pass Concession',
      kn: 'ಹಿರಿಯ ನಾಗರಿಕರ ಗುರುತಿನ ಚೀಟಿ ಮತ್ತು ಬಸ್ ಪಾಸ್ ರಿಯಾಯಿತಿ',
    },
    shortDescription: {
      en: 'Apply for an official Senior Citizen ID card to access KSRTC/BMTC fare concessions, priority hospital queues, and welfare schemes.',
      kn: 'ಕೆಎಸ್‌ಆರ್‌ಟಿಸಿ/ಬಿಎಂಟಿಸಿ ಬಸ್ ಪ್ರಯಾಣ ರಿಯಾಯಿತಿ, ಆಸ್ಪತ್ರೆಗಳಲ್ಲಿ ಆದ್ಯತೆ ಮತ್ತು ಸರ್ಕಾರಿ ಸೌಲಭ್ಯಗಳನ್ನು ಪಡೆಯಲು ಹಿರಿಯ ನಾಗರಿಕರ ಗುರುತಿನ ಚೀಟಿಗಾಗಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.',
    },
    department: {
      en: 'Department for the Empowerment of Differently Abled & Senior Citizens (Sample Demo)',
      kn: 'ವಿಕಲಚೇತನರ ಹಾಗೂ ಹಿರಿಯ ನಾಗರಿಕರ ಸಬಲೀಕರಣ ಇಲಾಖೆ (ಮಾದರಿ ಡೆಮೊ)',
    },
    processingTime: {
      en: '7 to 15 working days (Sample estimate)',
      kn: '7 ರಿಂದ 15 ಕಾರ್ಯದಿನಗಳು (ಮಾದರಿ ಅಂದಾಜು)',
    },
    fee: {
      en: '₹50 service charge at Seva Sindhu / Bangalore One (Sample)',
      kn: 'ಸೇವಾ ಸಿಂಧು / ಬೆಂಗಳೂರು ಒನ್ ಕೇಂದ್ರದಲ್ಲಿ ₹50 ಸೇವಾ ಶುಲ್ಕ (ಮಾದರಿ)',
    },
    questions: [
      {
        id: 'age_group',
        question: {
          en: 'What is the applicant’s current age?',
          kn: 'ಅರ್ಜಿದಾರರ ಪ್ರಸ್ತುತ ವಯಸ್ಸು ಎಷ್ಟು?',
        },
        helpText: {
          en: 'Senior citizen benefits in Karnataka require the applicant to be 60 years or older.',
          kn: 'ಕರ್ನಾಟಕದಲ್ಲಿ ಹಿರಿಯ ನಾಗರಿಕರ ಸೌಲಭ್ಯ ಪಡೆಯಲು ಕನಿಷ್ಠ 60 ವರ್ಷ ವಯಸ್ಸಾಗಿರಬೇಕು.',
        },
        options: [
          {
            value: '60_plus',
            label: { en: '60 years or above', kn: '60 ವರ್ಷ ಅಥವಾ ಅದಕ್ಕಿಂತ ಹೆಚ್ಚು' },
          },
          {
            value: 'under_60',
            label: { en: 'Below 60 years', kn: '60 ವರ್ಷಕ್ಕಿಂತ ಕಡಿಮೆ' },
          },
        ],
      },
      {
        id: 'residence_status',
        question: {
          en: 'Does the applicant reside in Karnataka with a local address proof?',
          kn: 'ಅರ್ಜಿದಾರರು ಕರ್ನಾಟಕದ ನಿವಾಸಿಯಾಗಿದ್ದು ಸ್ಥಳೀಯ ವಿಳಾಸ ಪುರಾವೆ ಹೊಂದಿದ್ದಾರೆಯೇ?',
        },
        helpText: {
          en: 'Determines which address documents you need to bring.',
          kn: 'ನೀವು ಯಾವ ವಿಳಾಸ ದಾಖಲೆಗಳನ್ನು ಒದಗಿಸಬೇಕು ಎಂಬುದನ್ನು ಇದು ನಿರ್ಧರಿಸುತ್ತದೆ.',
        },
        options: [
          {
            value: 'own_address_aadhaar',
            label: {
              en: 'Yes, current Karnataka address is on Aadhaar',
              kn: 'ಹೌದು, ಆಧಾರ್ ಕಾರ್ಡ್‌ನಲ್ಲಿ ಪ್ರಸ್ತುತ ಕರ್ನಾಟಕದ ವಿಳಾಸವಿದೆ',
            },
          },
          {
            value: 'rented_or_different',
            label: {
              en: 'Living in rented home / Aadhaar has old address',
              kn: 'ಬಾಡಿಗೆ ಮನೆಯಲ್ಲಿದ್ದಾರೆ / ಆಧಾರ್‌ನಲ್ಲಿ ಹಳೆಯ ವಿಳಾಸವಿದೆ',
            },
          },
          {
            value: 'outside_state',
            label: {
              en: 'Residing outside Karnataka',
              kn: 'ಕರ್ನಾಟಕದ ಹೊರಗೆ ವಾಸಿಸುತ್ತಿದ್ದಾರೆ',
            },
          },
        ],
      },
      {
        id: 'age_proof_type',
        question: {
          en: 'Which age proof document is available?',
          kn: 'ವಯಸ್ಸಿನ ದೃಢೀಕರಣಕ್ಕಾಗಿ ಯಾವ ದಾಖಲೆ ಲಭ್ಯವಿದೆ?',
        },
        helpText: {
          en: 'Select the document you will attach to verify date of birth.',
          kn: 'ಜನ್ಮ ದಿನಾಂಕವನ್ನು ದೃಢೀಕರಿಸಲು ನೀವು ಲಗತ್ತಿಸುವ ದಾಖಲೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.',
        },
        options: [
          {
            value: 'school_or_birth',
            label: {
              en: 'SSLC / School Transfer Certificate or Birth Certificate',
              kn: 'ಎಸ್‌ಎಸ್‌ಎಲ್‌ಸಿ ಅಂಕಪಟ್ಟಿ / ಶಾಲಾ ವರ್ಗಾವಣೆ ಪತ್ರ ಅಥವಾ ಜನನ ಪ್ರಮಾಣಪತ್ರ',
            },
          },
          {
            value: 'passport_or_dl',
            label: {
              en: 'Passport, Voter ID, or Driving Licence',
              kn: 'ಪಾಸ್‌ಪೋರ್ಟ್, ಮತದಾರರ ಗುರುತಿನ ಚೀಟಿ ಅಥವಾ ಡ್ರೈವಿಂಗ್ ಲೈಸೆನ್ಸ್',
            },
          },
          {
            value: 'medical_board',
            label: {
              en: 'No birth record — need Government Doctor Age Certificate',
              kn: 'ಜನನ ದಾಖಲೆ ಇಲ್ಲ — ಸರ್ಕಾರಿ ವೈದ್ಯಾಧಿಕಾರಿಗಳ ವಯಸ್ಸಿನ ಪ್ರಮಾಣಪತ್ರ ಬೇಕು',
            },
          },
        ],
      },
    ],
    evaluateEligibility: (answers) => {
      if (answers.age_group === 'under_60') {
        return {
          status: 'not_eligible',
          headline: {
            en: 'Not eligible yet — Applicant must be 60 years or older',
            kn: 'ಇನ್ನೂ ಅರ್ಹರಲ್ಲ — ಅರ್ಜಿದಾರರಿಗೆ ಕನಿಷ್ಠ 60 ವರ್ಷ ವಯಸ್ಸಾಗಿರಬೇಕು',
          },
          explanation: {
            en: 'The Senior Citizen Identity Card is issued only to residents aged 60 years and above. Once the applicant turns 60, they can apply online or at a Bangalore One / Karnataka One center.',
            kn: 'ಹಿರಿಯ ನಾಗರಿಕರ ಗುರುತಿನ ಚೀಟಿಯನ್ನು 60 ವರ್ಷ ಮತ್ತು ಮೇಲ್ಪಟ್ಟ ನಿವಾಸಿಗಳಿಗೆ ಮಾತ್ರ ನೀಡಲಾಗುತ್ತದೆ. 60 ವರ್ಷ ಪೂರ್ಣಗೊಂಡ ನಂತರ ಅರ್ಜಿ ಸಲ್ಲಿಸಬಹುದು.',
          },
        };
      }
      if (answers.residence_status === 'outside_state') {
        return {
          status: 'not_eligible',
          headline: {
            en: 'State residency required for Karnataka Senior Citizen Card',
            kn: 'ಕರ್ನಾಟಕದ ಹಿರಿಯ ನಾಗರಿಕರ ಕಾರ್ಡ್‌ಗೆ ರಾಜ್ಯದ ವಾಸಸ್ಥಳ ಪುರಾವೆ ಕಡ್ಡಾಯ',
          },
          explanation: {
            en: 'This state portal service is for permanent or current residents of Karnataka. Please apply through your respective state social welfare portal.',
            kn: 'ಈ ಸೇವೆಯು ಕರ್ನಾಟಕದ ನಿವಾಸಿಗಳಿಗೆ ಮಾತ್ರ ಲಭ್ಯವಿದೆ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ರಾಜ್ಯದ ಸಮಾಜ ಕಲ್ಯಾಣ ಪೋರ್ಟಲ್ ಮೂಲಕ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.',
          },
        };
      }
      if (answers.residence_status === 'rented_or_different' || answers.age_proof_type === 'medical_board') {
        return {
          status: 'conditional',
          headline: {
            en: 'Eligible with supporting residency / age verification documents',
            kn: 'ಪೂರಕ ವಿಳಾಸ / ವಯಸ್ಸಿನ ದೃಢೀಕರಣ ದಾಖಲೆಗಳೊಂದಿಗೆ ಅರ್ಹರು',
          },
          explanation: {
            en: 'You meet the 60+ age requirement. Because your Aadhaar address differs or you need a medical age certificate, we have added those specific supporting documents to your tailored checklist below.',
            kn: 'ನೀವು 60+ ವಯಸ್ಸಿನ ಅರ್ಹತೆಯನ್ನು ಹೊಂದಿದ್ದೀರಿ. ನಿಮ್ಮ ಆಯ್ಕೆಗೆ ಅನುಗುಣವಾಗಿ ಹೆಚ್ಚುವರಿ ಪೂರಕ ದಾಖಲೆಗಳನ್ನು ಕೆಳಗಿನ ಪಟ್ಟಿಯಲ್ಲಿ ಸೇರಿಸಲಾಗಿದೆ.',
          },
        };
      }
      return {
        status: 'eligible',
        headline: {
          en: 'Eligible for Senior Citizen Identity Card',
          kn: 'ಹಿರಿಯ ನಾಗರಿಕರ ಗುರುತಿನ ಚೀಟಿ ಪಡೆಯಲು ನೀವು ಅರ್ಹರಾಗಿದ್ದೀರಿ',
        },
        explanation: {
          en: 'Based on your answers (Age 60+ and valid Karnataka residency proof), you can apply directly via the Seva Sindhu portal or at your nearest citizen service center.',
          kn: 'ನಿಮ್ಮ ಉತ್ತರಗಳ ಆಧಾರದ ಮೇಲೆ (60+ ವಯಸ್ಸು ಮತ್ತು ಕರ್ನಾಟಕದ ವಿಳಾಸ ಪುರಾವೆ), ನೀವು ಸೇವಾ ಸಿಂಧು ಪೋರ್ಟಲ್ ಅಥವಾ ಹತ್ತಿರದ ನಾಗರಿಕ ಸೇವಾ ಕೇಂದ್ರದ ಮೂಲಕ ಅರ್ಜಿ ಸಲ್ಲಿಸಬಹುದು.',
        },
      };
    },
    baseDocuments: [
      {
        id: 'doc-aadhaar',
        name: {
          en: 'Aadhaar Card (Identity & Biometric e-KYC)',
          kn: 'ಆಧಾರ್ ಕಾರ್ಡ್ (ಗುರುತು ಮತ್ತು ಇ-ಕೆವೈಸಿ ದೃಢೀಕರಣ)',
        },
        detail: {
          en: 'Original scan or DigiLocker copy; mobile number linked to Aadhaar for OTP.',
          kn: 'ಮೂಲ ಆಧಾರ್ ಸ್ಕ್ಯಾನ್ ಅಥವಾ ಡಿಜಿಲಾಕರ್ ಪ್ರತಿ; ಒಟಿಪಿಗಾಗಿ ಆಧಾರ್‌ಗೆ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಲಿಂಕ್ ಆಗಿರಬೇಕು.',
        },
        isMandatory: true,
      },
      {
        id: 'doc-photo',
        name: {
          en: '2 Recent Passport-Size Photographs & Blood Group Report',
          kn: '2 ಇತ್ತೀಚಿನ ಪಾಸ್‌ಪೋರ್ಟ್ ಅಳತೆಯ ಭಾವಚಿತ್ರಗಳು ಮತ್ತು ರಕ್ತದ ಗುಂಪಿನ ವರದಿ',
        },
        detail: {
          en: 'Clear front-facing photo (under 50 KB for online upload) and blood group certificate from any lab/clinic.',
          kn: 'ಸ್ಪಷ್ಟ ಭಾವಚಿತ್ರ (ಆನ್‌ಲೈನ್ ಅಪ್‌ಲೋಡ್‌ಗೆ 50 KB ಗಿಂತ ಕಡಿಮೆ) ಮತ್ತು ರಕ್ತದ ಗುಂಪಿನ ದೃಢೀಕರಣ ಪತ್ರ.',
        },
        isMandatory: true,
      },
      {
        id: 'doc-school-birth',
        name: {
          en: 'SSLC Marks Card / Transfer Certificate or Birth Certificate',
          kn: 'ಎಸ್‌ಎಸ್‌ಎಲ್‌ಸಿ ಅಂಕಪಟ್ಟಿ / ವರ್ಗಾವಣೆ ಪತ್ರ ಅಥವಾ ಜನನ ಪ್ರಮಾಣಪತ್ರ',
        },
        detail: {
          en: 'Selected as your primary proof of Date of Birth.',
          kn: 'ಜನ್ಮ ದಿನಾಂಕದ ಪ್ರಮುಖ ಪುರಾವೆಯಾಗಿ ಆಯ್ಕೆಮಾಡಲಾಗಿದೆ.',
        },
        conditionQuestionId: 'age_proof_type',
        conditionValues: ['school_or_birth'],
        isMandatory: true,
      },
      {
        id: 'doc-passport-dl',
        name: {
          en: 'Passport, Voter ID, or Driving Licence showing Date of Birth',
          kn: 'ಜನ್ಮ ದಿನಾಂಕ ತೋರಿಸುವ ಪಾಸ್‌ಪೋರ್ಟ್, ವೋಟರ್ ಐಡಿ ಅಥವಾ ಡ್ರೈವಿಂಗ್ ಲೈಸೆನ್ಸ್',
        },
        detail: {
          en: 'Self-attested copy clearly showing full date of birth.',
          kn: 'ಪೂರ್ಣ ಜನ್ಮ ದಿನಾಂಕವನ್ನು ಸ್ಪಷ್ಟವಾಗಿ ತೋರಿಸುವ ಸ್ವಯಂ ದೃಢೀಕೃತ ಪ್ರತಿ.',
        },
        conditionQuestionId: 'age_proof_type',
        conditionValues: ['passport_or_dl'],
        isMandatory: true,
      },
      {
        id: 'doc-medical-age',
        name: {
          en: 'Age Certificate issued by a Government Hospital Medical Officer',
          kn: 'ಸರ್ಕಾರಿ ಆಸ್ಪತ್ರೆಯ ವೈದ್ಯಾಧಿಕಾರಿಗಳಿಂದ ಪಡೆದ ವಯಸ್ಸಿನ ಪ್ರಮಾಣಪತ್ರ',
        },
        detail: {
          en: 'Required when school or birth records are unavailable.',
          kn: 'ಶಾಲಾ ದಾಖಲೆ ಅಥವಾ ಜನನ ಪ್ರಮಾಣಪತ್ರ ಇಲ್ಲದಿದ್ದಾಗ ಇದು ಕಡ್ಡಾಯವಾಗಿದೆ.',
        },
        conditionQuestionId: 'age_proof_type',
        conditionValues: ['medical_board'],
        isMandatory: true,
      },
      {
        id: 'doc-rental-utility',
        name: {
          en: 'Registered Rental Agreement + Latest Electricity (BESCOM/ESCOM) or Water Bill',
          kn: 'ಬಾಡಿಗೆ ಕರಾರು ಪತ್ರ + ಇತ್ತೀಚಿನ ವಿದ್ಯುತ್ ಬಿಲ್ ಅಥವಾ ನೀರಿನ ಬಿಲ್',
        },
        detail: {
          en: 'Added because your current Karnataka residence differs from the address printed on your Aadhaar.',
          kn: 'ಆಧಾರ್‌ನಲ್ಲಿರುವ ವಿಳಾಸಕ್ಕಿಂತ ಪ್ರಸ್ತುತ ವಿಳಾಸ ಭಿನ್ನವಾಗಿರುವುದರಿಂದ ಈ ದಾಖಲೆ ಸೇರಿಸಲಾಗಿದೆ.',
        },
        conditionQuestionId: 'residence_status',
        conditionValues: ['rented_or_different'],
        isMandatory: true,
      },
    ],
    steps: [
      {
        stepNumber: '01',
        title: {
          en: 'Log in to the Seva Sindhu portal or visit a citizen center',
          kn: 'ಸೇವಾ ಸಿಂಧು ಪೋರ್ಟಲ್‌ಗೆ ಲಾಗಿನ್ ಮಾಡಿ ಅಥವಾ ಸೇವಾ ಕೇಂದ್ರಕ್ಕೆ ಭೇಟಿ ನೀಡಿ',
        },
        description: {
          en: 'Open Seva Sindhu (sevasindhu.karnataka.gov.in) using your mobile number and OTP, or walk into your nearest Bangalore One / Karnataka One / Grama One center.',
          kn: 'ನಿಮ್ಮ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಮತ್ತು ಒಟಿಪಿ ಬಳಸಿ ಸೇವಾ ಸಿಂಧು ಪೋರ್ಟಲ್ ತೆರೆಯಿರಿ ಅಥವಾ ಹತ್ತಿರದ ಬೆಂಗಳೂರು ಒನ್ / ಕರ್ನಾಟಕ ಒನ್ / ಗ್ರಾಮ ಒನ್ ಕೇಂದ್ರಕ್ಕೆ ಭೇಟಿ ನೀಡಿ.',
        },
      },
      {
        stepNumber: '02',
        title: {
          en: 'Select "Application for Senior Citizen Identity Card"',
          kn: '"ಹಿರಿಯ ನಾಗರಿಕರ ಗುರುತಿನ ಚೀಟಿಗಾಗಿ ಅರ್ಜಿ" ಆಯ್ಕೆಮಾಡಿ',
        },
        description: {
          en: 'Search for the Department for the Empowerment of Differently Abled and Senior Citizens and open the application form.',
          kn: 'ವಿಕಲಚೇತನರ ಮತ್ತು ಹಿರಿಯ ನಾಗರಿಕರ ಸಬಲೀಕರಣ ಇಲಾಖೆಯಡಿ ಹಿರಿಯ ನಾಗರಿಕರ ಗುರುತಿನ ಚೀಟಿ ಅರ್ಜಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.',
        },
      },
      {
        stepNumber: '03',
        title: {
          en: 'Enter details and upload your tailored checklist documents',
          kn: 'ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ ಮತ್ತು ದಾಖಲೆಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
        },
        description: {
          en: 'Complete Aadhaar e-KYC, enter emergency contact and blood group details, and upload the PDF/JPG scans from your checklist above.',
          kn: 'ಆಧಾರ್ ಇ-ಕೆವೈಸಿ ಪೂರ್ಣಗೊಳಿಸಿ, ರಕ್ತದ ಗುಂಪು ಮತ್ತು ತುರ್ತು ಸಂಪರ್ಕ ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ ಹಾಗೂ ಮೇಲಿನ ಪಟ್ಟಿಯಲ್ಲಿರುವ ದಾಖಲೆಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.',
        },
      },
      {
        stepNumber: '04',
        title: {
          en: 'Save your acknowledgement number & download the e-Card',
          kn: 'ಸ್ವೀಕೃತಿ ಸಂಖ್ಯೆಯನ್ನು ಕಾಯ್ದಿರಿಸಿ ಮತ್ತು ಇ-ಕಾರ್ಡ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',
        },
        description: {
          en: 'After verification by the Assistant Director of the district welfare office, you will receive an SMS link to download your digitally signed Senior Citizen Card.',
          kn: 'ಜಿಲ್ಲಾ ಕಲ್ಯಾಣ ಅಧಿಕಾರಿಗಳ ಪರಿಶೀಲನೆಯ ನಂತರ, ಡಿಜಿಟಲ್ ಸಹಿ ಮಾಡಿದ ಹಿರಿಯ ನಾಗರಿಕರ ಕಾರ್ಡ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಲು ಎಸ್‌ಎಂಎಸ್ ಬರುತ್ತದೆ.',
        },
      },
    ],
    officialLinks: [
      {
        id: 'link-seva-sindhu',
        label: {
          en: 'Open Seva Sindhu Application Portal',
          kn: 'ಸೇವಾ ಸಿಂಧು ಅರ್ಜಿ ಪೋರ್ಟಲ್ ತೆರೆಯಿರಿ',
        },
        portalName: {
          en: 'Seva Sindhu Karnataka (sevasindhu.karnataka.gov.in)',
          kn: 'ಸೇವಾ ಸಿಂಧು ಕರ್ನಾಟಕ (sevasindhu.karnataka.gov.in)',
        },
        url: 'https://sevasindhu.karnataka.gov.in/',
        type: 'portal',
        description: {
          en: 'Official integrated citizen service portal of the Government of Karnataka.',
          kn: 'ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಅಧಿಕೃತ ಏಕೀಕೃತ ನಾಗರಿಕ ಸೇವಾ ಪೋರ್ಟಲ್.',
        },
      },
      {
        id: 'link-senior-dept',
        label: {
          en: 'View Department Guidelines & Welfare Schemes',
          kn: 'ಇಲಾಖೆಯ ಮಾರ್ಗಸೂಚಿಗಳು ಮತ್ತು ಕಲ್ಯಾಣ ಯೋಜನೆಗಳನ್ನು ನೋಡಿ',
        },
        portalName: {
          en: 'Directorate of Welfare of Disabled & Senior Citizens (dwdsc.karnataka.gov.in)',
          kn: 'ವಿಕಲಚೇತನರ ಹಾಗೂ ಹಿರಿಯ ನಾಗರಿಕರ ಸಬಲೀಕರಣ ಇಲಾಖೆ (dwdsc.karnataka.gov.in)',
        },
        url: 'https://dwdsc.karnataka.gov.in/',
        type: 'source',
        description: {
          en: 'Official government source for eligibility circulars, helpline 14567, and senior citizen rules.',
          kn: 'ಅರ್ಹತಾ ಸುತ್ತೋಲೆಗಳು ಮತ್ತು ಹಿರಿಯ ನಾಗರಿಕರ ಸಹಾಯವಾಣಿ 14567 ರ ಅಧಿಕೃತ ಮೂಲ.',
        },
      },
    ],
    linkedIssueCategory: 'Local service information request',
  },
  {
    id: 'gov-income-caste-cert',
    indexNumber: '02',
    category: 'Certificates & Welfare',
    categoryLabel: {
      en: 'Revenue & Scholarships',
      kn: 'ಕಂದಾಯ ಮತ್ತು ವಿದ್ಯಾರ್ಥಿವೇತನ ಪ್ರಮಾಣಪತ್ರಗಳು',
    },
    name: {
      en: 'Income & Caste Certificate (Nadakacheri / Atalji Janasnehi)',
      kn: 'ಆದಾಯ ಮತ್ತು ಜಾತಿ ಪ್ರಮಾಣಪತ್ರ (ನಾಡಕಚೇರಿ / ಅಟಲ್ ಜೀ ಜನಸ್ನೇಹಿ)',
    },
    shortDescription: {
      en: 'Obtain a digitally signed Income and Caste Certificate for school/college admissions, scholarships, fee reimbursement, or government recruitment.',
      kn: 'ಶಾಲಾ/ಕಾಲೇಜು ಪ್ರವೇಶ, ವಿದ್ಯಾರ್ಥಿವೇತನ, ಶುಲ್ಕ ಮರುಪಾವತಿ ಅಥವಾ ಸರ್ಕಾರಿ ಉದ್ಯೋಗಕ್ಕಾಗಿ ಡಿಜಿಟಲ್ ಸಹಿ ಮಾಡಿದ ಆದಾಯ ಮತ್ತು ಜಾತಿ ಪ್ರಮಾಣಪತ್ರ ಪಡೆಯಿರಿ.',
    },
    department: {
      en: 'Revenue Department — Atalji Janasnehi Directorate (Sample Demo)',
      kn: 'ಕಂದಾಯ ಇಲಾಖೆ — ಅಟಲ್ ಜೀ ಜನಸ್ನೇಹಿ ನಿರ್ದೇಶನಾಲಯ (ಮಾದರಿ ಡೆಮೊ)',
    },
    processingTime: {
      en: '7 working days under Sakala (Instant if RD number exists)',
      kn: 'ಸಕಾಲ ಅಡಿಯಲ್ಲಿ 7 ಕಾರ್ಯದಿನಗಳು (ಹಳೆಯ ಆರ್.ಡಿ ಸಂಖ್ಯೆ ಇದ್ದರೆ ತಕ್ಷಣ)',
    },
    fee: {
      en: '₹40 per certificate (Sample)',
      kn: 'ಪ್ರತಿ ಪ್ರಮಾಣಪತ್ರಕ್ಕೆ ₹40 ಶುಲ್ಕ (ಮಾದರಿ)',
    },
    questions: [
      {
        id: 'purpose_type',
        question: {
          en: 'What is the primary purpose of this certificate?',
          kn: 'ಈ ಪ್ರಮಾಣಪತ್ರದ ಮುಖ್ಯ ಉದ್ದೇಶವೇನು?',
        },
        helpText: {
          en: 'Helps determine whether student school records or employment declarations are needed.',
          kn: 'ವಿದ್ಯಾರ್ಥಿ ಶಾಲಾ ದಾಖಲೆಗಳು ಅಥವಾ ಉದ್ಯೋಗ ಘೋಷಣೆ ಅಗತ್ಯವಿದೆಯೇ ಎಂದು ನಿರ್ಧರಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.',
        },
        options: [
          {
            value: 'student_scholarship',
            label: {
              en: 'Student scholarship / school or college admission',
              kn: 'ವಿದ್ಯಾರ್ಥಿವೇತನ / ಶಾಲಾ ಅಥವಾ ಕಾಲೇಜು ಪ್ರವೇಶ',
            },
          },
          {
            value: 'scheme_or_job',
            label: {
              en: 'Government welfare scheme or job application',
              kn: 'ಸರ್ಕಾರಿ ಕಲ್ಯಾಣ ಯೋಜನೆ ಅಥವಾ ಉದ್ಯೋಗ ಅರ್ಜಿ',
            },
          },
        ],
      },
      {
        id: 'previous_rd',
        question: {
          en: 'Do you have an earlier Certificate RD Number (starting with RD00...)?',
          kn: 'ನಿಮ್ಮ ಬಳಿ ಹಿಂದಿನ ಪ್ರಮಾಣಪತ್ರದ ಆರ್.ಡಿ ಸಂಖ್ಯೆ (RD00...) ಇದೆಯೇ?',
        },
        helpText: {
          en: 'An existing RD number allows fast renewal without a repeat field inspection in many cases.',
          kn: 'ಹಳೆಯ ಆರ್.ಡಿ ಸಂಖ್ಯೆ ಇದ್ದಲ್ಲಿ ಮರು-ಪರಿಶೀಲನೆ ಇಲ್ಲದೆ ವೇಗವಾಗಿ ನವೀಕರಿಸಬಹುದು.',
        },
        options: [
          {
            value: 'has_rd',
            label: {
              en: 'Yes, I have a previous RD number',
              kn: 'ಹೌದು, ನನ್ನ ಬಳಿ ಹಿಂದಿನ ಆರ್.ಡಿ ಸಂಖ್ಯೆ ಇದೆ',
            },
          },
          {
            value: 'first_time',
            label: {
              en: 'No, applying for the first time',
              kn: 'ಇಲ್ಲ, ಮೊದಲ ಬಾರಿಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸುತ್ತಿದ್ದೇನೆ',
            },
          },
        ],
      },
      {
        id: 'family_income_source',
        question: {
          en: 'What is the household’s main source of income?',
          kn: 'ಕುಟುಂಬದ ಮುಖ್ಯ ಆದಾಯದ ಮೂಲ ಯಾವುದು?',
        },
        helpText: {
          en: 'Tailors the income proof document required by the Village Accountant / Revenue Inspector.',
          kn: 'ಗ್ರಾಮ ಆಡಳಿತಾಧಿಕಾರಿ / ಕಂದಾಯ ನಿರೀಕ್ಷಕರಿಗೆ ಸಲ್ಲಿಸಬೇಕಾದ ಆದಾಯ ಪುರಾವೆಯನ್ನು ನಿರ್ಧರಿಸುತ್ತದೆ.',
        },
        options: [
          {
            value: 'unorganized_or_agri',
            label: {
              en: 'Agriculture, daily wage, or self-employed (Ration Card holder)',
              kn: 'ಕೃಷಿ, ದಿನಗೂಲಿ ಅಥವಾ ಸ್ವಯಂ ಉದ್ಯೋಗ (ರೇಷನ್ ಕಾರ್ಡ್ ಹೊಂದಿರುವವರು)',
            },
          },
          {
            value: 'salaried',
            label: {
              en: 'Salaried employment (Private or Public sector)',
              kn: 'ವೇತನದಾರರು (ಖಾಸಗಿ ಅಥವಾ ಸರ್ಕಾರಿ ಉದ್ಯೋಗ)',
            },
          },
        ],
      },
    ],
    evaluateEligibility: (answers) => {
      if (answers.previous_rd === 'has_rd') {
        return {
          status: 'eligible',
          headline: {
            en: 'Eligible for Fast-Track Renewal via Nadakacheri',
            kn: 'ನಾಡಕಚೇರಿ ಮೂಲಕ ವೇಗದ ನವೀಕರಣಕ್ಕೆ ನೀವು ಅರ್ಹರಾಗಿದ್ದೀರಿ',
          },
          explanation: {
            en: 'Because you already hold a previous RD number, you can enter it on the Nadakacheri portal to auto-fetch your caste verification details and update only your current family income.',
            kn: 'ನಿಮ್ಮ ಬಳಿ ಹಿಂದಿನ ಆರ್.ಡಿ ಸಂಖ್ಯೆ ಇರುವುದರಿಂದ, ನಾಡಕಚೇರಿ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಅದನ್ನು ನಮೂದಿಸಿ ನಿಮ್ಮ ವಿವರಗಳನ್ನು ಸುಲಭವಾಗಿ ನವೀಕರಿಸಬಹುದು.',
          },
        };
      }
      return {
        status: 'eligible',
        headline: {
          en: 'Eligible to apply for fresh Income & Caste Certificate',
          kn: 'ಹೊಸ ಆದಾಯ ಮತ್ತು ಜಾತಿ ಪ್ರಮಾಣಪತ್ರಕ್ಕಾಗಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಲು ಅರ್ಹರು',
        },
        explanation: {
          en: 'First-time applications are verified by the local Village Accountant (VA) and Revenue Inspector (RI) before the Tahsildar issues the digitally signed RD certificate.',
          kn: 'ಮೊದಲ ಬಾರಿಯ ಅರ್ಜಿಗಳನ್ನು ಗ್ರಾಮ ಆಡಳಿತಾಧಿಕಾರಿ ಮತ್ತು ಕಂದಾಯ ನಿರೀಕ್ಷಕರು ಪರಿಶೀಲಿಸಿದ ನಂತರ ತಹಶೀಲ್ದಾರರು ಡಿಜಿಟಲ್ ಸಹಿ ಮಾಡಿದ ಪ್ರಮಾಣಪತ್ರ ನೀಡುತ್ತಾರೆ.',
        },
      };
    },
    baseDocuments: [
      {
        id: 'doc-aadhaar-ration',
        name: {
          en: 'Applicant Aadhaar Card & Family Ration Card',
          kn: 'ಅರ್ಜಿದಾರರ ಆಧಾರ್ ಕಾರ್ಡ್ ಮತ್ತು ಕುಟುಂಬದ ಪಡಿತರ ಚೀಟಿ (ರೇಷನ್ ಕಾರ್ಡ್)',
        },
        detail: {
          en: 'Used to verify family members and residential ward/village.',
          kn: 'ಕುಟುಂಬದ ಸದಸ್ಯರು ಮತ್ತು ವಾಸಸ್ಥಳವನ್ನು ದೃಢೀಕರಿಸಲು ಬಳಸಲಾಗುತ್ತದೆ.',
        },
        isMandatory: true,
      },
      {
        id: 'doc-old-rd',
        name: {
          en: 'Copy of Previous Certificate showing RD Number (RD00...)',
          kn: 'ಹಳೆಯ ಪ್ರಮಾಣಪತ್ರದ ಪ್ರತಿ (ಆರ್.ಡಿ ಸಂಖ್ಯೆ RD00... ಇರುವುದು)',
        },
        detail: {
          en: 'Keep the 15-digit RD number handy for instant lookup.',
          kn: 'ತಕ್ಷಣದ ಪರಿಶೀಲನೆಗಾಗಿ 15 ಅಂಕಿಗಳ ಆರ್.ಡಿ ಸಂಖ್ಯೆಯನ್ನು ಸಿದ್ಧವಾಗಿಟ್ಟುಕೊಳ್ಳಿ.',
        },
        conditionQuestionId: 'previous_rd',
        conditionValues: ['has_rd'],
        isMandatory: true,
      },
      {
        id: 'doc-school-tc',
        name: {
          en: 'School Transfer Certificate (TC) or Study Certificate showing Caste',
          kn: 'ಜಾತಿ ವಿವರ ನಮೂದಾಗಿರುವ ಶಾಲಾ ವರ್ಗಾವಣೆ ಪತ್ರ (TC) ಅಥವಾ ವ್ಯಾಸಂಗ ಪ್ರಮಾಣಪತ್ರ',
        },
        detail: {
          en: 'Applicant’s or father’s school record for first-time caste verification.',
          kn: 'ಮೊದಲ ಬಾರಿಯ ಜಾತಿ ಪರಿಶೀಲನೆಗಾಗಿ ಅರ್ಜಿದಾರರ ಅಥವಾ ತಂದೆಯ ಶಾಲಾ ದಾಖಲೆ.',
        },
        conditionQuestionId: 'previous_rd',
        conditionValues: ['first_time'],
        isMandatory: true,
      },
      {
        id: 'doc-student-bonafide',
        name: {
          en: 'Student SATS Number / College Admission Slip',
          kn: 'ವಿದ್ಯಾರ್ಥಿಯ SATS ಸಂಖ್ಯೆ / ಕಾಲೇಜು ಪ್ರವೇಶ ಚೀಟಿ',
        },
        detail: {
          en: 'Links your RD number directly to the SSP / National Scholarship Portal.',
          kn: 'ವಿದ್ಯಾರ್ಥಿವೇತನ ಪೋರ್ಟಲ್‌ಗೆ (SSP) ನಿಮ್ಮ ಆರ್.ಡಿ ಸಂಖ್ಯೆಯನ್ನು ನೇರವಾಗಿ ಜೋಡಿಸಲು ಸಹಕಾರಿ.',
        },
        conditionQuestionId: 'purpose_type',
        conditionValues: ['student_scholarship'],
        isMandatory: false,
      },
      {
        id: 'doc-self-decl-income',
        name: {
          en: 'Self-Declaration of Annual Family Income (Form signed by Applicant/Parent)',
          kn: 'ವಾರ್ಷಿಕ ಕುಟುಂಬ ಆದಾಯದ ಸ್ವಯಂ ಘೋಷಣಾ ಪತ್ರ',
        },
        detail: {
          en: 'Standard declaration form for agricultural, daily-wage, or self-employed households.',
          kn: 'ಕೃಷಿ, ದಿನಗೂಲಿ ಅಥವಾ ಸ್ವಯಂ ಉದ್ಯೋಗ ಹೊಂದಿರುವ ಕುಟುಂಬಗಳಿಗೆ ಸ್ವಯಂ ಘೋಷಣಾ ಪತ್ರ.',
        },
        conditionQuestionId: 'family_income_source',
        conditionValues: ['unorganized_or_agri'],
        isMandatory: true,
      },
      {
        id: 'doc-salary-slip',
        name: {
          en: 'Latest 3 Months Salary Slips or Form-16 / Employer Income Certificate',
          kn: 'ಕಳೆದ 3 ತಿಂಗಳ ವೇತನ ಚೀಟಿ (Salary Slip) ಅಥವಾ ಫಾರ್ಮ್-16',
        },
        detail: {
          en: 'Required to compute gross annual family income for salaried households.',
          kn: 'ವೇತನದಾರರ ಕುಟುಂಬದ ವಾರ್ಷಿಕ ಆದಾಯವನ್ನು ಲೆಕ್ಕಹಾಕಲು ಇದು ಅಗತ್ಯವಿದೆ.',
        },
        conditionQuestionId: 'family_income_source',
        conditionValues: ['salaried'],
        isMandatory: true,
      },
    ],
    steps: [
      {
        stepNumber: '01',
        title: {
          en: 'Open the Nadakacheri Online Application Portal',
          kn: 'ನಾಡಕಚೇರಿ ಆನ್‌ಲೈನ್ ಅರ್ಜಿ ಪೋರ್ಟಲ್ ತೆರೆಯಿರಿ',
        },
        description: {
          en: 'Visit nadakacheri.karnataka.gov.in and click "Apply Online", then log in with your mobile number.',
          kn: 'nadakacheri.karnataka.gov.in ಗೆ ಭೇಟಿ ನೀಡಿ, "Apply Online" ಕ್ಲಿಕ್ ಮಾಡಿ ಮತ್ತು ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯೊಂದಿಗೆ ಲಾಗಿನ್ ಮಾಡಿ.',
        },
      },
      {
        stepNumber: '02',
        title: {
          en: 'Choose Caste & Income Certificate and select District / Taluk / Hobli',
          kn: 'ಜಾತಿ ಮತ್ತು ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ ಆಯ್ಕೆಮಾಡಿ ಹಾಗೂ ಜಿಲ್ಲೆ / ತಾಲೂಕು / ಹೋಬಳಿ ನಮೂದಿಸಿ',
        },
        description: {
          en: 'Enter your existing RD number if renewing, or fill out applicant and parent details in English and Kannada.',
          kn: 'ನವೀಕರಣವಾಗಿದ್ದರೆ ಹಳೆಯ ಆರ್.ಡಿ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ, ಇಲ್ಲದಿದ್ದರೆ ಅರ್ಜಿದಾರರ ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ.',
        },
      },
      {
        stepNumber: '03',
        title: {
          en: 'Upload supporting documents and pay the ₹40 Sakala fee',
          kn: 'ಪೂರಕ ದಾಖಲೆಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಮತ್ತು ₹40 ಶುಲ್ಕ ಪಾವತಿಸಿ',
        },
        description: {
          en: 'Note down your 15-digit Acknowledgement Number (RD00...) shown on the receipt.',
          kn: 'ರಸೀದಿಯಲ್ಲಿ ತೋರಿಸುವ 15 ಅಂಕಿಗಳ ಸ್ವೀಕೃತಿ ಸಂಖ್ಯೆಯನ್ನು (RD00...) ಬರೆದಿಟ್ಟುಕೊಳ್ಳಿ.',
        },
      },
      {
        stepNumber: '04',
        title: {
          en: 'Track status & download digitally signed certificate',
          kn: 'ಅರ್ಜಿ ಸ್ಥಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಪ್ರಮಾಣಪತ್ರ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',
        },
        description: {
          en: 'Once approved by the Tahsildar, download the certificate directly from Nadakacheri or pull it into DigiLocker.',
          kn: 'ತಹಶೀಲ್ದಾರರ ಅನುಮೋದನೆಯ ನಂತರ ನಾಡಕಚೇರಿ ಪೋರ್ಟಲ್ ಅಥವಾ ಡಿಜಿಲಾಕರ್ ಮೂಲಕ ಪ್ರಮಾಣಪತ್ರ ಪಡೆಯಿರಿ.',
        },
      },
    ],
    officialLinks: [
      {
        id: 'link-nadakacheri-portal',
        label: {
          en: 'Open Nadakacheri Application Portal',
          kn: 'ನಾಡಕಚೇರಿ ಅರ್ಜಿ ಪೋರ್ಟಲ್ ತೆರೆಯಿರಿ',
        },
        portalName: {
          en: 'Atalji Janasnehi Kendra — Nadakacheri (nadakacheri.karnataka.gov.in)',
          kn: 'ಅಟಲ್ ಜೀ ಜನಸ್ನೇಹಿ ಕೇಂದ್ರ — ನಾಡಕಚೇರಿ (nadakacheri.karnataka.gov.in)',
        },
        url: 'https://nadakacheri.karnataka.gov.in/',
        type: 'portal',
        description: {
          en: 'Official Revenue Department portal to apply for and verify RD certificates.',
          kn: 'ಕಂದಾಯ ಇಲಾಖೆಯ ಪ್ರಮಾಣಪತ್ರಗಳಿಗಾಗಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಲು ಮತ್ತು ಪರಿಶೀಲಿಸಲು ಅಧಿಕೃತ ಪೋರ್ಟಲ್.',
        },
      },
      {
        id: 'link-sakala-source',
        label: {
          en: 'Check Sakala Guarantee Timelines (Official Source)',
          kn: 'ಸಕಾಲ ಸೇವಾ ಕಾಲಮಿತಿ ವಿವರಗಳನ್ನು ನೋಡಿ (ಅಧಿಕೃತ ಮೂಲ)',
        },
        portalName: {
          en: 'Sakala Mission Karnataka (sakala.kar.nic.in)',
          kn: 'ಸಕಾಲ ಮಿಷನ್ ಕರ್ನಾಟಕ (sakala.kar.nic.in)',
        },
        url: 'https://sakala.kar.nic.in/',
        type: 'source',
        description: {
          en: 'Statutory citizen service delivery timeline and application status tracker.',
          kn: 'ನಾಗರಿಕ ಸೇವೆಗಳ ಕಾಲಮಿತಿ ಮತ್ತು ಅರ್ಜಿ ಸ್ಥಿತಿ ಪರಿಶೀಲನೆಯ ಅಧಿಕೃತ ತಾಣ.',
        },
      },
    ],
    linkedIssueCategory: 'Local service information request',
  },
  {
    id: 'gov-ration-card-update',
    indexNumber: '03',
    category: 'Identity & Ration',
    categoryLabel: {
      en: 'Food & Civil Supplies',
      kn: 'ಆಹಾರ ಮತ್ತು ನಾಗರಿಕ ಸರಬರಾಜು',
    },
    name: {
      en: 'Ration Card Member Addition & Address Update (Ahara Portal)',
      kn: 'ಪಡಿತರ ಚೀಟಿಗೆ ಸದಸ್ಯರ ಸೇರ್ಪಡೆ ಮತ್ತು ವಿಳಾಸ ಬದಲಾವಣೆ (ಆಹಾರ ಪೋರ್ಟಲ್)',
    },
    shortDescription: {
      en: 'Add a newborn child or spouse to your household PHH (BPL) / NPHH (APL) Ration Card or update your local Fair Price Shop address.',
      kn: 'ನಿಮ್ಮ ಕುಟುಂಬದ ಬಿಪಿಎಲ್ / ಎಪಿಎಲ್ ಪಡಿತರ ಚೀಟಿಗೆ ಮಗುವಿನ ಅಥವಾ ಕುಟುಂಬ ಸದಸ್ಯರ ಹೆಸರು ಸೇರಿಸಿ ಅಥವಾ ವಿಳಾಸ ಬದಲಾಯಿಸಿ.',
    },
    department: {
      en: 'Department of Food, Civil Supplies & Consumer Affairs (Sample Demo)',
      kn: 'ಆಹಾರ, ನಾಗರಿಕ ಸರಬರಾಜು ಮತ್ತು ಗ್ರಾಹಕರ ವ್ಯವಹಾರಗಳ ಇಲಾಖೆ (ಮಾದರಿ ಡೆಮೊ)',
    },
    processingTime: {
      en: '7 to 10 working days (Sample estimate)',
      kn: '7 ರಿಂದ 10 ಕಾರ್ಯದಿನಗಳು (ಮಾದರಿ ಅಂದಾಜು)',
    },
    fee: {
      en: '₹50 biometric e-KYC update charge (Sample)',
      kn: '₹50 ಬಯೋಮೆಟ್ರಿಕ್ ಇ-ಕೆವೈಸಿ ಶುಲ್ಕ (ಮಾದರಿ)',
    },
    questions: [
      {
        id: 'update_reason',
        question: {
          en: 'What change do you want to make to the Ration Card?',
          kn: 'ಪಡಿತರ ಚೀಟಿಯಲ್ಲಿ ನೀವು ಯಾವ ಬದಲಾವಣೆ ಮಾಡಲು ಬಯಸುತ್ತೀರಿ?',
        },
        helpText: {
          en: 'Select the specific modification to customize your document checklist.',
          kn: 'ನಿಮ್ಮ ದಾಖಲೆಗಳ ಪಟ್ಟಿಯನ್ನು ಸಿದ್ಧಪಡಿಸಲು ಸೂಕ್ತ ಬದಲಾವಣೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.',
        },
        options: [
          {
            value: 'add_child',
            label: {
              en: 'Add a child to the existing Ration Card',
              kn: 'ಹಾಲಿ ಪಡಿತರ ಚೀಟಿಗೆ ಮಗುವಿನ ಹೆಸರು ಸೇರ್ಪಡೆ',
            },
          },
          {
            value: 'add_spouse',
            label: {
              en: 'Add spouse after marriage (with deletion certificate)',
              kn: 'ವಿವಾಹದ ನಂತರ ಸಂಗಾತಿಯ ಹೆಸರು ಸೇರ್ಪಡೆ',
            },
          },
          {
            value: 'change_address',
            label: {
              en: 'Change residential address & Fair Price Shop',
              kn: 'ವಾಸಸ್ಥಳ ವಿಳಾಸ ಮತ್ತು ನ್ಯಾಯಬೆಲೆ ಅಂಗಡಿ ಬದಲಾವಣೆ',
            },
          },
        ],
      },
      {
        id: 'card_category',
        question: {
          en: 'Which type of Ration Card does your family hold?',
          kn: 'ನಿಮ್ಮ ಕುಟುಂಬವು ಯಾವ ಬಗೆಯ ಪಡಿತರ ಚೀಟಿ ಹೊಂದಿದೆ?',
        },
        helpText: {
          en: 'PHH (Priority Household / BPL) requires an active Caste & Income RD number for member addition.',
          kn: 'ಬಿಪಿಎಲ್ (PHH) ಕಾರ್ಡ್‌ಗೆ ಸದಸ್ಯರನ್ನು ಸೇರಿಸಲು ಚಾಲ್ತಿಯಲ್ಲಿರುವ ಆದಾಯ ಮತ್ತು ಜಾತಿ ಪ್ರಮಾಣಪತ್ರದ ಆರ್.ಡಿ ಸಂಖ್ಯೆ ಬೇಕು.',
        },
        options: [
          {
            value: 'bpl_phh',
            label: {
              en: 'Priority Household (PHH / BPL) or Antyodaya Card',
              kn: 'ಆದ್ಯತಾ ಕುಟುಂಬ (PHH / BPL) ಅಥವಾ ಅಂತ್ಯೋದಯ ಕಾರ್ಡ್',
            },
          },
          {
            value: 'apl_nphh',
            label: {
              en: 'Non-Priority Household (NPHH / APL) Card',
              kn: 'ಆದ್ಯತೇತರ ಕುಟುಂಬ (NPHH / APL) ಕಾರ್ಡ್',
            },
          },
        ],
      },
    ],
    evaluateEligibility: (answers) => {
      if (answers.card_category === 'bpl_phh') {
        return {
          status: 'conditional',
          headline: {
            en: 'Eligible — Keep valid Income & Caste RD Number ready for BPL update',
            kn: 'ಅರ್ಹರು — ಬಿಪಿಎಲ್ ಕಾರ್ಡ್ ತಿದ್ದುಪಡಿಗಾಗಿ ಚಾಲ್ತಿಯಲ್ಲಿರುವ ಆದಾಯ ಪ್ರಮಾಣಪತ್ರದ RD ಸಂಖ್ಯೆ ಇಟ್ಟುಕೊಳ್ಳಿ',
          },
          explanation: {
            en: 'To add a member to a PHH (BPL) card on the Ahara portal, the member’s Aadhaar and an active Income Certificate RD number are verified automatically.',
            kn: 'ಆಹಾರ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಬಿಪಿಎಲ್ ಕಾರ್ಡ್‌ಗೆ ಸದಸ್ಯರನ್ನು ಸೇರಿಸಲು ಆಧಾರ್ ಮತ್ತು ಚಾಲ್ತಿಯಲ್ಲಿರುವ ಆದಾಯ ಪ್ರಮಾಣಪತ್ರದ RD ಸಂಖ್ಯೆಯನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಪರಿಶೀಲಿಸಲಾಗುತ್ತದೆ.',
          },
        };
      }
      return {
        status: 'eligible',
        headline: {
          en: 'Eligible for online Ration Card modification via Ahara',
          kn: 'ಆಹಾರ ಪೋರ್ಟಲ್ ಮೂಲಕ ಪಡಿತರ ಚೀಟಿ ತಿದ್ದುಪಡಿಗೆ ಅರ್ಹರು',
        },
        explanation: {
          en: 'NPHH (APL) card updates only require Aadhaar OTP / biometric verification and the supporting birth, marriage, or address document.',
          kn: 'ಎಪಿಎಲ್ ಕಾರ್ಡ್ ತಿದ್ದುಪಡಿಗೆ ಆಧಾರ್ ದೃಢೀಕರಣ ಮತ್ತು ಸಂಬಂಧಿತ ಜನನ, ವಿವಾಹ ಅಥವಾ ವಿಳಾಸ ದಾಖಲೆ ಸಾಕಾಗುತ್ತದೆ.',
        },
      };
    },
    baseDocuments: [
      {
        id: 'doc-rc-number',
        name: {
          en: 'Existing Ration Card Number & Aadhaar of Head of Family',
          kn: 'ಹಾಲಿ ಪಡಿತರ ಚೀಟಿ ಸಂಖ್ಯೆ ಮತ್ತು ಕುಟುಂಬದ ಮುಖ್ಯಸ್ಥರ ಆಧಾರ್ ಕಾರ್ಡ್',
        },
        detail: {
          en: 'Required to authenticate the family record on the Ahara portal.',
          kn: 'ಆಹಾರ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಕುಟುಂಬದ ವಿವರಗಳನ್ನು ದೃಢೀಕರಿಸಲು ಕಡ್ಡಾಯ.',
        },
        isMandatory: true,
      },
      {
        id: 'doc-child-birth',
        name: {
          en: 'Child’s Birth Certificate & Child’s Aadhaar Card',
          kn: 'ಮಗುವಿನ ಜನನ ಪ್ರಮಾಣಪತ್ರ ಮತ್ತು ಮಗುವಿನ ಆಧಾರ್ ಕಾರ್ಡ್',
        },
        detail: {
          en: 'Parent names on the Birth Certificate must match the Ration Card.',
          kn: 'ಜನನ ಪ್ರಮಾಣಪತ್ರದಲ್ಲಿರುವ ಪೋಷಕರ ಹೆಸರು ಪಡಿತರ ಚೀಟಿಗೆ ಹೊಂದಾಣಿಕೆಯಾಗಬೇಕು.',
        },
        conditionQuestionId: 'update_reason',
        conditionValues: ['add_child'],
        isMandatory: true,
      },
      {
        id: 'doc-spouse-marriage',
        name: {
          en: 'Marriage Certificate + Ration Card Name Deletion Certificate from previous family card',
          kn: 'ವಿವಾಹ ನೋಂದಣಿ ಪ್ರಮಾಣಪತ್ರ + ತವರು ಮನೆಯ ಪಡಿತರ ಚೀಟಿಯಿಂದ ಹೆಸರು ತೆಗೆದುಹಾಕಿದ ಪ್ರಮಾಣಪತ್ರ',
        },
        detail: {
          en: 'Ensures no duplicate Ration Card entry exists across the state.',
          kn: 'ಒಬ್ಬರ ಹೆಸರು ಎರಡು ಪಡಿತರ ಚೀಟಿಗಳಲ್ಲಿ ಇಲ್ಲ ಎಂಬುದನ್ನು ಖಚಿತಪಡಿಸಲು ಇದು ಅಗತ್ಯ.',
        },
        conditionQuestionId: 'update_reason',
        conditionValues: ['add_spouse'],
        isMandatory: true,
      },
      {
        id: 'doc-new-address',
        name: {
          en: 'Updated Aadhaar or Electricity Bill showing the new ward/village address',
          kn: 'ಹೊಸ ವಿಳಾಸ ತೋರಿಸುವ ಆಧಾರ್ ಕಾರ್ಡ್ ಅಥವಾ ವಿದ್ಯುತ್ ಬಿಲ್',
        },
        detail: {
          en: 'Used to assign your card to the nearest Fair Price Shop (Nyayabele Angadi).',
          kn: 'ಹತ್ತಿರದ ನ್ಯಾಯಬೆಲೆ ಅಂಗಡಿಯನ್ನು ನಿಯೋಜಿಸಲು ಈ ದಾಖಲೆ ಬಳಸಲಾಗುತ್ತದೆ.',
        },
        conditionQuestionId: 'update_reason',
        conditionValues: ['change_address'],
        isMandatory: true,
      },
      {
        id: 'doc-bpl-income-rd',
        name: {
          en: 'Income & Caste Certificate RD Number (RD00...) of the member being added',
          kn: 'ಸೇರಿಸಲಾಗುತ್ತಿರುವ ಸದಸ್ಯರ ಆದಾಯ ಮತ್ತು ಜಾತಿ ಪ್ರಮಾಣಪತ್ರದ ಆರ್.ಡಿ ಸಂಖ್ಯೆ (RD00...)',
        },
        detail: {
          en: 'Mandatory for Priority Household (PHH / BPL) cards.',
          kn: 'ಬಿಪಿಎಲ್ (PHH) ಪಡಿತರ ಚೀಟಿಗಳಿಗೆ ಇದು ಕಡ್ಡಾಯವಾಗಿದೆ.',
        },
        conditionQuestionId: 'card_category',
        conditionValues: ['bpl_phh'],
        isMandatory: true,
      },
    ],
    steps: [
      {
        stepNumber: '01',
        title: {
          en: 'Open the Ahara e-Services Portal during active service hours',
          kn: 'ಆಹಾರ ಇ-ಸೇವೆಗಳ ಪೋರ್ಟಲ್ ತೆರೆಯಿರಿ',
        },
        description: {
          en: 'Visit ahara.kar.nic.in and navigate to e-Services → e-Ration Card → Amendment / Correction to Existing Ration Card.',
          kn: 'ahara.kar.nic.in ಗೆ ಭೇಟಿ ನೀಡಿ, ಇ-ಸೇವೆಗಳು → ಇ-ಪಡಿತರ ಚೀಟಿ → ತಿದ್ದುಪಡಿ (Amendment) ಆಯ್ಕೆಮಾಡಿ.',
        },
      },
      {
        stepNumber: '02',
        title: {
          en: 'Authenticate with the Head of Family’s Aadhaar OTP or Biometrics',
          kn: 'ಕುಟುಂಬದ ಮುಖ್ಯಸ್ಥರ ಆಧಾರ್ ಒಟಿಪಿ ಅಥವಾ ಬಯೋಮೆಟ್ರಿಕ್ ಮೂಲಕ ದೃಢೀಕರಿಸಿ',
        },
        description: {
          en: 'Enter your Ration Card number and verify the OTP sent to the linked mobile number.',
          kn: 'ನಿಮ್ಮ ಪಡಿತರ ಚೀಟಿ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ ಮತ್ತು ನೋಂದಾಯಿತ ಮೊಬೈಲ್‌ಗೆ ಬರುವ ಒಟಿಪಿ ದೃಢೀಕರಿಸಿ.',
        },
      },
      {
        stepNumber: '03',
        title: {
          en: 'Enter member Aadhaar & RD Number and submit for Food Inspector review',
          kn: 'ಹೊಸ ಸದಸ್ಯರ ಆಧಾರ್ ಮತ್ತು ಆರ್.ಡಿ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ',
        },
        description: {
          en: 'After approval by the Food Inspector, download your updated e-Ration Card from the Ahara portal.',
          kn: 'ಆಹಾರ ನಿರೀಕ್ಷಕರ ಅನುಮೋದನೆಯ ನಂತರ ನಿಮ್ಮ ನವೀಕರಿಸಿದ ಇ-ಪಡಿತರ ಚೀಟಿಯನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ.',
        },
      },
    ],
    officialLinks: [
      {
        id: 'link-ahara-portal',
        label: {
          en: 'Open Ahara Karnataka e-Ration Portal',
          kn: 'ಆಹಾರ ಕರ್ನಾಟಕ ಇ-ಪಡಿತರ ಪೋರ್ಟಲ್ ತೆರೆಯಿರಿ',
        },
        portalName: {
          en: 'Department of Food & Civil Supplies (ahara.kar.nic.in)',
          kn: 'ಆಹಾರ ಮತ್ತು ನಾಗರಿಕ ಸರಬರಾಜು ಇಲಾಖೆ (ahara.kar.nic.in)',
        },
        url: 'https://ahara.kar.nic.in/',
        type: 'portal',
        description: {
          en: 'Official portal for Ration Card amendments, e-KYC status, and Fair Price Shop allocation.',
          kn: 'ಪಡಿತರ ಚೀಟಿ ತಿದ್ದುಪಡಿ, ಇ-ಕೆವೈಸಿ ಸ್ಥಿತಿ ಮತ್ತು ನ್ಯಾಯಬೆಲೆ ಅಂಗಡಿ ವಿವರಗಳ ಅಧಿಕೃತ ಪೋರ್ಟಲ್.',
        },
      },
    ],
    linkedIssueCategory: 'Local service information request',
  },
  {
    id: 'gov-civic-streetlight-roads',
    indexNumber: '04',
    category: 'Roads & Lighting',
    categoryLabel: {
      en: 'Municipal & Ward Services',
      kn: 'ನಗರಸಭೆ ಮತ್ತು ವಾರ್ಡ್ ಸೇವೆಗಳು',
    },
    name: {
      en: 'Municipal Grievance: Streetlight Outage, Pothole & Sanitation (Janaspandana / BBMP)',
      kn: 'ಸ್ಥಳೀಯ ನಾಗರಿಕ ದೂರು: ಬೀದಿ ದೀಪ, ರಸ್ತೆ ಗುಂಡಿ ಮತ್ತು ಸ್ವಚ್ಛತೆ (ಜನಸ್ಪಂದನ / ಬಿಬಿಎಂಪಿ)',
    },
    shortDescription: {
      en: 'Check how to file an official ward maintenance grievance or submit a sample issue directly in this Jan Setu demo.',
      kn: 'ವಾರ್ಡ್ ನಿರ್ವಹಣೆ ದೂರನ್ನು ಅಧಿಕೃತವಾಗಿ ದಾಖಲಿಸುವುದು ಹೇಗೆ ಎಂದು ತಿಳಿಯಿರಿ ಅಥವಾ ಈ ಜನ ಸೇತು ಡೆಮೊದಲ್ಲಿ ಮಾದರಿ ದೂರು ಸಲ್ಲಿಸಿ.',
    },
    department: {
      en: 'Urban Local Body / BBMP Sahaaya & Integrated Public Grievance Redressal (Sample Demo)',
      kn: 'ನಗರ ಸ್ಥಳೀಯ ಸಂಸ್ಥೆ / ಬಿಬಿಎಂಪಿ ಸಹಾಯ ಮತ್ತು ಸಾರ್ವಜನಿಕ ಕುಂದುಕೊರತೆ ನಿವಾರಣಾ ವ್ಯವಸ್ಥೆ (ಮಾದರಿ ಡೆಮೊ)',
    },
    processingTime: {
      en: '24 to 72 hours for streetlight/waste; 7 days for road patching (Sample)',
      kn: 'ಬೀದಿ ದೀಪ/ಕಸ ವಿಲೇವಾರಿಗೆ 24-72 ಗಂಟೆಗಳು; ರಸ್ತೆ ದುರಸ್ತಿಗೆ 7 ದಿನಗಳು (ಮಾದರಿ)',
    },
    fee: {
      en: 'Free public service (₹0)',
      kn: 'ಉಚಿತ ಸಾರ್ವಜನಿಕ ಸೇವೆ (₹0)',
    },
    questions: [
      {
        id: 'issue_nature',
        question: {
          en: 'What type of neighborhood concern are you reporting?',
          kn: 'ನೀವು ಯಾವ ಬಗೆಯ ಸ್ಥಳೀಯ ಸಮಸ್ಯೆಯನ್ನು ವರದಿ ಮಾಡುತ್ತಿದ್ದೀರಿ?',
        },
        helpText: {
          en: 'Helps prepare the right location markers for the field maintenance crew.',
          kn: 'ಕ್ಷೇತ್ರ ನಿರ್ವಹಣಾ ತಂಡಕ್ಕೆ ಸೂಕ್ತ ಸ್ಥಳದ ವಿವರಗಳನ್ನು ಒದಗಿಸಲು ಇದು ಸಹಾಯ ಮಾಡುತ್ತದೆ.',
        },
        options: [
          {
            value: 'streetlight',
            label: {
              en: 'Streetlight outage or sparking pole',
              kn: 'ಬೀದಿ ದೀಪ ಉರಿಯದಿರುವುದು ಅಥವಾ ಕಂಬದ ದೋಷ',
            },
          },
          {
            value: 'pothole_road',
            label: {
              en: 'Pothole, damaged footpath, or open drain slab',
              kn: 'ರಸ್ತೆ ಗುಂಡಿ, ಹಾನಿಗೊಳಗಾದ ಪಾದಚಾರಿ ಮಾರ್ಗ ಅಥವಾ ಚರಂಡಿ ಸ್ಲ್ಯಾಬ್',
            },
          },
          {
            value: 'waste_pickup',
            label: {
              en: 'Missed doorstep waste pickup or garbage blackspot',
              kn: 'ಕಸ ಸಂಗ್ರಹಣೆ ವಿಳಂಬ ಅಥವಾ ಕಸದ ರಾಶಿ',
            },
          },
        ],
      },
      {
        id: 'photo_available',
        question: {
          en: 'Do you have a daytime photo or landmark/pole number of the spot?',
          kn: 'ನಿಮ್ಮ ಬಳಿ ಆ ಸ್ಥಳದ ಭಾವಚಿತ್ರ ಅಥವಾ ಕಂಬದ ಸಂಖ್ಯೆ / ಗುರುತು ಇದೆಯೇ?',
        },
        helpText: {
          en: 'Photos are optional but speed up field verification.',
          kn: 'ಭಾವಚಿತ್ರ ಕಡ್ಡಾಯವಲ್ಲ, ಆದರೆ ಸ್ಥಳ ಪರಿಶೀಲನೆಯನ್ನು ವೇಗಗೊಳಿಸುತ್ತದೆ.',
        },
        options: [
          {
            value: 'yes_photo',
            label: {
              en: 'Yes, I have a photo and landmark details',
              kn: 'ಹೌದು, ಭಾವಚಿತ್ರ ಮತ್ತು ಸ್ಥಳದ ಗುರುತು ಇದೆ',
            },
          },
          {
            value: 'only_landmark',
            label: {
              en: 'I only have the street name and nearest landmark',
              kn: 'ನನ್ನ ಬಳಿ ರಸ್ತೆಯ ಹೆಸರು ಮತ್ತು ಹತ್ತಿರದ ಗುರುತು ಮಾತ್ರ ಇದೆ',
            },
          },
        ],
      },
    ],
    evaluateEligibility: () => {
      return {
        status: 'eligible',
        headline: {
          en: 'Any resident or commuter can report a civic maintenance issue',
          kn: 'ಯಾವುದೇ ನಿವಾಸಿ ಅಥವಾ ಪ್ರಯಾಣಿಕರು ಸ್ಥಳೀಯ ನಾಗರಿಕ ಸಮಸ್ಯೆಯನ್ನು ವರದಿ ಮಾಡಬಹುದು',
        },
        explanation: {
          en: 'No identity proof or fee is required to report public road, lighting, water, or sanitation issues. You can test the interactive issue-reporting flow right here in Jan Setu or visit the official state grievance portal.',
          kn: 'ಸಾರ್ವಜನಿಕ ರಸ್ತೆ, ಬೀದಿ ದೀಪ, ನೀರು ಅಥವಾ ಸ್ವಚ್ಛತೆ ಸಮಸ್ಯೆಗಳನ್ನು ವರದಿ ಮಾಡಲು ಯಾವುದೇ ಶುಲ್ಕ ಅಥವಾ ಗುರುತಿನ ಚೀಟಿ ಬೇಕಿಲ್ಲ. ಈ ಡೆಮೊದಲ್ಲಿಯೇ ನೀವು ಮಾದರಿ ದೂರು ಸಲ್ಲಿಸಿ ಪರೀಕ್ಷಿಸಬಹುದು.',
        },
      };
    },
    baseDocuments: [
      {
        id: 'doc-street-landmark',
        name: {
          en: 'Street Name, Cross/Main Number, and Nearest Landmark',
          kn: 'ರಸ್ತೆಯ ಹೆಸರು, ಅಡ್ಡರಸ್ತೆ ಸಂಖ್ಯೆ ಮತ್ತು ಹತ್ತಿರದ ಪ್ರಮುಖ ಗುರುತು (Landmark)',
        },
        detail: {
          en: 'Helps the ward engineer locate the exact stretch without delay.',
          kn: 'ವಾರ್ಡ್ ಇಂಜಿನಿಯರ್‌ಗೆ ನಿಖರವಾದ ಸ್ಥಳವನ್ನು ಗುರುತಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.',
        },
        isMandatory: true,
      },
      {
        id: 'doc-pole-number',
        name: {
          en: 'Electric Pole Number painted in yellow/black on the streetlight post',
          kn: 'ಬೀದಿ ದೀಪದ ಕಂಬದ ಮೇಲೆ ಬರೆದಿರುವ ಕಂಬದ ಸಂಖ್ಯೆ (Pole Number)',
        },
        detail: {
          en: 'Recommended for streetlight outages so the electrical crew brings the right replacement fixture.',
          kn: 'ಬೀದಿ ದೀಪ ದುರಸ್ತಿಗೆ ಕಂಬದ ಸಂಖ್ಯೆ ನಮೂದಿಸುವುದು ಬಹಳ ಉಪಯುಕ್ತ.',
        },
        conditionQuestionId: 'issue_nature',
        conditionValues: ['streetlight'],
        isMandatory: false,
      },
      {
        id: 'doc-site-photo',
        name: {
          en: 'Clear Photo showing the pothole, waste pile, or unlit pole',
          kn: 'ರಸ್ತೆ ಗುಂಡಿ, ಕಸದ ರಾಶಿ ಅಥವಾ ದೀಪದ ಕಂಬವನ್ನು ತೋರಿಸುವ ಸ್ಪಷ್ಟ ಭಾವಚಿತ್ರ',
        },
        detail: {
          en: 'Include surrounding shop/building context so the spot is easy to recognize.',
          kn: 'ಸ್ಥಳವನ್ನು ಸುಲಭವಾಗಿ ಗುರುತಿಸಲು ಸುತ್ತಮುತ್ತಲಿನ ಕಟ್ಟಡ ಕಾಣುವಂತೆ ಫೋಟೋ ತೆಗೆಯಿರಿ.',
        },
        conditionQuestionId: 'photo_available',
        conditionValues: ['yes_photo'],
        isMandatory: false,
      },
    ],
    steps: [
      {
        stepNumber: '01',
        title: {
          en: 'Choose "Report an issue" in Jan Setu (or open the official Janaspandana / BBMP portal)',
          kn: 'ಜನ ಸೇತುನಲ್ಲಿ "Report an issue" ಆಯ್ಕೆಮಾಡಿ (ಅಥವಾ ಅಧಿಕೃತ ಜನಸ್ಪಂದನ ಪೋರ್ಟಲ್ ತೆರೆಯಿರಿ)',
        },
        description: {
          en: 'Select the issue category (Streetlight, Road/Pothole, Waste, or Water) and enter your locality.',
          kn: 'ಸಮಸ್ಯೆಯ ವರ್ಗವನ್ನು ಆಯ್ಕೆಮಾಡಿ ಮತ್ತು ನಿಮ್ಮ ಪ್ರದೇಶದ ವಿವರವನ್ನು ನಮೂದಿಸಿ.',
        },
      },
      {
        stepNumber: '02',
        title: {
          en: 'Attach an optional photo and submit to receive your tracking ID',
          kn: 'ಐಚ್ಛಿಕ ಭಾವಚಿತ್ರವನ್ನು ಸೇರಿಸಿ ಮತ್ತು ಟ್ರ್ಯಾಕಿಂಗ್ ಐಡಿ ಪಡೆಯಲು ಅರ್ಜಿ ಸಲ್ಲಿಸಿ',
        },
        description: {
          en: 'In this demo, you immediately get a sample ID (such as JS-2026-4082) to test status tracking.',
          kn: 'ಈ ಡೆಮೊದಲ್ಲಿ ನಿಮಗೆ ತಕ್ಷಣವೇ ಮಾದರಿ ಟ್ರ್ಯಾಕಿಂಗ್ ಐಡಿ (ಉದಾ: JS-2026-4082) ದೊರೆಯುತ್ತದೆ.',
        },
      },
      {
        stepNumber: '03',
        title: {
          en: 'Follow the progress from Received to Under review and Resolved',
          kn: 'ಸ್ವೀಕರಿಸಲಾಗಿದೆ (Received) ಹಂತದಿಂದ ಪರಿಹಾರದವರೆಗೆ (Resolved) ಪ್ರಗತಿಯನ್ನು ಗಮನಿಸಿ',
        },
        description: {
          en: 'Use the Track a request page to see inspection notes and completion timestamps.',
          kn: 'ಪರಿಶೀಲನಾ ಟಿಪ್ಪಣಿಗಳು ಮತ್ತು ಪರಿಹಾರದ ವಿವರಗಳನ್ನು ನೋಡಲು ಟ್ರ್ಯಾಕಿಂಗ್ ಪುಟವನ್ನು ಬಳಸಿ.',
        },
      },
    ],
    officialLinks: [
      {
        id: 'link-janaspandana',
        label: {
          en: 'Open Integrated Public Grievance Portal (iPGRS Janaspandana)',
          kn: 'ಏಕೀಕೃತ ಸಾರ್ವಜನಿಕ ಕುಂದುಕೊರತೆ ಪೋರ್ಟಲ್ ತೆರೆಯಿರಿ (ಜನಸ್ಪಂದನ)',
        },
        portalName: {
          en: 'Janaspandana Karnataka (ipgrs.karnataka.gov.in)',
          kn: 'ಜನಸ್ಪಂದನ ಕರ್ನಾಟಕ (ipgrs.karnataka.gov.in)',
        },
        url: 'https://ipgrs.karnataka.gov.in/',
        type: 'portal',
        description: {
          en: 'Official Government of Karnataka portal and 1902 helpline for public grievances.',
          kn: 'ಸಾರ್ವಜನಿಕ ದೂರುಗಳಿಗಾಗಿ ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಅಧಿಕೃತ ಪೋರ್ಟಲ್ ಮತ್ತು 1902 ಸಹಾಯವಾಣಿ.',
        },
      },
      {
        id: 'link-bbmp-sahaaya',
        label: {
          en: 'Open BBMP Official Citizen Portal (Bengaluru Municipal Services)',
          kn: 'ಬಿಬಿಎಂಪಿ ಅಧಿಕೃತ ನಾಗರಿಕ ಪೋರ್ಟಲ್ ತೆರೆಯಿರಿ',
        },
        portalName: {
          en: 'Bruhat Bengaluru Mahanagara Palike (site.bbmp.gov.in)',
          kn: 'ಬೃಹತ್ ಬೆಂಗಳೂರು ಮಹಾನಗರ ಪಾಲಿಕೆ (site.bbmp.gov.in)',
        },
        url: 'https://site.bbmp.gov.in/',
        type: 'source',
        description: {
          en: 'Official municipal portal for ward maintenance, streetlights, and solid waste management.',
          kn: 'ವಾರ್ಡ್ ನಿರ್ವಹಣೆ, ಬೀದಿ ದೀಪ ಮತ್ತು ಘನತ್ಯಾಜ್ಯ ನಿರ್ವಹಣೆಯ ಅಧಿಕೃತ ಪಾಲಿಕೆ ತಾಣ.',
        },
      },
    ],
    linkedIssueCategory: 'Streetlight outage',
  },
];
