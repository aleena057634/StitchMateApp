
import { View, Text, Button } from "react-native";
import React, { useEffect } from "react";
import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioRecorder,
  useAudioRecorderState,
  useAudioPlayer,
} from "expo-audio";

export default function AudioFile() {
  const recorder = useAudioRecorder(
    RecordingPresets.HIGH_QUALITY
  );

  const recorderState = useAudioRecorderState(recorder);

  const audio = recorder.uri;
  const player = useAudioPlayer(audio);

  const permission = async () => {
    const perm =
      await AudioModule.requestRecordingPermissionsAsync();

    if (perm.granted) {
      console.log("Permission granted");

      await setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
      });
    } else {
      console.log("Permission not granted");
    }
  };

  useEffect(() => {
    permission();
  }, []);

  const startRecording = async () => {
    await recorder.prepareToRecordAsync();

    recorder.record({
      forDuration: 60,
    });

    console.log("Recording started");
  };

  const stopRecording = async () => {
    await recorder.stop();

    console.log("Recording stopped");
    console.log("Audio URI:", recorder.uri);
  };

  return (
    <View>
      <Text>AudioFile</Text>

      <Text>
        {recorderState.isRecording
          ? "Recording..."
          : "Not Recording"}
      </Text>

      <Text>
        {Math.floor(recorderState.durationMillis / 1000)} / 60 seconds
      </Text>

      {!recorderState.isRecording ? (
        <Button
          title="Start Recording"
          onPress={startRecording}
        />
      ) : (
        <Button
          title="Stop Recording"
          onPress={stopRecording}
        />
      )}

      <Button
        title="Play Sound"
        onPress={() => {
          player.play();
        }}
      />
    </View>
  );
}
