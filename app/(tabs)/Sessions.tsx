import React from "react";
import { View, StyleSheet } from "react-native";
import SessionsScreen from "../screens/SessionsScreen";

export default function SessionsTab() {
  return (
    <View style={styles.container}>
      <SessionsScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
