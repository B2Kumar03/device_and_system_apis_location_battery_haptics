import { Button, StyleSheet, Text, View, ScrollView } from "react-native";

import React, { useState } from "react";

import * as Haptics from "expo-haptics";

import {
  ImpactFeedbackStyle,
  NotificationFeedbackType,
  AndroidHaptics,
} from "expo-haptics";

const ExpoHaptics = () => {
  const [message, setMessage] = useState("");

  // Light vibration
  const lightHaptic = async () => {
    await Haptics.impactAsync(ImpactFeedbackStyle.Light);

    setMessage("Light Impact");
  };

  // Medium vibration
  const mediumHaptic = async () => {
    await Haptics.impactAsync(ImpactFeedbackStyle.Medium);

    setMessage("Medium Impact");
  };

  // Heavy vibration
  const heavyHaptic = async () => {
    await Haptics.impactAsync(ImpactFeedbackStyle.Heavy);

    setMessage("Heavy Impact");
  };

  // Success vibration
  const successHaptic = async () => {
    await Haptics.notificationAsync(NotificationFeedbackType.Success);

    setMessage("Success");
  };

  // Warning vibration
  const warningHaptic = async () => {
    await Haptics.notificationAsync(NotificationFeedbackType.Warning);

    setMessage("Warning");
  };

  // Error vibration
  const errorHaptic = async () => {
    await Haptics.notificationAsync(NotificationFeedbackType.Error);

    setMessage("Error");
  };

  // Small selection vibration
  const selectionHaptic = async () => {
    await Haptics.selectionAsync();

    setMessage("Selection Changed");
  };

  // Android specific
  const androidHaptic = async () => {
    await Haptics.performAndroidHapticsAsync(AndroidHaptics.Confirm);

    setMessage("Android Confirm");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Expo Haptics Demo</Text>

      <View style={styles.result}>
        <Text>{message}</Text>
      </View>

      <Text style={styles.heading}>Impact Feedback</Text>

      <Button title="Light" onPress={lightHaptic} />

      <Button title="Medium" onPress={mediumHaptic} />

      <Button title="Heavy" onPress={heavyHaptic} />

      <Text style={styles.heading}>Notification Feedback</Text>

      <Button title="Success" onPress={successHaptic} />

      <Button title="Warning" onPress={warningHaptic} />

      <Button title="Error" onPress={errorHaptic} />

      <Text style={styles.heading}>Selection</Text>

      <Button title="Selection" onPress={selectionHaptic} />

      <Text style={styles.heading}>Android Haptic</Text>

      <Button title="Android Confirm" onPress={androidHaptic} />
    </ScrollView>
  );
};

export default ExpoHaptics;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 20,
  },

  title: {
    fontSize: 24,

    fontWeight: "bold",

    marginBottom: 20,
  },

  heading: {
    fontSize: 18,

    fontWeight: "bold",

    marginTop: 25,

    marginBottom: 10,
  },

  result: {
    padding: 20,

    backgroundColor: "#eee",

    borderRadius: 10,
  },
});
