import { RequestPokemonParams } from "./../../redux/types/types.pokemon";
import axios from "axios";
import Pokemon, { TypeApiResult, Types } from "./types";

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

    const { results } = response.data;

    return results;
  },

  async getPokemonData({ data, search }: any): Promise<any> {
    console.tron.log("SEARCH", search);
    var results: any[] = await Promise.all(
      data.map(async (pokemon: any) => {
        const id = pokemon.url.split("/")[6];

        const pokemonData = await api.get<any>(`pokemon/${id}`);
        const pokemonSpecieData = await api.get<any>(`pokemon-species/${id}`);

        const pokemonNameIndex = pokemonSpecieData.data.names.findIndex(
          (name: any) => name.language.name === "en"
        );

        const pokemonFlavorTextIndex =
          pokemonSpecieData.data.flavor_text_entries.findIndex(
            (text: any) =>
              text.version.name === "ruby" ||
              text.version.name === "platinum" ||
              text.version.name === "soulsilver"
          );

        const pokemonGeneraIndex = pokemonSpecieData.data.genera.findIndex(
          (genera: any) => genera.language.name === "en"
        );
        const pokemonTypesFormatted = pokemonData.data.types.map(
          ({ type }: any) => {
            return {
              name: type.name.charAt(0).toUpperCase() + type.name.slice(1),
              url: type.url,
            };
          }
        );

        const pokemonStatsFormatted = pokemonData.data.stats.map(
          (stat: any) => {
            let name = "";

            if (stat.stat.name === "hp") {
              name = "HP";
            } else if (stat.stat.name === "attack") {
              name = "Attack";
            } else if (stat.stat.name === "defense") {
              name = "Defense";
            } else if (stat.stat.name === "special-attack") {
              name = "Sp. Atk";
            } else if (stat.stat.name === "special-defense") {
              name = "Sp. Def";
            } else if (stat.stat.name === "speed") {
              name = "Speed";
            }
            return {
              base_stat: stat.base_stat,
              name,
              url: stat.stat.url,
            };
          }
        );

        const pokemonAbilityFormatted = pokemonData.data.abilities.map(
          ({ ability }: any) => {
            return {
              name:
                ability.name.charAt(0).toUpperCase() + ability.name.slice(1),
              url: ability.url,
            };
          }
        );

        const eggGroupsFormatted = pokemonSpecieData.data.egg_groups.map(
          (egg_group: any) => {
            return {
              name:
                egg_group.name.charAt(0).toUpperCase() +
                egg_group.name.slice(1),
              url: egg_group.url,
            };
          }
        );

        return {
          id: pokemonData.data.id,
          name: pokemonSpecieData.data.names[pokemonNameIndex].name,
          description:
            pokemonSpecieData.data.flavor_text_entries[pokemonFlavorTextIndex]
              .flavor_text,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${String(
            pokemonData.data.id
          )}.png`,
          genera: pokemonSpecieData.data.genera[pokemonGeneraIndex].genus,
          pokedex_number: pokemonData.data.id.toString().padStart(3, "0"),
          base_experience: pokemonData.data.base_experience,
          types: pokemonTypesFormatted,
          stats: pokemonStatsFormatted,
          height: pokemonData.data.height,
          weight: pokemonData.data.weight,
          abilites: pokemonAbilityFormatted,
          gender_rate: pokemonSpecieData.data.gender_rate,
          egg_groups: eggGroupsFormatted,
        };
      })
    );

    return results;
  },
  async getPokemonDataSearch({ name }: any): Promise<any> {
    console.tron.log("entrou na service", name);
    const pokemonData = await api.get<any>(`pokemon/${name}`);
    const pokemonSpecieData = await api.get<any>(`pokemon-species/${name}`);

    console.tron.log("retorno do service", pokemonData, name);

    const pokemonNameIndex = pokemonSpecieData.data.names.findIndex(
      (name: any) => name.language.name === "en"
    );

    const pokemonFlavorTextIndex =
      pokemonSpecieData.data.flavor_text_entries.findIndex(
        (text: any) =>
          text.version.name === "ruby" ||
          text.version.name === "platinum" ||
          text.version.name === "soulsilver"
      );

    const pokemonGeneraIndex = pokemonSpecieData.data.genera.findIndex(
      (genera: any) => genera.language.name === "en"
    );
    const pokemonTypesFormatted = pokemonData.data.types.map(
      ({ type }: any) => {
        return {
          name: type.name.charAt(0).toUpperCase() + type.name.slice(1),
          url: type.url,
        };
      }
    );

    const pokemonStatsFormatted = pokemonData.data.stats.map((stat: any) => {
      let name = "";

      if (stat.stat.name === "hp") {
        name = "HP";
      } else if (stat.stat.name === "attack") {
        name = "Attack";
      } else if (stat.stat.name === "defense") {
        name = "Defense";
      } else if (stat.stat.name === "special-attack") {
        name = "Sp. Atk";
      } else if (stat.stat.name === "special-defense") {
        name = "Sp. Def";
      } else if (stat.stat.name === "speed") {
        name = "Speed";
      }
      return {
        base_stat: stat.base_stat,
        name,
        url: stat.stat.url,
      };
    });

    const pokemonAbilityFormatted = pokemonData.data.abilities.map(
      ({ ability }: any) => {
        return {
          name: ability.name.charAt(0).toUpperCase() + ability.name.slice(1),
          url: ability.url,
        };
      }
    );

    const eggGroupsFormatted = pokemonSpecieData.data.egg_groups.map(
      (egg_group: any) => {
        return {
          name:
            egg_group.name.charAt(0).toUpperCase() + egg_group.name.slice(1),
          url: egg_group.url,
        };
      }
    );

    return {
      id: pokemonData.data.id,
      name: pokemonSpecieData.data.names[pokemonNameIndex].name,
      description:
        pokemonSpecieData.data.flavor_text_entries[pokemonFlavorTextIndex]
          .flavor_text,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${String(
        pokemonData.data.id
      )}.png`,
      genera: pokemonSpecieData.data.genera[pokemonGeneraIndex].genus,
      pokedex_number: pokemonData.data.id.toString().padStart(3, "0"),
      base_experience: pokemonData.data.base_experience,
      types: pokemonTypesFormatted,
      stats: pokemonStatsFormatted,
      height: pokemonData.data.height,
      weight: pokemonData.data.weight,
      abilites: pokemonAbilityFormatted,
      gender_rate: pokemonSpecieData.data.gender_rate,
      egg_groups: eggGroupsFormatted,
    };
  },
  async getExistsTypes(): Promise<any> {
    const response = await api.get("type");
    console.tron.log("response do type ", response);
    const { results } = response.data;
    return results;
  },
  async getTypePokemon({ data }: any): Promise<any> {
    const { types, type } = data;

    const response = await api.get(`type/${type}`);

    console.tron.log("gjdhgjkfhg", response);
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

    console.tron.log("FINAL !!!!!", damage_relations);

    return damage_relations;
  },
};

export default PokedexService;
