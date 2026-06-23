import MediaPhotosLibrary from "@/components/MediaPhotosLibrary";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <>
     <MediaPhotosLibrary />
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
