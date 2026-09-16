
import { Stack } from "expo-router";
import ThemeContextProvider from "../context/ThemeContexProvider";
import ThemeContext from "../context/ThemeContext";
import { useContext, useEffect } from "react";
import { payment_table } from "../../databse/payment";

function StackLayout() {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    payment_table();
  }, []);

  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: theme.primary,
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ThemeContextProvider>
      <StackLayout />
    </ThemeContextProvider>
  );
}

