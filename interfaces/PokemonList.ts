export interface PokemonListResult {
    name: string;
    url: string;
  }
  
  export interface PokemonListResponse {
    results: PokemonListResult[];
  }