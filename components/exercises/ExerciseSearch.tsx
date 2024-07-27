// app/components/ExerciseSearch.tsx

import React, { useState } from "react";
import { View, TextInput } from "react-native";

export default function ExerciseSearch() {
  const [search, setSearch] = useState("");

  return (
    <View>
      <TextInput
        placeholder="Search exercises"
        value={search}
        onChangeText={setSearch}
      />
    </View>
  );
}
