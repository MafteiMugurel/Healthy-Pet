import { Animal } from "../../interfaces/animal.model";

export const animalsMock: Animal[] = [
  {
    dateOfBirth: "2015-06-01",
    imageUrl: "https://d2zp5xs5cp8zlg.cloudfront.net/image-79322-800.jpg",
    lastVetVisit: "2023-05-15",
    name: "Mitzi",
    reminders: [{ type: "vaccine", name: "rabbies", date: "2024-07-01" }],
  },
  {
    dateOfBirth: "2024-06-01",
    imageUrl:
      "https://www.fearfreehappyhomes.com/wp-content/uploads/2020/08/smalldogfeatured-1.jpg",
    lastVetVisit: "2025-05-15",
    name: "Rudolf",
    reminders: [
      { type: "checkup", name: "veterinar visit", date: "2026-07-01" },
      { type: "vaccine", name: "rabbies", date: "2024-07-01" },
    ],
  },
  {
    dateOfBirth: "2020-12-08",
    imageUrl:
      "https://www.birdline.co.uk/wp-content/uploads/2022/07/Elmo3-Sm.jpg",
    lastVetVisit: "2025-09-15",
    name: "Paquito",
    reminders: [],
  },
];
