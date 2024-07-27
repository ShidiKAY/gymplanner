// ExerciseForm.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Slider from "@react-native-community/slider";
import { Exercise } from "@/types/ExerciseTypes";

interface ExerciseFormProps {
  exercise?: Exercise; // Pour l'édition, un exercice peut être passé en prop
  onSave: (exercise: Exercise) => void; // Fonction appelée lors de la sauvegarde
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
      // Si un exercice est passé en prop, initialiser les valeurs
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

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handleBack = () => setCurrentStep((prev) => prev - 1);

  const handleSave = () => {
    const newExercise: Exercise = {
      title,
      description,
      category,
      repetitions,
      restTime,
      duration: { start: durationStart, end: durationEnd },
      intensity,
      id: exercise ? exercise.id : Date.now(), // Utilise l'ID existant pour l'édition, sinon génère un nouveau ID
    };

    onSave(newExercise); // Appelle la fonction de sauvegarde passée en prop
  };

  return (
    <ScrollView style={styles.container}>
      {currentStep === 1 && (
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
      )}
      {currentStep === 2 && (
        <View style={styles.stepContainer}>
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderLabel}>Repetitions:</Text>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={100}
              step={1}
              value={repetitions}
              onValueChange={setRepetitions}
            />
            <Text style={styles.sliderValue}>{repetitions}</Text>
          </View>

          <View style={styles.sliderContainer}>
            <Text style={styles.sliderLabel}>Rest Time (seconds):</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={60}
              step={1}
              value={restTime}
              onValueChange={setRestTime}
            />
            <Text style={styles.sliderValue}>{restTime}</Text>
          </View>

          <View style={styles.sliderContainer}>
            <Text style={styles.sliderLabel}>Duration Start (seconds):</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={60}
              step={1}
              value={durationStart}
              onValueChange={setDurationStart}
            />
            <Text style={styles.sliderValue}>{durationStart}</Text>
          </View>

          <View style={styles.sliderContainer}>
            <Text style={styles.sliderLabel}>Duration End (seconds):</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={60}
              step={1}
              value={durationEnd}
              onValueChange={setDurationEnd}
            />
            <Text style={styles.sliderValue}>{durationEnd}</Text>
          </View>

          <View style={styles.buttonContainer}>
            <Button title="Back" onPress={handleBack} />
            <Button title="Next" onPress={handleNext} />
          </View>
        </View>
      )}
      {currentStep === 3 && (
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
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  stepContainer: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 16,
  },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sliderLabel: {
    width: 150,
    fontSize: 16,
    marginRight: 8,
  },
  slider: {
    flex: 1,
    marginHorizontal: 8,
  },
  sliderValue: {
    width: 50,
    textAlign: "center",
    fontSize: 16,
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
