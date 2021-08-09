import React, { useEffect, useState } from "react";

import Text from "../../../../../components/Text";
import Loading from "../../../../../components/Loading";

import { SlideProps } from "../../tabs";

import {
  Container,
  Header,
  EffectivenessList,
  EffectivenessItem,
} from "./styles";
import getColorByPokemonType from "../../../../../utils/getColorByPokemonType";
import {
  getMetaDataPokemonList,
  getTypesPokemon,
} from "../../../../../redux/selectors/selector.pokemon";
import { useDispatch, useSelector } from "react-redux";
import { PokemonsActions } from "../../../../../redux/reducers/reducer.pokemon";

type EffectivenessType = {
  multiplier: string;
  type: string;
};

const Effectiveness = ({ pokemon }: SlideProps) => {
  const dispatch = useDispatch();
  const effectivenessSelector = useSelector(getTypesPokemon);

  const [effectiveness, setEffectiveness] = useState<EffectivenessType[]>([]);

  const { loading } = useSelector(getMetaDataPokemonList);

  const pokemonPrimaryType = pokemon.types[0].name.toLowerCase();

  useEffect(() => {
    if (effectivenessSelector.length === 0) {
      dispatch(
        PokemonsActions.pokedexRequestTypes({
          type: pokemonPrimaryType,
        })
      );
    } else {
      setEffectiveness(effectivenessSelector);
    }
  }, [effectivenessSelector]);

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header>
            <Text variant="body1" bold>
              Type defenses
            </Text>
            <Text color="grey" style={{ marginTop: 8 }}>
              The effectiveness of each type on {pokemon.name}.
            </Text>
          </Header>

          <EffectivenessList>
            {effectiveness.map((effect) => {
              const backgroundColor = getColorByPokemonType(effect.type);

              return (
                <EffectivenessItem
                  key={effect.type}
                  style={{ backgroundColor: `${backgroundColor}30` }}
                >
                  <Text
                    variant="caption"
                    bold
                    style={{ color: backgroundColor }}
                  >
                    {effect.type} {effect.multiplier}
                  </Text>
                </EffectivenessItem>
              );
            })}
          </EffectivenessList>
        </>
      )}
    </Container>
  );
};

export default Effectiveness;
