import {
  Text,
  View,
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Alert,
} from "react-native";

import React, { useCallback, useState } from "react";

import * as DocumentPicker from "expo-document-picker";

import { File } from "expo-file-system";

type PickMode = "any" | "image" | "pdf";

const MODES: {
  id: PickMode;
  label: string;
  type: string;
}[] = [
  {
    id: "any",
    label: "Any",
    type: "*/*",
  },

  {
    id: "image",
    label: "Images",
    type: "image/*",
  },

  {
    id: "pdf",
    label: "PDF",
    type: "application/pdf",
  },
];

type FileDetails = {
  name: string;

  mimeType: string;

  size: string;

  exists: boolean;

  uri: string;

  textPreview?: string;
};

function formatBytes(size?: number | null) {
  if (size == null) return "—";

  if (size < 1024) return `${size} B`;

  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value?: string | number | boolean | null;
}) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{label}</Text>

      <Text selectable>
        {value === undefined || value === null || value === ""
          ? "—"
          : String(value)}
      </Text>
    </View>
  );
}

function isTextFile(asset: DocumentPicker.DocumentPickerAsset) {
  return (
    asset.mimeType?.startsWith("text/") ||
    asset.name.endsWith(".txt") ||
    asset.name.endsWith(".json") ||
    asset.name.endsWith(".md")
  );
}

export default function FileHandlingScreen() {
  const [mode, setMode] = useState<PickMode>("any");

  const [allowMultiple, setAllowMultiple] = useState(false);

  const [files, setFiles] = useState<DocumentPicker.DocumentPickerAsset[]>([]);

  const [selected, setSelected] = useState<FileDetails | null>(null);

  const [status, setStatus] = useState<string | null>(null);

  const inspectFile = useCallback(
    async (asset: DocumentPicker.DocumentPickerAsset) => {
      try {
        const file = new File(asset.uri);

        let exists = false;

        let sizeBytes = asset.size ?? null;

        try {
          const info = file.info();

          exists = info.exists;

          sizeBytes = info.size ?? asset.size ?? null;
        } catch {
          exists = false;
        }

        let textPreview;

        if (isTextFile(asset) && exists) {
          try {
            textPreview = (await file.text()).slice(0, 240);
          } catch {
            textPreview = undefined;
          }
        }

        setSelected({
          name: asset.name,

          mimeType: asset.mimeType ?? "Unknown",

          size: formatBytes(sizeBytes),

          exists,

          uri: asset.uri,

          textPreview,
        });
      } catch (error) {
        Alert.alert("Inspect failed", String(error));
      }
    },

    [],
  );

  const pickDocuments = async () => {
    try {
      const selectedMode = MODES.find((item) => item.id === mode);

      const result = await DocumentPicker.getDocumentAsync({
        type: selectedMode?.type,

        multiple: allowMultiple,

        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        setStatus("Picker cancelled");

        return;
      }

      setFiles(result.assets);

      setStatus(`Picked ${result.assets.length} file`);

      inspectFile(result.assets[0]);
    } catch (error) {
      Alert.alert("Pick failed", String(error));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>File Handling</Text>

      <Text>Pick file and inspect using expo-file-system</Text>

      <View style={styles.modeRow}>
        {MODES.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => setMode(item.id)}
            style={[styles.modeChip, mode === item.id && styles.activeChip]}
          >
            <Text>{item.label}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.switchRow}>
        <Switch value={allowMultiple} onValueChange={setAllowMultiple} />

        <Text>Pick multiple files</Text>
      </View>

      <Button title="Pick File" onPress={pickDocuments} />

      {status && <Text>{status}</Text>}

      {files.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>Selected Files</Text>

          {files.map((file, index) => (
            <Pressable
              key={`${file.uri}-${index}`}
              onPress={() => inspectFile(file)}
              style={styles.fileItem}
            >
              <Text>{file.name}</Text>

              <Text>{formatBytes(file.size)}</Text>
            </Pressable>
          ))}
        </View>
      )}

      {selected && (
        <View style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>File Details</Text>

          <InfoRow label="Name" value={selected.name} />

          <InfoRow label="Type" value={selected.mimeType} />

          <InfoRow label="Size" value={selected.size} />

          <InfoRow label="Exists" value={selected.exists ? "Yes" : "No"} />

          <InfoRow label="Path" value={selected.uri} />

          {selected.textPreview && (
            <View>
              <Text>Preview</Text>

              <Text selectable>{selected.textPreview}</Text>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,

    gap: 15,
  },

  title: {
    fontSize: 24,

    fontWeight: "bold",
  },

  modeRow: {
    flexDirection: "row",

    gap: 10,
  },

  modeChip: {
    padding: 12,

    borderRadius: 20,

    backgroundColor: "#ddd",
  },

  activeChip: {
    backgroundColor: "#4da3ff",
  },

  switchRow: {
    flexDirection: "row",

    alignItems: "center",

    gap: 10,
  },

  fileItem: {
    padding: 15,

    backgroundColor: "#eee",

    borderRadius: 10,

    marginTop: 10,
  },

  sectionTitle: {
    fontSize: 18,

    fontWeight: "bold",

    marginTop: 15,
  },

  detailsCard: {
    backgroundColor: "#f5f5f5",

    padding: 15,

    borderRadius: 12,
  },

  infoRow: {
    marginBottom: 10,
  },

  label: {
    color: "#666",

    fontSize: 14,
  },
});
