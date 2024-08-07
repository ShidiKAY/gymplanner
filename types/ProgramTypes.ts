// types/ProgramTypes.ts
export interface Session {
  id: number;
  title: string;
  // autres propriétés nécessaires
}

export interface ProgramWeek {
  id: number;
  name: string;
  days: {
    [day: string]: {
      type: "push" | "pull" | "legs";
      sessionIds: number[]; // Liste des IDs des sessions pour ce jour
    };
  };
}

export interface TrainingProgram {
  id: number;
  title: string;
  weeks: ProgramWeek[];
  recurrence: "weekly" | "biweekly" | "monthly"; // Récurrence du programme
}
