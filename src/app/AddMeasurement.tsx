import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function AddMeasurement() {

  const { id } = useLocalSearchParams();

  function selectMeasurement(type: string) {
    router.push({
      pathname: "/MeasurementForm",
      params: {
        id: String(id),
        type: type,
      },
    });
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Add Measurement</Text>
             <Text>Customer Id:{id}</Text>
          <Text style={styles.subtitle}>
            Select the type of measurement
          </Text>
        </View>

        <View style={styles.list}>
          <Pressable
            style={styles.card}
            onPress={() => selectMeasurement("Male Shalwar Kameez")}
          >
            <Text style={styles.cardTitle}>Male Shalwar Kameez</Text>
            <Text style={styles.cardSubtitle}>
              Add male shalwar kameez measurement
            </Text>
          </Pressable>

          <Pressable
            style={styles.card}
            onPress={() => selectMeasurement("Female Shalwar Kameez")}
          >
            <Text style={styles.cardTitle}>Female Shalwar Kameez</Text>
            <Text style={styles.cardSubtitle}>
              Add female shalwar kameez measurement
            </Text>
          </Pressable>

          <Pressable
            style={styles.card}
            onPress={() => selectMeasurement("Pant")}
          >
            <Text style={styles.cardTitle}>Pant</Text>
            <Text style={styles.cardSubtitle}>
              Add pant measurement
            </Text>
          </Pressable>

          <Pressable
            style={styles.card}
            onPress={() => selectMeasurement("Shirt")}
          >
            <Text style={styles.cardTitle}>Shirt</Text>
            <Text style={styles.cardSubtitle}>
              Add shirt measurement
            </Text>
          </Pressable>

          <Pressable
            style={styles.card}
            onPress={() => selectMeasurement("Coat")}
          >
            <Text style={styles.cardTitle}>Coat</Text>
            <Text style={styles.cardSubtitle}>
              Add coat measurement
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    alignItems: "center",
    marginBottom: 28,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#222",
  },

  subtitle: {
    fontSize: 14,
    color: "#777",
    marginTop: 6,
  },

  list: {
    gap: 14,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
  },

  cardSubtitle: {
    fontSize: 12,
    color: "#888",
    marginTop: 5,
  },
});