import { router, useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import ThemeContext from "@/context/ThemeContext";

import {
  addMeasurement,
  updateMeasurement,
} from "../../databse/MeasuremenrCruc";

export default function MeasurementForm() {
  const { theme } = useContext(ThemeContext);

  const params = useLocalSearchParams();

  const id = params.id;
  const type = params.type;
  const measurementId = params.measurementId;

  const Chest = params.Chest;
  const Waist = params.Waist;
  const Qameez_Length = params.Qameez_Length;
  const Shirt_Length = params.Shirt_Length;
  const Shalwar_Length = params.Shalwar_Length;
  const Trouser_Length = params.Trouser_Length;
  const Sleeve = params.Sleeve;
  const Daman = params.Daman;
  const Hip = params.Hip;
  const Thigh = params.Thigh;
  const Bottom = params.Bottom;
  const Shoulder = params.Shoulder;
  const Collar = params.Collar;
  const Length = params.Length;
  const Notes = params.Notes;

  console.log("ALL PARAMS:", params);
  console.log("measurementId:", measurementId);

  const [measurement, setMeasurement] = useState({
    Chest: "",
    Waist: "",
    Qameez_Length: "",
    Shirt_Length: "",
    Shalwar_Length: "",
    Trouser_Length: "",
    Sleeve: "",
    Daman: "",
    Hip: "",
    Thigh: "",
    Bottom: "",
    Shoulder: "",
    Collar: "",
    Length: "",
    Notes: "",
  });

  useEffect(() => {
    if (measurementId) {
      setMeasurement({
        Chest: Chest?.toString() || "",
        Waist: Waist?.toString() || "",
        Qameez_Length: Qameez_Length?.toString() || "",
        Shirt_Length: Shirt_Length?.toString() || "",
        Shalwar_Length: Shalwar_Length?.toString() || "",
        Trouser_Length: Trouser_Length?.toString() || "",
        Sleeve: Sleeve?.toString() || "",
        Daman: Daman?.toString() || "",
        Hip: Hip?.toString() || "",
        Thigh: Thigh?.toString() || "",
        Bottom: Bottom?.toString() || "",
        Shoulder: Shoulder?.toString() || "",
        Collar: Collar?.toString() || "",
        Length: Length?.toString() || "",
        Notes: Notes?.toString() || "",
      });
    }
  }, [measurementId]);

  async function saveMeasurement() {
    console.log("measurementId:", measurementId);
    console.log("measurement:", measurement);

    if (measurementId) {
      const result = await updateMeasurement(
        Number(measurementId),
        measurement
      );

      console.log("Update result:", result);
    } else {
      const result = await addMeasurement(
        Number(id),
        type?.toString() || "",
        measurement
      );

      console.log("Add result:", result);
    }

    router.dismiss(2);
  }

  return (
    <ScrollView
      style={[
        styles.scrollView,
        { backgroundColor: theme.background },
      ]}
      contentContainerStyle={styles.container}
    >
      <Text
        style={[
          styles.title,
          { color: theme.text },
        ]}
      >
        {type}
      </Text>

      <Text
        style={[
          styles.customer,
          { color: theme.secondaryText },
        ]}
      >
        Customer ID: {id}
      </Text>

      {type === "Male Shalwar Kameez" && (
        <View>
          <TextInput
            placeholder="Chest"
            placeholderTextColor={theme.placeholder}
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
                color: theme.text,
              },
            ]}
            value={measurement.Chest}
            onChangeText={(value) =>
              setMeasurement({
                ...measurement,
                Chest: value,
              })
            }
          />

          <TextInput
            placeholder="Waist"
            placeholderTextColor={theme.placeholder}
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
                color: theme.text,
              },
            ]}
            value={measurement.Waist}
            onChangeText={(value) =>
              setMeasurement({
                ...measurement,
                Waist: value,
              })
            }
          />

          <TextInput
            placeholder="Qameez Length"
            placeholderTextColor={theme.placeholder}
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
                color: theme.text,
              },
            ]}
            value={measurement.Qameez_Length}
            onChangeText={(value) =>
              setMeasurement({
                ...measurement,
                Qameez_Length: value,
              })
            }
          />

          <TextInput
            placeholder="Shalwar Length"
            placeholderTextColor={theme.placeholder}
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
                color: theme.text,
              },
            ]}
            value={measurement.Shalwar_Length}
            onChangeText={(value) =>
              setMeasurement({
                ...measurement,
                Shalwar_Length: value,
              })
            }
          />

          <TextInput
            placeholder="Sleeve"
            placeholderTextColor={theme.placeholder}
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
                color: theme.text,
              },
            ]}
            value={measurement.Sleeve}
            onChangeText={(value) =>
              setMeasurement({
                ...measurement,
                Sleeve: value,
              })
            }
          />

          <TextInput
            placeholder="Daman"
            placeholderTextColor={theme.placeholder}
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
                color: theme.text,
              },
            ]}
            value={measurement.Daman}
            onChangeText={(value) =>
              setMeasurement({
                ...measurement,
                Daman: value,
              })
            }
          />
        </View>
      )}

      {type === "Female Shalwar Kameez" && (
        <View>
          <TextInput
            placeholder="Chest"
            placeholderTextColor={theme.placeholder}
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
                color: theme.text,
              },
            ]}
            value={measurement.Chest}
            onChangeText={(value) =>
              setMeasurement({
                ...measurement,
                Chest: value,
              })
            }
          />

          <TextInput
            placeholder="Waist"
            placeholderTextColor={theme.placeholder}
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
                color: theme.text,
              },
            ]}
            value={measurement.Waist}
            onChangeText={(value) =>
              setMeasurement({
                ...measurement,
                Waist: value,
              })
            }
          />

          <TextInput
            placeholder="Qameez Length"
            placeholderTextColor={theme.placeholder}
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
                color: theme.text,
              },
            ]}
            value={measurement.Qameez_Length}
            onChangeText={(value) =>
              setMeasurement({
                ...measurement,
                Qameez_Length: value,
              })
            }
          />

          <TextInput
            placeholder="Shalwar Length"
            placeholderTextColor={theme.placeholder}
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
                color: theme.text,
              },
            ]}
            value={measurement.Shalwar_Length}
            onChangeText={(value) =>
              setMeasurement({
                ...measurement,
                Shalwar_Length: value,
              })
            }
          />

          <TextInput
            placeholder="Sleeve"
            placeholderTextColor={theme.placeholder}
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
                color: theme.text,
              },
            ]}
            value={measurement.Sleeve}
            onChangeText={(value) =>
              setMeasurement({
                ...measurement,
                Sleeve: value,
              })
            }
          />

          <TextInput
            placeholder="Daman"
            placeholderTextColor={theme.placeholder}
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
                color: theme.text,
              },
            ]}
            value={measurement.Daman}
            onChangeText={(value) =>
              setMeasurement({
                ...measurement,
                Daman: value,
              })
            }
          />
        </View>
      )}

      {type === "Pant" && (
        <View>
          <TextInput
            placeholder="Waist"
            placeholderTextColor={theme.placeholder}
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
                color: theme.text,
              },
            ]}
            value={measurement.Waist}
            onChangeText={(value) =>
              setMeasurement({
                ...measurement,
                Waist: value,
              })
            }
          />

          <TextInput
            placeholder="Hip"
            placeholderTextColor={theme.placeholder}
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
                color: theme.text,
              },
            ]}
            value={measurement.Hip}
            onChangeText={(value) =>
              setMeasurement({
                ...measurement,
                Hip: value,
              })
            }
          />

          <TextInput
            placeholder="Thigh"
            placeholderTextColor={theme.placeholder}
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
                color: theme.text,
              },
            ]}
            value={measurement.Thigh}
            onChangeText={(value) =>
              setMeasurement({
                ...measurement,
                Thigh: value,
              })
            }
          />

          <TextInput
            placeholder="Bottom"
            placeholderTextColor={theme.placeholder}
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
                color: theme.text,
              },
            ]}
            value={measurement.Bottom}
            onChangeText={(value) =>
              setMeasurement({
                ...measurement,
                Bottom: value,
              })
            }
          />

          <TextInput
            placeholder="Length"
            placeholderTextColor={theme.placeholder}
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
                color: theme.text,
              },
            ]}
            value={measurement.Length}
            onChangeText={(value) =>
              setMeasurement({
                ...measurement,
                Length: value,
              })
            }
          />
        </View>
      )}

      {type === "Shirt" && (
        <View>
          <TextInput
            placeholder="Chest"
            placeholderTextColor={theme.placeholder}
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
                color: theme.text,
              },
            ]}
            value={measurement.Chest}
            onChangeText={(value) =>
              setMeasurement({
                ...measurement,
                Chest: value,
              })
            }
          />

          <TextInput
            placeholder="Shoulder"
            placeholderTextColor={theme.placeholder}
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
                color: theme.text,
              },
            ]}
            value={measurement.Shoulder}
            onChangeText={(value) =>
              setMeasurement({
                ...measurement,
                Shoulder: value,
              })
            }
          />

          <TextInput
            placeholder="Sleeve"
            placeholderTextColor={theme.placeholder}
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
                color: theme.text,
              },
            ]}
            value={measurement.Sleeve}
            onChangeText={(value) =>
              setMeasurement({
                ...measurement,
                Sleeve: value,
              })
            }
          />

          <TextInput
            placeholder="Collar"
            placeholderTextColor={theme.placeholder}
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
                color: theme.text,
              },
            ]}
            value={measurement.Collar}
            onChangeText={(value) =>
              setMeasurement({
                ...measurement,
                Collar: value,
              })
            }
          />

          <TextInput
            placeholder="Length"
            placeholderTextColor={theme.placeholder}
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
                color: theme.text,
              },
            ]}
            value={measurement.Length}
            onChangeText={(value) =>
              setMeasurement({
                ...measurement,
                Length: value,
              })
            }
          />
        </View>
      )}

      {type === "Coat" && (
        <View>
          <TextInput
            placeholder="Chest"
            placeholderTextColor={theme.placeholder}
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
                color: theme.text,
              },
            ]}
            value={measurement.Chest}
            onChangeText={(value) =>
              setMeasurement({
                ...measurement,
                Chest: value,
              })
            }
          />

          <TextInput
            placeholder="Waist"
            placeholderTextColor={theme.placeholder}
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
                color: theme.text,
              },
            ]}
            value={measurement.Waist}
            onChangeText={(value) =>
              setMeasurement({
                ...measurement,
                Waist: value,
              })
            }
          />

          <TextInput
            placeholder="Shoulder"
            placeholderTextColor={theme.placeholder}
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
                color: theme.text,
              },
            ]}
            value={measurement.Shoulder}
            onChangeText={(value) =>
              setMeasurement({
                ...measurement,
                Shoulder: value,
              })
            }
          />

          <TextInput
            placeholder="Sleeve"
            placeholderTextColor={theme.placeholder}
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
                color: theme.text,
              },
            ]}
            value={measurement.Sleeve}
            onChangeText={(value) =>
              setMeasurement({
                ...measurement,
                Sleeve: value,
              })
            }
          />

          <TextInput
            placeholder="Length"
            placeholderTextColor={theme.placeholder}
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
                color: theme.text,
              },
            ]}
            value={measurement.Length}
            onChangeText={(value) =>
              setMeasurement({
                ...measurement,
                Length: value,
              })
            }
          />
        </View>
      )}

      <TextInput
        placeholder="Notes"
        placeholderTextColor={theme.placeholder}
        style={[
          styles.input,
          styles.notes,
          {
            backgroundColor: theme.inputBackground,
            borderColor: theme.border,
            color: theme.text,
          },
        ]}
        value={measurement.Notes}
        onChangeText={(value) =>
          setMeasurement({
            ...measurement,
            Notes: value,
          })
        }
        multiline
      />

      <Pressable
        style={[
          styles.saveButton,
          { backgroundColor: theme.primary },
        ]}
        onPress={saveMeasurement}
      >
        <Text
          style={[
            styles.saveButtonText,
            { color: theme.white },
          ]}
        >
          Save Measurement
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },

  container: {
    padding: 20,
    paddingBottom: 30,
    flexGrow: 1,
  },

  saveButton: {
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
  },

  saveButtonText: {
    fontSize: 16,
    fontWeight: "700",
  },

  title: {
    fontSize: 25,
    fontWeight: "800",
    marginBottom: 6,
  },

  customer: {
    fontSize: 14,
    marginBottom: 25,
  },

  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
    fontSize: 15,
  },

  notes: {
    height: 100,
    textAlignVertical: "top",
  },
});