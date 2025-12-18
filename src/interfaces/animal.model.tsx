interface Reminder {
  type: "vaccine" | "checkup" | "grooming";
  name: string;
  date: string;
}

export interface BloodTest {
  testName: string;
  result: string;
  referenceRange: string;
  flag: string;
}

interface BloodWork {
  labClinicName: string;
  resultsSummary: string;
  vetInterpretation: string;
  medicationAtTimeOfBloodWork: string;
  notes: string;
  bloodWorkDate: string;
  bloodTests: BloodTest[];
}

interface Vaccine {
  vaccineName: string;
  manufacturer: string;
  routeOfAdministration: string;
  dose: string;
  batchNumber: string;
  clinicName: string;
  vetName: string;
  sideEffectsObserved: string;
  dateAdministrated: string;
  nextDueDate: string;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

interface Consultation {
  symptoms: string;
  diagnosis: string;
  treatmentPlan: string;
  medicationsPrescribed: Medication[];
  clinicName: string;
  vetName: string;
  weight: string;
  temperature: string;
  heartRate: string;
  notes: string;
  consultationDate: string;
  followUp: string;
}

export interface Animal {
  dateOfBirth: string;
  imgURL: string;
  latestVetVisit: string;
  name: string;
  reminders: Reminder[];
  id: string;
  breed: string;
  species: string;
  gender: string;
  weight: string;
  coloring: string;
  microchipId: string;
  bloodWork: BloodWork[];
  vaccines: Vaccine[];
  consultations: Consultation[];
}
