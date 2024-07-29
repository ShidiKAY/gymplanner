import { Session, SessionModel } from "@/types/SessionTypes";
import { sessions, sessionModels } from "@/app/data/sessions";

// Dupliquer une session
export const duplicateSession = (sessionId: number): Session | null => {
  const sessionToDuplicate = sessions.find((s) => s.id === sessionId);
  if (!sessionToDuplicate) return null;

  const newSession: Session = {
    ...sessionToDuplicate,
    id: sessions.length + 1, // Génère un nouvel ID
    date: new Date().toISOString().split("T")[0], // Nouvelle date
  };

  sessions.push(newSession);
  return newSession;
};

// Créer une session à partir d'un modèle
export const createSessionFromModel = (modelId: number): Session | null => {
  const model = sessionModels.find((m) => m.id === modelId);
  if (!model) return null;

  const newSession: Session = {
    id: sessions.length + 1,
    title: model.title,
    date: new Date().toISOString().split("T")[0],
    exercises: model.exercises.map((exercise) => ({
      exerciseId: exercise.id,
      intensity: 70, // Valeurs par défaut, à ajuster
      repetitions: 10,
      durationStart: 30,
      durationEnd: 60,
      restTime: 60,
    })),
  };

  sessions.push(newSession);
  return newSession;
};
