import React from "react";
import { View, Text, StyleSheet } from "react-native";

type CycleProps = {
  name: string;
  weeks: string[];
};

const Cycle: React.FC<CycleProps> = ({ name, weeks }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.cycleTitle}>{name}</Text>
      {weeks.map((week, index) => (
        <Text key={index} style={styles.weekText}>
          {week}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  cycleTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  weekText: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default Cycle;
