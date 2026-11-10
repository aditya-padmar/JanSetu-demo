export type PageId = 'home' | 'services' | 'report' | 'track' | 'help';

export type RequestStatus = 'Received' | 'Under review' | 'Resolved';

export interface TimelineStep {
  stage: RequestStatus;
  date: string;
  summary: string;
  completed: boolean;
  current: boolean;
}

export interface SampleRequestRecord {
  id: string;
  category: string;
  department: string;
  title: string;
  description: string;
  area: string;
  submittedDate: string;
  status: RequestStatus;
  reporterName?: string;
  contactInfo?: string;
  photoName?: string;
  isUserCreated?: boolean;
  nextStepNote: string;
  timeline: TimelineStep[];
}

export type DepartmentFilter =
  | 'All departments'
  | 'Urban Local Body (BBMP / Municipal)'
  | 'Revenue Department (Nadakacheri)'
  | 'Food & Civil Supplies (Ahara)'
  | 'Senior Citizen & Social Welfare (Seva Sindhu)'
  | 'Water & Electricity Utilities (BWSSB / BESCOM)';

export interface ServiceItem {
  id: string;
  indexNumber: string;
  name: string;
  nameKn: string;
  department: Exclude<DepartmentFilter, 'All departments'>;
  departmentKn: string;
  category: 'Roads & Lighting' | 'Waste & Sanitation' | 'Water & Drainage' | 'Community & Certificates';
  shortDescription: string;
  shortDescriptionKn: string;
  whoItHelps: string;
  whatToPrepare: string[];
  typicalProcess: string;
  sampleOffice: string;
  actionType: 'report' | 'guide';
  actionLabel: string;
  actionLabelKn: string;
  linkedIssueCategory?: string;
  linkedGuidedServiceId?: string;
}

export const ISSUE_CATEGORIES = [
  'Streetlight outage',
  'Pothole or damaged road',
  'Waste collection concern',
  'Water supply or drainage issue',
  'Public park or footpath maintenance',
  'Local service information request',
] as const;

export const SAMPLE_LOCALITIES = [
  'Indiranagar — MG Road Cross 4',
  'Shanti Nagar — Sector 4 Main Road',
  'Kaveri Layout — Block C',
  'Gandhi Nagar — Near Civic Library',
  'Vasant Vihar — Market Lane 2',
] as const;

export const SAMPLE_SERVICES: ServiceItem[] = [
  {
    id: 'svc-streetlight',
    indexNumber: '01',
    name: 'Streetlight Maintenance & Outage Reporting',
    nameKn: 'ಬೀದಿ ದೀಪ ನಿರ್ವಹಣೆ ಮತ್ತು ದೂರು ನೋಂದಣಿ',
    department: 'Water & Electricity Utilities (BWSSB / BESCOM)',
    departmentKn: 'ವಿದ್ಯುತ್ ಮತ್ತು ಜಲಮಂಡಳಿ ಸೇವೆಗಳು (ಬೆಸ್ಕಾಂ / ಜಲಮಂಡಳಿ)',
    category: 'Roads & Lighting',
    shortDescription:
      'Report flickering, broken, or dark street poles along neighborhood roads, crossings, and pedestrian paths.',
    shortDescriptionKn:
      'ರಸ್ತೆಗಳು ಮತ್ತು ಪಾದಚಾರಿ ಮಾರ್ಗಗಳಲ್ಲಿ ಕೆಟ್ಟುಹೋದ ಅಥವಾ ಉರಿಯದ ಬೀದಿ ದೀಪಗಳ ಕುರಿತು ವರದಿ ಮಾಡಿ.',
    whoItHelps: 'Residents noticing unlit stretches, damaged lamp posts, or daytime-burning streetlights.',
    whatToPrepare: [
      'Nearest landmark, house number, or street cross name',
      'Pole number painted on the post (optional)',
      'Brief note on whether a single lamp or entire lane is affected',
    ],
    typicalProcess:
      'In this demo, submitting a streetlight report generates a sample tracking ID so you can preview how electrical maintenance updates appear.',
    sampleOffice: 'Sample Ward Electrical Desk · Sector 4 Civic Center (Demo)',
    actionType: 'report',
    actionLabel: 'Report streetlight outage',
    actionLabelKn: 'ಬೀದಿ ದೀಪ ದೂರು ಸಲ್ಲಿಸಿ',
    linkedIssueCategory: 'Streetlight outage',
    linkedGuidedServiceId: 'gov-civic-streetlight-roads',
  },
  {
    id: 'svc-road-repair',
    indexNumber: '02',
    name: 'Pothole & Footpath Surface Repair',
    nameKn: 'ರಸ್ತೆ ಗುಂಡಿ ಮತ್ತು ಪಾದಚಾರಿ ಮಾರ್ಗ ದುರಸ್ತಿ',
    department: 'Urban Local Body (BBMP / Municipal)',
    departmentKn: 'ನಗರ ಸ್ಥಳೀಯ ಸಂಸ್ಥೆ (ಬಿಬಿಎಂಪಿ / ನಗರಸಭೆ)',
    category: 'Roads & Lighting',
    shortDescription:
      'Flag potholes, sunken utility trenches, or broken paving slabs that make walking or driving unsafe.',
    shortDescriptionKn:
      'ವಾಹನ ಸಂಚಾರಕ್ಕೆ ಮತ್ತು ಪಾದಚಾರಿಗಳಿಗೆ ತೊಂದರೆ ಉಂಟುಮಾಡುವ ರಸ್ತೆ ಗುಂಡಿಗಳು ಅಥವಾ ಒಡೆದ ಸ್ಲ್ಯಾಬ್‌ಗಳ ದುರಸ್ತಿಗೆ ವರದಿ ಮಾಡಿ.',
    whoItHelps: 'Commuters, pedestrians, and shopkeepers reporting damaged neighborhood road surfaces.',
    whatToPrepare: [
      'Street name and nearest intersection or bus stop',
      'Approximate size or depth of the damaged patch',
      'Optional photo showing the road surface clearly',
    ],
    typicalProcess:
      'Reports are logged with a sample reference number and routed through Received, Under review, and Resolved stages in the demo tracker.',
    sampleOffice: 'Sample Neighborhood Roads Unit · Ward 12 Office (Demo)',
    actionType: 'report',
    actionLabel: 'Report road or pothole issue',
    actionLabelKn: 'ರಸ್ತೆ ಗುಂಡಿ ದೂರು ಸಲ್ಲಿಸಿ',
    linkedIssueCategory: 'Pothole or damaged road',
    linkedGuidedServiceId: 'gov-civic-streetlight-roads',
  },
  {
    id: 'svc-waste-pickup',
    indexNumber: '03',
    name: 'Doorstep Waste Collection & Cleanliness',
    nameKn: 'ಮನೆ-ಮನೆ ಕಸ ಸಂಗ್ರಹಣೆ ಮತ್ತು ಸ್ವಚ್ಛತೆ',
    department: 'Urban Local Body (BBMP / Municipal)',
    departmentKn: 'ನಗರ ಸ್ಥಳೀಯ ಸಂಸ್ಥೆ (ಬಿಬಿಎಂಪಿ / ನಗರಸಭೆ)',
    category: 'Waste & Sanitation',
    shortDescription:
      'Report missed daily waste pickups, overflowing community bins, or request bulk garden waste removal.',
    shortDescriptionKn:
      'ದೈನಂದಿನ ಕಸ ಸಂಗ್ರಹಣೆ ವಿಳಂಬ ಅಥವಾ ರಸ್ತೆ ಬದಿಯ ಕಸದ ರಾಶಿ ತೆರವುಗೊಳಿಸಲು ವರದಿ ಮಾಡಿ.',
    whoItHelps: 'Households and resident welfare groups coordinating daily dry and wet waste collection.',
    whatToPrepare: [
      'Block or lane name and morning pickup window',
      'Type of concern (missed pickup, overflowing bin, or street sweeping)',
      'Optional contact details for demo confirmation preview',
    ],
    typicalProcess:
      'Creates a sample sanitation ticket that demonstrates how local collection supervisors update status notes.',
    sampleOffice: 'Sample Sanitation & Solid Waste Cell · Kaveri Layout (Demo)',
    actionType: 'report',
    actionLabel: 'Report waste concern',
    actionLabelKn: 'ಸ್ವಚ್ಛತೆ ದೂರು ಸಲ್ಲಿಸಿ',
    linkedIssueCategory: 'Waste collection concern',
    linkedGuidedServiceId: 'gov-civic-streetlight-roads',
  },
  {
    id: 'svc-water-drainage',
    indexNumber: '04',
    name: 'Drinking Water Supply & Stormwater Drains',
    nameKn: 'ಕುಡಿಯುವ ನೀರು ಸರಬರಾಜು ಮತ್ತು ಒಳಚರಂಡಿ ನಿರ್ವಹಣೆ',
    department: 'Water & Electricity Utilities (BWSSB / BESCOM)',
    departmentKn: 'ವಿದ್ಯುತ್ ಮತ್ತು ಜಲಮಂಡಳಿ ಸೇವೆಗಳು (ಬೆಸ್ಕಾಂ / ಜಲಮಂಡಳಿ)',
    category: 'Water & Drainage',
    shortDescription:
      'Check sample supply schedules or report leaking water lines, low pressure, and blocked roadside drains.',
    shortDescriptionKn:
      'ಕುಡಿಯುವ ನೀರಿನ ಪೈಪ್ ಸೋರಿಕೆ, ಕಡಿಮೆ ಒತ್ತಡ ಅಥವಾ ಚರಂಡಿ ಕಟ್ಟಿಕೊಂಡಿರುವ ಸಮಸ್ಯೆಗಳನ್ನು ವರದಿ ಮಾಡಿ.',
    whoItHelps: 'Residents experiencing pipeline leaks, waterlogging after rain, or supply timing questions.',
    whatToPrepare: [
      'Exact street location where water leak or blockage is visible',
      'Whether the issue is an active leak or a slow drain blockage',
      'Optional photo of the affected spot',
    ],
    typicalProcess:
      'Logs a sample water utility request and shows step-by-step inspection notes on the request tracking page.',
    sampleOffice: 'Sample Water & Drainage Helpdesk · Shanti Nagar (Demo)',
    actionType: 'report',
    actionLabel: 'Report water or drain issue',
    actionLabelKn: 'ನೀರು / ಚರಂಡಿ ದೂರು ಸಲ್ಲಿಸಿ',
    linkedIssueCategory: 'Water supply or drainage issue',
    linkedGuidedServiceId: 'gov-civic-streetlight-roads',
  },
  {
    id: 'svc-senior-citizen',
    indexNumber: '05',
    name: 'Senior Citizen Identity Card & Bus Pass Concession',
    nameKn: 'ಹಿರಿಯ ನಾಗರಿಕರ ಗುರುತಿನ ಚೀಟಿ ಮತ್ತು ಬಸ್ ಪಾಸ್ ರಿಯಾಯಿತಿ',
    department: 'Senior Citizen & Social Welfare (Seva Sindhu)',
    departmentKn: 'ಹಿರಿಯ ನಾಗರಿಕರ ಮತ್ತು ಸಮಾಜ ಕಲ್ಯಾಣ ಇಲಾಖೆ (ಸೇವಾ ಸಿಂಧು)',
    category: 'Community & Certificates',
    shortDescription:
      'Check 60+ age eligibility, get a tailored document checklist, and apply via Seva Sindhu for KSRTC/BMTC concessions.',
    shortDescriptionKn:
      '60+ ವಯಸ್ಸಿನ ಅರ್ಹತೆ ಪರಿಶೀಲಿಸಿ, ಅಗತ್ಯ ದಾಖಲೆಗಳ ಪಟ್ಟಿ ಪಡೆಯಿರಿ ಮತ್ತು ಸೇವಾ ಸಿಂಧು ಮೂಲಕ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.',
    whoItHelps: 'Senior residents aged 60 and above seeking official identity cards and transport concessions.',
    whatToPrepare: [
      'Aadhaar Card and proof of Date of Birth (SSLC / Birth Certificate / Passport / Medical Age Certificate)',
      '2 Passport-size photographs and Blood Group report',
      'Rental agreement + utility bill if current address differs from Aadhaar',
    ],
    typicalProcess:
      'Use our interactive eligibility wizard above to get a customized checklist and open the Seva Sindhu portal.',
    sampleOffice: 'Department of Empowerment of Senior Citizens · Seva Sindhu (Demo)',
    actionType: 'guide',
    actionLabel: 'Check eligibility & checklist',
    actionLabelKn: 'ಅರ್ಹತೆ ಮತ್ತು ದಾಖಲೆ ಪರಿಶೀಲಿಸಿ',
    linkedIssueCategory: 'Local service information request',
    linkedGuidedServiceId: 'gov-senior-citizen-card',
  },
  {
    id: 'svc-income-caste',
    indexNumber: '06',
    name: 'Income & Caste Certificate (Nadakacheri RD Certificate)',
    nameKn: 'ಆದಾಯ ಮತ್ತು ಜಾತಿ ಪ್ರಮಾಣಪತ್ರ (ನಾಡಕಚೇರಿ RD ಪ್ರಮಾಣಪತ್ರ)',
    department: 'Revenue Department (Nadakacheri)',
    departmentKn: 'ಕಂದಾಯ ಇಲಾಖೆ (ನಾಡಕಚೇರಿ)',
    category: 'Community & Certificates',
    shortDescription:
      'Apply for or renew your 15-digit RD Income and Caste Certificate for scholarships, admissions, and welfare schemes.',
    shortDescriptionKn:
      'ವಿದ್ಯಾರ್ಥಿವೇತನ, ಶಾಲಾ ಪ್ರವೇಶ ಮತ್ತು ಸರ್ಕಾರಿ ಯೋಜನೆಗಳಿಗಾಗಿ ಆದಾಯ ಮತ್ತು ಜಾತಿ ಪ್ರಮಾಣಪತ್ರಕ್ಕೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.',
    whoItHelps: 'Students, parents, and job applicants needing verified revenue certificates.',
    whatToPrepare: [
      'Previous 15-digit RD number (if renewing) or School Transfer Certificate (TC)',
      'Aadhaar Card and Family Ration Card',
      'Salary slip or self-declaration of family income',
    ],
    typicalProcess:
      'Answer 3 questions in the eligibility wizard to get your tailored document checklist and Nadakacheri portal link.',
    sampleOffice: 'Atalji Janasnehi Kendra · Nadakacheri Revenue Desk (Demo)',
    actionType: 'guide',
    actionLabel: 'Check eligibility & checklist',
    actionLabelKn: 'ಅರ್ಹತೆ ಮತ್ತು ದಾಖಲೆ ಪರಿಶೀಲಿಸಿ',
    linkedIssueCategory: 'Local service information request',
    linkedGuidedServiceId: 'gov-income-caste-cert',
  },
  {
    id: 'svc-ration-card',
    indexNumber: '07',
    name: 'Ration Card Member Addition & Address Update',
    nameKn: 'ಪಡಿತರ ಚೀಟಿ ಸದಸ್ಯರ ಸೇರ್ಪಡೆ ಮತ್ತು ವಿಳಾಸ ಬದಲಾವಣೆ',
    department: 'Food & Civil Supplies (Ahara)',
    departmentKn: 'ಆಹಾರ ಮತ್ತು ನಾಗರಿಕ ಸರಬರಾಜು ಇಲಾಖೆ (ಆಹಾರ ಪೋರ್ಟಲ್)',
    category: 'Community & Certificates',
    shortDescription:
      'Add a child or spouse to your BPL (PHH) or APL Ration Card or update your neighborhood Fair Price Shop.',
    shortDescriptionKn:
      'ನಿಮ್ಮ ಬಿಪಿಎಲ್ ಅಥವಾ ಎಪಿಎಲ್ ಪಡಿತರ ಚೀಟಿಗೆ ಹೊಸ ಸದಸ್ಯರ ಹೆಸರು ಸೇರಿಸಿ ಅಥವಾ ವಿಳಾಸ ನವೀಕರಿಸಿ.',
    whoItHelps: 'Families updating household members or moving to a new ward.',
    whatToPrepare: [
      'Existing Ration Card number and Head of Family Aadhaar',
      'Birth Certificate (for child) or Marriage + Deletion Certificate (for spouse)',
      'Active Income & Caste RD number (mandatory for BPL / PHH cards)',
    ],
    typicalProcess:
      'Check BPL vs. APL document requirements in the wizard above and connect to the Ahara e-Services portal.',
    sampleOffice: 'Food & Civil Supplies Inspector Desk · Ahara Portal (Demo)',
    actionType: 'guide',
    actionLabel: 'Check eligibility & checklist',
    actionLabelKn: 'ಅರ್ಹತೆ ಮತ್ತು ದಾಖಲೆ ಪರಿಶೀಲಿಸಿ',
    linkedIssueCategory: 'Local service information request',
    linkedGuidedServiceId: 'gov-ration-card-update',
  },
];

export const INITIAL_SAMPLE_REQUESTS: SampleRequestRecord[] = [
  {
    id: 'JS-2026-4082',
    category: 'Streetlight outage',
    department: 'Water & Electricity Utilities (BWSSB / BESCOM)',
    title: 'Two streetlights out near pedestrian crossing',
    description:
      'Two consecutive LED poles outside the community pharmacy on MG Road Cross 4 have been unlit for three evenings, making the crosswalk dark after 7 PM.',
    area: 'Indiranagar — MG Road Cross 4',
    submittedDate: '10 Nov 2026',
    status: 'Under review',
    reporterName: 'Aarav Mehta (Sample Resident)',
    contactInfo: 'aarav.sample@example.org (Demo only)',
    nextStepNote:
      'Sample status: Assigned to the Ward Electrical Maintenance team for feeder cable inspection. (Simulated demo update)',
    timeline: [
      {
        stage: 'Received',
        date: '10 Nov 2026 · 09:15 AM',
        summary: 'Sample report logged in Jan Setu demo with reference ID JS-2026-4082.',
        completed: true,
        current: false,
      },
      {
        stage: 'Under review',
        date: '10 Nov 2026 · 01:40 PM',
        summary: 'Sample field technician scheduled to inspect pole #IN-44 and switchboard fuse.',
        completed: false,
        current: true,
      },
      {
        stage: 'Resolved',
        date: 'Pending completion (Demo)',
        summary: 'Final confirmation will appear here once the sample repair is marked complete.',
        completed: false,
        current: false,
      },
    ],
  },
  {
    id: 'JS-2026-3915',
    category: 'Pothole or damaged road',
    department: 'Urban Local Body (BBMP / Municipal)',
    title: 'Deep pothole near Sector 4 bus shelter',
    description:
      'Asphalt surface has worn away near the front wheel stop of the Sector 4 bus shelter, causing two-wheelers to swerve suddenly.',
    area: 'Shanti Nagar — Sector 4 Main Road',
    submittedDate: '04 Nov 2026',
    status: 'Resolved',
    reporterName: 'Kavita Nair (Sample Resident)',
    contactInfo: '+91 90000 12345 (Demo only)',
    nextStepNote:
      'Sample status: Cold-mix asphalt patching was completed in this fictional demo scenario.',
    timeline: [
      {
        stage: 'Received',
        date: '04 Nov 2026 · 10:05 AM',
        summary: 'Sample road surface report submitted with locality details.',
        completed: true,
        current: false,
      },
      {
        stage: 'Under review',
        date: '05 Nov 2026 · 11:30 AM',
        summary: 'Sample Ward Roads team verified the pothole dimensions near the bus stop.',
        completed: true,
        current: false,
      },
      {
        stage: 'Resolved',
        date: '07 Nov 2026 · 04:20 PM',
        summary: 'Sample resolution: Surface leveled and compacted. Marked complete in demo records.',
        completed: true,
        current: true,
      },
    ],
  },
  {
    id: 'JS-2026-4109',
    category: 'Waste collection concern',
    department: 'Urban Local Body (BBMP / Municipal)',
    title: 'Morning dry-waste vehicle skipped Lane 3',
    description:
      'The dry-waste collection cart did not pass through Block C Lane 3 this morning, leaving segregated household bins waiting outside.',
    area: 'Kaveri Layout — Block C',
    submittedDate: '10 Nov 2026',
    status: 'Received',
    reporterName: 'Ramesh Iyer (Sample Resident)',
    contactInfo: 'ramesh.demo@example.org (Demo only)',
    nextStepNote:
      'Sample status: Request has been recorded and awaits review by the sample Ward Sanitation Coordinator.',
    timeline: [
      {
        stage: 'Received',
        date: '10 Nov 2026 · 11:10 AM',
        summary: 'Sample report recorded. Awaiting assignment to the neighborhood route supervisor.',
        completed: false,
        current: true,
      },
      {
        stage: 'Under review',
        date: 'Upcoming step (Demo)',
        summary: 'Route supervisor reviews pickup log and arranges a follow-up visit.',
        completed: false,
        current: false,
      },
      {
        stage: 'Resolved',
        date: 'Upcoming step (Demo)',
        summary: 'Confirmation posted after waste pickup is verified.',
        completed: false,
        current: false,
      },
    ],
  },
  {
    id: 'JS-2026-3840',
    category: 'Local service information request',
    department: 'Senior Citizen & Social Welfare (Seva Sindhu)',
    title: 'Weekend hours and ramp access at Civic Reading Room',
    description:
      'Requesting information on whether the Gandhi Nagar public reading room is open on Sundays and has wheelchair ramp access to the ground-floor periodical hall.',
    area: 'Gandhi Nagar — Near Civic Library',
    submittedDate: '29 Oct 2026',
    status: 'Resolved',
    reporterName: 'Meera Deshmukh (Sample Resident)',
    contactInfo: 'meera.sample@example.org (Demo only)',
    nextStepNote:
      'Sample status: Information shared. The reading room is open 8 AM – 6 PM on Sundays with step-free ramp access at the East Gate (fictional demo info).',
    timeline: [
      {
        stage: 'Received',
        date: '29 Oct 2026 · 03:15 PM',
        summary: 'Sample service inquiry received through Jan Setu.',
        completed: true,
        current: false,
      },
      {
        stage: 'Under review',
        date: '30 Oct 2026 · 10:00 AM',
        summary: 'Checked facility accessibility details with the sample Community Hall desk.',
        completed: true,
        current: false,
      },
      {
        stage: 'Resolved',
        date: '30 Oct 2026 · 02:45 PM',
        summary: 'Sample response posted confirming Sunday timings and East Gate step-free ramp access.',
        completed: true,
        current: true,
      },
    ],
  },
];
