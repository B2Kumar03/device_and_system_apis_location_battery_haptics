import ExpoNetwork from "@/components/ExpoNetwork";
import MediaPhotosLibrary from "@/components/MediaPhotosLibrary";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  
  return (
    <>
     <ExpoNetwork/>
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
