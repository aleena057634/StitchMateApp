import { Image, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

import {
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import { getOrderImage } from "../../databse/ImageCrud";

export default function DesignZoomImage() {
  const { orderId } = useLocalSearchParams();

  const [image, setImage] = useState<string | null>(null);

  const scale = useSharedValue(1);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  async function getImage(orderId: number) {
    try {
      const image = await getOrderImage(orderId);

      if (!image) {
        console.log("No image found for this id");
        return;
      }

      setImage(image);
    } catch (error) {
      console.log("Failed to get image", error);
    }
  }

  useEffect(() => {
    if (orderId) {
      getImage(Number(orderId));
    }
  }, [orderId]);

  // Zoom
  const pinchGesture = Gesture.Pinch()
    .onUpdate((event) => {
      scale.value = event.scale;
    })
    .onEnd(() => {
      if (scale.value < 1) {
        scale.value = 1;
      }

      if (scale.value > 4) {
        scale.value = 4;
      }
    });

  // Move image
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value =
        savedTranslateX.value + event.translationX;

      translateY.value =
        savedTranslateY.value + event.translationY;
    })
    .onEnd(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    });

  // Pinch + Pan together
  const gesture = Gesture.Simultaneous(
    pinchGesture,
    panGesture
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
        {
          scale: scale.value,
        },
      ],
    };
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {image && (
        <GestureDetector gesture={gesture}>
          <Animated.View
            style={[
              {
                width: "100%",
                height: "100%",
              },
              animatedStyle,
            ]}
          >
            <Image
              source={{ uri: image }}
              style={{
                width: "100%",
                height: "100%",
              }}
              resizeMode="contain"
            />
          </Animated.View>
        </GestureDetector>
      )}
    </View>
  );
}