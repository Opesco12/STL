import { Image, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { ArrowLeft2 } from "iconsax-react-native";
import LogoPrimary from "@/assets/images/svg_images/Logo_Primary";

const AppHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {navigation.canGoBack() ? (
        <MaterialCommunityIcons
          name="chevron-left"
          size={35}
          onPress={() => navigation.goBack()}
        />
      ) : (
        <MaterialCommunityIcons
          name="chevron-left"
          size={35}
          style={{ opacity: 0 }}
        />
      )}

      {/* <LogoPrimary
        height={35}
        width={35}
      /> */}

      <MaterialCommunityIcons
        name="chevron-left"
        size={35}
        style={{ opacity: 0 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
  },
});

export default AppHeader;
