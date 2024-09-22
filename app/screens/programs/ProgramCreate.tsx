// ProgramCreate.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import ProgramForm from "@/app/screens/programs/ProgramForm";
import { createProgram } from "@/app/data/programs";
import { TrainingProgram } from "@/types/ProgramTypes";

const ProgramCreate: React.FC<{ navigation: any }> = ({ navigation }) => {
  const handleSave = (program: TrainingProgram) => {
    createProgram(program);
    navigation.goBack();
  };

  const onCancel = () => {
    console.log("onCreate");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ProgramForm onSave={handleSave} onCancel={onCancel} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProgramCreate;
