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
    content: string;
  }[];
  variants: {
    id: number;
    title: string;
    intensity: number;
    repetitions: number;
  }[];
  bodyPartId: number; // Changed to reference the ID
  equipmentId?: number; // Optional if no equipment is used
}
