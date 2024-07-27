// src/app/data/exercises.ts

import { Exercise } from "@/types/ExerciseTypes";

export const exercises: Exercise[] = [
  {
    id: 1,
    title: "Push-Up",
    description: "A basic push-up exercise.",
    category: "Strength",
    intensity: 3,
    repetitions: 15,
    duration: {
      start: 0,
      end: 60,
    },
    restTime: 30,
    thumbnail: "https://example.com/pushup-thumbnail.jpg",
    videoLinks: [
      {
        url: "https://www.youtube.com/watch?v=example",
        thumbnail: "https://example.com/video-thumbnail.jpg",
        startTime: 0,
      },
    ],
    notes: [
      {
        title: "Form",
        content: "Keep your body straight.",
      },
    ],
    variants: [
      {
        id: 1,
        title: "Wide Push-Up",
        intensity: 4,
        repetitions: 12,
      },
    ],
  },
  {
    id: 2,
    title: "Squat",
    description: "A basic squat exercise.",
    category: "Strength",
    intensity: 4,
    repetitions: 20,
    duration: {
      start: 0,
      end: 90,
    },
    restTime: 45,
    thumbnail: "https://example.com/squat-thumbnail.jpg",
    videoLinks: [
      {
        url: "https://www.youtube.com/watch?v=example2",
        thumbnail: "https://example.com/video-thumbnail2.jpg",
        startTime: 0,
      },
    ],
    notes: [
      {
        title: "Depth",
        content: "Go below parallel.",
      },
    ],
    variants: [
      {
        id: 2,
        title: "Jump Squat",
        intensity: 5,
        repetitions: 10,
      },
    ],
  },
  {
    id: 3,
    title: "Plank",
    description: "A basic plank exercise.",
    category: "Core",
    intensity: 2,
    repetitions: 1,
    duration: {
      start: 0,
      end: 120,
    },
    restTime: 60,
    thumbnail: "https://example.com/plank-thumbnail.jpg",
    videoLinks: [
      {
        url: "https://www.youtube.com/watch?v=example3",
        thumbnail: "https://example.com/video-thumbnail3.jpg",
        startTime: 0,
      },
    ],
    notes: [
      {
        title: "Alignment",
        content: "Keep your body straight from head to heels.",
      },
    ],
    variants: [
      {
        id: 3,
        title: "Side Plank",
        intensity: 3,
        repetitions: 1,
      },
    ],
  },
];
