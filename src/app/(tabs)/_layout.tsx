import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";

import ThemeContext from "../../context/ThemeContext";

export default function _layout() {
  const { theme } = useContext(ThemeContext);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.warning,
        tabBarInactiveTintColor: theme.primary,
      }}
    >
      
 <Tabs.Screen
        name="(customers)"
        options={{
          title: "Customers",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "people-circle" : "people"}
              size={30}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(orders)"
        options={{
          title: "Orders",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "cart-outline" : "cart-sharp"}
              size={30}
              color={color}
            />
          ),
        }}
      />

<Tabs.Screen
        name="Dashbord"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home-outline" : "home-sharp"}
              size={30}
              color={color}
              // style={{width:focused?250:20, height:focused?25:20,borderRadius: }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(settings)"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "settings-outline" : "settings-sharp"}
              size={30}
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
              name={focused ? "card-outline" : "card-sharp"}
              size={30}
              color={color}
            />
          ),
        }}
      />

    </Tabs>
  );
}