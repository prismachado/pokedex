import { RequestPokemonParams } from "./../../redux/types/types.pokemon";
import axios from "axios";
import { Types } from "./types";
import getPokemonData from "../../utils/getPokemonData";

export const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

const PokedexService = {
  async getPokemons({ offset }: RequestPokemonParams): Promise<any> {
    const response = await api.get("pokemon", {
      params: {
        offset,
        limit: 18,
      },
    });

    if (response.status !== 200) {
      throw new Error("Pokemon api failed.");
    }

    const { results } = response.data;

    return results;
  },

  async getPokemonDetails({ data }: any): Promise<any> {
    var results: any[] = await Promise.all(
      data.map(async (pokemon: any) => {
        const id = pokemon.url.split("/")[6];

        const pokemonData = await api.get<any>(`pokemon/${id}`);
        const pokemonSpecieData = await api.get<any>(`pokemon-species/${id}`);

        if (pokemonData.status !== 200) {
          throw new Error("Pokemon api by id failed.");
        }

        if (pokemonSpecieData.status !== 200) {
          throw new Error("Pokemon species api failed.");
        }

        return getPokemonData(pokemonData, pokemonSpecieData);
      })
    );

    return results;
  },
  async searchPokemon({ name }: any): Promise<any> {
    const pokemonData = await api.get<any>(`pokemon/${name}`);
    const pokemonSpecieData = await api.get<any>(`pokemon-species/${name}`);

    if (pokemonData.status !== 200) {
      throw new Error("Pokemon api by id failed.");
    }

    if (pokemonSpecieData.status !== 200) {
      throw new Error("Pokemon species api failed.");
    }

    return getPokemonData(pokemonData, pokemonSpecieData);
  },

  async getExistsTypes(): Promise<any> {
    const response = await api.get("type");

    if (response.status !== 200) {
      throw new Error("Pokemon type api failed.");
    }

    const { results } = response.data;
    return results;
  },

  async getTypePokemon({ data }: any): Promise<any> {
    const { types, type } = data;

    const response = await api.get(`type/${type}`);

    if (response.status !== 200) {
      throw new Error("Pokemon type api failed.");
    }
    const { data: typeData } = response;

    const allTypes = types;

    const damage_relations: Types[] = [];

    typeData.damage_relations.double_damage_from.map((damageType: any) =>
      damage_relations.push({
        multiplier: "2x",
        type:
          damageType.name.charAt(0).toUpperCase() + damageType.name.slice(1),
      })
    );

    typeData.damage_relations.half_damage_from.map((damageType: any) =>
      damage_relations.push({
        multiplier: "0.5x",
        type:
          damageType.name.charAt(0).toUpperCase() + damageType.name.slice(1),
      })
    );

    const leftTypes = allTypes.filter(
      ({ name }: any) =>
        !damage_relations.some(
          ({ type: TypeName }) => TypeName.toLocaleLowerCase() === name
        )
    );

    leftTypes.splice(leftTypes.length - 2);

    leftTypes.map((leftType: any) =>
      damage_relations.push({
        multiplier: "1x",
        type: leftType.name.charAt(0).toUpperCase() + leftType.name.slice(1),
      })
    );

    return damage_relations;
  },
};

export default PokedexService;
