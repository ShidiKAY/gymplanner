import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SessionsList from "@/app/screens/sessions/SessionsList";
import SessionForm from "@/app/screens/sessions/SessionsForm";

const Stack = createStackNavigator();

export default function SessionsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SessionsList"
        component={SessionsList}
        options={{ title: "Sessions" }}
      />
      <Stack.Screen
        name="SessionForm"
        component={SessionForm}
        options={{ title: "Create/Edit Session" }}
      />
    </Stack.Navigator>
  );
}
