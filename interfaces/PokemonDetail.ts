export interface PokemonDetail {
    name: string;
    sprites: {
      back_default: string;
      front_default: string;
      front_shiny: string;
    };
    abilities: {
      ability: {
        name: string;
      };
    }[];
    height: number;
    weight: number;
    types: {
      type: {
        name: string;
      };
    }[];
    stats: {
      base_stat: number;
      stat: {
        name: string;
      };
    }[];
  }