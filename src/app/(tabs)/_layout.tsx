import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";

export default function TabsLayout() {
  const { theme } = useContext(ThemeContext);

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
       

        headerStyle: {
          backgroundColor: theme.primary,
        },

        headerTintColor: "#FFFFFF",

        headerTitleStyle: {
          fontSize: 20,
          fontWeight: "bold",
        },

        tabBarStyle: {
          position: "absolute",
          left: 10,
          right: 10,
          bottom: 20,
          height: 62,
          borderRadius: 18,
          backgroundColor: theme.card,
          borderTopWidth: 0,
          paddingTop: 5,
          paddingBottom: 5,
          elevation: 5,
          shadowOpacity: 0.15,
          shadowRadius: 8,
          shadowOffset: {
            width: 0,
            height: 3,
          },
        },

        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.secondaryText,

        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "600",
          marginTop: -2,
        },

        tabBarIconStyle: {
          marginBottom: -2,
        },
      }}
    >
      <Tabs.Screen
        name="Dashbord"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={23}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="CustomerList"
        options={{
          title: "Customer",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "people" : "people-outline"}
              size={23}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Payment"
        options={{
          title: "Payment",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "card" : "card-outline"}
              size={23}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="OrderList"
        options={{
          title: "Order",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "receipt" : "receipt-outline"}
              size={23}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Setting"
        options={{
          title: "Setting",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={23}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}