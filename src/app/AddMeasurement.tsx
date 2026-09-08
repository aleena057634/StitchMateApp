import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useTheme } from "../constents/ThemeContext";

export default function AddMeasurement() {
  // ThemeContext se current theme ke colors le rahe hain
  const { colors } = useTheme();

  const params = useLocalSearchParams();

  const {
    id,
    measurementId,
    type: editType,

    Chest,
    Waist,
    Qameez_Length,
    Shirt_Length,
    Shalwar_Length,
    Trouser_Length,
    Sleeve,
    Daman,
    Hip,
    Thigh,
    Bottom,
    Shoulder,
    Collar,
    Length,
    Notes,
  } = params;

  const selectMeasurement = (type: string) => {
    router.push({
      pathname: "/MeasurementForm",
      params: {
        id: String(id),
        type: editType ? String(editType) : type,

        measurementId: measurementId
          ? String(measurementId)
          : "",

        Chest: Chest ? String(Chest) : "",
        Waist: Waist ? String(Waist) : "",
        Qameez_Length: Qameez_Length
          ? String(Qameez_Length)
          : "",
        Shirt_Length: Shirt_Length
          ? String(Shirt_Length)
          : "",
        Shalwar_Length: Shalwar_Length
          ? String(Shalwar_Length)
          : "",
        Trouser_Length: Trouser_Length
          ? String(Trouser_Length)
          : "",
        Sleeve: Sleeve ? String(Sleeve) : "",
        Daman: Daman ? String(Daman) : "",
        Hip: Hip ? String(Hip) : "",
        Thigh: Thigh ? String(Thigh) : "",
        Bottom: Bottom ? String(Bottom) : "",
        Shoulder: Shoulder ? String(Shoulder) : "",
        Collar: Collar ? String(Collar) : "",
        Length: Length ? String(Length) : "",
        Notes: Notes ? String(Notes) : "",
      },
    });
  };

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <View
          style={[
            styles.headerIcon,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <Ionicons
            name="body-outline"
            size={28}
            color={colors.primary}
          />
        </View>

        <Text
          style={[
            styles.title,
            { color: colors.text },
          ]}
        >
          {measurementId
            ? "Update Measurement"
            : "Add Measurement"}
        </Text>

        <Text
          style={[
            styles.subtitle,
            { color: colors.secondaryText },
          ]}
        >
          Select the dress type to continue
        </Text>
      </View>

      {/* DRESS TYPES */}

      <Pressable
        style={[
          styles.button,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
        onPress={() =>
          selectMeasurement("Male Shalwar Qameez")
        }
      >
        <View
          style={[
            styles.iconBox,
            { backgroundColor: colors.background },
          ]}
        >
          <Ionicons
            name="person-outline"
            size={24}
            color={colors.primary}
          />
        </View>

        <View style={styles.buttonContent}>
          <Text
            style={[
              styles.buttonText,
              { color: colors.text },
            ]}
          >
            Male Shalwar Qameez
          </Text>

          <Text
            style={[
              styles.buttonSubText,
              { color: colors.secondaryText },
            ]}
          >
            Traditional men's measurement
          </Text>
        </View>

        <Ionicons
          name="chevron-forward"
          size={20}
          color={colors.secondaryText}
        />
      </Pressable>

      <Pressable
        style={[
          styles.button,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
        onPress={() =>
          selectMeasurement("Female Shalwar Qameez")
        }
      >
        <View
          style={[
            styles.iconBox,
            { backgroundColor: colors.background },
          ]}
        >
          <Ionicons
            name="woman-outline"
            size={24}
            color={colors.primary}
          />
        </View>

        <View style={styles.buttonContent}>
          <Text
            style={[
              styles.buttonText,
              { color: colors.text },
            ]}
          >
            Female Shalwar Qameez
          </Text>

          <Text
            style={[
              styles.buttonSubText,
              { color: colors.secondaryText },
            ]}
          >
            Traditional women's measurement
          </Text>
        </View>

        <Ionicons
          name="chevron-forward"
          size={20}
          color={colors.secondaryText}
        />
      </Pressable>

      <Pressable
        style={[
          styles.button,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
        onPress={() => selectMeasurement("Pant")}
      >
        <View
          style={[
            styles.iconBox,
            { backgroundColor: colors.background },
          ]}
        >
          <Ionicons
            name="accessibility-outline"
            size={24}
            color={colors.primary}
          />
        </View>

        <View style={styles.buttonContent}>
          <Text
            style={[
              styles.buttonText,
              { color: colors.text },
            ]}
          >
            Pant
          </Text>

          <Text
            style={[
              styles.buttonSubText,
              { color: colors.secondaryText },
            ]}
          >
            Pant measurement
          </Text>
        </View>

        <Ionicons
          name="chevron-forward"
          size={20}
          color={colors.secondaryText}
        />
      </Pressable>

      <Pressable
        style={[
          styles.button,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
        onPress={() => selectMeasurement("Shirt")}
      >
        <View
          style={[
            styles.iconBox,
            { backgroundColor: colors.background },
          ]}
        >
          <Ionicons
            name="shirt-outline"
            size={24}
            color={colors.primary}
          />
        </View>

        <View style={styles.buttonContent}>
          <Text
            style={[
              styles.buttonText,
              { color: colors.text },
            ]}
          >
            Shirt
          </Text>

          <Text
            style={[
              styles.buttonSubText,
              { color: colors.secondaryText },
            ]}
          >
            Shirt measurement
          </Text>
        </View>

        <Ionicons
          name="chevron-forward"
          size={20}
          color={colors.secondaryText}
        />
      </Pressable>

      <Pressable
        style={[
          styles.button,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
        onPress={() => selectMeasurement("Coat")}
      >
        <View
          style={[
            styles.iconBox,
            { backgroundColor: colors.background },
          ]}
        >
          <Ionicons
            name="briefcase-outline"
            size={24}
            color={colors.primary}
          />
        </View>

        <View style={styles.buttonContent}>
          <Text
            style={[
              styles.buttonText,
              { color: colors.text },
            ]}
          >
            Coat
          </Text>

          <Text
            style={[
              styles.buttonSubText,
              { color: colors.secondaryText },
            ]}
          >
            Coat measurement
          </Text>
        </View>

        <Ionicons
          name="chevron-forward"
          size={20}
          color={colors.secondaryText}
        />
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 35,
  },

  /* HEADER */

  header: {
    alignItems: "center",
    marginBottom: 25,
  },

  headerIcon: {
    width: 65,
    height: 65,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    marginBottom: 15,
  },

  title: {
    fontSize: 25,
    fontWeight: "800",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 13,
    marginTop: 6,
    textAlign: "center",
  },

  /* DRESS TYPE BUTTON */

  button: {
    minHeight: 76,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 13,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",

    elevation: 2,
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonContent: {
    flex: 1,
    marginLeft: 13,
  },

  buttonText: {
    fontSize: 15,
    fontWeight: "700",
  },

  buttonSubText: {
    fontSize: 11,
    marginTop: 4,
  },
});