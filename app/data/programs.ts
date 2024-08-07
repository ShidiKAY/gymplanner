// data/programs.ts
import { TrainingProgram, ProgramWeek } from "@/types/ProgramTypes";

// Définition des sessions d'exemple
const exampleSessions = [
  {
    id: 1,
    title: "Session Push A",
    description: "Entraînement pour le haut du corps, focus sur les poussées.",
  },
  {
    id: 2,
    title: "Session Pull A",
    description: "Entraînement pour le haut du corps, focus sur les tirages.",
  },
  {
    id: 3,
    title: "Session Legs A",
    description: "Entraînement pour le bas du corps.",
  },
  {
    id: 4,
    title: "Session Push B",
    description:
      "Variation d'entraînement pour le haut du corps, focus sur les poussées.",
  },
  {
    id: 5,
    title: "Session Pull B",
    description:
      "Variation d'entraînement pour le haut du corps, focus sur les tirages.",
  },
  {
    id: 6,
    title: "Session Legs B",
    description: "Variation d'entraînement pour le bas du corps.",
  },
];

// Exemple de semaines
const exampleWeeks: ProgramWeek[] = [
  {
    id: 1,
    name: "Semaine 1",
    days: {
      Lundi: { type: "push", sessionIds: [1] },
      Mardi: { type: "legs", sessionIds: [3] },
      Mercredi: { type: "pull", sessionIds: [2] },
      Jeudi: { type: "push", sessionIds: [4] },
      Vendredi: { type: "legs", sessionIds: [6] },
      Samedi: { type: "pull", sessionIds: [5] },
      Dimanche: { type: "rest", sessionIds: [] },
    },
  },
  {
    id: 2,
    name: "Semaine 2",
    days: {
      Lundi: { type: "push", sessionIds: [4] },
      Mardi: { type: "legs", sessionIds: [6] },
      Mercredi: { type: "pull", sessionIds: [5] },
      Jeudi: { type: "push", sessionIds: [1] },
      Vendredi: { type: "legs", sessionIds: [3] },
      Samedi: { type: "pull", sessionIds: [2] },
      Dimanche: { type: "rest", sessionIds: [] },
    },
  },
];

// Programmes d'exemple
export const programs: TrainingProgram[] = [
  {
    id: 1,
    title: "Programme Full Body 4 Semaines",
    weeks: exampleWeeks,
    recurrence: "Toutes les semaines pendant 4 semaines",
  },
  {
    id: 2,
    title: "Programme Force & Endurance",
    weeks: [
      {
        id: 3,
        name: "Semaine A",
        days: {
          Lundi: { type: "push", sessionIds: [1, 4] },
          Mardi: { type: "pull", sessionIds: [2, 5] },
          Mercredi: { type: "legs", sessionIds: [3, 6] },
          Jeudi: { type: "push", sessionIds: [1] },
          Vendredi: { type: "pull", sessionIds: [2] },
          Samedi: { type: "legs", sessionIds: [3] },
          Dimanche: { type: "rest", sessionIds: [] },
        },
      },
    ],
    recurrence: "Chaque semaine",
  },
  {
    id: 3,
    title: "Programme Hypertrophie",
    weeks: [
      {
        id: 4,
        name: "Semaine 1",
        days: {
          Lundi: { type: "push", sessionIds: [1] },
          Mardi: { type: "legs", sessionIds: [3] },
          Mercredi: { type: "pull", sessionIds: [2] },
          Jeudi: { type: "push", sessionIds: [4] },
          Vendredi: { type: "legs", sessionIds: [6] },
          Samedi: { type: "pull", sessionIds: [5] },
          Dimanche: { type: "rest", sessionIds: [] },
        },
      },
      {
        id: 5,
        name: "Semaine 2",
        days: {
          Lundi: { type: "push", sessionIds: [4] },
          Mardi: { type: "legs", sessionIds: [6] },
          Mercredi: { type: "pull", sessionIds: [5] },
          Jeudi: { type: "push", sessionIds: [1] },
          Vendredi: { type: "legs", sessionIds: [3] },
          Samedi: { type: "pull", sessionIds: [2] },
          Dimanche: { type: "rest", sessionIds: [] },
        },
      },
    ],
    recurrence: "Chaque semaine pendant 2 semaines",
  },
];
export const createProgram = (program: TrainingProgram) => {
  programs.push(program);
  // Enregistrez les données dans un stockage persistant si nécessaire
};

export const updateProgram = (updatedProgram: TrainingProgram) => {
  programs = programs.map((program) =>
    program.id === updatedProgram.id ? updatedProgram : program
  );
  // Enregistrez les données dans un stockage persistant si nécessaire
};

export const deleteProgram = (programId: number) => {
  programs = programs.filter((program) => program.id !== programId);
  // Enregistrez les données dans un stockage persistant si nécessaire
};
