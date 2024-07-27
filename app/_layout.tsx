import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import ExerciseDetail from "@/app/screens/exercises/ExerciseDetail";

import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false, title: "Gym Planner" }}
        />
        <Stack.Screen name="+not-found" />
        <Stack.Screen
          name="screens/exercises/ExerciseDetail"
          options={{ title: "Detail d'un exercice" }}
        />
        <Stack.Screen
          name="screens/exercises/ExerciseCreate"
          options={{ title: "Creer un exercice" }}
        />
        <Stack.Screen
          name="screens/exercises/ExerciseEdit"
          options={{ title: "Modifier un exercice" }}
        />
        <Stack.Screen
          name="screens/exercises/ExerciseCreateFrom"
          options={{ title: "Copier un exercice" }}
        />
      </Stack>
    </ThemeProvider>
  );
}
