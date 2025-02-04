import axios from "axios";
import { PokemonDetail } from "../interfaces/PokemonDetail";

export const fetchPokemon = async (id: string | string[] | undefined) => {
  if (!id) throw new Error("No ID provided");
  const res = await axios.get<PokemonDetail>(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return res.data;
};