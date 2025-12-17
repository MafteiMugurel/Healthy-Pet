interface Reminder {
  type: "vaccine" | "checkup" | "grooming";
  name: string;
  date: string;
}

interface BloodWork {
  date: string;
  results: string;
}

interface Vaccine {
  date: string;
  results: string;
}

interface Consultation {
  clinicName: string;
  consultationDate: string;
  diagnosis: string;
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
