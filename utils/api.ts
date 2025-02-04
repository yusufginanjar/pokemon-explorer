import axios from "axios";
import { PokemonListResponse } from "../interfaces/PokemonList";
import { PokemonDetail } from "../interfaces/PokemonDetail";

export const fetchPokemonList = async (): Promise<PokemonListResponse> => {
  const res = await axios.get<PokemonListResponse>(
    "https://pokeapi.co/api/v2/pokemon?limit=151"
  );
  return res.data;
};

export const fetchPokemon = async (id: string | string[] | undefined) => {
  if (!id) throw new Error("No ID provided");
  const res = await axios.get<PokemonDetail>(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return res.data;
};