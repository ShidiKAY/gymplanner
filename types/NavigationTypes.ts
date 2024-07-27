// types/NavigationTypes.ts

export type RootStackParamList = {
  Tabs: undefined; // La route des tabs ne prend pas de paramètres
  ExercisesDetail: { exerciseId: number }; // Route avec un ID d'exercice
  // Ajoutez d'autres écrans et leurs paramètres ici
};
