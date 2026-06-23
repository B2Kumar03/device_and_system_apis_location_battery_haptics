import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import React, { useEffect, useState } from "react";

import * as MediaLibrary from "expo-media-library";

import { Image } from "expo-image";

import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const MediaPhotosLibrary = () => {
  const [permission, requestPermission] = MediaLibrary.usePermissions();

  const [photos, setPhotos] = useState<MediaLibrary.Asset[]>([]);

  const [albums, setAlbums] = useState<MediaLibrary.Album[]>([]);

  const [selectedAlbum, setSelectedAlbum] = useState<MediaLibrary.Album | null>(
    null,
  );

  const [endCursor, setEndCursor] = useState<string | null>(null);

  const [hasMore, setHasMore] = useState(true);

  const [loading, setLoading] = useState(false);

  const loadAlbums = async () => {
    try {
      const result = await MediaLibrary.getAlbumsAsync({
        includeSmartAlbums: true,
      });

      setAlbums(result);
    } catch (error) {
      console.log(error);
    }
  };

  const getPhotos = async (album?: MediaLibrary.Album, loadMore = false) => {
    try {
      setLoading(true);

      const result = await MediaLibrary.getAssetsAsync({
        mediaType: "photo",

        first: 4,

        album: album ?? selectedAlbum ?? undefined,

        after: loadMore ? (endCursor ?? undefined) : undefined,

        sortBy: [MediaLibrary.SortBy.creationTime],
      });

      if (loadMore) {
        setPhotos((prev) => [...prev, ...result.assets]);
      } else {
        setPhotos(result.assets);
      }

      setEndCursor(result.endCursor);

      setHasMore(result.hasNextPage);
    } catch (error) {
      console.log("Photo Error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (permission?.granted) {
      loadAlbums();

      getPhotos();
    }
  }, [permission]);

  if (!permission) {
    return (
      <View style={styles.center}>
        <Text>Checking permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>Need media permission</Text>

        <Button title="Allow Photos" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Albums */}

      <FlatList
        horizontal
        data={albums}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.album,

              selectedAlbum?.id === item.id && styles.selected,
            ]}
            onPress={() => {
              setSelectedAlbum(item);

              setEndCursor(null);

              setHasMore(true);

              getPhotos(item, false);
            }}
          >
            <Text>{item.title}</Text>
          </TouchableOpacity>
        )}
      />

      {loading && <ActivityIndicator size="large" />}

      {/* Photos */}

      <FlatList
        data={photos}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => (
          <Image
            source={{
              uri: item.uri,
            }}
            style={styles.image}
            contentFit="cover"
          />
        )}
      />

      {hasMore && (
        <Button
          title={loading ? "Loading..." : "Load more"}
          disabled={loading}
          onPress={() => {
            getPhotos(selectedAlbum ?? undefined, true);
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default MediaPhotosLibrary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    width: width / 3,

    height: width / 3,

    margin: 1,
  },

  album: {
    padding: 12,

    margin: 5,

    borderRadius: 10,

    backgroundColor: "#eee",
  },

  selected: {
    backgroundColor: "#aaa",
  },

  center: {
    flex: 1,

    justifyContent: "center",

    alignItems: "center",
  },
});
