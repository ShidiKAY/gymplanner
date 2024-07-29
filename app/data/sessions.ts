import { Session, SessionModel } from "@/types/SessionTypes";
import { Equipment } from "@/types/Equipment";
import { exercises } from "@/app/data/exercises"; // Assure-toi que ce chemin est correct

export const sessionModels: SessionModel[] = [
  {
    id: 1,
    title: "Model 1",
    exercises: exercises.slice(0, 3), // Exemple avec les trois premiers exercices
  },
  {
    id: 2,
    title: "Model 2",
    exercises: exercises.slice(3, 6), // Exemple avec les trois exercices suivants
  },
];

export const sessions: Session[] = [
  {
    id: 1,
    title: "Session 1",
    date: "2024-07-30",
    exercises: [
      {
        exerciseId: 1,
        intensity: 70,
        repetitions: 10,
        durationStart: 30,
        durationEnd: 60,
        restTime: 60,
      },
      {
        exerciseId: 2,
        intensity: 80,
        repetitions: 8,
        durationStart: 40,
        durationEnd: 70,
        restTime: 75,
      },
    ],
  },
  {
    id: 2,
    title: "Session 2",
    date: "2024-08-01",
    exercises: [
      {
        exerciseId: 3,
        intensity: 60,
        repetitions: 12,
        durationStart: 20,
        durationEnd: 50,
        restTime: 45,
      },
    ],
  },
];

export const deleteSession = (sessionId) => {
  console.log("deleted " + sessionId);
  // ajouter la logique de suppression
  // exercises = exercises.filter((exercise) => exercise.id !== exerciseId);
};
