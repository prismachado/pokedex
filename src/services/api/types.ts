export type Type = {
  name: string;
  url: string;
};

export type Stat = {
  base_stat: number;
  name: string;
  url: string;
};

export type Ability = {
  name: string;
  url: string;
};

export type EggGroup = {
  name: string;
  url: string;
};

export type Pokemon = {
  id: number;
  name: string;
  description: string;
  image: string;
  genera: string;
  pokedex_number: string;
  base_experience: number;
  types: Type[];
  stats: Stat[];
  height: number;
  weight: number;
  abilites: Ability[];
  gender_rate: number;
  egg_groups: EggGroup[];
};

export interface Types {
  multiplier: string;
  type: string;
}

export type TypesResult = {
  name: string;
  url: string;
};

export type TypeApiResult = {
  count: number;
  next?: string;
  previous?: string;
  results: TypesResult[];
};

export default Pokemon;
