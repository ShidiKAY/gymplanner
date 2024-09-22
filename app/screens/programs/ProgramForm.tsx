import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  TrainingProgram,
  Macrocycle,
  Mesocycle,
  Microcycle,
  // Session,
} from "@/types/ProgramTypes";

import { sessions } from "@/app/data/sessions";
import { createProgram, updateProgram } from "@/app/data/programs";

interface ProgramFormProps {
  program?: TrainingProgram;
  onSave: (program: TrainingProgram) => void;
  onCancel: () => void;
}

const ProgramForm: React.FC<ProgramFormProps> = ({
  program,
  onSave,
  onCancel,
}) => {
  const [macrocycles, setMacrocycles] = useState<Macrocycle[]>(
    program?.macrocycles || []
  );
  const [newMacrocycleTitle, setNewMacrocycleTitle] = useState("");
  const [newMesocycleTitle, setNewMesocycleTitle] = useState("");
  const [newMicrocycleTitle, setNewMicrocycleTitle] = useState("");

  const handleAddCycle = (
    type: "macrocycle" | "mesocycle" | "microcycle",
    parentId?: number
  ) => {
    const newCycle = {
      id: Math.floor(Math.random() * 10000),
      title:
        type === "macrocycle"
          ? newMacrocycleTitle || `Macrocycle ${macrocycles.length + 1}`
          : type === "mesocycle"
          ? newMesocycleTitle || `Mesocycle ${macrocycles.length + 1}`
          : newMicrocycleTitle || `Microcycle ${macrocycles.length + 1}`,
      startDate: "",
      endDate: "",
      objective: "development",
      theme: "",
      microcycles: type === "macrocycle" ? [] : undefined,
      sessions: type === "microcycle" ? [] : undefined,
      mesocycles: type === "macrocycle" ? [] : undefined,
    };

    if (type === "macrocycle") {
      setMacrocycles([...macrocycles, newCycle as Macrocycle]);
    } else if (type === "mesocycle" && parentId) {
      setMacrocycles(
        macrocycles.map((m) =>
          m.id === parentId
            ? {
                ...m,
                mesocycles: [...(m.mesocycles || []), newCycle as Mesocycle],
              }
            : m
        )
      );
    } else if (type === "microcycle" && parentId) {
      const updatedMacrocycles = macrocycles.map((m) => ({
        ...m,
        mesocycles: m.mesocycles?.map((mc) =>
          mc.id === parentId
            ? {
                ...mc,
                microcycles: [
                  ...(mc.microcycles || []),
                  newCycle as Microcycle,
                ],
              }
            : mc
        ),
      }));
      setMacrocycles(updatedMacrocycles);
    }
  };

  const handleDuplicateCycle = (
    cycle: Macrocycle | Mesocycle | Microcycle,
    type: "macrocycle" | "mesocycle" | "microcycle"
  ) => {
    const generateUniqueId = () => Math.floor(Math.random() * 10000);

    const duplicateCycle = (c: any): any => {
      return {
        ...c,
        id: generateUniqueId(),
        title: `${c.title} (Copie)`,
        sessions:
          type === "microcycle"
            ? (c.sessions || []).map((s: any) => ({
                ...s,
                id: generateUniqueId(),
              }))
            : undefined,
        microcycles: (c.microcycles || []).map(duplicateCycle),
        mesocycles: (c.mesocycles || []).map(duplicateCycle),
      };
    };

    if (type === "macrocycle") {
      setMacrocycles([...macrocycles, duplicateCycle(cycle as Macrocycle)]);
    } else if (type === "mesocycle") {
      setMacrocycles(
        macrocycles.map((m) => {
          if (m.mesocycles) {
            const index = m.mesocycles.findIndex((mc) => mc.id === cycle.id);
            if (index !== -1) {
              const newMesocycles = [...m.mesocycles];
              newMesocycles.splice(
                index + 1,
                0,
                duplicateCycle(cycle as Mesocycle)
              );
              return { ...m, mesocycles: newMesocycles };
            }
          }
          return m;
        })
      );
    } else if (type === "microcycle") {
      setMacrocycles(
        macrocycles.map((m) => ({
          ...m,
          mesocycles: m.mesocycles?.map((mc) => {
            if (mc.microcycles) {
              const index = mc.microcycles.findIndex(
                (mic) => mic.id === cycle.id
              );
              if (index !== -1) {
                const newMicrocycles = [...mc.microcycles];
                newMicrocycles.splice(
                  index + 1,
                  0,
                  duplicateCycle(cycle as Microcycle)
                );
                return { ...mc, microcycles: newMicrocycles };
              }
            }
            return mc;
          }),
        }))
      );
    }
  };

  const handleCycleTitleChange = (
    id: number,
    newTitle: string,
    type: "macrocycle" | "mesocycle" | "microcycle"
  ) => {
    const updatedCycles = macrocycles.map((m) => ({
      ...m,
      mesocycles: m.mesocycles?.map((mc) => ({
        ...mc,
        microcycles: mc.microcycles?.map((mic) => ({
          ...mic,
          title: mic.id === id ? newTitle : mic.title,
        })),
        title: mc.id === id ? newTitle : mc.title,
      })),
      title: m.id === id ? newTitle : m.title,
    }));
    setMacrocycles(updatedCycles);
  };

  const handleAddSessionToMicrocycle = (
    microcycleId: number,
    sessionId: number
  ) => {
    const updatedMacrocycles = macrocycles.map((m) => ({
      ...m,
      mesocycles: m.mesocycles?.map((mc) => ({
        ...mc,
        microcycles: mc.microcycles?.map((mc) =>
          mc.id === microcycleId
            ? {
                ...mc,
                sessions: [
                  ...(mc.sessions || []),
                  sessions.find((s) => s.id === sessionId)!,
                ],
              }
            : mc
        ),
      })),
    }));
    setMacrocycles(updatedMacrocycles);
  };

  const handleSave = () => {
    const programToSave: TrainingProgram = {
      id: program?.id || Math.floor(Math.random() * 10000),
      name: program?.name || "",
      description: program?.description || "",
      macrocycles,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (program) {
      updateProgram(programToSave);
    } else {
      createProgram(programToSave);
    }

    onSave(programToSave);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Nom du programme</Text>
      <TextInput
        style={styles.input}
        value={program?.name || ""}
        onChangeText={(text) => setNewMacrocycleTitle(text)}
        placeholder="Nom du programme"
      />

      <Text style={styles.label}>Description du programme</Text>
      <TextInput
        style={styles.input}
        value={program?.description || ""}
        onChangeText={(text) => setNewMacrocycleTitle(text)}
        placeholder="Description du programme"
      />

      {macrocycles.map((macrocycle) => (
        <View key={macrocycle.id} style={styles.macrocycleContainer}>
          <TextInput
            style={styles.input}
            value={macrocycle.title}
            onChangeText={(text) =>
              handleCycleTitleChange(macrocycle.id, text, "macrocycle")
            }
            placeholder="Titre du macrocycle"
          />
          <TouchableOpacity
            style={styles.duplicateButton}
            onPress={() => handleDuplicateCycle(macrocycle, "macrocycle")}
          >
            <Text style={styles.addButtonText}>Dupliquer le Macrocycle</Text>
          </TouchableOpacity>

          {macrocycle.mesocycles?.map((mesocycle) => (
            <View key={mesocycle.id} style={styles.mesocycleContainer}>
              <TextInput
                style={styles.input}
                value={mesocycle.title}
                onChangeText={(text) =>
                  handleCycleTitleChange(mesocycle.id, text, "mesocycle")
                }
                placeholder="Titre du mesocycle"
              />
              <TouchableOpacity
                style={styles.duplicateButton}
                onPress={() => handleDuplicateCycle(mesocycle, "mesocycle")}
              >
                <Text style={styles.addButtonText}>Dupliquer le Mesocycle</Text>
              </TouchableOpacity>

              {mesocycle.microcycles?.map((microcycle) => (
                <View key={microcycle.id} style={styles.microcycleContainer}>
                  <TextInput
                    style={styles.input}
                    value={microcycle.title}
                    onChangeText={(text) =>
                      handleCycleTitleChange(microcycle.id, text, "microcycle")
                    }
                    placeholder="Titre du microcycle"
                  />
                  <TouchableOpacity
                    style={styles.duplicateButton}
                    onPress={() =>
                      handleDuplicateCycle(microcycle, "microcycle")
                    }
                  >
                    <Text style={styles.addButtonText}>
                      Dupliquer le Microcycle
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.label}>Sessions</Text>
                  {microcycle.sessions?.map((session) => (
                    <Text key={session.id} style={styles.sessionText}>
                      {session.title}
                    </Text>
                  ))}
                  <Picker
                    selectedValue={null}
                    onValueChange={(itemValue) =>
                      itemValue &&
                      handleAddSessionToMicrocycle(
                        microcycle.id,
                        itemValue as number
                      )
                    }
                    style={styles.picker}
                  >
                    <Picker.Item
                      label="Sélectionner une session"
                      value={null}
                    />
                    {sessions.map((session) => (
                      <Picker.Item
                        key={session.id}
                        label={session.title}
                        value={session.id}
                      />
                    ))}
                  </Picker>
                </View>
              ))}

              <TouchableOpacity
                style={styles.addButton}
                onPress={() => handleAddCycle("microcycle", mesocycle.id)}
              >
                <Text style={styles.addButtonText}>Ajouter un Microcycle</Text>
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAddCycle("mesocycle", macrocycle.id)}
          >
            <Text style={styles.addButtonText}>Ajouter un Mesocycle</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => handleAddCycle("macrocycle")}
      >
        <Text style={styles.addButtonText}>Ajouter un Macrocycle</Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <Button title="Annuler" onPress={onCancel} color="#ff5c5c" />
        <Button title="Enregistrer" onPress={handleSave} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
  macrocycleContainer: {
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 16,
    borderRadius: 8,
  },
  mesocycleContainer: {
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 16,
    borderRadius: 8,
  },
  microcycleContainer: {
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 16,
    borderRadius: 8,
  },
  sessionText: {
    fontSize: 14,
    marginBottom: 4,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  addButton: {
    marginTop: 16,
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  duplicateButton: {
    marginTop: 16,
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  duplicateButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
});

export default ProgramForm;
