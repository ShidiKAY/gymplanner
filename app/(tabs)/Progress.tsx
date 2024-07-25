import React from "react";
import { View, StyleSheet } from "react-native";
import ProgressScreen from "../screens/ProgressScreen";

export default function ProgressTab() {
  return (
    <View style={styles.container}>
      <ProgressScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
