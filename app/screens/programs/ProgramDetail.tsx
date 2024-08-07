// ProgramDetail.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { programs } from "@/app/data/programs";

const ProgramDetail: React.FC = () => {
  const route = useRoute();
  const { programId } = route.params as { programId: number };
  const program = programs.find((p) => p.id === programId);

  if (!program) {
    return <Text>Programme non trouvé</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{program.title}</Text>
      <Text style={styles.recurrence}>Récurrence: {program.recurrence}</Text>
      {program.weeks.map((week) => (
        <View key={week.id} style={styles.week}>
          <Text style={styles.weekName}>{week.name}</Text>
          {Object.entries(week.days).map(([day, { type, sessionIds }]) => (
            <View key={day}>
              <Text>
                {day}: {type}
              </Text>
              {sessionIds.map((sessionId) => (
                <Text key={sessionId}>Session ID: {sessionId}</Text>
              ))}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  recurrence: {
    fontSize: 16,
    marginVertical: 8,
  },
  week: {
    marginBottom: 16,
  },
  weekName: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProgramDetail;
