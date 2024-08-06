import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Slider from "@react-native-community/slider";
import { Exercise } from "@/types/ExerciseTypes";

interface ExerciseFormProps {
  exercise?: Exercise;
  onSave: (exercise: Exercise) => void;
}

const ExerciseForm: React.FC<ExerciseFormProps> = ({ exercise, onSave }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [repetitions, setRepetitions] = useState(0);
  const [restTime, setRestTime] = useState(0);
  const [durationStart, setDurationStart] = useState(0);
  const [durationEnd, setDurationEnd] = useState(0);
  const [intensity, setIntensity] = useState("Low");

  useEffect(() => {
    if (exercise) {
      setTitle(exercise.title);
      setDescription(exercise.description);
      setCategory(exercise.category);
      setRepetitions(exercise.repetitions);
      setRestTime(exercise.restTime);
      setDurationStart(exercise.duration.start);
      setDurationEnd(exercise.duration.end);
      setIntensity(exercise.intensity);
    }
  }, [exercise]);

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleSave = () => {
    const newExercise: Exercise = {
      title,
      description,
      category,
      repetitions,
      restTime,
      duration: { start: durationStart, end: durationEnd },
      intensity,
      id: exercise ? exercise.id : Date.now(),
    };

    onSave(newExercise);
  };

  const renderForm = () => {
    if (currentStep === 1) {
      return (
        <View style={styles.stepContainer}>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
          />
          <Picker
            selectedValue={category}
            style={styles.picker}
            onValueChange={(itemValue) => setCategory(itemValue)}
          >
            <Picker.Item label="Category 1" value="Category 1" />
            <Picker.Item label="Category 2" value="Category 2" />
            <Picker.Item label="Category 3" value="Category 3" />
          </Picker>
          <Button title="Next" onPress={handleNext} />
        </View>
      );
    } else if (currentStep === 2) {
      return (
        <View style={styles.stepContainer}>
          <Text>Repetitions:</Text>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={100}
            step={1}
            value={repetitions}
            onValueChange={setRepetitions}
          />
          <Text>{repetitions}</Text>

          <Text>Rest Time (seconds):</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={60}
            step={1}
            value={restTime}
            onValueChange={setRestTime}
          />
          <Text>{restTime}</Text>

          <Text>Duration Start (seconds):</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={60}
            step={1}
            value={durationStart}
            onValueChange={setDurationStart}
          />
          <Text>{durationStart}</Text>

          <Text>Duration End (seconds):</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={60}
            step={1}
            value={durationEnd}
            onValueChange={setDurationEnd}
          />
          <Text>{durationEnd}</Text>

          <View style={styles.buttonContainer}>
            <Button title="Back" onPress={handleBack} />
            <Button title="Next" onPress={handleNext} />
          </View>
        </View>
      );
    } else if (currentStep === 3) {
      return (
        <View style={styles.stepContainer}>
          <Text style={styles.header}>Confirm your details</Text>
          <Text>Title: {title}</Text>
          <Text>Description: {description}</Text>
          <Text>Category: {category}</Text>
          <Text>Repetitions: {repetitions}</Text>
          <Text>Rest Time: {restTime}</Text>
          <Text>
            Duration: {durationStart} - {durationEnd}
          </Text>
          <Text>Intensity: {intensity}</Text>

          <View style={styles.buttonContainer}>
            <Button title="Back" onPress={handleBack} />
            <Button title="Save" onPress={handleSave} />
          </View>
        </View>
      );
    }
    return null;
  };

  return (
    <FlatList
      data={[{ key: "form" }]}
      renderItem={renderForm}
      keyExtractor={(item) => item.key}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  stepContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 16,
    elevation: 1,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 4,
    width: "100%", // Assure que le champ de texte utilise toute la largeur disponible
  },
  picker: {
    height: 50,
    width: "100%", // Assure que le picker utilise toute la largeur disponible
    marginBottom: 16,
  },
  slider: {
    width: "100%", // Assure que le slider utilise toute la largeur disponible
    marginVertical: 8,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

export default ExerciseForm;
