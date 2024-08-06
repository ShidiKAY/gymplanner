import { Exercise } from "@/types/ExerciseTypes";

export interface Session {
  id: number;
  title: string;
  date: string;
  exerciseGroups: ExerciseGroup[];
}

export interface SessionExerciseSet {
  reps?: number;
  duration?: number;
  intensity: number;
  rest: number;
}

export interface ExerciseGroup {
  type: "single" | "bi-set" | "tri-set";
  exercises: ExerciseSession[];
}

export interface ExerciseSession {
  exerciseId: number;
  intensity: number;
  repetitions?: number; // Reps or time, depending on exercise type
  durationStart?: number; // Optional for time-based exercises
  durationEnd?: number; // Optional for time-based exercises
  restTime: number; // Rest time in seconds
}
