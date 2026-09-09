import { useLocalSearchParams } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  View,
} from "react-native";
import { useState } from "react";

export default function MeasurementForm() {
  const [measurement, setMeasurement] = useState({
    chest: "",
    waist: "",
    qameezLength: "",
    shirtLength: "",
    shalwarLength: "",
    trouserLength: "",
    sleeve: "",
    daman: "",
    hip: "",
    thigh: "",
    bottom: "",
    shoulder: "",
    collar: "",
    length: "",
    notes: "",
  });

  const { id, type } = useLocalSearchParams();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{type}</Text>
      <Text style={styles.customer}>Customer ID: {id}</Text>

      {type === "Male Shalwar Kameez" && (
        <View>
          <TextInput
            placeholder="Chest"
            style={styles.input}
            value={measurement.chest}
            onChangeText={(value) =>
              setMeasurement({
                ...measurement,
                chest: value,
              })
            }
          />

          <TextInput
            placeholder="Waist"
            style={styles.input}
            value={measurement.waist}
            onChangeText={(value) =>
              setMeasurement({
                ...measurement,
                waist: value,
              })
            }
          />

          <TextInput
            placeholder="Qameez Length"
            style={styles.input}
            value={measurement.qameezLength}
            onChangeText={(value) =>
              setMeasurement({
                ...measurement,
                qameezLength: value,
              })
            }
          />

          <TextInput
            placeholder="Shalwar Length"
            style={styles.input}
            value={measurement.shalwarLength}
            onChangeText={(value) =>
              setMeasurement({
                ...measurement,
                shalwarLength: value,
              })
            }
          />

          <TextInput
            placeholder="Sleeve"
            style={styles.input}
            value={measurement.sleeve}
            onChangeText={(value) =>
              setMeasurement({
                ...measurement,
                sleeve: value,
              })
            }
          />

          <TextInput
            placeholder="Daman"
            style={styles.input}
            value={measurement.daman}
            onChangeText={(value) =>
              setMeasurement({
                ...measurement,
                daman: value,
              })
            }
          />
        </View>
      )}

      {type === "Female Shalwar Kameez" && (
        <View>
          <TextInput
            placeholder="Chest"
            style={styles.input}
            value={measurement.chest}
            onChangeText={(value) =>
              setMeasurement({
                ...measurement,
                chest: value,
              })
            }
          />

          <TextInput
            placeholder="Waist"
            style={styles.input}
            value={measurement.waist}
            onChangeText={(value) =>
              setMeasurement({
                ...measurement,
                waist: value,
              })
            }
          />

          <TextInput
            placeholder="Qameez Length"
            style={styles.input}
            value={measurement.qameezLength}
            onChangeText={(value) =>
              setMeasurement({
                ...measurement,
                qameezLength: value,
              })
            }
          />

          <TextInput
            placeholder="Shalwar Length"
            style={styles.input}
            value={measurement.shalwarLength}
            onChangeText={(value) =>
              setMeasurement({
                ...measurement,
                shalwarLength: value,
              })
            }
          />

          <TextInput
            placeholder="Sleeve"
            style={styles.input}
            value={measurement.sleeve}
            onChangeText={(value) =>
              setMeasurement({
                ...measurement,
                sleeve: value,
              })
            }
          />

          <TextInput
            placeholder="Daman"
            style={styles.input}
            value={measurement.daman}
            onChangeText={(value) =>
              setMeasurement({
                ...measurement,
                daman: value,
              })
            }
          />
        </View>
      )}

      {type === "Pant" && (
        <View>
          <TextInput
            placeholder="Waist"
            style={styles.input}
            value={measurement.waist}
            onChangeText={(value) =>
              setMeasurement({
                ...measurement,
                waist: value,
              })
            }
          />

          <TextInput
            placeholder="Hip"
            style={styles.input}
            value={measurement.hip}
            onChangeText={(value) =>
              setMeasurement({
                ...measurement,
                hip: value,
              })
            }
          />

          <TextInput
            placeholder="Thigh"
            style={styles.input}
            value={measurement.thigh}
            onChangeText={(value) =>
              setMeasurement({
                ...measurement,
                thigh: value,
              })
            }
          />

          <TextInput
            placeholder="Bottom"
            style={styles.input}
            value={measurement.bottom}
            onChangeText={(value) =>
              setMeasurement({
                ...measurement,
                bottom: value,
              })
            }
          />

          <TextInput
            placeholder="Length"
            style={styles.input}
            value={measurement.length}
            onChangeText={(value) =>
              setMeasurement({
                ...measurement,
                length: value,
              })
            }
          />
        </View>
      )}

      {type === "Shirt" && (
        <View>
          <TextInput
            placeholder="Chest"
            style={styles.input}
            value={measurement.chest}
            onChangeText={(value) =>
              setMeasurement({
                ...measurement,
                chest: value,
              })
            }
          />

          <TextInput
            placeholder="Shoulder"
            style={styles.input}
            value={measurement.shoulder}
            onChangeText={(value) =>
              setMeasurement({
                ...measurement,
                shoulder: value,
              })
            }
          />

          <TextInput
            placeholder="Sleeve"
            style={styles.input}
            value={measurement.sleeve}
            onChangeText={(value) =>
              setMeasurement({
                ...measurement,
                sleeve: value,
              })
            }
          />

          <TextInput
            placeholder="Collar"
            style={styles.input}
            value={measurement.collar}
            onChangeText={(value) =>
              setMeasurement({
                ...measurement,
                collar: value,
              })
            }
          />

          <TextInput
            placeholder="Length"
            style={styles.input}
            value={measurement.length}
            onChangeText={(value) =>
              setMeasurement({
                ...measurement,
                length: value,
              })
            }
          />
        </View>
      )}

      {type === "Coat" && (
        <View>
          <TextInput
            placeholder="Chest"
            style={styles.input}
            value={measurement.chest}
            onChangeText={(value) =>
              setMeasurement({
                ...measurement,
                chest: value,
              })
            }
          />

          <TextInput
            placeholder="Waist"
            style={styles.input}
            value={measurement.waist}
            onChangeText={(value) =>
              setMeasurement({
                ...measurement,
                waist: value,
              })
            }
          />

          <TextInput
            placeholder="Shoulder"
            style={styles.input}
            value={measurement.shoulder}
            onChangeText={(value) =>
              setMeasurement({
                ...measurement,
                shoulder: value,
              })
            }
          />

          <TextInput
            placeholder="Sleeve"
            style={styles.input}
            value={measurement.sleeve}
            onChangeText={(value) =>
              setMeasurement({
                ...measurement,
                sleeve: value,
              })
            }
          />

          <TextInput
            placeholder="Length"
            style={styles.input}
            value={measurement.length}
            onChangeText={(value) =>
              setMeasurement({
                ...measurement,
                length: value,
              })
            }
          />
        </View>
      )}

      <TextInput
        placeholder="Notes"
        style={[styles.input, styles.notes]}
        value={measurement.notes}
        onChangeText={(value) =>
          setMeasurement({
            ...measurement,
            notes: value,
          })
        }
        multiline
      />

      <Pressable style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Measurement</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },

  saveButton: {
    backgroundColor: "#222",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
  },

  saveButtonText: {
    color: "#fff",
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
    color: "#777",
    marginBottom: 25,
  },

  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
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