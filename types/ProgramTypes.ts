// types/ProgramTypes.ts
import { Session } from "@/types/SessionTypes";

export type Microcycle = {
  id: number;
  title: string;
  description?: string; // Ajouté pour la description
  startDate: string;
  endDate: string;
  sessions: Session[];
  objective: "development" | "maintenance" | "recovery";
};

export type Mesocycle = {
  id: number;
  title: string;
  description?: string; // Ajouté pour la description
  startDate: string;
  endDate: string;
  microcycles: Microcycle[];
  theme: string;
};

export type Macrocycle = {
  id: number;
  title: string;
  description?: string; // Ajouté pour la description
  startDate: string;
  endDate: string;
  mesocycles: Mesocycle[];
  mainGoal: string;
};

export type TrainingProgram = {
  id: number;
  name: string;
  description: string;
  macrocycles: Macrocycle[];
  createdAt: string;
  updatedAt: string;
};
