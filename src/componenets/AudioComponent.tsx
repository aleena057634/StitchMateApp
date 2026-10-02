
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";

import React, { useEffect } from "react";

import {
  useAudioRecorder,
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioRecorderState,
  useAudioPlayer,
  useAudioPlayerStatus,
} from "expo-audio";

import { Ionicons } from "@expo/vector-icons";


type Props = {
  audios: string[];
  onAudioRecorded: (uri: string) => void;
  onAudioDelete: (uri: string) => void;
};


type AudioPlayerItemProps = {
  uri: string;
  index: number;
  onDelete?: () => void;
};

export function AudioPlayerItem({
  uri,
  index,
  onDelete,
}: AudioPlayerItemProps) {

  const player = useAudioPlayer(uri);
  const playerState = useAudioPlayerStatus(player);


  const playAudio = () => {
    player.play();
  };


  const pauseAudio = () => {
    player.pause();
  };


  const replayAudio = async () => {
    await player.seekTo(0);
    player.play();
  };


  return (
    <View style={styles.audioRow}>

      {/* Play / Pause */}
      <Pressable
        style={styles.playButton}
        onPress={
          playerState.playing
            ? pauseAudio
            : playAudio
        }
      >
        <Ionicons
          name={
            playerState.playing
              ? "pause"
              : "play"
          }
          size={22}
          color="#FFFFFF"
        />
      </Pressable>


      {/* Audio Information */}
      <View style={styles.audioMiddle}>

        <Text style={styles.audioTitle}>
          Audio {index + 1}
        </Text>


        <View style={styles.waveContainer}>

          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
            (item) => (
              <View
                key={item}
                style={[
                  styles.wave,
                  {
                    height:
                      item % 3 === 0
                        ? 18
                        : item % 2 === 0
                        ? 11
                        : 15,
                  },
                ]}
              />
            )
          )}

        </View>

      </View>


      {/* Replay */}
      <Pressable
        style={styles.replayButton}
        onPress={replayAudio}
      >
        <Ionicons
          name="refresh"
          size={21}
          color="#FFFFFF"
        />
      </Pressable>


      {/* Delete */}
      {onDelete && (
  <Pressable
    style={styles.deleteButton}
    onPress={onDelete}
  >
    <Text style={styles.deleteText}>
      ×
    </Text>
  </Pressable>
)}

    </View>
  );
}


export default function AudioComponent({
  audios,
  onAudioRecorded,
  onAudioDelete,
}: Props) {

  const recorder = useAudioRecorder(
    RecordingPresets.HIGH_QUALITY
  );


  const recorderState =
    useAudioRecorderState(recorder);


  // Microphone permission
  const getPermission = async () => {

    const perm =
      await AudioModule.requestRecordingPermissionsAsync();


    if (perm.granted) {

      console.log("Permission granted");


      await setAudioModeAsync({
        allowsRecording: true,
        playsInSilentMode: true,
      });

    } else {

      console.log("Permission denied");

    }
  };


  // Start recording
  const startRecording = async () => {

    await recorder.prepareToRecordAsync();

    recorder.record({
      // forDuration: 60,
    });

  };


  // Stop recording
  const stopRecording = async () => {

    await recorder.stop();


    const uri = recorder.uri;


    console.log("Audio URI:", uri);


    if (uri) {

      onAudioRecorded(uri);

    }

  };


  useEffect(() => {

    getPermission();

  }, []);


  return (
    <View style={styles.container}>

      {/* Saved Audio List */}
      {audios.length > 0 && (

        <View style={styles.audioList}>

          {audios.map((audio, index) => (

            <AudioPlayerItem
              key={`${audio}-${index}`}
              uri={audio}
              index={index}
              onDelete={() => {
                onAudioDelete(audio);
              }}
            />

          ))}

        </View>

      )}


      {/* Record Button */}
      {!recorderState.isRecording ? (

        <Pressable
          style={styles.recordButton}
          onPress={startRecording}
        >

          <Text style={styles.recordText}>
            Record Audio
          </Text>

        </Pressable>

      ) : (

        /* Recording UI */
        <View style={styles.recordingRow}>

          <View style={styles.recordingIcon}>

            <Ionicons
              name="mic"
              size={22}
              color="#FFFFFF"
            />

          </View>


          <View style={styles.recordingMiddle}>

            <Text style={styles.recordingText}>
              Recording...
            </Text>


            <View style={styles.waveContainer}>

              {[1, 2, 3, 4, 5, 6, 7, 8].map(
                (item) => (

                  <View
                    key={item}
                    style={[
                      styles.wave,
                      {
                        height:
                          item % 2 === 0
                            ? 17
                            : 10,
                      },
                    ]}
                  />

                )
              )}

            </View>

          </View>


          {/* Timer */}
          <Text style={styles.timer}>

            {Math.floor(
              recorderState.durationMillis / 1000
            )
              .toString()
              .padStart(2, "0")}

            /60

          </Text>


          {/* Stop */}
          <Pressable
            style={styles.stopButton}
            onPress={stopRecording}
          >

            <Ionicons
              name="stop"
              size={20}
              color="#FFFFFF"
            />

          </Pressable>

        </View>

      )}

    </View>
  );
}


const styles = StyleSheet.create({

  container: {
    width: "100%",
    marginTop: 10,
    marginBottom: 15,
  },


  recordButton: {
    height: 52,
    borderRadius: 26,
    backgroundColor: "#BB8A2F",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
    marginTop: 10,
  },


  recordText: {
    color: "#030303",
    fontSize: 16,
    fontWeight: "600",
  },


  recordingRow: {
    height: 60,
    borderRadius: 30,
    backgroundColor: "#f7f4f4",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginHorizontal: 8,
    marginTop: 10,
    marginBottom: 10,
  },


  recordingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#BB8A2F",
    alignItems: "center",
    justifyContent: "center",
  },


  recordingMiddle: {
    flex: 1,
    marginLeft: 12,
    marginRight: 10,
  },


  recordingText: {
    color: "#000000",
    fontSize: 13,
    marginBottom: 5,
  },


  timer: {
    color: "#000000",
    fontSize: 13,
    marginHorizontal: 10,
  },


  stopButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#cfc7b7",
    alignItems: "center",
    justifyContent: "center",
  },


  audioList: {
    marginBottom: 10,
    gap: 10,
  },


  audioRow: {
    height: 60,
    borderRadius: 30,
    backgroundColor: "#164E63",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },


  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#BB8A2F",
    alignItems: "center",
    justifyContent: "center",
  },


  audioMiddle: {
    flex: 1,
    marginLeft: 12,
    marginRight: 10,
  },


  audioTitle: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 4,
  },


  waveContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    height: 20,
  },


  wave: {
    width: 3,
    borderRadius: 3,
    backgroundColor: "#BB8A2F",
  },


  replayButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#BB8A2F",
    alignItems: "center",
    justifyContent: "center",
  },


  deleteButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
  },


  deleteText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "400",
  },

});
