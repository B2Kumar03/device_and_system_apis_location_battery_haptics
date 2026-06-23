import { StyleSheet, Text, View, Button, ScrollView } from "react-native";

import React, { useEffect, useState } from "react";

import * as Network from "expo-network";

import { SafeAreaView } from "react-native-safe-area-context";

const ExpoNetwork = () => {
  // Live network state
  const liveState = Network.useNetworkState();

  // store network snapshot
  const [snapshot, setSnapshot] = useState(liveState);

  // device IP address
  const [ipAddress, setIpAddress] = useState("");

  // airplane mode status
  const [airplaneMode, setAirplaneMode] = useState(false);

  // network change event
  const [event, setEvent] = useState("");

  useEffect(() => {
    const subscription = Network.addNetworkStateListener((state) => {
      const line = `${state.type ?? "unknown"} | Connected: ${state.isConnected} | Internet: ${state.isInternetReachable}`;

      setEvent(line);

      // update current state also
      setSnapshot(state);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const refreshSnapshot = async () => {
    const state = await Network.getNetworkStateAsync();

    setSnapshot(state);
  };

  const refreshIpAddress = async () => {
    const ip = await Network.getIpAddressAsync();

    setIpAddress(ip);
  };

  const refreshAirplaneMode = async () => {
    const mode = await Network.isAirplaneModeEnabledAsync();

    setAirplaneMode(mode);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Expo Network Info</Text>

        <Text>Type: {snapshot.type}</Text>

        <Text>Connected: {String(snapshot.isConnected)}</Text>

        <Text>Internet Reachable: {String(snapshot.isInternetReachable)}</Text>

        <Text style={styles.space}>Live Event:</Text>

        <Text>{event}</Text>

        <Text style={styles.space}>IP Address:</Text>

        <Text>{ipAddress}</Text>

        <Text style={styles.space}>Airplane Mode:</Text>

        <Text>{String(airplaneMode)}</Text>

        <Button title="Refresh Network" onPress={refreshSnapshot} />

        <Button title="Get IP Address" onPress={refreshIpAddress} />

        <Button title="Check Airplane Mode" onPress={refreshAirplaneMode} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExpoNetwork;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 20,
  },

  title: {
    fontSize: 22,

    marginBottom: 20,
  },

  space: {
    marginTop: 20,
  },
});
