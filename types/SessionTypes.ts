import { Exercise } from "@/types/ExerciseTypes";

export interface Session {
  id: number;
  title: string;
  date: string;
  exercises: ExerciseSession[];
}

export interface ExerciseSession {
  exerciseId: number;
  intensity: number;
  repetitions: number;
  durationStart: number; // en secondes
  durationEnd: number; // en secondes
  restTime: number; // en secondes
}

export interface SessionModel {
  id: number;
  title: string;
  exercises: Exercise[];
}
