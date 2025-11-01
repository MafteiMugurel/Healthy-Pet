interface Reminder {
  type: "vaccine" | "checkup" | "grooming";
  name: string;
  date: string;
}

export interface Animal {
  dateOfBirth: string;
  imageUrl: string;
  lastVetVisit: string;
  name: string;
  reminders: Reminder[];
}
