import { Text, View, StyleSheet } from "react-native";
import { Icon, Input } from "@rneui/base";
import { useFormikContext } from "formik";

import { Colors } from "@/src/constants/Colors";
import StyledText from "./StyledText";
import { useState } from "react";

const AppTextField = ({
  label,
  rightIcon,
  leftIcon,
  width,
  name,
  rightLabelStyle,
  rightLabel,
  rightLabelColor,
  readonly,
  ...props
}) => {
  const { values, errors, touched } = useFormikContext();
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={[styles.container, { width: width ? width : "100%" }]}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <StyledText
          color={Colors.primary}
          type="label"
          variant="medium"
          style={{ marginBottom: 2 }}
        >
          {label}
        </StyledText>
        <StyledText
          color={rightLabelColor ? rightLabelColor : Colors.primary}
          type="label"
          variant="medium"
          style={[rightLabelStyle, { marginBottom: 2, fontSize: 12 }]}
        >
          {rightLabel}
        </StyledText>
      </View>
      <Input
        containerStyle={{
          paddingHorizontal: 0,
          paddingVertical: 0,
          height: 49,
          marginBottom: 3,
        }}
        inputContainerStyle={[
          styles.input,
          isFocused && styles.focusedInput, // Add conditional styles
        ]}
        inputStyle={{ paddingHorizontal: 8 }}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        value={values[name]}
        readOnly={readonly}
        onFocus={() => setIsFocused(true)} // Handle focus
        onBlur={() => setIsFocused(false)} // Handle blur
        {...props}
      />
      {touched[name] && errors[name] && (
        <StyledText
          color={Colors.error}
          type="label"
          variant="medium"
        >
          {errors[name]}
        </StyledText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  input: {
    borderColor: Colors.light,
    borderRadius: 8,
    borderWidth: 1,
    height: 49,
  },
  focusedInput: {
    borderColor: Colors.primary,
  },
});

export default AppTextField;
