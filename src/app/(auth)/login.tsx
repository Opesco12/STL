import { ActivityIndicator, Image, View } from "react-native";
import { useState } from "react";
import { Formik } from "formik";
import { Icon } from "@rneui/base";
import { router } from "expo-router";

import { Colors } from "@/src/constants/Colors";
import AppButton from "@/src/components/AppButton";
import Screen from "@/src/components/Screen";
import AppTextField from "@/src/components/AppTextField";
import StyledText from "@/src/components/StyledText";

import LogoFull from "../../../assets/images/svg_images/LogoFull";
import LogoPrimary from "../../../assets/images/svg_images/Logo_Primary";

import { userLoginSchema } from "../../validationSchemas/userSchema";
import { login } from "@/src/api";

const Header = () => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: Colors.secondary,
        // paddingTop: 10,
      }}
    >
      <LogoFull
        height={100}
        width={100}
      />
    </View>
  );
};

const Login = () => {
  const [email, setEmail] = useState(null);
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <Screen>
      <Header />
      <View style={{ flex: 1 }}>
        <StyledText
          type="heading"
          variant="semibold"
          // style={{ marginTop: 25 }}
        >
          Welcome Back!
        </StyledText>
        <StyledText
          type="title"
          variant="medium"
          color={Colors.light}
        >
          Login to your account
        </StyledText>

        <Formik
          validationSchema={userLoginSchema}
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values, { resetForm, setSubmitting }) => {
            setSubmitting(true);
            const { email, password } = values;
            setEmail(email);
            const response = await login(email, password);
            if (response) {
              setSubmitting(false);
              resetForm();
              router.push({
                pathname: "/otp",
                params: { username: email },
              });
            } else {
              setSubmitting(false);
            }
          }}
        >
          {({ handleSubmit, handleChange, isSubmitting }) => (
            <View style={{ marginTop: 20, flex: 1 }}>
              <AppTextField
                label={"Username"}
                name="email"
                onChangeText={handleChange("email")}
                autoCapitalize="none"
              />
              <AppTextField
                label={"Password"}
                rightIcon={
                  <Icon
                    type="material-community"
                    name={hidePassword ? "eye-off-outline" : "eye-outline"}
                    color={Colors.light}
                    onPress={() => setHidePassword(!hidePassword)}
                  />
                }
                name={"password"}
                onChangeText={handleChange("password")}
                secureTextEntry={hidePassword ? true : false}
              />
              <StyledText
                color={Colors.primary}
                style={{ textAlign: "right", textDecorationLine: "underline" }}
                onPress={() => {
                  router.push("/reset-password");
                }}
              >
                Forgot Password?
              </StyledText>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                }}
              >
                <AppButton onPress={handleSubmit}>
                  {isSubmitting ? (
                    <ActivityIndicator size={"small"} />
                  ) : (
                    "Login"
                  )}
                </AppButton>
                <StyledText
                  style={{ textAlign: "center", marginTop: 15 }}
                  type="body"
                  variant="medium"
                >
                  Don't have an account?{" "}
                  <StyledText
                    color={Colors.primary}
                    onPress={() => router.push("/register")}
                  >
                    Register
                  </StyledText>
                </StyledText>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </Screen>
  );
};

export default Login;
