import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SectionHeader = ({ title }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionHeaderText}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  sectionHeader: {
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SectionHeader;
