import React from "react";
import { TextInputProps } from "react-native";
import { useTheme } from "styled-components";

import { Container, Icon, TextInput } from "./styles";

type InputProps = TextInputProps & {
  setValue: (value: string) => void;
  reset: () => void;
  icon: string;
};

const Input = ({ setValue, icon, reset, ...rest }: InputProps) => {
  const { colors } = useTheme();
  console.tron.log("rest", rest);

  return (
    <Container>
      <Icon name={icon} size={24} color={colors.black} />

      <TextInput
        keyboardAppearance="light"
        placeholderTextColor={`${colors.black}75`}
        onChangeText={setValue}
        {...rest}
      />
      {rest.value !== "" && (
        <Icon onPress={reset} name="x" size={15} color={colors.black} />
      )}
    </Container>
  );
};

export default Input;
