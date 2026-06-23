import ExpoBattery from "@/components/ExpoBattery";
import ExpoNetwork from "@/components/ExpoNetwork";
import MediaPhotosLibrary from "@/components/MediaPhotosLibrary";
import { Text, View, StyleSheet } from "react-native";
import * as Battery from "expo-battery";
import { useState } from "react";
import ExpoHaptics from "@/components/ExpoHaptics";

export default function Index() {


  return (
    <>
    
     <ExpoHaptics/>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
