import CustomButton from "@/constents/CustomButton";
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

import colors from "@/constents/colors";

export default function MeasurementForm() {
   const {
    type,
    id,
    measurementId,

    Chest,
    Waist,
    Qameez_Length,
    Sleeve,
    Shalwar_Length,
    Shirt_Length,
    Daman,
    Trouser_Length,
    Length,
    Hip,
    Thigh,
    Bottom,
    Shoulder,
    Collar,
    Notes,
  } = useLocalSearchParams();

  const isEdit = !!measurementId;

  const [measurement, setMeasurement] = useState({
    // Male Shalwar Qameez
    Chest: "",
    Waist: "",
    Qameez_Length: "",
    Sleeve: "",
    Shalwar_Length: "",

    // Female Shalwar Qameez
    Shirt_Length: "",
    Daman: "",
    Trouser_Length: "",

    // Pant
    Length: "",
    Hip: "",
    Thigh: "",
    Bottom: "",

    // Shirt / Coat
    Shoulder: "",
    Collar: "",

    // Common
    Notes: "",
  });

  // ================= LOAD OLD DATA FOR UPDATE =================

  useEffect(() => {
    if (isEdit) {
      setMeasurement({
        Chest: String(Chest ?? ""),
        Waist: String(Waist ?? ""),
        Qameez_Length: String(Qameez_Length ?? ""),
        Sleeve: String(Sleeve ?? ""),
        Shalwar_Length: String(Shalwar_Length ?? ""),

        Shirt_Length: String(Shirt_Length ?? ""),
        Daman: String(Daman ?? ""),
        Trouser_Length: String(Trouser_Length ?? ""),

        Length: String(Length ?? ""),
        Hip: String(Hip ?? ""),
        Thigh: String(Thigh ?? ""),
        Bottom: String(Bottom ?? ""),

        Shoulder: String(Shoulder ?? ""),
        Collar: String(Collar ?? ""),

        Notes: String(Notes ?? ""),
      });
    }
  }, [isEdit]);


  const clearMeasurement = () => {
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
  };


  const handleSave = async () => {
    console.log("Customer ID:", id);
    console.log("Measurement Type:", type);

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
  };

  return (
    <KeyboardAvoidingView
      style={[
        styles.keyboardContainer,
        { backgroundColor: colors.background },
      ]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={[
          styles.container,
          { backgroundColor: colors.background },
        ]}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}

        <View style={styles.header}>
          <Text
            style={[
              styles.title,
              { color: colors.text },
            ]}
          >
            {String(type)}
          </Text>

          <Text
            style={[
              styles.subtitle,
              { color: colors.secondaryText },
            ]}
          >
            {isEdit
              ? "Update customer measurements"
              : "Enter customer measurements"}
          </Text>
        </View>

        {/* MEASUREMENTS */}

        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <Text
            style={[
              styles.heading,
              { color: colors.text },
            ]}
          >
            Measurements
          </Text>

          {/* ================= MALE SHALWAR QAMEEZ ================= */}

          {type === "Male Shalwar Qameez" && (
            <View>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.inputBackground,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
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
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.inputBackground,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
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
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.inputBackground,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
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
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.inputBackground,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
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
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.inputBackground,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
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

          {/* ================= FEMALE SHALWAR QAMEEZ ================= */}

          {type === "Female Shalwar Qameez" && (
            <View>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.inputBackground,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
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
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.inputBackground,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
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
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.inputBackground,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
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
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.inputBackground,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
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
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.inputBackground,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
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
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.inputBackground,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
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

          {/* ================= PANT ================= */}

          {type === "Pant" && (
            <View>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.inputBackground,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
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
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.inputBackground,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
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
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.inputBackground,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
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
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.inputBackground,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
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
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.inputBackground,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
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

          {/* ================= SHIRT ================= */}

          {type === "Shirt" && (
            <View>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.inputBackground,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
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
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.inputBackground,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
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
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.inputBackground,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
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
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.inputBackground,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
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
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.inputBackground,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
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
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.inputBackground,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
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

          {/* ================= COAT ================= */}

          {type === "Coat" && (
            <View>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.inputBackground,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
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
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.inputBackground,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
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
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.inputBackground,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
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
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.inputBackground,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
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
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.inputBackground,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
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
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.inputBackground,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
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

        {/* ================= NOTES ================= */}

        <View
          style={[
            styles.notesCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <Text
            style={[
              styles.heading,
              { color: colors.text },
            ]}
          >
            Additional Notes
          </Text>

          <TextInput
            style={[
              styles.notes,
              {
                backgroundColor: colors.inputBackground,
                borderColor: colors.border,
                color: colors.text,
              },
            ]}
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

        {/* ================= SAVE / UPDATE ================= */}

        <CustomButton
          title={
            isEdit
              ? "Update Measurements"
              : "Save Measurements"
          }
          onPress={handleSave}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },

  container: {
    flex: 1,
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
  },

  subtitle: {
    fontSize: 13,
    marginTop: 5,
  },

  card: {
    borderRadius: 16,
    borderWidth: 1,
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
  },

  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 50,
    marginBottom: 12,
    fontSize: 16,
  },

  notes: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    height: 100,
    textAlignVertical: "top",
    fontSize: 16,
  },
});