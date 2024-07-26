export interface Exercise {
  id: string;
  title: string;
  intensity: number;
  repetitions: number;
  durationStart: number;
  durationEnd: number;
  restTime: number;
  thumbnailUrl?: string;
  videoUrl?: string;
  videoTimestamps?: number[];
  notes?: { title: string; content: string }[];
}

export interface Session {
  id: string;
  name: string;
  exercises: Exercise[];
}

export interface Program {
  id: string;
  name: string;
  weeks: { [weekNumber: number]: Session[] };
  recurrence: number; // e.g., every week, every two weeks
}
