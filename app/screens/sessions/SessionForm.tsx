import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Button,
  ScrollView,
  Image,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";
import { exercises } from "@/app/data/exercises";
import { Exercise } from "@/types/ExerciseTypes";
import {
  SessionExerciseSet,
  ExerciseGroup,
  Session,
} from "@/types/SessionTypes";

const availableExercises = exercises;

const defaultSetValues = {
  reps: 0,
  duration: "0.00",
  intensity: 0,
  rest: "0.00",
};

interface SessionFormProps {
  session?: Session;
  onSave: (session: Session) => void;
}

const SessionForm: React.FC<SessionFormProps> = ({ session, onSave }) => {
  const [sessionTitle, setSessionTitle] = useState("Titre de la session");
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const [exerciseSets, setExerciseSets] = useState<{
    [key: number]: SessionExerciseSet[];
  }>({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mode, setMode] = useState<"reps" | "time">("reps");

  useEffect(() => {
    if (session) {
      setSessionTitle(session.title);

      // Trouver les exercices associés à la session
      const exercisesForSession = session.exerciseGroups.flatMap(
        (group: ExerciseGroup) =>
          group.exercises
            .map((exercise) =>
              availableExercises.find((ex) => ex.id === exercise.exerciseId)
            )
            .filter((exercise) => exercise !== undefined) as Exercise[]
      );

      setSelectedExercises(exercisesForSession);

      // Initialiser les sets d'exercice
      const initialSets: { [key: number]: SessionExerciseSet[] } = {};
      session.exerciseGroups.forEach((group) => {
        group.exercises.forEach((exercise) => {
          const exerciseSets =
            group.type === "bi-set"
              ? [
                  {
                    reps: 0,
                    duration: "0.00",
                    intensity: exercise.intensity,
                    rest: "0.00",
                  },
                  {
                    reps: 0,
                    duration: "0.00",
                    intensity: exercise.intensity,
                    rest: "0.00",
                  },
                ]
              : [
                  {
                    reps: exercise.repetitions,
                    duration:
                      group.type === "single"
                        ? "0.00"
                        : exercise.durationEnd.toString(),
                    intensity: exercise.intensity,
                    rest: exercise.restTime.toString(),
                  },
                ];

          initialSets[exercise.exerciseId] = exerciseSets;
        });
      });

      setExerciseSets(initialSets);
    }
  }, [session]);

  const addSetToExercise = (exerciseId: number) => {
    const lastSet =
      exerciseSets[exerciseId]?.[exerciseSets[exerciseId].length - 1] ||
      defaultSetValues;
    const newSet = { ...defaultSetValues, ...lastSet };
    setExerciseSets((prev) => ({
      ...prev,
      [exerciseId]: [...(prev[exerciseId] || []), newSet],
    }));
  };

  const updateSet = (
    exerciseId: number,
    index: number,
    updatedSet: SessionExerciseSet
  ) => {
    const updatedSets = [...(exerciseSets[exerciseId] || [])];
    updatedSets[index] = updatedSet;
    setExerciseSets((prev) => ({ ...prev, [exerciseId]: updatedSets }));
  };

  const removeSet = (exerciseId: number, index: number) => {
    const updatedSets = (exerciseSets[exerciseId] || []).filter(
      (_, i) => i !== index
    );
    setExerciseSets((prev) => ({ ...prev, [exerciseId]: updatedSets }));
  };

  const calculateTotalDuration = () => {
    return selectedExercises.reduce((total, exercise) => {
      const sets = exerciseSets[exercise.id] || [];
      return (
        total +
        sets.reduce((sum, set) => {
          return (
            sum +
            (mode === "time"
              ? (parseFloat(set.duration) || 0) + (parseFloat(set.rest) || 0)
              : 0)
          );
        }, 0)
      );
    }, 0);
  };

  const handleAddExercise = (exercise: Exercise) => {
    setSelectedExercises((prev) => [...prev, exercise]);
    setExerciseSets((prev) => ({
      ...prev,
      [exercise.id]: Array(4).fill(defaultSetValues),
    }));
    setIsModalVisible(false);
  };

  const handleTextChange = (
    text: string,
    exerciseId: number,
    index: number,
    field: "reps" | "duration" | "intensity" | "rest"
  ) => {
    updateSet(exerciseId, index, {
      ...exerciseSets[exerciseId][index],
      [field]: text,
    });
  };

  const renderExerciseItem = ({ item }: { item: Exercise }) => (
    <TouchableOpacity
      style={styles.exerciseItem}
      onPress={() => handleAddExercise(item)}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <View style={styles.exerciseInfo}>
        <Text>{item.title}</Text>
        <Text style={styles.exerciceDescription} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.titleInput}
        value={sessionTitle}
        onChangeText={setSessionTitle}
      />
      <Text style={styles.estimateText}>
        Estimation du temps nécessaire : {calculateTotalDuration()} minutes
      </Text>

      <Button
        title="Ajouter un exercice"
        onPress={() => setIsModalVisible(true)}
      />

      <ScrollView>
        {selectedExercises.map((exercise) => (
          <View key={exercise.id} style={styles.exerciseContainer}>
            <View style={styles.exerciseHeader}>
              <Image
                source={{ uri: exercise.thumbnail }}
                style={styles.thumbnail}
              />
              <View style={styles.exerciseInfo}>
                <Text style={styles.exerciseTitle}>{exercise.title}</Text>

                <Text style={styles.exerciceDescription} numberOfLines={2}>
                  {exercise.description}
                </Text>
                <Text>{exercise.bodyPartName}</Text>
                {exercise.equipmentName && (
                  <Text>{exercise.equipmentName}</Text>
                )}
              </View>
            </View>
            <View style={styles.setList}>
              <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderText}>Set</Text>
                <Text style={styles.tableHeaderText}>
                  {mode === "reps" ? "Reps" : "Durée"}
                </Text>
                <Text style={styles.tableHeaderText}>kg</Text>
                <Text style={styles.tableHeaderText}>Repos</Text>
                <Text style={styles.tableHeaderText}></Text>
              </View>
              {(exerciseSets[exercise.id] || []).map((set, index) => (
                <View key={index} style={styles.setRow}>
                  <Text>{index + 1}</Text>
                  <TextInput
                    style={styles.setInput}
                    placeholder={mode === "reps" ? "Reps" : "Durée"}
                    keyboardType="numeric"
                    value={
                      mode === "reps"
                        ? set.reps.toString()
                        : set.duration.toString()
                    }
                    onChangeText={(text) =>
                      handleTextChange(
                        text,
                        exercise.id,
                        index,
                        mode === "reps" ? "reps" : "duration"
                      )
                    }
                  />
                  <TextInput
                    style={styles.setInput}
                    placeholder="Intensité (kg)"
                    keyboardType="numeric"
                    value={set.intensity.toString()}
                    onChangeText={(text) =>
                      handleTextChange(text, exercise.id, index, "intensity")
                    }
                  />
                  <TextInput
                    style={styles.setInput}
                    placeholder="Repos"
                    keyboardType="numeric"
                    value={set.rest.toString()}
                    onChangeText={(text) =>
                      handleTextChange(text, exercise.id, index, "rest")
                    }
                  />
                  <Button
                    title="X"
                    onPress={() => removeSet(exercise.id, index)}
                  />
                </View>
              ))}
              <Button
                title="Ajouter un set"
                onPress={() => addSetToExercise(exercise.id)}
              />
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Modal pour ajouter un exercice */}
      <Modal visible={isModalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <FlatList
            data={availableExercises}
            renderItem={renderExerciseItem}
            keyExtractor={(item) => item.id.toString()}
          />
          <Button title="Annuler" onPress={() => setIsModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titleInput: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    borderBottomWidth: 1,
  },
  estimateText: {
    fontSize: 16,
    marginBottom: 16,
  },
  exerciseContainer: {
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  exerciseHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  thumbnail: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  exerciceDescription: {
    fontSize: 14,
    color: "#555",
  },
  setList: {
    marginBottom: 16,
  },
  setRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  setInput: {
    flex: 1,
    marginRight: 8,
    borderBottomWidth: 1,
    textAlign: "center",
  },
  tableHeader: {
    flexDirection: "row",
    marginBottom: 8,
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
    justifyContent: "center",
  },
  exerciseItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});

export default SessionForm;
