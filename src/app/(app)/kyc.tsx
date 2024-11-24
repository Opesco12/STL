import { useState, useEffect } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  Linking,
  Pressable,
} from "react-native";

import Screen from "@/src/components/Screen";
import AppHeader from "@/src/components/AppHeader";
import StyledText from "@/src/components/StyledText";
import { Colors } from "@/src/constants/Colors";
import { checkVerification } from "@/src/api";
import { showMessage } from "react-native-flash-message";

const KYC = () => {
  const [loading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  const openBrowser = (url) => {
    Linking.openURL(url).catch((err) =>
      showMessage({ message: "Failed to open url", type: "warning" })
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await checkVerification();
      console.log(data);
      if (data?.status === true) {
        setIsVerified(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);
  return (
    <Screen>
      <AppHeader />

      <View style={{ marginTop: 20, flex: 1 }}>
        <StyledText
          type="heading"
          variant="semibold"
        >
          KYC Verification
        </StyledText>

        {loading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator
              size={"large"}
              color={Colors.lightPrimary}
            />
          </View>
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            {isVerified ? (
              <StyledText
                type="title"
                variant="medium"
                style={{ textAlign: "center" }}
              >
                Your KYC Registration Status is complete.
              </StyledText>
            ) : (
              <Pressable
                onPress={() => openBrowser("https://app.stlassetmgt.com/login")}
              >
                <StyledText
                  type="title"
                  variant="medium"
                  style={{ textAlign: "center" }}
                >
                  <Text style={{ color: Colors.lightPrimary }}>Click here</Text>{" "}
                  to complete your KYC Registration on our web client
                </StyledText>
              </Pressable>
            )}
          </View>
        )}
      </View>
    </Screen>
  );
};

export default KYC;
