// src/types/ExerciseTypes.ts

export interface Exercise {
  id: number;
  title: string;
  description: string;
  category: string;
  intensity: number;
  repetitions: number;
  duration: {
    start: number;
    end: number;
  };
  restTime: number;
  thumbnail: string;
  videoLinks: {
    url: string;
    thumbnail: string;
    startTime: number;
  }[];
  notes: {
    title: string;
    content: string; // Utilisez 'content' pour la cohérence avec les données
  }[];
  variants: {
    id: number;
    title: string;
    intensity: number;
    repetitions: number;
  }[]; // Définissez la structure des variantes si nécessaire
}
