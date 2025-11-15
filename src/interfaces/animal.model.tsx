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
}
