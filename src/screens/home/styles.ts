import styled from "styled-components/native";
import { Animated, FlatList } from "react-native";

import { Pokemon } from "../../services/api/types";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled.View`
  flex: 1;
  position: relative;
`;

export const PokemonsList = styled(FlatList as new () => FlatList<Pokemon>)`
  flex: 1;
  margin-top: 8px;
`;

export const Search = styled.View`
  align-items: center;
  flex-direction: row;
  height: 50px;
  padding: 20px;
`;

export const SearchButtonContainer = styled(Animated.View)`
  margin-left: 16px;
`;

export const SearchButton = styled(RectButton)`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background: ${({ theme }) => theme.colors.lilac};
  align-items: center;
  justify-content: center;
`;

export const NotFound = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const NotFoundText = styled.Text`
  font-size: 18px;
  padding-top: 30px;
`;
