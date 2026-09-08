
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import colors from "@/constents/colors";
import { getCurrentUser } from "../../databse/table";

export default function RootLayout() {
  return <DrawerLayout />;
}

function DrawerLayout() {
  const [name, setName] = useState("User");
  const [email, setEmail] = useState("user@email.com");

  useEffect(() => {
    const loadUser = async () => {
      const user = await getCurrentUser();

      if (user) {
        setName(user.NAME);
        setEmail(user.EMAIL);
      }
    };

    loadUser();
  }, []);

  return (
    <Drawer
      screenOptions={{
        drawerPosition: "left",
        drawerType: "front",

        drawerStyle: {
          width: 300,
          backgroundColor: "#FFFFFF",
          marginBottom: 40,
        },

        headerShown: true,

        headerStyle: {
          backgroundColor: colors.primary,
        },

        headerTintColor: "#FFFFFF",

        headerTitleStyle: {
          fontWeight: "bold",
        },

        headerShadowVisible: false,
      }}

      drawerContent={(props) => (
        <View style={styles.drawerContainer}>

          {/* USER PROFILE */}
          <View style={styles.profileSection}>

            <View style={styles.profileIcon}>
              <Ionicons
                name="person"
                size={30}
                color="#4F46E5"
              />
            </View>

            <Text style={styles.userName}>
              {name}
            </Text>

            <Text style={styles.userEmail}>
              {email}
            </Text>

          </View>

          {/* MENU */}

          <DrawerMenu
            icon="home-outline"
            title="Dashboard"
            active={props.state.index === 0}
            onPress={() => {
              router.push("/Dashbord");
            }}
          />

          <DrawerMenu
            icon="people-outline"
            title="Customers"
            active={props.state.index === 1}
            onPress={() => {
              router.push("/CustomerList");
            }}
          />

          <DrawerMenu
            icon="receipt-outline"
            title="Orders"
            active={props.state.index === 2}
            onPress={() => {
              router.push("/OrderList");
            }}
          />

          <DrawerMenu
            icon="settings-outline"
            title="Settings"
            active={props.state.index === 4}
            onPress={() => {
              router.push("/Setting");
            }}
          />

          {/* LOGOUT */}
          <View style={styles.bottomSection}>

            <DrawerMenu
              icon="log-out-outline"
              title="Logout"
              active={false}
              onPress={async () => {
                await AsyncStorage.removeItem("userId");
                router.replace("/SignIn");
              }}
            />

          </View>

        </View>
      )}
    >

      {/* Dashboard */}
      <Drawer.Screen
        name="Dashbord"
        options={{
          title: "Dashboard",
        }}
      />

      {/* Customers */}
      <Drawer.Screen
        name="CustomerList"
        options={{
          title: "Customers",
        }}
      />

      {/* Orders */}
      <Drawer.Screen
        name="OrderList"
        options={{
          title: "Orders",
        }}
      />

      {/* Payments */}
      <Drawer.Screen
        name="Payment"
        options={{
          title: "Payments",
        }}
      />

      {/* Settings */}
      <Drawer.Screen
        name="Setting"
        options={{
          title: "Setting",
        }}
      />

    </Drawer>
  );
}


// Custom Drawer Menu
function DrawerMenu({
  icon,
  title,
  active,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.menuItem,

        active && {
          backgroundColor: "#4F46E5",
        },
      ]}
    >

      <Ionicons
        name={icon}
        size={22}
        color={active ? "#FFFFFF" : "#222222"}
      />

      <Text
        style={[
          styles.menuText,

          {
            color: active ? "#FFFFFF" : "#222222",
          },
        ]}
      >
        {title}
      </Text>

    </Pressable>
  );
}


const styles = StyleSheet.create({

  drawerContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  profileSection: {
    marginTop: 30,
    alignItems: "center",
    paddingTop: 45,
    paddingBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    marginBottom: 15,
  },

  profileIcon: {
    marginTop: 30,
    width: 65,
    height: 65,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "#F3F4F6",
  },

  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#222222",
  },

  userEmail: {
    fontSize: 17,
    color: "#666666",
  },

  menuItem: {
    height: 52,
    marginHorizontal: 15,
    marginVertical: 5,
    paddingHorizontal: 18,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  menuText: {
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 15,
  },

  bottomSection: {
    marginTop: "auto",
    paddingBottom: 20,
  },

});

