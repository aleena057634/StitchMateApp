import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type ImagePickerProps = {
  onImageSelected: (uri: string) => void;
};

export default function ImagePickerComponent({onImageSelected,}: ImagePickerProps) {
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

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={pickFromGallery}
      >
        <Text style={styles.buttonText}>
          Select From Gallery
        </Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={openCamera}
      >
        <Text style={styles.buttonText}>
          Open Camera
        </Text>
      </Pressable>

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
    alignItems: "center",
  },

  button: {
    backgroundColor: "#034624",
    borderRadius: 20,
    padding: 12,
    margin: 10,
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },

  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});