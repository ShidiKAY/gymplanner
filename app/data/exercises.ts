import { Exercise } from "@/types/ExerciseTypes";

// import { bodyParts } from "./bodyParts";
// import { equipmentList } from "./equipmentList";

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
    thumbnail:
      "https://cdn.mos.cms.futurecdn.net/oYDbf5hQAePHEBNZTQMXRA-1200-80.jpg",
    videoLinks: [
      {
        url: "https://www.youtube.com/watch?v=IODxDxX7oi4",
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
    bodyPartId: 4, // Correspond to "Chest"
    equipmentId: 1, // Correspond to "None"
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
    bodyPartId: 2, // Correspond to "Legs"
    equipmentId: 1, // Correspond to "None"
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
    bodyPartId: 5, // Correspond to "Core"
    equipmentId: 1, // Correspond to "None"
  },
  {
    id: 4,
    title: "Lunges",
    description: "A basic lunge exercise.",
    category: "Strength",
    intensity: 3,
    repetitions: 12,
    duration: {
      start: 0,
      end: 60,
    },
    restTime: 30,
    thumbnail: "https://example.com/lunges-thumbnail.jpg",
    videoLinks: [
      {
        url: "https://www.youtube.com/watch?v=example4",
        thumbnail: "https://example.com/video-thumbnail4.jpg",
        startTime: 0,
      },
    ],
    notes: [
      {
        title: "Form",
        content: "Keep your knee behind your toes.",
      },
    ],
    variants: [
      {
        id: 4,
        title: "Reverse Lunge",
        intensity: 3,
        repetitions: 12,
      },
    ],
    bodyPartId: 2, // Correspond to "Legs"
    equipmentId: 1, // Correspond to "None"
  },
  {
    id: 5,
    title: "Burpees",
    description: "A full-body exercise combining a squat, jump, and push-up.",
    category: "Cardio",
    intensity: 5,
    repetitions: 15,
    duration: {
      start: 0,
      end: 90,
    },
    restTime: 30,
    thumbnail: "https://example.com/burpees-thumbnail.jpg",
    videoLinks: [
      {
        url: "https://www.youtube.com/watch?v=example5",
        thumbnail: "https://example.com/video-thumbnail5.jpg",
        startTime: 0,
      },
    ],
    notes: [
      {
        title: "Form",
        content: "Ensure full body extension during the jump.",
      },
    ],
    variants: [
      {
        id: 5,
        title: "Half Burpee",
        intensity: 4,
        repetitions: 20,
      },
    ],
    bodyPartId: 4, // Correspond to "Full Body"
    equipmentId: 1, // Correspond to "None"
  },
  {
    id: 6,
    title: "Mountain Climbers",
    description: "A cardio exercise that simulates climbing a mountain.",
    category: "Cardio",
    intensity: 4,
    repetitions: 30,
    duration: {
      start: 0,
      end: 60,
    },
    restTime: 30,
    thumbnail: "https://example.com/mountainclimbers-thumbnail.jpg",
    videoLinks: [
      {
        url: "https://www.youtube.com/watch?v=example6",
        thumbnail: "https://example.com/video-thumbnail6.jpg",
        startTime: 0,
      },
    ],
    notes: [
      {
        title: "Form",
        content: "Keep your core tight.",
      },
    ],
    variants: [
      {
        id: 6,
        title: "Cross-Body Mountain Climbers",
        intensity: 5,
        repetitions: 25,
      },
    ],
    bodyPartId: 5, // Correspond to "Core"
    equipmentId: 1, // Correspond to "None"
  },
  {
    id: 7,
    title: "Bicycle Crunches",
    description: "A core exercise targeting the abdominal muscles.",
    category: "Core",
    intensity: 4,
    repetitions: 20,
    duration: {
      start: 0,
      end: 60,
    },
    restTime: 30,
    thumbnail: "https://example.com/bicyclecrunches-thumbnail.jpg",
    videoLinks: [
      {
        url: "https://www.youtube.com/watch?v=example7",
        thumbnail: "https://example.com/video-thumbnail7.jpg",
        startTime: 0,
      },
    ],
    notes: [
      {
        title: "Form",
        content: "Keep your lower back pressed to the ground.",
      },
    ],
    variants: [
      {
        id: 7,
        title: "Russian Twists",
        intensity: 4,
        repetitions: 20,
      },
    ],
    bodyPartId: 5, // Correspond to "Core"
    equipmentId: 1, // Correspond to "None"
  },
  {
    id: 8,
    title: "Dips",
    description: "An upper body exercise focusing on triceps strength.",
    category: "Strength",
    intensity: 5,
    repetitions: 12,
    duration: {
      start: 0,
      end: 60,
    },
    restTime: 45,
    thumbnail: "https://example.com/dips-thumbnail.jpg",
    videoLinks: [
      {
        url: "https://www.youtube.com/watch?v=example8",
        thumbnail: "https://example.com/video-thumbnail8.jpg",
        startTime: 0,
      },
    ],
    notes: [
      {
        title: "Form",
        content: "Keep your elbows close to your body.",
      },
    ],
    variants: [
      {
        id: 8,
        title: "Bench Dips",
        intensity: 4,
        repetitions: 15,
      },
    ],
    bodyPartId: 1, // Correspond to "Triceps"
    equipmentId: 2, // Correspond to "Dip Bars"
  },
  {
    id: 9,
    title: "Deadlift",
    description: "A compound exercise targeting multiple muscle groups.",
    category: "Strength",
    intensity: 5,
    repetitions: 10,
    duration: {
      start: 0,
      end: 120,
    },
    restTime: 60,
    thumbnail: "https://example.com/deadlift-thumbnail.jpg",
    videoLinks: [
      {
        url: "https://www.youtube.com/watch?v=example9",
        thumbnail: "https://example.com/video-thumbnail9.jpg",
        startTime: 0,
      },
    ],
    notes: [
      {
        title: "Form",
        content: "Keep your back straight and lift with your legs.",
      },
    ],
    variants: [
      {
        id: 9,
        title: "Romanian Deadlift",
        intensity: 5,
        repetitions: 10,
      },
    ],
    bodyPartId: 3, // Correspond to "Back"
    equipmentId: 3, // Correspond to "Barbell"
  },
  {
    id: 10,
    title: "Chest Press",
    description: "A strength exercise focusing on the chest muscles.",
    category: "Strength",
    intensity: 4,
    repetitions: 12,
    duration: {
      start: 0,
      end: 60,
    },
    restTime: 45,
    thumbnail: "https://example.com/chestpress-thumbnail.jpg",
    videoLinks: [
      {
        url: "https://www.youtube.com/watch?v=example10",
        thumbnail: "https://example.com/video-thumbnail10.jpg",
        startTime: 0,
      },
    ],
    notes: [
      {
        title: "Form",
        content: "Keep your shoulders down and back.",
      },
    ],
    variants: [
      {
        id: 10,
        title: "Incline Chest Press",
        intensity: 5,
        repetitions: 12,
      },
    ],
    bodyPartId: 4, // Correspond to "Chest"
    equipmentId: 2, // Correspond to "Dumbbells"
  },
];

export const getExercises = () => {
  return exercises;
};

export const deleteExercise = (exerciseId) => {
  console.log("deleted " + exerciseId);
  // ajouter la logique de suppression
  // exercises = exercises.filter((exercise) => exercise.id !== exerciseId);
};
