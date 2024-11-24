import * as Clipboard from "expo-clipboard";
import { showMessage } from "react-native-flash-message";

export const copyToClipboard = async (text) => {
  await Clipboard.setStringAsync(text);

  showMessage({ message: "Copied", type: "success" });
};
