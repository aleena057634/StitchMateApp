
import { router, useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
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

import { ConfirmAlert } from "../componenets/CustomAlert";

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

  const [measurement, setMeasurement] = useState({
    Chest: "",
    Waist: "",
    Qameez_Length: "",
    Shalwar_Length: "",
    Shirt_Length: "",
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

  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (measurementId) {
      setMeasurement({
        Chest: Chest?.toString() || "",
        Waist: Waist?.toString() || "",
        Qameez_Length: Qameez_Length?.toString() || "",
        Shalwar_Length: Shalwar_Length?.toString() || "",
        Shirt_Length: Shirt_Length?.toString() || "",
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

  function Input(
    placeholder: string,
    field: keyof typeof measurement
  ) {
    return (
      <TextInput
        placeholder={placeholder}
        inputMode={field === "Notes" ? "text" : "numeric"}
        placeholderTextColor={theme.placeholder}
        style={[
          styles.input,
          field === "Notes" && styles.notes,
          {
            backgroundColor: theme.inputBackground,
            borderColor: theme.border,
            color: theme.text,
          },
        ]}
        value={measurement[field]}
        onChangeText={(value) =>
          setMeasurement({
            ...measurement,
            [field]: value,
          })
        }
        multiline={field === "Notes"}
      />
    );
  }

  function validateMeasurement() {
    if (type === "Male Shalwar Kameez") {
      if (
        !measurement.Chest ||
        !measurement.Waist ||
        !measurement.Qameez_Length ||
        !measurement.Shalwar_Length ||
        !measurement.Sleeve ||
        !measurement.Daman
      ) {
        setShowAlert(true);
        return false;
      }
    }

    if (type === "Female Shalwar Kameez") {
      if (
        !measurement.Chest ||
        !measurement.Waist ||
        !measurement.Qameez_Length ||
        !measurement.Shalwar_Length ||
        !measurement.Sleeve ||
        !measurement.Daman
      ) {
        setShowAlert(true);
        return false;
      }
    }

    if (type === "Pant") {
      if (
        !measurement.Waist ||
        !measurement.Hip ||
        !measurement.Thigh ||
        !measurement.Bottom ||
        !measurement.Length
      ) {
        setShowAlert(true);
        return false;
      }
    }

    if (type === "Shirt") {
      if (
        !measurement.Chest ||
        !measurement.Shoulder ||
        !measurement.Sleeve ||
        !measurement.Collar ||
        !measurement.Length
      ) {
        setShowAlert(true);
        return false;
      }
    }

    if (type === "Coat") {
      if (
        !measurement.Chest ||
        !measurement.Waist ||
        !measurement.Shoulder ||
        !measurement.Sleeve ||
        !measurement.Length
      ) {
        setShowAlert(true);
        return false;
      }
    }

    return true;
  }

  async function saveMeasurement() {
    const isValid = validateMeasurement();

    if (!isValid) {
      return;
    }

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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={[
          styles.scrollView,
          { backgroundColor: theme.background },
        ]}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
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
            {Input("Chest", "Chest")}
            {Input("Waist", "Waist")}
            {Input("Qameez Length", "Qameez_Length")}
            {Input("Shalwar Length", "Shalwar_Length")}
            {Input("Sleeve", "Sleeve")}
            {Input("Daman", "Daman")}
          </View>
        )}

        {type === "Female Shalwar Kameez" && (
          <View>
            {Input("Chest", "Chest")}
            {Input("Waist", "Waist")}
            {Input("Qameez Length", "Qameez_Length")}
            {Input("Shalwar Length", "Shalwar_Length")}
            {Input("Sleeve", "Sleeve")}
            {Input("Daman", "Daman")}
          </View>
        )}

        {type === "Pant" && (
          <View>
            {Input("Waist", "Waist")}
            {Input("Hip", "Hip")}
            {Input("Thigh", "Thigh")}
            {Input("Bottom", "Bottom")}
            {Input("Length", "Length")}
          </View>
        )}

        {type === "Shirt" && (
          <View>
            {Input("Chest", "Chest")}
            {Input("Shoulder", "Shoulder")}
            {Input("Sleeve", "Sleeve")}
            {Input("Collar", "Collar")}
            {Input("Length", "Length")}
          </View>
        )}

        {type === "Coat" && (
          <View>
            {Input("Chest", "Chest")}
            {Input("Waist", "Waist")}
            {Input("Shoulder", "Shoulder")}
            {Input("Sleeve", "Sleeve")}
            {Input("Length", "Length")}
          </View>
        )}

        {Input("Notes", "Notes")}

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

        <ConfirmAlert
          visible={showAlert}
          title="Error"
          Message="Please fill all required measurements."
          onConfirm={() => {
            setShowAlert(false);
          }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },

  container: {
    padding: 20,
    paddingBottom: 50,
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
