import { TrainingProgram } from "@/types/ProgramTypes";

let programs: TrainingProgram[] = [
  {
    id: 1,
    name: "Programme de Force",
    description: "Programme conçu pour développer la force maximale.",
    macrocycles: [
      {
        id: 1,
        title: "Macrocycle de Force",
        startDate: "2024-01-01",
        endDate: "2024-06-30",
        mesocycles: [
          {
            id: 1,
            title: "Mésocycle d'Hypertrophie",
            startDate: "2024-01-01",
            endDate: "2024-02-28",
            microcycles: [
              {
                id: 1,
                title: "Microcycle 1",
                startDate: "2024-01-01",
                endDate: "2024-01-07",
                sessions: [],
                objective: "development",
              },
              // Ajoutez plus de microcycles ici
            ],
            theme: "hypertrophie",
          },
          // Ajoutez plus de mésocycles ici
        ],
        mainGoal: "Augmentation de la force maximale",
      },
      // Ajoutez plus de macrocycles ici
    ],
    createdAt: "2023-12-01T12:00:00Z",
    updatedAt: "2023-12-01T12:00:00Z",
  },
  // Ajoutez plus de programmes ici
];

export const getPrograms = (): TrainingProgram[] => programs;

export const addProgram = (program: TrainingProgram): void => {
  programs.push(program);
};

export const updateProgram = (
  programId: number,
  updatedProgram: TrainingProgram
): void => {
  programs = programs.map((p) => (p.id === programId ? updatedProgram : p));
};

export const deleteProgram = (programId: number): void => {
  programs = programs.filter((p) => p.id !== programId);
};

export const getProgramById = (
  programId: number
): TrainingProgram | undefined => {
  return programs.find((p) => p.id === programId);
};

export const duplicateCycle = (
  cycle: any,
  type: "macrocycle" | "mesocycle" | "microcycle"
) => {
  const newCycle = { ...cycle, id: Math.floor(Math.random() * 10000) };

  // Réinitialiser le titre pour le nouveau cycle
  newCycle.title = `${cycle.title} (Copie)`;

  // Cloner les sessions dans le cycle
  if (type === "microcycle") {
    newCycle.sessions = cycle.sessions.map((session) => ({
      ...session,
      id: Math.floor(Math.random() * 10000),
    }));
  } else {
    newCycle.microcycles = cycle.microcycles.map((microcycle) =>
      duplicateCycle(microcycle, "microcycle")
    );
  }

  return newCycle;
};
