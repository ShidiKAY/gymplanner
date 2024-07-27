// app/components/ExerciseFilter.tsx

import React, { useState } from "react";
import { View, Picker } from "react-native";

export default function ExerciseFilter() {
  const [category, setCategory] = useState("");

  return (
    <View>
      <Picker
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
      >
        <Picker.Item label="All Categories" value="" />
        <Picker.Item label="Chest" value="Chest" />
        <Picker.Item label="Back" value="Back" />
        <Picker.Item label="Legs" value="Legs" />
        {/* Add more categories */}
      </Picker>
    </View>
  );
}
