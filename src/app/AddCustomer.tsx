
import CustomButton from "@/constents/CustomButton";
import colors from "@/constents/colors";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  addMeasurement,
  updateMeasurement,
} from "../../databse/MeasuremenrCruc";

export default function MeasurementForm() {
  const params = useLocalSearchParams();

  const type = params.type;
  const id = params.id;
  const measurementId = params.measurementId;

  const [measurement, setMeasurement] = useState({
    Chest: "",
    Waist: "",
    Qameez_Length: "",
    Sleeve: "",
    Shalwar_Length: "",
    Shirt_Length: "",
    Daman: "",
    Trouser_Length: "",
    Length: "",
    Hip: "",
    Thigh: "",
    Bottom: "",
    Shoulder: "",
    Collar: "",
    Notes: "",
  });

  const isEdit = !!measurementId;

  useEffect(() => {
    if (isEdit) {
      setMeasurement({
        Chest: String(params.Chest || ""),
        Waist: String(params.Waist || ""),
        Qameez_Length: String(params.Qameez_Length || ""),
        Sleeve: String(params.Sleeve || ""),
        Shalwar_Length: String(params.Shalwar_Length || ""),
        Shirt_Length: String(params.Shirt_Length || ""),
        Daman: String(params.Daman || ""),
        Trouser_Length: String(params.Trouser_Length || ""),
        Length: String(params.Length || ""),
        Hip: String(params.Hip || ""),
        Thigh: String(params.Thigh || ""),
        Bottom: String(params.Bottom || ""),
        Shoulder: String(params.Shoulder || ""),
        Collar: String(params.Collar || ""),
        Notes: String(params.Notes || ""),
      });
    }
  }, [isEdit]);

  function clearMeasurement() {
    setMeasurement({
      Chest: "",
      Waist: "",
      Qameez_Length: "",
      Sleeve: "",
      Shalwar_Length: "",
      Shirt_Length: "",
      Daman: "",
      Trouser_Length: "",
      Length: "",
      Hip: "",
      Thigh: "",
      Bottom: "",
      Shoulder: "",
      Collar: "",
      Notes: "",
    });
  }

  async function handleSave() {
    if (isEdit) {
      await updateMeasurement(
        Number(measurementId),
        measurement
      );
    } else {
      await addMeasurement(
        Number(id),
        String(type),
        measurement
      );
    }

    clearMeasurement();

    router.replace({
      pathname: "/MeasurementList",
      params: {
        id: String(id),
      },
    });
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
    
      >
        <View style={styles.header}>
          <Text style={styles.title}>{String(type)}</Text>

          <Text style={styles.subtitle}>
            {isEdit
              ? "Update customer measurements"
              : "Enter customer measurements"}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>Measurements</Text>

          {type === "Male Shalwar Qameez" && (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Chest"
                placeholderTextColor={colors.placeholder}
                value={measurement.Chest}
                onChangeText={(e) =>
                  setMeasurement({
                    ...measurement,
                    Chest: e,
                  })
                }
                keyboardType="numeric"
              />

              <TextInput
                style={styles.input}
                placeholder="Waist"
                placeholderTextColor={colors.placeholder}
                value={measurement.Waist}
                onChangeText={(e) =>
                  setMeasurement({
                    ...measurement,
                    Waist: e,
                  })
                }
                keyboardType="numeric"
              />

              <TextInput
                style={styles.input}
                placeholder="Qameez Length"
                placeholderTextColor={colors.placeholder}
                value={measurement.Qameez_Length}
                onChangeText={(e) =>
                  setMeasurement({
                    ...measurement,
                    Qameez_Length: e,
                  })
                }
                keyboardType="numeric"
              />

              <TextInput
                style={styles.input}
                placeholder="Sleeve"
                placeholderTextColor={colors.placeholder}
                value={measurement.Sleeve}
                onChangeText={(e) =>
                  setMeasurement({
                    ...measurement,
                    Sleeve: e,
                  })
                }
                keyboardType="numeric"
              />

              <TextInput
                style={styles.input}
                placeholder="Shalwar Length"
                placeholderTextColor={colors.placeholder}
                value={measurement.Shalwar_Length}
                onChangeText={(e) =>
                  setMeasurement({
                    ...measurement,
                    Shalwar_Length: e,
                  })
                }
                keyboardType="numeric"
              />
            </View>
          )}

          {type === "Female Shalwar Qameez" && (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Chest"
                placeholderTextColor={colors.placeholder}
                value={measurement.Chest}
                onChangeText={(e) =>
                  setMeasurement({
                    ...measurement,
                    Chest: e,
                  })
                }
                keyboardType="numeric"
              />

              <TextInput
                style={styles.input}
                placeholder="Waist"
                placeholderTextColor={colors.placeholder}
                value={measurement.Waist}
                onChangeText={(e) =>
                  setMeasurement({
                    ...measurement,
                    Waist: e,
                  })
                }
                keyboardType="numeric"
              />

              <TextInput
                style={styles.input}
                placeholder="Shirt Length"
                placeholderTextColor={colors.placeholder}
                value={measurement.Shirt_Length}
                onChangeText={(e) =>
                  setMeasurement({
                    ...measurement,
                    Shirt_Length: e,
                  })
                }
                keyboardType="numeric"
              />

              <TextInput
                style={styles.input}
                placeholder="Sleeve"
                placeholderTextColor={colors.placeholder}
                value={measurement.Sleeve}
                onChangeText={(e) =>
                  setMeasurement({
                    ...measurement,
                    Sleeve: e,
                  })
                }
                keyboardType="numeric"
              />

              <TextInput
                style={styles.input}
                placeholder="Daman"
                placeholderTextColor={colors.placeholder}
                value={measurement.Daman}
                onChangeText={(e) =>
                  setMeasurement({
                    ...measurement,
                    Daman: e,
                  })
                }
                keyboardType="numeric"
              />

              <TextInput
                style={styles.input}
                placeholder="Trouser Length"
                placeholderTextColor={colors.placeholder}
                value={measurement.Trouser_Length}
                onChangeText={(e) =>
                  setMeasurement({
                    ...measurement,
                    Trouser_Length: e,
                  })
                }
                keyboardType="numeric"
              />
            </View>
          )}

          {type === "Pant" && (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Waist"
                placeholderTextColor={colors.placeholder}
                value={measurement.Waist}
                onChangeText={(e) =>
                  setMeasurement({
                    ...measurement,
                    Waist: e,
                  })
                }
                keyboardType="numeric"
              />

              <TextInput
                style={styles.input}
                placeholder="Length"
                placeholderTextColor={colors.placeholder}
                value={measurement.Length}
                onChangeText={(e) =>
                  setMeasurement({
                    ...measurement,
                    Length: e,
                  })
                }
                keyboardType="numeric"
              />

              <TextInput
                style={styles.input}
                placeholder="Hip"
                placeholderTextColor={colors.placeholder}
                value={measurement.Hip}
                onChangeText={(e) =>
                  setMeasurement({
                    ...measurement,
                    Hip: e,
                  })
                }
                keyboardType="numeric"
              />

              <TextInput
                style={styles.input}
                placeholder="Thigh"
                placeholderTextColor={colors.placeholder}
                value={measurement.Thigh}
                onChangeText={(e) =>
                  setMeasurement({
                    ...measurement,
                    Thigh: e,
                  })
                }
                keyboardType="numeric"
              />

              <TextInput
                style={styles.input}
                placeholder="Bottom"
                placeholderTextColor={colors.placeholder}
                value={measurement.Bottom}
                onChangeText={(e) =>
                  setMeasurement({
                    ...measurement,
                    Bottom: e,
                  })
                }
                keyboardType="numeric"
              />
            </View>
          )}

          {type === "Shirt" && (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Chest"
                placeholderTextColor={colors.placeholder}
                value={measurement.Chest}
                onChangeText={(e) =>
                  setMeasurement({
                    ...measurement,
                    Chest: e,
                  })
                }
                keyboardType="numeric"
              />

              <TextInput
                style={styles.input}
                placeholder="Waist"
                placeholderTextColor={colors.placeholder}
                value={measurement.Waist}
                onChangeText={(e) =>
                  setMeasurement({
                    ...measurement,
                    Waist: e,
                  })
                }
                keyboardType="numeric"
              />

              <TextInput
                style={styles.input}
                placeholder="Shirt Length"
                placeholderTextColor={colors.placeholder}
                value={measurement.Shirt_Length}
                onChangeText={(e) =>
                  setMeasurement({
                    ...measurement,
                    Shirt_Length: e,
                  })
                }
                keyboardType="numeric"
              />

              <TextInput
                style={styles.input}
                placeholder="Shoulder"
                placeholderTextColor={colors.placeholder}
                value={measurement.Shoulder}
                onChangeText={(e) =>
                  setMeasurement({
                    ...measurement,
                    Shoulder: e,
                  })
                }
                keyboardType="numeric"
              />

              <TextInput
                style={styles.input}
                placeholder="Sleeve"
                placeholderTextColor={colors.placeholder}
                value={measurement.Sleeve}
                onChangeText={(e) =>
                  setMeasurement({
                    ...measurement,
                    Sleeve: e,
                  })
                }
                keyboardType="numeric"
              />

              <TextInput
                style={styles.input}
                placeholder="Collar"
                placeholderTextColor={colors.placeholder}
                value={measurement.Collar}
                onChangeText={(e) =>
                  setMeasurement({
                    ...measurement,
                    Collar: e,
                  })
                }
                keyboardType="numeric"
              />
            </View>
          )}

          {type === "Coat" && (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Chest"
                placeholderTextColor={colors.placeholder}
                value={measurement.Chest}
                onChangeText={(e) =>
                  setMeasurement({
                    ...measurement,
                    Chest: e,
                  })
                }
                keyboardType="numeric"
              />

              <TextInput
                style={styles.input}
                placeholder="Waist"
                placeholderTextColor={colors.placeholder}
                value={measurement.Waist}
                onChangeText={(e) =>
                  setMeasurement({
                    ...measurement,
                    Waist: e,
                  })
                }
                keyboardType="numeric"
              />

              <TextInput
                style={styles.input}
                placeholder="Coat Length"
                placeholderTextColor={colors.placeholder}
                value={measurement.Length}
                onChangeText={(e) =>
                  setMeasurement({
                    ...measurement,
                    Length: e,
                  })
                }
                keyboardType="numeric"
              />

              <TextInput
                style={styles.input}
                placeholder="Shoulder"
                placeholderTextColor={colors.placeholder}
                value={measurement.Shoulder}
                onChangeText={(e) =>
                  setMeasurement({
                    ...measurement,
                    Shoulder: e,
                  })
                }
                keyboardType="numeric"
              />

              <TextInput
                style={styles.input}
                placeholder="Sleeve"
                placeholderTextColor={colors.placeholder}
                value={measurement.Sleeve}
                onChangeText={(e) =>
                  setMeasurement({
                    ...measurement,
                    Sleeve: e,
                  })
                }
                keyboardType="numeric"
              />

              <TextInput
                style={styles.input}
                placeholder="Collar"
                placeholderTextColor={colors.placeholder}
                value={measurement.Collar}
                onChangeText={(e) =>
                  setMeasurement({
                    ...measurement,
                    Collar: e,
                  })
                }
                keyboardType="numeric"
              />
            </View>
          )}
        </View>

        <View style={styles.notesCard}>
          <Text style={styles.heading}>Additional Notes</Text>

          <TextInput
            style={styles.notes}
            placeholder="Enter any additional details..."
            placeholderTextColor={colors.placeholder}
            value={measurement.Notes}
            onChangeText={(e) =>
              setMeasurement({
                ...measurement,
                Notes: e,
              })
            }
            multiline
          />
        </View>

        <CustomButton
          title={isEdit ? "Update Measurements" : "Save Measurements"}
          onPress={handleSave}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },

  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    padding: 20,
    paddingBottom: 30,
  },

  header: {
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
  },

  subtitle: {
    fontSize: 13,
    marginTop: 5,
    color: colors.secondaryText,
  },

  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  notesCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  heading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: colors.text,
  },

  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    backgroundColor: colors.inputBackground,
    color: colors.text,
    paddingHorizontal: 14,
    height: 50,
    marginBottom: 12,
    fontSize: 16,
  },

  notes: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    backgroundColor: colors.inputBackground,
    color: colors.text,
    padding: 14,
    height: 100,
    textAlignVertical: "top",
    fontSize: 16,
  },
});
