import * as Location from "expo-location";
import { useState } from "react";
import { Button, Text, View } from "react-native";
import Map from "./Map";

export default function LocationCode() {
  const [permission, requestPermission] =
    Location.useForegroundPermissions();

  const [location, setLocation] = useState<any>(null);

  const getLocation = async () => {
    const result = await Location.getCurrentPositionAsync({});

    console.log(result);

    setLocation(result);
  };

  if (!permission) {
    return null;
  }

  if (!permission.granted) {
    return (
      <View>
        <Button
          title="Allow Permission"
          onPress={requestPermission}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Text>Location Permission Granted</Text>

      <Button
        title="Get Location"
        onPress={getLocation}
      />

      {location && (
        <Map
          latitude={location.coords.latitude}
          longitude={location.coords.longitude}
        />
      )}
    </View>
  );
}