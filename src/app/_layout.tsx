import { Stack } from "expo-router";
import ThemeContextProvider from "../context/ThemeContexProvider";
import ThemeContext from "../context/ThemeContext";
import { useContext, useEffect } from "react";
import { payment_table } from "../../databse/payment";
import { ProfileImage } from "../../databse/ImageCrud";
import { Order_Image } from "../../databse/ImageCrud";
import * as NavigationBar from "expo-navigation-bar";
import {Audio_Tables} from "../../databse/Audio"
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Customer_Table,Measurement_table,userTable} from "../../databse/table";
import { order_Table } from "../../databse/order";
// import { Custom_measurements,addCustomMeasurement}  from "../../databse/MeasuremenrCruc"
import { scheduleDailyMotivation } from "@/utils/notification";
function StackLayout() {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
   userTable() 
    Measurement_table();
    payment_table();
    ProfileImage();
    Order_Image(); Audio_Tables();
    scheduleDailyMotivation (); 
    // Custom_measurements();
    // addCustomMeasurement();
   
    Customer_Table();
order_Table();
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeContextProvider>
        <StackLayout />
      </ThemeContextProvider>
    </GestureHandlerRootView>
  );
}