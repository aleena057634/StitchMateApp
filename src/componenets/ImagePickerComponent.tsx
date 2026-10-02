import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type ImagePickerProps = {
  onImageSelected: (uri: string) => void;
};

export default function ImagePickerComponent({
  onImageSelected,
}: ImagePickerProps) {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const pickFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;

      setImageUri(uri);
      onImageSelected(uri);
    }
  };

  const openCamera = async () => {
    const permission =
      await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;

      setImageUri(uri);
      onImageSelected(uri);
    }
  };

  const cancelImage = () => {
    setImageUri(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        {/* Cancel */}
        <Pressable
          style={styles.actionButton}
          onPress={cancelImage}
        >
          <Ionicons
            name="close"
            size={20}
            color="#555"
          />
          <Text style={styles.cancelText}>Cancel</Text>
        </Pressable>

        {/* Gallery */}
        <Pressable
          style={styles.actionButton}
          onPress={pickFromGallery}
        >
          <Ionicons
            name="images-outline"
            size={20}
            color="#C9A227"
          />
          <Text style={styles.buttonText}>Gallery</Text>
        </Pressable>

        {/* Camera */}
        <Pressable
          style={styles.actionButton}
          onPress={openCamera}
        >
          <Ionicons
            name="camera-outline"
            size={20}
            color="#C9A227"
          />
          <Text style={styles.buttonText}>Camera</Text>
        </Pressable>
      </View>

      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={styles.image}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },

  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 18,
  },

  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 8,
  },

  buttonText: {
    color: "#C9A227",
    fontSize: 15,
    fontWeight: "600",
  },

  cancelText: {
    color: "#777",
    fontSize: 15,
    fontWeight: "600",
  },

  image: {
    width: 200,
    height: 200,
    borderRadius: 12,
    marginTop: 18,
  },
});