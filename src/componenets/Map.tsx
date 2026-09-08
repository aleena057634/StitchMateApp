import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

type Props = {
  latitude: number;
  longitude: number;
};

export default function Map({ latitude, longitude }: Props) {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
          title="My Location"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    flex: 1,
  },
});