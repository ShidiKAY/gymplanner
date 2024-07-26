import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation } from "expo-router";

export default function SessionForm() {
  const [sessionName, setSessionName] = useState("");
  const navigation = useNavigation();

  const handleSave = () => {
    // Logic to save the session
    console.log("Session saved:", sessionName);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create/Edit Session</Text>
      <TextInput
        style={styles.input}
        placeholder="Session Name"
        value={sessionName}
        onChangeText={setSessionName}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 20,
  },
});
