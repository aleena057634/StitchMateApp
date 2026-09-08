import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import {
    ActivityIndicator,
    Button,
    Image,
    Text,
    View,
} from "react-native";

export default function Camera() {
  const [permission, requestPermission] = useCameraPermissions();

  const cameraRef = useRef<CameraView>(null);

  const [photo, setPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!permission) {
    return <Text>Loading...</Text>;
  }

  if (!permission.granted) {
    return (
      <View>
        <Text>Camera permission required</Text>

        <Button
          title="Allow Camera"
          onPress={requestPermission}
        />
      </View>
    );
  }

  // Capture function
  const capturePhoto = async () => {
    if (!cameraRef.current) return;

    try {
      setLoading(true);

      const result = await cameraRef.current.takePictureAsync();

      if (result?.uri) {
        setPhoto(result.uri);
      }
    } catch (error) {
      console.log("Capture error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Cancel function
  const cancelPhoto = () => {
    setPhoto(null);
  };

  // Agar photo capture ho gayi
  if (photo) {
    return (
      <View style={{ flex: 1 }}>
        <Image
          source={{ uri: photo }}
          style={{ flex: 1 }}
        />

        <View>
          <Button
            title="Capture"
            onPress={capturePhoto}
          />

          <Button
            title="Cancel"
            onPress={cancelPhoto}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        ref={cameraRef}
        style={{ flex: 1 }}
        facing="back"
      />

      <View>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
            <Button
              title="Capture"
              onPress={capturePhoto}
            />

            <Button
              title="Cancel"
              onPress={cancelPhoto}
            />
          </>
        )}
      </View>
    </View>
  );
}