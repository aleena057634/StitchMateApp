import { Stack } from "expo-router";
import { useContext } from "react";

import ThemeContext from "../../../context/ThemeContext";

export default function _layout() {
  const { theme } = useContext(ThemeContext);

  return (
    <Stack
      initialRouteName="Setting"
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}