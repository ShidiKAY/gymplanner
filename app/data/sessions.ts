import { Session, ExerciseGroup } from "@/types/SessionTypes";
import { exercises } from "@/app/data/exercises"; // Assurez-vous que ce chemin est correct

export const sessions: Session[] = [
  {
    id: 1,
    title: "Session 1",
    date: "2024-07-30",
    exerciseGroups: [
      {
        type: "single",
        exercises: [
          {
            exerciseId: 1,
            intensity: 70,
            repetitions: 10,
            restTime: 60,
          },
        ],
      },
      {
        type: "bi-set",
        exercises: [
          {
            exerciseId: 2,
            intensity: 80,
            durationStart: 40,
            durationEnd: 70,
            restTime: 75,
          },
          {
            exerciseId: 3,
            intensity: 60,
            repetitions: 12,
            restTime: 45,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Session 2",
    date: "2024-08-01",
    exerciseGroups: [
      {
        type: "single",
        exercises: [
          {
            exerciseId: 4,
            intensity: 65,
            repetitions: 15,
            restTime: 30,
          },
        ],
      },
    ],
  },
];

export const deleteSession = (sessionId: number) => {
  console.log("deleted " + sessionId);
  // Ajouter la logique de suppression
  // Vous devez filtrer la liste des sessions pour supprimer la session correspondante
};
