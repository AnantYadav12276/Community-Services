// ─── Real Hospital Clinical Data: The Signature Advanced Super Speciality Hospital ───
// Sector 37-D, BPTP, Dwarka Express Way, Gurugram, Haryana

export const WARDS = [
  { id: 'ward-a', name: 'ICU & Liver Care - Ward A', floor: 3, capacity: 12 },
  { id: 'ward-b', name: 'Surgical & General Medicine - Ward B', floor: 2, capacity: 20 },
];

export const MEDICATIONS = [
  { id: 'med-01', name: 'Inj. Mero SB', category: 'Antibiotic', defaultDosage: '1.5g', route: 'IV' },
  { id: 'med-02', name: 'Inj. Mero', category: 'Antibiotic', defaultDosage: '1g', route: 'IV' },
  { id: 'med-03', name: 'Inj. Targocid', category: 'Antibiotic', defaultDosage: '400mg', route: 'IV' },
  { id: 'med-04', name: 'Inj. Tazact', category: 'Antibiotic', defaultDosage: '4.5g', route: 'IV' },
  { id: 'med-05', name: 'Pantoprazole', category: 'Proton Pump Inhibitor', defaultDosage: '40mg', route: 'IV' },
  { id: 'med-06', name: 'Paracetamol', category: 'Analgesic / Antipyretic', defaultDosage: '650mg', route: 'IV' },
  { id: 'med-07', name: 'Tramadol', category: 'Analgesic', defaultDosage: '50mg', route: 'IV' },
  { id: 'med-08', name: 'Furosemide', category: 'Diuretic', defaultDosage: '20mg', route: 'IV' },
  { id: 'med-09', name: 'Human Albumin 20%', category: 'Blood Product / Colloid', defaultDosage: '100ml', route: 'IV' },
  { id: 'med-10', name: 'Lactulose', category: 'Laxative / Hepatic Care', defaultDosage: '30ml', route: 'Oral' },
  { id: 'med-11', name: 'Metformin', category: 'Antidiabetic', defaultDosage: '500mg', route: 'Oral' },
  { id: 'med-12', name: 'Atorvastatin', category: 'Statin', defaultDosage: '20mg', route: 'Oral' },
];

export const TIME_SLOTS = ['08:00', '12:00', '16:00', '20:00'];

export const PATIENTS = [
  {
    id: 'P-10234',
    name: 'Jitender',
    age: 44,
    gender: 'Male',
    bed: 'A-03',
    ward: 'ward-a',
    diagnoses: ['Chronic Liver Disease (CLD)'],
    physician: 'Dr. V. K. Sharma (Gastroenterology)',
    admissionDate: '2026-11-20',
    vitals: { bp: '118/76', hr: 82, temp: 98.4, spo2: 97 },
    schedule: [
      { timeSlot: '08:00', medication: 'Inj. Mero SB', dosage: '1.5g', route: 'IV', status: 'administered', administeredBy: 'Nurse R. Patel', administeredAt: '08:05 AM' },
      { timeSlot: '08:00', medication: 'Pantoprazole', dosage: '40mg', route: 'IV', status: 'administered', administeredBy: 'Nurse R. Patel', administeredAt: '08:06 AM' },
      { timeSlot: '12:00', medication: 'Lactulose', dosage: '30ml', route: 'Oral', status: 'administered', administeredBy: 'Nurse R. Patel', administeredAt: '12:10 PM' },
      { timeSlot: '16:00', medication: 'Inj. Mero SB', dosage: '1.5g', route: 'IV', status: 'pending' },
      { timeSlot: '20:00', medication: 'Inj. Mero SB', dosage: '1.5g', route: 'IV', status: 'pending' },
    ],
  },
  {
    id: 'P-10235',
    name: 'Munna Singh',
    age: 52,
    gender: 'Male',
    bed: 'A-07',
    ward: 'ward-a',
    diagnoses: ['Chronic Liver Disease (CLD)', 'Hepatic Encephalopathy'],
    physician: 'Dr. R. K. Singhal (Hepatology)',
    admissionDate: '2026-10-12',
    vitals: { bp: '124/80', hr: 78, temp: 99.0, spo2: 96 },
    schedule: [
      { timeSlot: '08:00', medication: 'Inj. Mero', dosage: '1g', route: 'IV', status: 'administered', administeredBy: 'Nurse T. Kim', administeredAt: '08:10 AM' },
      { timeSlot: '08:00', medication: 'Inj. Targocid', dosage: '400mg', route: 'IV', status: 'administered', administeredBy: 'Nurse T. Kim', administeredAt: '08:15 AM' },
      { timeSlot: '12:00', medication: 'Inj. Mero', dosage: '1g', route: 'IV', status: 'high-risk', riskReason: 'Double-Dosing: Timing overlap with 08:00 dose. Minimum Q8H required.' },
      { timeSlot: '16:00', medication: 'Inj. Mero', dosage: '1g', route: 'IV', status: 'pending' },
      { timeSlot: '20:00', medication: 'Inj. Targocid', dosage: '400mg', route: 'IV', status: 'pending' },
    ],
  },
  {
    id: 'P-10236',
    name: 'Roushan',
    age: 38,
    gender: 'Male',
    bed: 'A-11',
    ward: 'ward-a',
    diagnoses: ['Acute-on-Chronic Liver Failure (ACLF)'],
    physician: 'Dr. V. K. Sharma (Critical Care / Gastro)',
    admissionDate: '2026-11-21',
    vitals: { bp: '112/72', hr: 94, temp: 99.2, spo2: 95 },
    schedule: [
      { timeSlot: '08:00', medication: 'Inj. Tazact', dosage: '4.5g', route: 'IV', status: 'administered', administeredBy: 'Nurse A. Singh', administeredAt: '08:25 AM' },
      { timeSlot: '08:00', medication: 'Human Albumin 20%', dosage: '100ml', route: 'IV', status: 'administered', administeredBy: 'Nurse A. Singh', administeredAt: '08:35 AM' },
      { timeSlot: '12:00', medication: 'Pantoprazole', dosage: '40mg', route: 'IV', status: 'delayed' },
      { timeSlot: '16:00', medication: 'Inj. Tazact', dosage: '4.5g', route: 'IV', status: 'pending' },
      { timeSlot: '20:00', medication: 'Inj. Tazact', dosage: '4.5g', route: 'IV', status: 'pending' },
    ],
  },
  {
    id: 'P-10237',
    name: 'Baldev Singh',
    age: 58,
    gender: 'Male',
    bed: 'B-02',
    ward: 'ward-b',
    diagnoses: ['Abdominal Pain & Fever', 'Suspected Intra-abdominal Infection'],
    physician: 'Dr. Anita Gupta (General Surgery)',
    admissionDate: '2026-11-23',
    vitals: { bp: '134/86', hr: 90, temp: 101.4, spo2: 98 },
    schedule: [
      { timeSlot: '08:00', medication: 'Inj. Tazact', dosage: '4.5g', route: 'IV', status: 'administered', administeredBy: 'Nurse J. Martinez', administeredAt: '07:55 AM' },
      { timeSlot: '08:00', medication: 'Paracetamol', dosage: '650mg', route: 'IV', status: 'administered', administeredBy: 'Nurse J. Martinez', administeredAt: '07:58 AM' },
      { timeSlot: '12:00', medication: 'Inj. Tazact', dosage: '4.5g', route: 'IV', status: 'high-risk', riskReason: 'Narrow Interval Overlap: 4h gap violates standard Q8H schedule for Tazact.' },
      { timeSlot: '16:00', medication: 'Inj. Tazact', dosage: '4.5g', route: 'IV', status: 'pending' },
      { timeSlot: '20:00', medication: 'Paracetamol', dosage: '650mg', route: 'IV', status: 'pending' },
    ],
  },
  {
    id: 'P-10238',
    name: 'Krishna Devi',
    age: 64,
    gender: 'Female',
    bed: 'B-05',
    ward: 'ward-b',
    diagnoses: ['Post Surgery Colostomy Leakage', 'Localized Peritonitis'],
    physician: 'Dr. Anita Gupta (Surgical Oncology)',
    admissionDate: '2026-11-13',
    vitals: { bp: '130/84', hr: 84, temp: 100.1, spo2: 96 },
    schedule: [
      { timeSlot: '08:00', medication: 'Inj. Mero SB', dosage: '1.5g', route: 'IV', status: 'administered', administeredBy: 'Nurse D. Brown', administeredAt: '08:10 AM' },
      { timeSlot: '08:00', medication: 'Inj. Targocid', dosage: '400mg', route: 'IV', status: 'administered', administeredBy: 'Nurse D. Brown', administeredAt: '08:20 AM' },
      { timeSlot: '12:00', medication: 'Tramadol', dosage: '50mg', route: 'IV', status: 'administered', administeredBy: 'Nurse D. Brown', administeredAt: '12:15 PM' },
      { timeSlot: '16:00', medication: 'Inj. Mero SB', dosage: '1.5g', route: 'IV', status: 'pending' },
      { timeSlot: '20:00', medication: 'Inj. Targocid', dosage: '400mg', route: 'IV', status: 'pending' },
    ],
  },
];

export const RISK_ALERTS = [
  {
    id: 'alert-001',
    patientId: 'P-10235',
    patientName: 'Munna Singh',
    severity: 'critical',
    riskScore: 88,
    type: 'Double-Dosing Overlap',
    title: 'Meropenem Timing Overlap Detected',
    description: 'Concurrent administration window detected: Inj. Mero 1g scheduled at 12:00 PM overlaps with 08:00 AM dose (only 3h50m interval). Patient diagnosed with Chronic Liver Disease (CLD); impaired hepatic-renal clearance increases risk of neurotoxicity and supra-therapeutic drug accumulation.',
    drugA: 'Inj. Mero 1g (08:00 AM)',
    drugB: 'Inj. Mero 1g (12:00 PM)',
    timeSlot: '12:00',
    details: [
      'Inj. Mero 1g administered at 08:10 AM via IV infusion.',
      'Next dose scheduled at 12:00 PM — only a 3h50m gap.',
      'Standard recommended dosing interval: Q8H (minimum 8-hour gap).',
      'Hepatic Encephalopathy risk score elevated by 280% with beta-lactam accumulation.',
    ],
    recommendations: [
      'Reschedule 12:00 PM dose to 16:00 PM to maintain standard Q8H interval.',
      'Check renal function panel (eGFR/Serum Creatinine) before next administration.',
      'Consult attending hepatologist Dr. R. K. Singhal for liver protocol adjustment.',
    ],
    createdAt: '2026-11-25T08:15:00',
    status: 'active',
  },
  {
    id: 'alert-002',
    patientId: 'P-10237',
    patientName: 'Baldev Singh',
    severity: 'high',
    riskScore: 76,
    type: 'Timing Overlap',
    title: 'Tazact (Piperacillin-Tazobactam) Narrow Interval Alert',
    description: 'Inj. Tazact 4.5g scheduled at 12:00 PM creates a 4-hour interval following the 07:55 AM dose. For abdominal infection with fever, standard guidelines recommend an interval of Q6H or Q8H.',
    drugA: 'Inj. Tazact 4.5g (07:55 AM)',
    drugB: 'Inj. Tazact 4.5g (12:00 PM)',
    timeSlot: '12:00',
    details: [
      'Inj. Tazact 4.5g administered at 07:55 AM via IV infusion.',
      'Subsequent dose scheduled at 12:00 PM — interval only 4h05m.',
      'Guidelines suggest minimum 6–8 hour spacing for standard extended-infusion regimens.',
      'Patient temperature: 101.4°F with severe abdominal tenderness.',
    ],
    recommendations: [
      'Shift scheduled dose from 12:00 PM to 16:00 PM to ensure Q8H spacing.',
      'Monitor white blood cell count and inflammatory markers (CRP/PCT).',
      'Confirm with Dr. Anita Gupta if extended infusion (over 3-4 hours) is desired.',
    ],
    createdAt: '2026-11-25T08:30:00',
    status: 'active',
  },
];

export const EHR_LOGS = [
  { id: 'log-001', timestamp: '2026-11-25T07:30:00', source: 'The Signature EHR v4.2', patient: 'Jitender', patientId: 'P-10234', medication: 'Inj. Mero SB 1.5g', action: 'Schedule Import', status: 'success', processingTime: '110ms' },
  { id: 'log-002', timestamp: '2026-11-25T07:30:05', source: 'The Signature EHR v4.2', patient: 'Munna Singh', patientId: 'P-10235', medication: 'Inj. Mero 1g', action: 'Schedule Import', status: 'success', processingTime: '95ms' },
  { id: 'log-003', timestamp: '2026-11-25T07:31:00', source: 'The Signature EHR v4.2', patient: 'Munna Singh', patientId: 'P-10235', medication: 'Inj. Targocid 400mg', action: 'Schedule Import', status: 'success', processingTime: '125ms' },
  { id: 'log-004', timestamp: '2026-11-25T07:32:00', source: 'The Signature EHR v4.2', patient: 'Roushan', patientId: 'P-10236', medication: 'Inj. Tazact 4.5g', action: 'Schedule Import', status: 'success', processingTime: '88ms' },
  { id: 'log-005', timestamp: '2026-11-25T07:45:00', source: 'ML Risk Engine v3.1', patient: 'Munna Singh', patientId: 'P-10235', medication: 'Inj. Mero 1g', action: 'Risk Flag Generated', status: 'warning', processingTime: '1940ms' },
  { id: 'log-006', timestamp: '2026-11-25T08:05:00', source: 'Bedside Barcode Scanner', patient: 'Jitender', patientId: 'P-10234', medication: 'Inj. Mero SB 1.5g', action: 'Administration Confirmed', status: 'success', processingTime: '45ms' },
  { id: 'log-007', timestamp: '2026-11-25T08:10:00', source: 'Bedside Barcode Scanner', patient: 'Munna Singh', patientId: 'P-10235', medication: 'Inj. Mero 1g', action: 'Administration Confirmed', status: 'success', processingTime: '52ms' },
  { id: 'log-008', timestamp: '2026-11-25T08:15:00', source: 'Bedside Barcode Scanner', patient: 'Munna Singh', patientId: 'P-10235', medication: 'Inj. Targocid 400mg', action: 'Administration Confirmed', status: 'success', processingTime: '48ms' },
  { id: 'log-009', timestamp: '2026-11-25T08:25:00', source: 'Bedside Barcode Scanner', patient: 'Roushan', patientId: 'P-10236', medication: 'Inj. Tazact 4.5g', action: 'Administration Confirmed', status: 'success', processingTime: '60ms' },
  { id: 'log-010', timestamp: '2026-11-25T08:30:00', source: 'ML Risk Engine v3.1', patient: 'Baldev Singh', patientId: 'P-10237', medication: 'Inj. Tazact 4.5g', action: 'Risk Flag Generated', status: 'warning', processingTime: '1820ms' },
  { id: 'log-011', timestamp: '2026-11-25T08:35:00', source: 'The Signature EHR v4.2', patient: 'Krishna Devi', patientId: 'P-10238', medication: 'Inj. Mero SB 1.5g', action: 'Schedule Update', status: 'success', processingTime: '115ms' },
  { id: 'log-012', timestamp: '2026-11-25T08:36:00', source: 'The Signature EHR v4.2', patient: 'Krishna Devi', patientId: 'P-10238', medication: 'Inj. Targocid 400mg', action: 'Schedule Update', status: 'success', processingTime: '102ms' },
  { id: 'log-013', timestamp: '2026-11-25T09:00:00', source: 'HL7 FHIR Gateway', patient: 'Baldev Singh', patientId: 'P-10237', medication: 'Inj. Tazact 4.5g', action: 'Order Sync', status: 'success', processingTime: '210ms' },
  { id: 'log-014', timestamp: '2026-11-25T10:00:00', source: 'ML Risk Engine v3.1', patient: 'All Patients', patientId: 'BATCH', medication: 'N/A', action: 'Batch Risk Re-evaluation', status: 'processing', processingTime: '—' },
];

// ─── ML Analytics Chart Data ───

export const RISK_TREND_DATA = [
  { day: 'Nov 19', jitender: 30, munnaSingh: 58, roushan: 65, baldevSingh: 40, krishnaDevi: 70 },
  { day: 'Nov 20', jitender: 35, munnaSingh: 62, roushan: 68, baldevSingh: 45, krishnaDevi: 72 },
  { day: 'Nov 21', jitender: 38, munnaSingh: 69, roushan: 72, baldevSingh: 52, krishnaDevi: 78 },
  { day: 'Nov 22', jitender: 34, munnaSingh: 74, roushan: 76, baldevSingh: 60, krishnaDevi: 80 },
  { day: 'Nov 23', jitender: 36, munnaSingh: 81, roushan: 73, baldevSingh: 68, krishnaDevi: 84 },
  { day: 'Nov 24', jitender: 31, munnaSingh: 85, roushan: 70, baldevSingh: 73, krishnaDevi: 82 },
  { day: 'Nov 25', jitender: 28, munnaSingh: 88, roushan: 66, baldevSingh: 76, krishnaDevi: 86 },
];

export const ALERT_DISTRIBUTION = [
  { category: 'Timing Overlap', count: 7, color: '#eab308' },
  { category: 'Dosage Error', count: 4, color: '#f97316' },
  { category: 'Drug Interaction', count: 5, color: '#f43f5e' },
  { category: 'Hepatic/Renal Adjustment', count: 6, color: '#3b82f6' },
  { category: 'Allergy Conflict', count: 2, color: '#a855f7' },
];
