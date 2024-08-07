// WeekForm.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import SessionSelector from "./SessionSelector"; // Assurez-vous que ce composant existe
import { ProgramWeek } from "@/types/ProgramTypes";

interface WeekFormProps {
  existingWeek?: ProgramWeek;
  onUpdateWeek: (week: ProgramWeek) => void;
}

const WeekForm: React.FC<WeekFormProps> = ({ existingWeek, onUpdateWeek }) => {
  const [weekName, setWeekName] = useState(
    existingWeek?.name || "Nouvelle Semaine"
  );
  const [days, setDays] = useState(existingWeek?.days || {});

  const handleAddOrUpdateWeek = () => {
    const updatedWeek: ProgramWeek = {
      id: existingWeek?.id || Date.now(),
      name: weekName,
      days,
    };

    onUpdateWeek(updatedWeek);
  };

  const handleDayChange = (
    day: string,
    type: "push" | "pull" | "legs",
    sessionIds: number[]
  ) => {
    setDays((prev) => ({
      ...prev,
      [day]: { type, sessionIds },
    }));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.titleInput}
        value={weekName}
        onChangeText={setWeekName}
      />
      <ScrollView>
        {Object.keys(days).map((day) => (
          <View key={day} style={styles.dayContainer}>
            <Text>{day}</Text>
            <SessionSelector
              selectedSessionIds={days[day].sessionIds}
              onChange={(sessionIds) =>
                handleDayChange(day, days[day].type, sessionIds)
              }
            />
            {/* Ajouter un sélecteur de type ici */}
          </View>
        ))}
      </ScrollView>
      <Button
        title="Ajouter/Mettre à jour la semaine"
        onPress={handleAddOrUpdateWeek}
      />
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
  dayContainer: {
    marginBottom: 16,
  },
});

export default WeekForm;
