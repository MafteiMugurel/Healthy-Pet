interface Reminder {
  type: "vaccine" | "checkup" | "grooming";
  name: string;
  date: string;
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
}
