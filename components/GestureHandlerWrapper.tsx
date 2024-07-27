// components/GestureHandlerWrapper.tsx
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const GestureHandlerWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {children}
    </GestureHandlerRootView>
  );
};

export default GestureHandlerWrapper;
