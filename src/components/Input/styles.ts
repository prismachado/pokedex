import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";

export const Container = styled.View`
  height: 48px;
  padding: 0 24px;
  background: ${({ theme }) => theme.colors.semiGrey};
  border-radius: 24px;
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const Icon = styled(Feather)`
  margin-right: 0px;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  height: 100%;
  margin-left: 16px;
  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.textVariantes.input};
`;
