const getPokemonData = async (pokemonData: any, pokemonSpecieData: any) => {
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
  const pokemonTypesFormatted = pokemonData.data.types.map(({ type }: any) => {
    return {
      name: type.name.charAt(0).toUpperCase() + type.name.slice(1),
      url: type.url,
    };
  });

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
        name: egg_group.name.charAt(0).toUpperCase() + egg_group.name.slice(1),
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
};

export default getPokemonData;
