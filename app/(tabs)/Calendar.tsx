import React from "react";
import { View, StyleSheet } from "react-native";
import CalendarScreen from "../screens/CalendarScreen";

export default function CalendarTab() {
  return (
    <View style={styles.container}>
      <CalendarScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
