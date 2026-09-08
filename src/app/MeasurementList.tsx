import { Ionicons } from "@expo/vector-icons";
import {
  router,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import FloatingButton from "@/componenets/FloatingButton";
import colors from "@/constents/colors";

import {
  deleteMeasurement,
  getMeasurements,
} from "../../databse/MeasuremenrCruc";

export default function MeasurementList() {
   
  const { id } = useLocalSearchParams();

  const [measurements, setMeasurements] = useState<any[]>([]);

  // Database se measurements load karta hai
  async function loadMeasurements() {
    try {
      const data = await getMeasurements(Number(id));
      setMeasurements(data);
    } catch (error) {
      console.log("Failed to load measurements:", error);
    }
  }

  // Screen par wapas aane par measurements dobara load honge
  useFocusEffect(
    useCallback(() => {
      loadMeasurements();
    }, [id])
  );

  // ================= UPDATE =================

  const handleUpdate = (item: any) => {
    router.push({
      pathname: "/AddMeasurement",
      params: {
        id: String(id),
        measurementId: String(item.mEASUREMENT_ID),

        type: String(item.TYPE),

        Chest: item.CHEST != null ? String(item.CHEST) : "",
        Waist: item.WAIST != null ? String(item.WAIST) : "",

        Qameez_Length:
          item.QAMEEZ_LENGTH != null
            ? String(item.QAMEEZ_LENGTH)
            : "",

        Shirt_Length:
          item.SHIRT_LENGTH != null
            ? String(item.SHIRT_LENGTH)
            : "",

        Shalwar_Length:
          item.SHALWAR_LENGTH != null
            ? String(item.SHALWAR_LENGTH)
            : "",

        Trouser_Length:
          item.TROUSER_LENGTH != null
            ? String(item.TROUSER_LENGTH)
            : "",

        Sleeve: item.SLEEVE != null ? String(item.SLEEVE) : "",
        Daman: item.DAMAN != null ? String(item.DAMAN) : "",
        Hip: item.HIP != null ? String(item.HIP) : "",
        Thigh: item.THIGH != null ? String(item.THIGH) : "",
        Bottom: item.BOTTOM != null ? String(item.BOTTOM) : "",
        Shoulder: item.SHOULDER != null ? String(item.SHOULDER) : "",
        Collar: item.COLLAR != null ? String(item.COLLAR) : "",
        Length: item.LENGTH != null ? String(item.LENGTH) : "",
        Notes: item.NOTES != null ? String(item.NOTES) : "",
      },
    });
  };

  // ================= DELETE =================

  const handleDelete = (item: any) => {
    Alert.alert(
      "Delete Measurement",
      "Are you sure you want to delete this measurement?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",

          onPress: async () => {
            try {
              const deleted = await deleteMeasurement(
                Number(item.mEASUREMENT_ID)
              );

              if (deleted) {
                setMeasurements((prev) =>
                  prev.filter(
                    (measurement) =>
                      Number(measurement.mEASUREMENT_ID) !==
                      Number(item.mEASUREMENT_ID)
                  )
                );

                console.log("Measurement deleted");
              } else {
                Alert.alert(
                  "Error",
                  "Measurement could not be deleted."
                );
              }
            } catch (error) {
              console.log(
                "Failed to delete measurement:",
                error
              );

              Alert.alert(
                "Error",
                "Something went wrong while deleting."
              );
            }
          },
        },
      ]
    );
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      {/* ================= HEADER ================= */}

      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <Text
            style={[
              styles.title,
              { color: colors.text },
            ]}
          >
            Measurements
          </Text>

          <Text
            style={[
              styles.subtitle,
              { color: colors.secondaryText },
            ]}
          >
            Customer Measurements
          </Text>
        </View>

        {/* Total measurements count */}
        <View
          style={[
            styles.countBox,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <Ionicons
            name="resize-outline"
            size={18}
            color={colors.primary}
          />

          <Text
            style={[
              styles.countText,
              { color: colors.primary },
            ]}
          >
            {measurements.length}
          </Text>
        </View>
      </View>

      {/* ================= MEASUREMENTS LIST ================= */}

      <FlatList
        data={measurements}
        keyExtractor={(item) =>
          item.mEASUREMENT_ID?.toString()
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          measurements.length === 0
            ? styles.emptyContainer
            : styles.listContainer
        }

        // Jab measurements empty hongi to ye UI show hoga
        ListEmptyComponent={
          <View style={styles.emptyContent}>
            <View
              style={[
                styles.emptyIcon,
                { backgroundColor: colors.inputBackground },
              ]}
            >
              <Ionicons
                name="resize-outline"
                size={52}
                color={colors.primary}
              />
            </View>

            <Text
              style={[
                styles.emptyTitle,
                { color: colors.text },
              ]}
            >
              No Measurements Found
            </Text>

            <Text
              style={[
                styles.emptyText,
                { color: colors.secondaryText },
              ]}
            >
              Add a measurement to get started.
            </Text>
          </View>
        }

        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
          >
            {/* ================= CARD HEADER ================= */}

            <View style={styles.cardHeader}>
              <View style={styles.typeContainer}>
                {/* Dress type icon */}
                <View
                  style={[
                    styles.typeIcon,
                    {
                      backgroundColor:
                        colors.inputBackground,
                    },
                  ]}
                >
                  <Ionicons
                    name="shirt-outline"
                    size={21}
                    color={colors.primary}
                  />
                </View>

                <View style={styles.typeInfo}>
                  <Text
                    style={[
                      styles.type,
                      { color: colors.text },
                    ]}
                  >
                    {item.TYPE}
                  </Text>

                  <Text
                    style={[
                      styles.measurementId,
                      { color: colors.secondaryText },
                    ]}
                  >
                    Measurement #{item.mEASUREMENT_ID}
                  </Text>
                </View>
              </View>

              {/* ================= EDIT + DELETE ================= */}

              <View style={styles.actions}>
                <Pressable
                  style={[
                    styles.actionButton,
                    {
                      backgroundColor: colors.background,
                      borderColor: colors.border,
                    },
                  ]}
                  onPress={() => handleUpdate(item)}
                >
                  <Ionicons
                    name="create-outline"
                    size={20}
                    color={colors.primary}
                  />
                </Pressable>

                <Pressable
                  style={[
                    styles.actionButton,
                    {
                      backgroundColor: colors.background,
                      borderColor: colors.border,
                    },
                  ]}
                  onPress={() => handleDelete(item)}
                >
                  <Ionicons
                    name="trash-outline"
                    size={20}
                    color={colors.primary}
                  />
                </Pressable>
              </View>
            </View>

            {/* Divider */}
            <View
              style={[
                styles.divider,
                { backgroundColor: colors.border },
              ]}
            />

            {/* ================= MEASUREMENT VALUES ================= */}

            <View style={styles.measurements}>
              {item.CHEST != null && (
                <View
                  style={[
                    styles.measureBox,
                    {
                      backgroundColor:
                        colors.inputBackground,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.measureLabel,
                      { color: colors.secondaryText },
                    ]}
                  >
                    Chest
                  </Text>

                  <Text
                    style={[
                      styles.measureValue,
                      { color: colors.text },
                    ]}
                  >
                    {item.CHEST}
                  </Text>
                </View>
              )}

              {item.WAIST != null && (
                <View
                  style={[
                    styles.measureBox,
                    {
                      backgroundColor:
                        colors.inputBackground,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.measureLabel,
                      { color: colors.secondaryText },
                    ]}
                  >
                    Waist
                  </Text>

                  <Text
                    style={[
                      styles.measureValue,
                      { color: colors.text },
                    ]}
                  >
                    {item.WAIST}
                  </Text>
                </View>
              )}

              {item.QAMEEZ_LENGTH != null && (
                <View
                  style={[
                    styles.measureBox,
                    {
                      backgroundColor:
                        colors.inputBackground,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.measureLabel,
                      { color: colors.secondaryText },
                    ]}
                  >
                    Qameez
                  </Text>

                  <Text
                    style={[
                      styles.measureValue,
                      { color: colors.text },
                    ]}
                  >
                    {item.QAMEEZ_LENGTH}
                  </Text>
                </View>
              )}

              {item.SHIRT_LENGTH != null && (
                <View
                  style={[
                    styles.measureBox,
                    {
                      backgroundColor:
                        colors.inputBackground,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.measureLabel,
                      { color: colors.secondaryText },
                    ]}
                  >
                    Shirt
                  </Text>

                  <Text
                    style={[
                      styles.measureValue,
                      { color: colors.text },
                    ]}
                  >
                    {item.SHIRT_LENGTH}
                  </Text>
                </View>
              )}

              {item.SHALWAR_LENGTH != null && (
                <View
                  style={[
                    styles.measureBox,
                    {
                      backgroundColor:
                        colors.inputBackground,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.measureLabel,
                      { color: colors.secondaryText },
                    ]}
                  >
                    Shalwar
                  </Text>

                  <Text
                    style={[
                      styles.measureValue,
                      { color: colors.text },
                    ]}
                  >
                    {item.SHALWAR_LENGTH}
                  </Text>
                </View>
              )}

              {item.TROUSER_LENGTH != null && (
                <View
                  style={[
                    styles.measureBox,
                    {
                      backgroundColor:
                        colors.inputBackground,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.measureLabel,
                      { color: colors.secondaryText },
                    ]}
                  >
                    Trouser
                  </Text>

                  <Text
                    style={[
                      styles.measureValue,
                      { color: colors.text },
                    ]}
                  >
                    {item.TROUSER_LENGTH}
                  </Text>
                </View>
              )}

              {item.SLEEVE != null && (
                <View
                  style={[
                    styles.measureBox,
                    {
                      backgroundColor:
                        colors.inputBackground,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.measureLabel,
                      { color: colors.secondaryText },
                    ]}
                  >
                    Sleeve
                  </Text>

                  <Text
                    style={[
                      styles.measureValue,
                      { color: colors.text },
                    ]}
                  >
                    {item.SLEEVE}
                  </Text>
                </View>
              )}

              {item.DAMAN != null && (
                <View
                  style={[
                    styles.measureBox,
                    {
                      backgroundColor:
                        colors.inputBackground,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.measureLabel,
                      { color: colors.secondaryText },
                    ]}
                  >
                    Daman
                  </Text>

                  <Text
                    style={[
                      styles.measureValue,
                      { color: colors.text },
                    ]}
                  >
                    {item.DAMAN}
                  </Text>
                </View>
              )}

              {item.LENGTH != null && (
                <View
                  style={[
                    styles.measureBox,
                    {
                      backgroundColor:
                        colors.inputBackground,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.measureLabel,
                      { color: colors.secondaryText },
                    ]}
                  >
                    Length
                  </Text>

                  <Text
                    style={[
                      styles.measureValue,
                      { color: colors.text },
                    ]}
                  >
                    {item.LENGTH}
                  </Text>
                </View>
              )}

              {item.HIP != null && (
                <View
                  style={[
                    styles.measureBox,
                    {
                      backgroundColor:
                        colors.inputBackground,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.measureLabel,
                      { color: colors.secondaryText },
                    ]}
                  >
                    Hip
                  </Text>

                  <Text
                    style={[
                      styles.measureValue,
                      { color: colors.text },
                    ]}
                  >
                    {item.HIP}
                  </Text>
                </View>
              )}

              {item.THIGH != null && (
                <View
                  style={[
                    styles.measureBox,
                    {
                      backgroundColor:
                        colors.inputBackground,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.measureLabel,
                      { color: colors.secondaryText },
                    ]}
                  >
                    Thigh
                  </Text>

                  <Text
                    style={[
                      styles.measureValue,
                      { color: colors.text },
                    ]}
                  >
                    {item.THIGH}
                  </Text>
                </View>
              )}

              {item.BOTTOM != null && (
                <View
                  style={[
                    styles.measureBox,
                    {
                      backgroundColor:
                        colors.inputBackground,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.measureLabel,
                      { color: colors.secondaryText },
                    ]}
                  >
                    Bottom
                  </Text>

                  <Text
                    style={[
                      styles.measureValue,
                      { color: colors.text },
                    ]}
                  >
                    {item.BOTTOM}
                  </Text>
                </View>
              )}

              {item.SHOULDER != null && (
                <View
                  style={[
                    styles.measureBox,
                    {
                      backgroundColor:
                        colors.inputBackground,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.measureLabel,
                      { color: colors.secondaryText },
                    ]}
                  >
                    Shoulder
                  </Text>

                  <Text
                    style={[
                      styles.measureValue,
                      { color: colors.text },
                    ]}
                  >
                    {item.SHOULDER}
                  </Text>
                </View>
              )}

              {item.COLLAR != null && (
                <View
                  style={[
                    styles.measureBox,
                    {
                      backgroundColor:
                        colors.inputBackground,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.measureLabel,
                      { color: colors.secondaryText },
                    ]}
                  >
                    Collar
                  </Text>

                  <Text
                    style={[
                      styles.measureValue,
                      { color: colors.text },
                    ]}
                  >
                    {item.COLLAR}
                  </Text>
                </View>
              )}
            </View>

            {/* ================= NOTES ================= */}

            {item.NOTES && (
              <View
                style={[
                  styles.notesBox,
                  {
                    backgroundColor:
                      colors.inputBackground,
                    borderColor: colors.border,
                  },
                ]}
              >
                <View
                  style={[
                    styles.notesIcon,
                    { backgroundColor: colors.card },
                  ]}
                >
                  <Ionicons
                    name="document-text-outline"
                    size={17}
                    color={colors.primary}
                  />
                </View>

                <Text
                  style={[
                    styles.notesText,
                    { color: colors.text },
                  ]}
                >
                  {item.NOTES}
                </Text>
              </View>
            )}
          </View>
        )}
      />

      {/* ================= FLOATING ADD BUTTON ================= */}

      <FloatingButton
        onPress={() => {
          router.push({
            pathname: "/AddMeasurement",
            params: {
              id: String(id),
            },
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  headerInfo: {
    flex: 1,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },

  countBox: {
    minWidth: 48,
    height: 45,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
  },

  countText: {
    fontSize: 17,
    fontWeight: "bold",
  },

  listContainer: {
    paddingBottom: 90,
  },

  // Empty list ko full available space deta hai
  emptyContainer: {
    flexGrow: 1,
    paddingHorizontal: 12,
  },

  // Empty content center mein show hoga
  emptyContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 25,
  },

  emptyIcon: {
    width: 90,
    height: 90,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 10,
  },

  emptyText: {
    fontSize: 14,
    marginTop: 6,
  },

  card: {
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1.5,

    elevation: 3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  typeContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  typeIcon: {
    width: 43,
    height: 43,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 11,
  },

  typeInfo: {
    flex: 1,
  },

  type: {
    fontSize: 17,
    fontWeight: "bold",
  },

  measurementId: {
    fontSize: 12,
    marginTop: 4,
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  actionButton: {
    width: 39,
    height: 39,
    borderRadius: 11,
    borderWidth: 1.2,
    justifyContent: "center",
    alignItems: "center",
  },

  divider: {
    height: 1,
    marginVertical: 15,
  },

  measurements: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  measureBox: {
    width: "31%",
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
  },

  measureLabel: {
    fontSize: 11,
    marginBottom: 2,
  },

  measureValue: {
    fontSize: 15,
    fontWeight: "bold",
  },

  notesBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 13,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
  },

  notesIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  notesText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 13,
    lineHeight: 19,
  },
});